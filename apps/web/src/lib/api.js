// apps/web/src/lib/api.js
import { supabase } from "./supabase";

// Detectar automaticamente a URL da API baseado no host atual
function getApiUrl() {
  const envUrl = import.meta.env.VITE_API_URL;
  
  // Se VITE_API_URL estiver definida explicitamente, usar ela
  if (envUrl && !envUrl.includes('localhost')) {
    console.log("[apiFetch] Usando VITE_API_URL:", envUrl);
    return envUrl;
  }
  
  // Sempre verificar o protocolo atual da página
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  
  // Em produção (IIS com HTTPS), usar proxy reverso relativo
  // O IIS está configurado para redirecionar /api/* para http://localhost:8080/*
  if (protocol === 'https:') {
    console.log("[apiFetch] Detectado HTTPS, usando proxy reverso: /api");
    return '/api';
  }
  
  // Em desenvolvimento (HTTP), usar hostname + porta 8080
  const apiUrl = `http://${hostname}:8080`;
  console.log("[apiFetch] Detectado HTTP, usando URL direta:", apiUrl);
  return apiUrl;
}

export async function apiFetch(path, options = {}) {
  // Sempre obter a URL dinamicamente para garantir que use o protocolo correto
  const API = getApiUrl();
  console.log("[apiFetch] Iniciando requisição para:", path);
  console.log("[apiFetch] API URL:", API);
  
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
    
    // Se o proxy retornar 404 e estivermos usando HTTPS, tentar fallback para URL direta
    if (res.status === 404 && API === '/api' && window.location.protocol === 'https:') {
      const hostname = window.location.hostname;
      const fallbackUrl = `http://${hostname}:8080${finalPath}`;
      console.warn("[apiFetch] Proxy retornou 404, tentando fallback:", fallbackUrl);
      
      try {
        const fallbackRes = await fetch(fallbackUrl, { ...options, headers, credentials: "omit" });
        console.log("[apiFetch] Fallback respondeu:", fallbackRes.status, fallbackRes.statusText);
        return fallbackRes;
      } catch (fallbackError) {
        console.error("[apiFetch] Fallback também falhou:", fallbackError);
        // Retorna a resposta original (404) mesmo assim
      }
    }
    
    return res;
  } catch (error) {
    console.error("[apiFetch] Erro na requisição:", error);
    throw error;
  }
}
