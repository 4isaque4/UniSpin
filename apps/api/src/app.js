// apps/api/src/app.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import routes from "./routes/index.js";

dotenv.config();

const app = express();
app.set("trust proxy", true);

// CORS
const allowedOrigins = (process.env.CORS_ORIGIN || "https://uni-spin-web.vercel.app,http://localhost:5173")
  .split(",").map(s => s.trim()).filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Middlewares comuns
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

// Handler p/ JSON inválido
app.use((err, _req, res, next) => {
  if (err?.type === "entity.parse.failed") {
    return res.status(400).json({ error: "invalid_json", message: "Body JSON inválido" });
  }
  next(err);
});

// Health
app.get("/", (_req, res) => {
  res.json({ ok: true, service: "unispin-api", ts: new Date().toISOString(), allowedOrigins });
});
app.get("/health", (_req, res) => res.status(200).send("ok"));

// Rotas
app.use(routes);

// Start
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`API on :${PORT}`));

export default app;
