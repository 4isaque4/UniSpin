import { list as listTrilhas, get as getTrilha } from "../repositories/trilhas.repo.js";
import { getAllVideos } from "../repositories/videos.repo.js";

export async function listar(req, res, next) {
  try {
    const trilhas = await listTrilhas();
    res.json(trilhas);
  } catch (e) {
    next(e);
  }
}

export async function listarVideos(req, res, next) {
  try {
    const videos = await getAllVideos();
    res.json(videos);
  } catch (e) {
    next(e);
  }
}
