// CONTEÚDO DO DB.JS (Pool + query)
import pg from "pg";
const { Pool } = pg;

const mustSSL =
  process.env.FORCE_DB_SSL === "true" ||
  (process.env.DATABASE_URL || "").includes("supabase");

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: mustSSL ? { rejectUnauthorized: false } : false,
  max: 5,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
});

export async function query(text, params) {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}
