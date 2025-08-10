import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") || "*", credentials: true }));

app.get("/health", (_req, res) => res.json({ ok: true, uptime: process.uptime() }));
app.use("/", routes);

export default app;
