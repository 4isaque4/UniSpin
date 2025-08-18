// CONTEÚDO DO USER.REPO.JS (usa query do db.js)
import { query } from "./db.js";

const FIELDS = 'id, name, email, role, password_hash';

export async function findByEmail(email) {
  const { rows } = await query(
    'select ' + FIELDS + ' from "User" where lower(email) = lower($1) limit 1',
    [String(email).trim()]
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
  const { rowCount } = await query(
    'update "User" set password_hash = $1 where id = $2',
    [hash, id]
  );
  if (rowCount === 0) throw new Error("user_not_found_on_update");
  return true;
}
