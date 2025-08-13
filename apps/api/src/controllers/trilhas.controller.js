import * as service from "../services/trilhas.service.js";

export async function listar(req, res, next) {
  try {
    const trilhas = await service.listarTrilhas();
    res.json(trilhas);
  } catch (e) {
    next(e);
  }
}

export async function listarVideos(req, res, next) {
  try {
    const videos = await service.listarVideosDaTrilha(req.params.trilhaId);
    res.json(videos);
  } catch (e) {
    next(e);
  }
}
