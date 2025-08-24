// apps/api/src/app.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/error.js";
import { testConnection } from "./repositories/db.js";
import { validateEnv } from "./config/env.js";

dotenv.config();

// Validar variáveis de ambiente
if (!validateEnv()) {
  console.error("Falha na validação das variáveis de ambiente. Encerrando aplicação.");
  process.exit(1);
}

const app = express();
app.set("trust proxy", 1);

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

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

// Testar conexão com banco (será chamado pelo server.js)
export const testDatabaseConnection = async () => {
  console.log("Testando conexão com banco de dados...");
  const dbConnected = await testConnection();
  if (dbConnected) {
    console.log("Conexão com banco estabelecida");
  } else {
    console.log("Falha na conexão com banco");
  }
  return dbConnected;
};

export default app;
