// apps/api/src/middlewares/auth.js
// Valida o JWT armazenado no cookie httpOnly "token", emitido por /auth/login.
// Substitui a antiga validação via Supabase Auth.
import jwt from "jsonwebtoken";
import { findById } from "../repositories/user.repo.js";

export async function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ error: "unauthorized", message: "Token não fornecido" });
    }
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: "server_misconfig", message: "JWT_SECRET not set" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const me = await findById(payload.id);
    if (!me) {
      return res.status(401).json({ error: "unauthorized", message: "Usuário não encontrado" });
    }

    req.user = me;
    next();
  } catch (err) {
    if (err?.name === "JsonWebTokenError" || err?.name === "TokenExpiredError") {
      return res.status(401).json({ error: "invalid_token", message: err.message });
    }
    console.error("[requireAuth] Erro inesperado:", err);
    res.status(500).json({ error: "internal_error", message: err.message });
  }
}
