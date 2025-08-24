import { Router } from "express";
import auth from "./auth.routes.js";
import trilhas from "./trilhas.routes.js";
import videos from "./videos.routes.js";
import { testConnection } from "../repositories/db.js";
// (opcional futuramente) import progresso from "./progresso.routes.js";

const router = Router();

// Rota de status da API
router.get("/status", async (req, res) => {
  try {
    const dbStatus = await testConnection();
    
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      services: {
        api: "running",
        database: dbStatus ? "connected" : "disconnected"
      },
      environment: {
        node_version: process.version,
        platform: process.platform,
        memory_usage: process.memoryUsage()
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

router.use("/trilhas", trilhas);
router.use("/videos", videos);
// router.use("/progresso", progresso);

export default router;
