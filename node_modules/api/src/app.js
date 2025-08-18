// apps/api/src/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import routes from "./routes/index.js";

dotenv.config();

const app = express();
app.set("trust proxy", 1); // importante em Render/Railway (HTTPS via proxy)

// allowlist de CORS vindo da env (se vazio, libera em DEV/local)
const allowlist = (process.env.CORS_ORIGIN || "")
  .split(",").map(s => s.trim()).filter(Boolean);

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowlist.length === 0) return cb(null, true);
    if (allowlist.includes(origin)) return cb(null, true);
    return cb(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

// health + raiz
app.get("/", (_req, res) =>
  res.json({ ok: true, service: "unispin-api", ts: new Date().toISOString() })
);
app.get("/health", (_req, res) => res.status(200).send("ok"));

// rotas
app.use("/", routes);

// handler de erro (evita derrubar o processo)
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "internal_error" });
});

export default app;
