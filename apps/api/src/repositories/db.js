// apps/api/src/repositories/db.js
import { Pool } from 'pg';
import dns from 'dns/promises';

const mustSSL =
  process.env.FORCE_DB_SSL === 'true' ||
  (process.env.DATABASE_URL || '').includes('supabase');

const forceIPv4 = process.env.FORCE_IPV4 === 'true';
const manualHostOverride = process.env.DB_HOST_OVERRIDE || process.env.SUPABASE_DB_HOST_IPV4;

console.log("[DB] Configurando pool de conexão...");
console.log("[DB] DATABASE_URL configurada:", process.env.DATABASE_URL ? "Sim" : "Não");
console.log("[DB] SSL forçado:", mustSSL);
console.log("[DB] Forçar IPv4:", forceIPv4);
if (manualHostOverride) {
  console.log("[DB] Override manual de host ativo:", manualHostOverride);
}

async function resolveDatabaseUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);
    if (manualHostOverride) {
      // Normaliza IPv6: aceita com ou sem colchetes e remove colchetes para setar corretamente
      const trimmed = manualHostOverride.trim();
      const normalizedHost = (trimmed.startsWith('[') && trimmed.endsWith(']'))
        ? trimmed.slice(1, -1)
        : trimmed;

      // Para serialização correta da URL, use url.host (host + port). Em IPv6 o host precisa de colchetes
      const isIPv6 = normalizedHost.includes(':');
      const hostForUrl = isIPv6 ? `[${normalizedHost}]` : normalizedHost;
      url.host = url.port ? `${hostForUrl}:${url.port}` : hostForUrl;
      console.log(`[DB] Usando override manual de host: ${normalizedHost}`);
      const finalUrl = url.toString();
      console.log(`[DB] URL final (override): ${finalUrl.replace(/:[^:@]*@/, ':***@')}`);
      const check = new URL(finalUrl);
      console.log(`[DB] Host efetivo: ${check.host} | Hostname efetivo: ${check.hostname} | Porta: ${check.port}`);
      return finalUrl;
    }

    console.log(`[DB] Resolvendo hostname: ${url.hostname}`);
    
    const records = await dns.lookup(url.hostname, { all: true });
    
    const ipv4 = records.find(r => r.family === 4);
    const ipv6 = records.find(r => r.family === 6);
    
    console.log(`[DB] IPv4 encontrado: ${ipv4?.address || 'Não'}`);
    console.log(`[DB] IPv6 encontrado: ${ipv6?.address || 'Não'}`);
    
    if ((forceIPv4 && ipv4) || ipv4) {
      url.hostname = ipv4.address;
      console.log(`[DB] Usando IPv4: ${ipv4.address}`);
    } else if (ipv6) {
      // IPv6 deve ser usado COM colchetes na URL de conexão para compatibilidade
      url.hostname = `[${ipv6.address}]`;
      console.log(`[DB] Usando IPv6: [${ipv6.address}]`);
    } else {
      console.log(`[DB] Usando hostname original: ${url.hostname}`);
    }
    
    const finalUrl = url.toString();
    console.log(`[DB] URL final: ${finalUrl.replace(/:[^:@]*@/, ':***@')}`);
    
    return finalUrl;
  } catch (error) {
    console.error(`[DB] Erro ao resolver hostname:`, error.message);
    console.log(`[DB] Usando DATABASE_URL original`);
    return rawUrl;
  }
}

let pool;

// Função para inicializar o pool
async function initializePool() {
  try {
    const connectionString = await resolveDatabaseUrl(process.env.DATABASE_URL);
    
    // Blindagem: evita que variáveis PG* do ambiente sobrescrevam a connectionString
    delete process.env.PGHOST;
    delete process.env.PGPORT;
    delete process.env.PGUSER;
    delete process.env.PGDATABASE;
    delete process.env.PGPASSWORD;

    pool = new Pool({
      connectionString,
      ssl: mustSSL ? { rejectUnauthorized: false } : undefined,
      max: 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
      // Permitir IPv6 no Heroku
      keepAlive: true,
      keepAliveInitialDelayMillis: 10000,
    });
    
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

export async function testConnection() {
  try {
    const result = await query('SELECT 1');
    console.log('[DB] Teste de conexão bem-sucedido:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('[DB] Teste de conexão falhou:', error);
    return false;
  }
}
