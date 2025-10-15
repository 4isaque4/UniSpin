// Dados das trilhas de aprendizado
export const TRILHAS = [
  {
    id: "action-net-certificacao",
    titulo: "Certificação Action.NET",
    descricao: "Série completa de 11 vídeos para certificação em Action.NET da UniSpin",
    duracaoTotal: "2:40:00", // Duração corrigida conforme informação do usuário
    quantidadeVideos: 11,
    nivel: "",
    categoria: "",
    cor: "#3B82F6",
    rota: "/videos",
    icone: "certification",
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
  },
    {
      id: "action-net-x-completo",
      titulo: "Action Net X",
      descricao: "Curso completo de Action Net X cobrindo todos os aspectos do SCADA: desde conceitos básicos de supervisão e controle até funcionalidades avançadas como Security, Devices, Alarms, Templates, Símbolos, Scripts e LeanAutomation. Inclui desenvolvimento de telas, configuração de Tags, Historian, comunicação com dispositivos, automação de processos e otimização de sistemas de automação energética.",
      duracaoTotal: "2:22:29",
      quantidadeVideos: 4,
      nivel: "",
      categoria: "",
      cor: "#10B981",
      rota: "/videos",
      icone: "database",
    videos: [
      "e2YAFjLBTlk", // Introdução ao Action Net X
      "CSn-W5dnVhw", // Tags, Draw e Historian - Parte 1
      "vy8jET69N-4", // Templates, Símbolos e Tags de Referência - Parte 2
      "8h2MC4N9XEA"  // Security, Device e Alarms - Parte 3
    ]
    },
    {
      id: "curso-solar-fotovoltaico",
      titulo: "Energia Solar Fotovoltaica",
      descricao: "Energia solar fotovoltaica da EvoSol cobrindo desde conceitos básicos até instalação e aprovação com distribuidora",
      duracaoTotal: "1:16:31",
      quantidadeVideos: 7,
      nivel: "",
      categoria: "",
      cor: "#F59E0B",
      rota: "/videos",
      icone: "sun",
      videos: [
        "gbzfzrGGKaU", // Módulo 1 - Introdução ao Sistema Fotovoltaico
        "mDKhuBJD5yA", // Módulo 2 - Cálculos Iniciais e Dimensionamento
        "IH-Yz3tM8dM", // Módulo 2 (Parte 2) - Dimensionamento Inicial
        "S-QTYBb-LJM", // Módulo 3 - Dimensionamento Final
        "IX2-T8I_v3I", // Módulo 4 - Dimensionamento dos Componentes
        "GbX_JcM4MMg", // Módulo 5 - Pré-instalação (EPI/EPC)
        "5YwfK448O5I", // Módulo 6 - Instalação do Sistema
        "ea6hIDLJKdQ"  // Módulo 7 - Contato com Distribuidora
      ]
    },
  {
    id: "sage-treinamento",
    titulo: "Treinamento SAGE",
    descricao: "Série de vídeos sobre o SAGE (Sistema Aberto de Gerenciamento de Energia)",
    duracaoTotal: "54:39:11",
    quantidadeVideos: 16,
    nivel: "",
    categoria: "",
    cor: "#3B82F6",
    rota: "/videos",
    icone: "certification",
    videos: [
      "oUYIUIFT4sk",
      "k9zDvNElls4",
      "uCkJH3JeIJQ",
      "WNyFiNu671M",
      "UOcDsoPI6hU",
      "Who63QFr0GA",
      "l05gsBesqg4",
      "LvOwfeikA4Q",
      "6Jsb8AlLOlo",
      "n6RfHyfAYEw",
      "AhMMO_MmfgU",
      "TgnsPPu2VY8",
      "6Y0FlnY6vO0",
      "LDK3VixwPeU",
      "nzJWokOQaMo",
      "SdaocXBGevo"
    ]
  },
  {
    id: "falcon-bi-40",
    titulo: "Falcon BI 4.0",
    descricao: "Plataforma própria de análise de dados que transforma dados do negócio em informação. Tomando decisões conscientes e estratégicas baseadas em inteligência de mercado, oferecendo integração com outros aplicativos e permitindo criação de extensões e interfaces personalizadas.",
    duracaoTotal: "1:48:56", // Duração do vídeo atual
    quantidadeVideos: 1,
    nivel: "",
    categoria: "",
    cor: "#8B5CF6",
    rota: "/videos",
    icone: "database",
    videos: [
      "8M4aA5I4TMo" // Vídeo do Falcon BI 4.0
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
