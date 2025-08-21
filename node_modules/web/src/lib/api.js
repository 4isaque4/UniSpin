// apps/web/src/lib/api.js
import { supabase } from "./supabase";

const API = import.meta.env.VITE_API_URL;

export async function apiFetch(path, options = {}) {
  const { data: { session } } = await supabase.auth.getSession();
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");

  // Se houver sessão, envia o token
  if (session?.access_token) {
    headers.set("Authorization", `Bearer ${session.access_token}`);
  }

  const res = await fetch(`${API}${path}`, { ...options, headers, credentials: "omit" });
  // (omit) porque agora não usamos cookies entre domínios
  return res;
}
