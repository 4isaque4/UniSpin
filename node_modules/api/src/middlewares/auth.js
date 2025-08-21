// apps/api/src/middlewares/auth.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE, {
  auth: { persistSession: false, autoRefreshToken: false }
});

// Lê "Authorization: Bearer <token>" e valida no Supabase
export async function requireAuth(req, res, next) {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
    if (!token) return res.status(401).json({ error: "unauthorized" });

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user) return res.status(401).json({ error: "unauthorized" });

    req.user = data.user;
    next();
  } catch (e) {
    console.error("[requireAuth] error:", e);
    res.status(401).json({ error: "unauthorized" });
  }
}
