import { Router } from "express";
import * as ctl from "../controllers/videos.controller.js";

const router = Router();

router.get("/", ctl.listVideos);      // GET /videos
router.get("/:id", ctl.getById); // GET /videos/:id

export default router;
