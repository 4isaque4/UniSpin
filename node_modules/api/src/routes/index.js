import { Router } from "express";
import auth from "./auth.routes.js";
import trilhas from "./trilhas.routes.js";
import videos from "./videos.routes.js";
// (opcional futuramente) import progresso from "./progresso.routes.js";

const router = Router();

router.use("/trilhas", trilhas);
router.use("/videos", videos);
// router.use("/progresso", progresso);

export default router;
