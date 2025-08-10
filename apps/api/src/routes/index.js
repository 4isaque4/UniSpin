import { Router } from "express";
import auth from "./auth.routes.js";
import videos from "./videos.routes.js";
import trilhas from "./trilhas.routes.js";
import progresso from "./progresso.routes.js";

const r = Router();
r.use("/auth", auth);
r.use("/videos", videos);
r.use("/trilhas", trilhas);
r.use("/progresso", progresso);
export default r;
