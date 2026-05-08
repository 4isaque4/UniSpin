// apps/web/src/lib/api.js
// Wrapper de fetch para a API do UniSpin.
// Usa cookies httpOnly (credentials: include) — substitui o token Bearer do Supabase.

function getApiUrl() {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && !envUrl.includes("localhost")) return envUrl;

  const protocol = window.location.protocol;
  const hostname = window.location.hostname;

  // Em produção (HTTPS), o Nginx faz proxy de /api/* -> http://localhost:8080/*
  if (protocol === "https:") return "/api";

  // Em desenvolvimento (HTTP), bate direto na 8080 do mesmo host
  return `http://${hostname}:8080`;
}

export async function apiFetch(path, options = {}) {
  const API = getApiUrl();
  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }

  const base = (API || "").replace(/\/+$/, "");
  const finalPath = path?.startsWith("/") ? path : `/${path || ""}`;
  const url = `${base}${finalPath}`;

  return fetch(url, { ...options, headers, credentials: "include" });
}
