import { Router } from "express";
import auth from "./auth.routes.js";
import trilhas from "./trilhas.routes.js";
import videos from "./videos.routes.js";
import downloads from "./downloads.routes.js";
import { testConnection } from "../repositories/db.js";
import dns from "dns";
import { promisify } from "util";
// (opcional futuramente) import progresso from "./progresso.routes.js";

const router = Router();

// Rota de status da API
router.get("/status", async (req, res) => {
  try {
    const dbStatus = await testConnection();
    
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      services: {
        api: "running",
        database: dbStatus ? "connected" : "disconnected"
      },
      environment: {
        node_version: process.version,
        platform: process.platform,
        memory_usage: process.memoryUsage()
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

// Rota de teste de conectividade de rede
router.get("/network-test", async (req, res) => {
  try {
    const databaseUrl = process.env.DATABASE_URL;
    const hostname = databaseUrl.match(/@([^:]+):/)?.[1];
    
    if (!hostname) {
      return res.status(400).json({
        error: "invalid_database_url",
        message: "Não foi possível extrair o hostname da DATABASE_URL"
      });
    }
    
    console.log(`[network-test] Testando conectividade para: ${hostname}`);
    
    // Testar resolução DNS
    const resolve4 = promisify(dns.resolve4);
    const resolve6 = promisify(dns.resolve6);
    
    let ipv4Addresses = [];
    let ipv6Addresses = [];
    let dnsErrors = [];
    
    try {
      ipv4Addresses = await resolve4(hostname);
      console.log(`[network-test] IPv4 encontrados:`, ipv4Addresses);
    } catch (error) {
      dnsErrors.push(`IPv4: ${error.message}`);
    }
    
    try {
      ipv6Addresses = await resolve6(hostname);
      console.log(`[network-test] IPv6 encontrados:`, ipv6Addresses);
    } catch (error) {
      dnsErrors.push(`IPv6: ${error.message}`);
    }
    
    // Testar conectividade TCP
    const net = await import('net');
    const testConnection = (host, port) => {
      return new Promise((resolve) => {
        const socket = new net.Socket();
        const timeout = 5000;
        
        socket.setTimeout(timeout);
        
        socket.on('connect', () => {
          socket.destroy();
          resolve({ success: true, time: Date.now() });
        });
        
        socket.on('timeout', () => {
          socket.destroy();
          resolve({ success: false, error: 'timeout' });
        });
        
        socket.on('error', (error) => {
          socket.destroy();
          resolve({ success: false, error: error.message });
        });
        
        socket.connect(port, host);
      });
    };
    
    const connectionTests = [];
    
    // Testar IPv4 se disponível
    for (const ip of ipv4Addresses.slice(0, 2)) { // Testar apenas os 2 primeiros
      const result = await testConnection(ip, 5432);
      connectionTests.push({
        type: 'IPv4',
        address: ip,
        result
      });
    }
    
    // Testar IPv6 se disponível
    for (const ip of ipv6Addresses.slice(0, 2)) { // Testar apenas os 2 primeiros
      const result = await testConnection(ip, 5432);
      connectionTests.push({
        type: 'IPv6',
        address: ip,
        result
      });
    }
    
    res.json({
      hostname,
      dns_resolution: {
        ipv4: ipv4Addresses,
        ipv6: ipv6Addresses,
        errors: dnsErrors
      },
      connection_tests: connectionTests,
      recommendations: [
        ipv4Addresses.length === 0 ? "Hostname não resolve para IPv4" : null,
        ipv6Addresses.length > 0 ? "Hostname resolve para IPv6 (pode causar problemas)" : null,
        "Considere usar IP direto em vez de hostname se IPv6 persistir"
      ].filter(Boolean)
    });
    
  } catch (error) {
    console.error('[network-test] Erro:', error);
    res.status(500).json({
      error: "network_test_failed",
      message: error.message
    });
  }
});

router.use("/auth", auth);
router.use("/trilhas", trilhas);
router.use("/videos", videos);
router.use("/downloads", downloads);
// router.use("/progresso", progresso);

export default router;
