// apps/api/src/middlewares/auth.js
import { createClient } from "@supabase/supabase-js";

// Lê "Authorization: Bearer <token>" e valida no Supabase
export async function requireAuth(req, res, next) {
  try {
    // Debug: verificar se as variáveis estão sendo lidas
    console.log("[requireAuth] SUPABASE_URL:", process.env.SUPABASE_URL ? "Configurada" : "NÃO CONFIGURADA");
    console.log("[requireAuth] SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "Configurada" : "NÃO CONFIGURADA");
    
    // Criar cliente Supabase apenas quando necessário
    console.log("[requireAuth] Tentando criar cliente Supabase...");
    
    const supabase = createClient(
      process.env.SUPABASE_URL, 
      process.env.SUPABASE_SERVICE_ROLE_KEY, 
      {
        auth: { persistSession: false, autoRefreshToken: false }
      }
    );
    
    console.log("[requireAuth] Cliente Supabase criado com sucesso");

    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
    
    console.log("[requireAuth] Token recebido:", token ? `${token.substring(0, 20)}...` : "Nenhum");
    
    if (!token) return res.status(401).json({ error: "unauthorized", message: "Token não fornecido" });

    const { data, error } = await supabase.auth.getUser(token);
    
    if (error) {
      console.error("[requireAuth] Erro Supabase:", error);
      return res.status(401).json({ error: "unauthorized", message: error.message });
    }
    
    if (!data?.user) {
      console.error("[requireAuth] Usuário não encontrado");
      return res.status(401).json({ error: "unauthorized", message: "Usuário não encontrado" });
    }

    console.log("[requireAuth] Usuário autenticado:", data.user.email);
    req.user = data.user;
    next();
  } catch (e) {
    console.error("[requireAuth] Erro inesperado:", e);
    res.status(401).json({ error: "unauthorized", message: e.message });
  }
}
