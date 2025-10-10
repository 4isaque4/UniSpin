// Dados das trilhas de aprendizado
export const TRILHAS = [
  {
    id: "action-net-certificacao",
    titulo: "Certificação Action.NET",
    descricao: "Série completa de 11 vídeos para certificação em Action.NET da UniSpin",
    duracaoTotal: "2:40:00", // Duração corrigida conforme informação do usuário
    quantidadeVideos: 11,
    nivel: "Intermediário",
    categoria: "SCADA & Automação",
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
      titulo: "Action Net X - Curso Completo",
      descricao: "Curso completo de Action Net X cobrindo desde conceitos básicos até funcionalidades avançadas de SCADA e automação industrial",
      duracaoTotal: "2:22:29",
      quantidadeVideos: 4,
      nivel: "Iniciante a Avançado",
      categoria: "SCADA & Automação",
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
      titulo: "Curso de Energia Solar Fotovoltaica",
      descricao: "Curso completo de energia solar fotovoltaica cobrindo dimensionamento, instalação e manutenção de sistemas solares",
      duracaoTotal: "15:30:00",
      quantidadeVideos: 13,
      nivel: "Iniciante a Intermediário",
      categoria: "Energia Renovável",
      cor: "#F59E0B",
      rota: "/videos",
      icone: "sun",
      videos: [
        "gbzfzrGGKaU", // Módulo 1 - Introdução
        "mDKhuBJD5yA", // Módulo 2 - Fundamentos
        "IH-Yz3tM8dM", // Módulo 3 - Dimensionamento Inicial - Parte 1
        "S-QTYBb-LJM", // Módulo 4 - Dimensionamento Inicial - Parte 2
        "IX2-T8I_v3I", // Módulo 5 - Dimensionamento Inicial - Parte 3
        "GbX_JcM4MMg", // Módulo 6 - Acesso ao CRESESB
        "5YwfK448O5I", // Módulo 7 - Dimensionamento dos Componentes
        "ea6hIDLJKdQ", // Módulo 8 - Dimensionamento Refinado
        "qUEwkYJA1O4", // Módulo 9 - Instalação
        "pv1DJaPoiEY", // Módulo 10 - Manutenção
        "UE9ZCE2tqq8", // Módulo 11 - Análise de Viabilidade
        "Srj2anPee6k", // Módulo 12 - Normas e Regulamentações
        "BuyEAJSgzzQ"  // Módulo 13 - Conclusão e Próximos Passos
      ]
    },
  {
    id: "sage-treinamento",
    titulo: "Treinamento SAGE",
    descricao: "Série de vídeos sobre o SAGE (Sistema Aberto de Gerenciamento de Energia)",
    duracaoTotal: "54:39:11",
    quantidadeVideos: 16,
    nivel: "Intermediário",
    categoria: "Energia & SAGE",
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
