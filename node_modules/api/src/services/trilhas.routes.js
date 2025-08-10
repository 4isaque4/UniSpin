import { Router } from "express";
import { query } from "../repositories/db.js";

const r = Router();

// Lista trilhas
r.get("/", async (_req, res, next) => {
  try {
    const trilhas = await query(
      `select id, name, description from "Trilha" order by created_at desc`
    );
    res.json(trilhas);
  } catch (e) { next(e); }
});

// Vídeos de uma trilha
r.get("/:trilhaId/videos", async (req, res, next) => {
  try {
    const { trilhaId } = req.params;
    const videos = await query(
      `select v.id, v.title, v.url, v.duration_seconds, tv.order_index
       from "TrailVideo" tv
       join "Video" v on v.id = tv.video_id
       where tv.trilha_id = $1
       order by tv.order_index asc`,
      [trilhaId]
    );
    res.json(videos);
  } catch (e) { next(e); }
});

export default r;
