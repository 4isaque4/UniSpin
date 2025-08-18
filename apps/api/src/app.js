import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import routes from "./routes/index.js";

dotenv.config();

const app = express();
app.set("trust proxy", 1);

// -------- CORS --------
const rawOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

// transforma strings da env em regex exatas
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const whitelist = [
  ...rawOrigins.map((s) => new RegExp("^" + esc(s) + "$")),
  /^http:\/\/localhost:5173$/ // dev
];

const corsConfig = {
  origin(origin, cb) {
    if (!origin) return cb(null, true);                 // curl/health sem Origin
    const ok = whitelist.some((re) => re.test(origin));
    return cb(ok ? null : new Error(`CORS blocked: ${origin}`), ok);
  },
  credentials: true,
  methods: ["GET","HEAD","PUT","PATCH","POST","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204
};

app.use((req, res, next) => { res.header("Vary", "Origin"); next(); });
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const ok = origin && whitelist.some(re => re.test(origin));
  if (ok) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Vary", "Origin");
  }
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});
app.use(cors(corsConfig));
app.options("*", cors(corsConfig)); // PRE-FLIGHT global

// -------- middlewares comuns --------
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

// -------- health --------
app.get("/", (_req, res) => {
  res.json({ ok: true, service: "unispin-api", ts: new Date().toISOString(), allowed: rawOrigins });
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
