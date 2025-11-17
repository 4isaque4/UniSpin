// Re-exporta tudo da nova estrutura modular para manter compatibilidade
export { TRILHAS, getTrilhaById } from './trilhas/index.js';
export {
  calcularDuracaoTotal,
  getProgressoTrilha,
  marcarVideoCompleto,
  marcarVideoIncompleto,
  calcularProgressoTrilha,
  getVideosCompletados,
  isVideoCompleto
} from './utils.js';
