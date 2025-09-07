// apps/web/src/lib/api.js
import { supabase } from "./supabase";

const API = import.meta.env.VITE_API_URL;

export async function apiFetch(path, options = {}) {
  console.log("[apiFetch] Iniciando requisição para:", path);
  console.log("[apiFetch] VITE_API_URL:", API);
  
  const { data: { session } } = await supabase.auth.getSession();
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");

  // Se houver sessão, envia o token
  if (session?.access_token) {
    headers.set("Authorization", `Bearer ${session.access_token}`);
    console.log("[apiFetch] Token encontrado, adicionando Authorization header");
  } else {
    console.log("[apiFetch] Nenhuma sessão ativa");
  }

  const base = (API || "").replace(/\/+$/, "");
  const finalPath = path?.startsWith("/") ? path : `/${path || ""}`;
  const url = `${base}${finalPath}`;
  
  console.log("[apiFetch] URL final:", url);
  console.log("[apiFetch] Headers:", Object.fromEntries(headers.entries()));

  try {
    const res = await fetch(url, { ...options, headers, credentials: "omit" });
    console.log("[apiFetch] Resposta recebida:", res.status, res.statusText);
    return res;
  } catch (error) {
    console.error("[apiFetch] Erro na requisição:", error);
    throw error;
  }
}
