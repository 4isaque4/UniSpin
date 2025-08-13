import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";

dotenv.config();

const app = express();

// CORS dinâmico a partir da env (aceita lista separada por vírgula)
const origins = (process.env.CORS_ORIGIN || "*")
  .split(",")
  .map(s => s.trim());

app.use(cors({ origin: origins, credentials: true }));
app.use(express.json());

// health + raiz
app.get("/", (_req, res) => {
  console.log("Root endpoint called");
  res.json({ ok: true, service: "unispin-api", ts: new Date().toISOString() });
});

app.get("/health", (_req, res) => res.status(200).send("ok"));

// Rotas da API
app.use(routes);

// Porta (Render define process.env.PORT)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`API on :${PORT}`);
});

export default app;
