import { query } from "./db.js";

export async function findByEmail(email) {
  const { rows } = await query(
    'select id, name, email, role, password_hash from "User" where email = $1 limit 1',
    [email]
  );
  return rows[0] || null;
}

export async function findById(id) {
  const { rows } = await query(
    'select id, name, email, role from "User" where id = $1 limit 1',
    [id]
  );
  return rows[0] || null;
}

export async function setPassword(id, hash) {
  await query('update "User" set password_hash = $1 where id = $2', [hash, id]);
}
