import { list, get } from "../repositories/videos.repo.js";

export const listVideos = async (_req, res, next) => {
  try {
    const data = await list();
    res.json({ items: data });
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const item = await get(req.params.id);
    if (!item) return res.status(404).json({ error: "Vídeo não encontrado" });
    res.json(item);
  } catch (err) { next(err); }
};
