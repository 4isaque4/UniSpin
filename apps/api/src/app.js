// apps/api/src/app.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/error.js";
import { testConnection } from "./repositories/db.js";
import { validateEnv, FRONTEND_ORIGINS } from "./config/env.js";

dotenv.config();

// Validar variáveis de ambiente
if (!validateEnv()) {
  console.error("Falha na validação das variáveis de ambiente. Encerrando aplicação.");
  process.exit(1);
}

const app = express();
app.set("trust proxy", 1);

// Fallback de CORS em desenvolvimento (DEVE vir antes de qualquer middleware)
const isDev = (process.env.NODE_ENV || 'development') !== 'production';
if (isDev) {
  app.use((req, res, next) => {
    const origin = req.headers.origin || "http://localhost:5173";
    console.log(`[CORS] ${req.method} ${req.path} - Origin: ${origin}`);
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Vary", "Origin");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Authorization,Content-Type,authorization,content-type");
    if (req.method === "OPTIONS") {
      console.log(`[CORS] Respondendo OPTIONS com 204 - Headers: ${JSON.stringify(res.getHeaders())}`);
      return res.sendStatus(204);
    }
    next();
  });
}

// CORS em produção (usa FRONTEND_ORIGINS)
if (!isDev) {
  const corsOptions = {
    origin: (origin, callback) => {
      // permitir chamadas sem Origin (healthchecks, curl) e as da whitelist
      if (!origin || FRONTEND_ORIGINS.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type", "authorization", "content-type"],
  };
  app.use(cors(corsOptions));
  // responder preflight para qualquer rota
  app.options(/.*/, cors(corsOptions));
}

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
  res.json({ ok: true, service: "unispin-api", ts: new Date().toISOString() });
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
