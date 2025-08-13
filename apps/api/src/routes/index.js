import { Router } from "express";
import trilhasRoutes from "./trilhas.routes.js";
import videosRoutes from "./videos.routes.js";

const router = Router();

router.use("/trilhas", trilhasRoutes);
router.use("/videos", videosRoutes);

export default router;
