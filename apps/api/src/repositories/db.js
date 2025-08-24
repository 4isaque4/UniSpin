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
    console.error(`[DB] Erro ao resolver IPv4 para ${hostname}:`, error.message);
    return null;
  }
}

// Função para modificar DATABASE_URL para usar IP direto
async function getIPv4DatabaseUrl() {
  if (!forceIPv4) return process.env.DATABASE_URL;
  
  const databaseUrl = process.env.DATABASE_URL;
  const hostnameMatch = databaseUrl.match(/@([^:]+):/);
  
  if (!hostnameMatch) return databaseUrl;
  
  const hostname = hostnameMatch[1];
  const ipv4Address = await resolveHostnameToIPv4(hostname);
  
  if (ipv4Address) {
    const modifiedUrl = databaseUrl.replace(hostname, ipv4Address);
    console.log(`[DB] DATABASE_URL modificada para usar IP IPv4: ${ipv4Address}`);
    return modifiedUrl;
  }
  
  return databaseUrl;
}

// Configuração do pool com forçar IPv4
let poolConfig = {
  ssl: mustSSL ? { rejectUnauthorized: false } : false,
  max: 5,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
};

// Forçar IPv4 de forma mais agressiva
if (forceIPv4) {
  poolConfig.family = 4;
  console.log("[DB] Configuração family: 4 aplicada");
}

let pool;

// Função para inicializar o pool
async function initializePool() {
  try {
    const databaseUrl = await getIPv4DatabaseUrl();
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
