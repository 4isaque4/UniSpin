import { getAllVideos, getVideoById } from "../repositories/videos.repo.js";

export const list = async (_req, res, next) => {
  try {
    const data = await getAllVideos();
    res.json({ items: data });
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const item = await getVideoById(req.params.id);
    if (!item) return res.status(404).json({ error: "Vídeo não encontrado" });
    res.json(item);
  } catch (err) { next(err); }
};
