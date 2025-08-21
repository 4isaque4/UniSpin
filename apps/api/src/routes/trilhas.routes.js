import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import { query } from "../repositories/db.js";

const r = Router();

// Protegida: precisa de Authorization: Bearer <token>
r.get("/", requireAuth, async (_req, res) => {
  const { rows } = await query('select id, name, description from "Trilha" order by created_at desc');
  res.json(rows);
});

export default r;
