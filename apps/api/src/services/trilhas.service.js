import * as repo from "../repositories/trilhas.repo.js";

export async function listarTrilhas() {
  return repo.list();
}

export async function listarVideosDaTrilha(trilhaId) {
  // Por enquanto retorna uma lista vazia, pode ser implementado depois
  return [];
}
