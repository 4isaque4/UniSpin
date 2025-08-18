import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

const app = express();
app.set("trust proxy", 1);

const allowed = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

const corsConfig = {
  origin(origin, cb) {
    if (!origin) return cb(null, true);               // healthcheck/curl
    const ok = allowed.includes(origin);
    return cb(ok ? null : new Error(`CORS blocked: ${origin}`), ok);
  },
  credentials: true,
  methods: ["GET","HEAD","PUT","PATCH","POST","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204
};

app.use((req, res, next) => { res.header("Vary", "Origin"); next(); });
app.use(cors(corsConfig));
app.options("*", cors(corsConfig)); // <— PRE-FLIGHT

app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.get("/health", (_req, res) => res.status(200).send("ok"));

app.use(routes);

app.use((err, _req, res, _next) => {
  if (err?.message?.startsWith?.("CORS")) {
    return res.status(403).json({ error: "cors", message: err.message });
  }
  return res.status(500).json({ error: "server_error" });
});
