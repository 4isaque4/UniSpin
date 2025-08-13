import * as service from "../services/videos.service.js";

export const list = async (_req, res, next) => {
  try {
    const data = await service.list();
    res.json({ items: data });
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const item = await service.get(req.params.id);
    if (!item) return res.status(404).json({ error: "Vídeo não encontrado" });
    res.json(item);
  } catch (err) { next(err); }
};
