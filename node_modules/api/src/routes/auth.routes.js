// apps/api/src/routes/auth.routes.js
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findByEmail, findById, setPassword } from "../repositories/user.repo.js";

const r = Router();

const isProd = process.env.NODE_ENV === "production";
const cookieOpts = {
  httpOnly: true,
  sameSite: isProd ? "none" : "lax",
  secure: isProd,
  path: "/",
  maxAge: 1000 * 60 * 60 * 24 * 2
};

r.post("/set-password", async (req, res) => {
  const { email, newPassword } = req.body || {};
  if (!email || !newPassword) return res.status(400).json({ error: "invalid_body" });

  const u = await findByEmail(email.toLowerCase().trim());
  if (!u) return res.status(404).json({ error: "user_not_found" });

  const hash = await bcrypt.hash(newPassword, 12);
  await setPassword(u.id, hash);
  res.json({ ok: true });
});

r.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "invalid_body" });

  const u = await findByEmail(email.toLowerCase().trim());
  if (!u || !u.password_hash) return res.status(401).json({ error: "invalid_credentials" });

  const ok = await bcrypt.compare(password, u.password_hash);
  if (!ok) return res.status(401).json({ error: "invalid_credentials" });

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: "server_misconfig", message: "JWT_SECRET not set" });
  }

  const token = jwt.sign(
    { id: u.id, email: u.email, role: u.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || "2d" }
  );

  res
    .cookie("token", token, cookieOpts)
    .json({ id: u.id, name: u.name, email: u.email, role: u.role });
});

r.post("/logout", (req, res) => {
  res.clearCookie("token", { ...cookieOpts, maxAge: 0 }).json({ ok: true });
});

r.get("/me", async (req, res) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: "unauthorized" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const me = await findById(payload.id);
    if (!me) return res.status(401).json({ error: "unauthorized" });
    res.json(me);
  } catch {
    res.status(401).json({ error: "invalid_token" });
  }
});

export default r;
