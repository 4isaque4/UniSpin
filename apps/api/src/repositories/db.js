// CONTEÚDO DO DB.JS (Pool + query)
import pg from "pg";
import dns from "dns";
import { promisify } from "util";
const { Pool } = pg;

const mustSSL =
  process.env.FORCE_DB_SSL === "true" ||
  (process.env.DATABASE_URL || "").includes("supabase");

// Forçar IPv4 se especificado
const forceIPv4 = process.env.FORCE_IPV4 === "true";

console.log("[DB] Configurando pool de conexão...");
console.log("[DB] DATABASE_URL configurada:", process.env.DATABASE_URL ? "Sim" : "Não");
console.log("[DB] SSL forçado:", mustSSL);
console.log("[DB] Forçar IPv4:", forceIPv4);

// Função para resolver hostname para IPv4
async function resolveHostnameToIPv4(hostname) {
  try {
    const resolve4 = promisify(dns.resolve4);
    const addresses = await resolve4(hostname);
    return addresses[0]; // Retorna o primeiro IPv4
  } catch (error) {
    console.log(`[DB] Hostname ${hostname} não resolve para IPv4: ${error.message}`);
    return null;
  }
}

// Função para resolver hostname para IPv6
async function resolveHostnameToIPv6(hostname) {
  try {
    const resolve6 = promisify(dns.resolve6);
    const addresses = await resolve6(hostname);
    return addresses[0]; // Retorna o primeiro IPv6
  } catch (error) {
    console.log(`[DB] Hostname ${hostname} não resolve para IPv6: ${error.message}`);
    return null;
  }
}

// Função para obter a melhor DATABASE_URL
async function getBestDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;
  const hostnameMatch = databaseUrl.match(/@([^:]+):/);
  
  if (!hostnameMatch) return databaseUrl;
  
  const hostname = hostnameMatch[1];
  console.log(`[DB] Resolvendo hostname: ${hostname}`);
  
  // Tentar IPv4 primeiro
  if (forceIPv4) {
    const ipv4Address = await resolveHostnameToIPv4(hostname);
    if (ipv4Address) {
      const modifiedUrl = databaseUrl.replace(hostname, ipv4Address);
      console.log(`[DB] Usando IPv4: ${ipv4Address}`);
      return modifiedUrl;
    }
  }
  
  // Se IPv4 falhar, tentar IPv6
  const ipv6Address = await resolveHostnameToIPv6(hostname);
  if (ipv6Address) {
    const modifiedUrl = databaseUrl.replace(hostname, ipv6Address);
    console.log(`[DB] Usando IPv6: ${ipv6Address}`);
    return modifiedUrl;
  }
  
  // Se nada funcionar, usar hostname original
  console.log(`[DB] Usando hostname original: ${hostname}`);
  return databaseUrl;
}

// Configuração do pool
let poolConfig = {
  ssl: mustSSL ? { rejectUnauthorized: false } : false,
  max: 5,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
};

// Configurar família de IP baseado no que está disponível
if (forceIPv4) {
  poolConfig.family = 4;
  console.log("[DB] Configuração family: 4 aplicada");
} else {
  // Permitir tanto IPv4 quanto IPv6
  console.log("[DB] Permitindo IPv4 e IPv6");
}

let pool;

// Função para inicializar o pool
async function initializePool() {
  try {
    const databaseUrl = await getBestDatabaseUrl();
    poolConfig.connectionString = databaseUrl;
    
    pool = new Pool(poolConfig);
    
    // Eventos do pool
    pool.on('connect', () => {
      console.log('[DB] Nova conexão estabelecida');
    });
    
    pool.on('error', (err) => {
      console.error('[DB] Erro no pool:', err);
    });
    
    pool.on('acquire', () => {
      console.log('[DB] Conexão adquirida do pool');
    });
    
    pool.on('release', () => {
      console.log('[DB] Conexão liberada para o pool');
    });
    
    console.log('[DB] Pool inicializado com sucesso');
    return pool;
  } catch (error) {
    console.error('[DB] Erro ao inicializar pool:', error);
    throw error;
  }
}

// Inicializar pool imediatamente
initializePool().catch(console.error);

export { pool };

export async function query(text, params) {
  let client;
  try {
    if (!pool) {
      console.log('[DB] Pool não inicializado, aguardando...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (!pool) {
        throw new Error('Pool não foi inicializado');
      }
    }
    
    console.log('[DB] Tentando conectar ao banco...');
    client = await pool.connect();
    console.log('[DB] Conexão estabelecida, executando query:', text.substring(0, 50) + '...');
    
    const result = await client.query(text, params);
    console.log('[DB] Query executada com sucesso');
    
    return result;
  } catch (error) {
    console.error('[DB] Erro na query:', error);
    throw error;
  } finally {
    if (client) {
      console.log('[DB] Liberando conexão');
      client.release();
    }
  }
}

// Função para testar conexão
export async function testConnection() {
  try {
    const result = await query('SELECT NOW()');
    console.log('[DB] Teste de conexão bem-sucedido:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('[DB] Teste de conexão falhou:', error);
    return false;
  }
}
