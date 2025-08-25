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
    icone: "📚"
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
