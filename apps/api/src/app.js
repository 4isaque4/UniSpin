import express from "express";
import cors from "cors";

const app = express();

// Health check endpoint - deve vir antes de qualquer middleware
app.get("/health", (req, res) => {
  console.log("Health check endpoint called");
  res.json({ ok: true, uptime: process.uptime() });
});

// Test endpoint
app.get("/test", (req, res) => {
  console.log("Test endpoint called");
  res.json({ message: "Test endpoint working" });
});

// Root endpoint
app.get("/", (req, res) => {
  console.log("Root endpoint called");
  res.json({ message: "Root endpoint working" });
});

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") || "*", credentials: true }));

// Iniciar o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API on :${port}`));

export default app;
