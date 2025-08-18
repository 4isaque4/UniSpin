import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import routes from "./routes/index.js";

dotenv.config();

const app = express();
app.set("trust proxy", 1);

// -------- CORS (config simples, robusta) --------
const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

// 1) SHIM: garante headers e responde OPTIONS antes de qualquer rota
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const isAllowed =
    !!origin &&
    (allowedOrigins.includes(origin) || origin === "http://localhost:5173");

  if (isAllowed) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    // evita cachear variações por origem
    res.header("Vary", "Origin");
  }
  if (req.method === "OPTIONS") {
    return res.sendStatus(isAllowed ? 204 : 403);
  }
  next();
});

// 2) cors oficial (sem callback; usa array)
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);

// -------- middlewares comuns --------
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

// -------- health --------
app.get("/", (_req, res) => {
  res.json({
    ok: true,
    service: "unispin-api",
    ts: new Date().toISOString(),
    allowedOrigins
  });
});
app.get("/health", (_req, res) => res.status(200).send("ok"));

// -------- rotas --------
app.use(routes);

// -------- start --------
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`API on :${PORT}`);
});

export default app;
