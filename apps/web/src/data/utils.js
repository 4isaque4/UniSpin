// Funções utilitárias para gerenciamento de trilhas e progresso
import { getTrilhaById } from './trilhas/index.js';

// Função para calcular duração total de uma trilha
export const calcularDuracaoTotal = (duracoes) => {
  const totalMinutos = duracoes.reduce((total, duracao) => {
    const [minutos, segundos] = duracao.split(':').map(Number);
    return total + minutos + segundos / 60;
  }, 0);
  
  const horas = Math.floor(totalMinutos / 60);
  const minutos = Math.floor(totalMinutos % 60);
  
  return `${horas}:${minutos.toString().padStart(2, '0')}:00`;
};

// Função auxiliar para obter ID do usuário atual
const getCurrentUserId = () => {
  try {
    // Primeiro tenta obter do Supabase localStorage
    const supabaseSessionKey = 'sb-' + (import.meta.env.VITE_SUPABASE_URL || '').replace(/[^a-zA-Z0-9]/g, '') + '-auth-token';
    const userData = localStorage.getItem(supabaseSessionKey);
    
    if (userData) {
      const parsed = JSON.parse(userData);
      return parsed?.currentSession?.user?.id || parsed?.user?.id;
    }
    
    // Fallback: tenta outras chaves comuns
    const fallbackKeys = ['sb-auth-token', 'supabase.auth.token'];
    for (const key of fallbackKeys) {
      const data = localStorage.getItem(key);
      if (data) {
        const parsed = JSON.parse(data);
        const userId = parsed?.currentSession?.user?.id || parsed?.user?.id;
        if (userId) return userId;
      }
    }
    
    return null;
  } catch (error) {
    console.log('Não foi possível obter ID do usuário do localStorage:', error);
    return null;
  }
};

// Funções para gerenciar progresso por usuário
export const getProgressoTrilha = (trilhaId, userId = null) => {
  const currentUserId = userId || getCurrentUserId();
  const key = currentUserId ? `progresso_${currentUserId}_${trilhaId}` : `progresso_${trilhaId}`;
  const progresso = localStorage.getItem(key);
  return progresso ? JSON.parse(progresso) : [];
};

export const marcarVideoCompleto = (trilhaId, videoId, userId = null) => {
  const currentUserId = userId || getCurrentUserId();
  const key = currentUserId ? `progresso_${currentUserId}_${trilhaId}` : `progresso_${trilhaId}`;
  
  const progresso = getProgressoTrilha(trilhaId, currentUserId);
  if (!progresso.includes(videoId)) {
    progresso.push(videoId);
    localStorage.setItem(key, JSON.stringify(progresso));
  }
  return progresso;
};

export const marcarVideoIncompleto = (trilhaId, videoId, userId = null) => {
  const currentUserId = userId || getCurrentUserId();
  const key = currentUserId ? `progresso_${currentUserId}_${trilhaId}` : `progresso_${trilhaId}`;
  
  const progresso = getProgressoTrilha(trilhaId, currentUserId);
  const novoProgresso = progresso.filter(id => id !== videoId);
  localStorage.setItem(key, JSON.stringify(novoProgresso));
  return novoProgresso;
};

export const calcularProgressoTrilha = (trilhaId, userId = null) => {
  const trilha = getTrilhaById(trilhaId);
  if (!trilha) return 0;
  const progresso = getProgressoTrilha(trilhaId, userId);
  return Math.round((progresso.length / trilha.quantidadeVideos) * 100);
};

export const getVideosCompletados = (trilhaId, userId = null) => {
  return getProgressoTrilha(trilhaId, userId);
};

export const isVideoCompleto = (trilhaId, videoId, userId = null) => {
  const progresso = getProgressoTrilha(trilhaId, userId);
  return progresso.includes(videoId);
};

