// CONTEÚDO DO DB.JS (Pool + query)
import pg from "pg";
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

// Configuração do pool com forçar IPv4
const poolConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: mustSSL ? { rejectUnauthorized: false } : false,
  max: 5,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
};

// Forçar IPv4 de forma mais agressiva
if (forceIPv4) {
  poolConfig.family = 4;
  // Configurações adicionais para forçar IPv4
  poolConfig.connectionString = process.env.DATABASE_URL.replace(
    /@([^:]+):/,
    (match, host) => {
      // Forçar resolução IPv4 do hostname
      return `@${host}:`;
    }
  );
}

export const pool = new Pool(poolConfig);

// Testar conexão na inicialização
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

export async function query(text, params) {
  let client;
  try {
    console.log('[DB] Tentando conectar ao banco...');
    client = await pool.connect();
    console.log('[DB] Conexão estabelecida, executando query:', text.substring(0, 50) + '...');
    
    const result = await client.query(text, params);
    console.log('[DB] Query executada com sucesso');
    
    return result;
  } catch (error) {
    console.error('[DB] Erro na query:', error);
    
    // Log específico para problemas de rede
    if (error.code === 'ENETUNREACH') {
      console.error('[DB] Erro de rede: Tentativa de conexão IPv6 falhou. Considere usar FORCE_IPV4=true');
      console.error('[DB] SUGESTÃO: Verifique se o hostname do banco resolve para IPv4');
    }
    
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
    
    // Sugestões específicas para problemas de rede
    if (error.code === 'ENETUNREACH') {
      console.error('[DB] SUGESTÃO: Adicione FORCE_IPV4=true nas variáveis de ambiente');
      console.error('[DB] SUGESTÃO: Verifique se o hostname resolve para IPv4');
      console.error('[DB] SUGESTÃO: Considere usar IP direto em vez de hostname');
    }
    
    return false;
  }
}
