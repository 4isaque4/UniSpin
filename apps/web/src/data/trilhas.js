// Dados das trilhas de aprendizado
export const TRILHAS = [
  {
    id: "action-net-certificacao",
    titulo: "Certificação Action.NET",
    descricao: "Série completa de 11 vídeos para certificação em Action.NET da UniSpin",
    duracaoTotal: "3:47:00", // Soma de todos os vídeos: 15:42 + 18:35 + 22:18 + 19:47 + 16:53 + 21:29 + 17:44 + 20:16 + 18:52 + 19:38 + 16:25 = 3:47:00
    quantidadeVideos: 11,
    nivel: "Intermediário",
    categoria: "SCADA & Automação",
    cor: "#3B82F6",
    rota: "/videos",
    icone: "📚",
    videos: [
      "5x6pCc8xUDk", // Certificação 1
      "vRMNHAvUrvs", // Certificação 2
      "RenjvRMXPHg", // Certificação 3
      "kS-76E2vLss", // Certificação 4
      "Yge9ayUUFoo", // Certificação 5
      "tg35dYFJsH0", // Certificação 6
      "Zrq8Gnmspaw", // Certificação 7
      "wYFWtV_Uv0c", // Certificação 8
      "gDgoMQ_-U0U", // Certificação 9
      "UwdINYOCHZ4", // Certificação 10
      "-sSdhGooQzQ"  // Certificação 11
    ]
  }
];

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

// Função para obter trilha por ID
export const getTrilhaById = (id) => {
  return TRILHAS.find(trilha => trilha.id === id);
};

// Funções para gerenciar progresso
export const getProgressoTrilha = (trilhaId) => {
  const progresso = localStorage.getItem(`progresso_${trilhaId}`);
  return progresso ? JSON.parse(progresso) : [];
};

export const marcarVideoCompleto = (trilhaId, videoId) => {
  const progresso = getProgressoTrilha(trilhaId);
  if (!progresso.includes(videoId)) {
    progresso.push(videoId);
    localStorage.setItem(`progresso_${trilhaId}`, JSON.stringify(progresso));
  }
  return progresso;
};

export const marcarVideoIncompleto = (trilhaId, videoId) => {
  const progresso = getProgressoTrilha(trilhaId);
  const novoProgresso = progresso.filter(id => id !== videoId);
  localStorage.setItem(`progresso_${trilhaId}`, JSON.stringify(novoProgresso));
  return novoProgresso;
};

export const calcularProgressoTrilha = (trilhaId) => {
  const trilha = getTrilhaById(trilhaId);
  if (!trilha) return 0;
  
  const progresso = getProgressoTrilha(trilhaId);
  return Math.round((progresso.length / trilha.quantidadeVideos) * 100);
};

export const getVideosCompletados = (trilhaId) => {
  return getProgressoTrilha(trilhaId);
};

export const isVideoCompleto = (trilhaId, videoId) => {
  const progresso = getProgressoTrilha(trilhaId);
  return progresso.includes(videoId);
};
