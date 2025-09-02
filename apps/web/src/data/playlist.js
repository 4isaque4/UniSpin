// Dados da playlist: https://www.youtube.com/playlist?list=PLWqJoVK0CU9qU5CIgMAiMaWp9hPSDL2Lu
export const playlistData = {
  id: "PLWqJoVK0CU9qU5CIgMAiMaWp9hPSDL2Lu",
  title: "Playlist UniSpin - Treinamentos e Tutoriais",
  description: "Conteúdo completo de treinamentos e tutoriais da UniSpin",
  thumbnail: "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg",
  
  // Módulos/Trilhas da playlist
  trilhas: [
    {
      id: "modulo-1",
      name: "Módulo 1: Introdução e Conceitos Básicos",
      description: "Fundamentos essenciais para começar sua jornada de aprendizado",
      color: "#3B82F6",
      icon: "target",
      overview: "Este módulo estabelece as bases fundamentais, apresentando conceitos essenciais e preparando você para os módulos avançados.",
      videos: [
        {
          id: "video-1-1",
          title: "Certificação 1 - Apresentação SPIN", // Substitua pelo título real
          description: "Primeiro vídeo da série do treinamento para certificação em Action.NET",
          context: "Contexto adicional: Pré-requisitos, o que esperar, e como aplicar o conhecimento",
          youtubeId: "VIDEO_ID_1", // ID real do YouTube
          duration: "5:30",
          thumbnail: "https://img.youtube.com/vi/VIDEO_ID_1/maxresdefault.jpg",
          order: 1,
          learningObjectives: [
            "Objetivo de aprendizado 1",
            "Objetivo de aprendizado 2",
            "Objetivo de aprendizado 3"
          ],
          prerequisites: "Nenhum pré-requisito necessário",
          expectedOutcome: "Ao final deste vídeo, você será capaz de..."
        },
        {
          id: "video-1-2",
          title: "TÍTULO EXATO DO YOUTUBE - AQUI", // Substitua pelo título real
          description: "Descrição enriquecida: O que você vai aprender neste vídeo e por que é importante",
          context: "Contexto adicional: Pré-requisitos, o que esperar, e como aplicar o conhecimento",
          youtubeId: "VIDEO_ID_2", // ID real do YouTube
          duration: "8:15",
          thumbnail: "https://img.youtube.com/vi/VIDEO_ID_2/maxresdefault.jpg",
          order: 2,
          learningObjectives: [
            "Objetivo de aprendizado 1",
            "Objetivo de aprendizado 2"
          ],
          prerequisites: "Conhecimento básico do vídeo anterior",
          expectedOutcome: "Ao final deste vídeo, você será capaz de..."
        }
      ]
    },
    {
      id: "modulo-2", 
      name: "Módulo 2: Funcionalidades Principais",
      description: "Recursos e funcionalidades essenciais do sistema",
      color: "#10B981",
      icon: "lightning",
      overview: "Aprenda as funcionalidades principais que você usará diariamente, com exemplos práticos e casos de uso reais.",
      videos: [
        {
          id: "video-2-1",
          title: "Certificação 2 - SCADA Action.NET", // Substitua pelo título real
          description: "Segundo vídeo da série de treinamento para certificação em Action.NET - Introdução ao software SCADA e apresentação do Action.NET.",
          context: `Para acessar o projeto demo:
Usuário: super
Senha: s`,
          youtubeId: "VIDEO_ID_3", // ID real do YouTube
          duration: "12:45",
          thumbnail: "https://img.youtube.com/vi/VIDEO_ID_3/maxresdefault.jpg",
          order: 3,
          learningObjectives: [
            "Objetivo de aprendizado 1",
            "Objetivo de aprendizado 2",
            "Objetivo de aprendizado 3"
          ],
          prerequisites: "Conhecimento dos conceitos básicos",
          expectedOutcome: "Ao final deste vídeo, você será capaz de..."
        },
        {
          id: "video-2-2",
          title: "Certificação 3 - Draw", // Substitua pelo título real
          description: "Terceiro vídeo da série do treinamento para certificação em Action.NET - Draw: Desenhando telas.",
          context: "Contexto adicional: Pré-requisitos, o que esperar, e como aplicar o conhecimento",
          youtubeId: "VIDEO_ID_4", // ID real do YouTube
          duration: "15:20",
          thumbnail: "https://img.youtube.com/vi/VIDEO_ID_4/maxresdefault.jpg",
          order: 4,
          learningObjectives: [
            "Objetivo de aprendizado 1",
            "Objetivo de aprendizado 2"
          ],
          prerequisites: "Conhecimento das funcionalidades básicas",
          expectedOutcome: "Ao final deste vídeo, você será capaz de..."
        }
      ]
    },
    {
      id: "modulo-3",
      name: "Módulo 3: Recursos Avançados",
      description: "Técnicas e recursos avançados para usuários experientes",
      color: "#8B5CF6",
      icon: "rocket",
      overview: "Domine recursos avançados e técnicas especializadas para otimizar seu trabalho e resolver problemas complexos.",
      videos: [
        {
          id: "video-3-1",
          title: "TÍTULO EXATO DO YOUTUBE - AQUI", // Substitua pelo título real
          description: "Descrição enriquecida: O que você vai aprender neste vídeo e por que é importante",
          context: "Contexto adicional: Pré-requisitos, o que esperar, e como aplicar o conhecimento",
          youtubeId: "VIDEO_ID_5", // ID real do YouTube
          duration: "18:30",
          thumbnail: "https://img.youtube.com/vi/VIDEO_ID_5/maxresdefault.jpg",
          order: 5,
          learningObjectives: [
            "Objetivo de aprendizado 1",
            "Objetivo de aprendizado 2",
            "Objetivo de aprendizado 3"
          ],
          prerequisites: "Conhecimento sólido dos módulos anteriores",
          expectedOutcome: "Ao final deste vídeo, você será capaz de..."
        },
        {
          id: "video-3-2",
          title: "TÍTULO EXATO DO YOUTUBE - AQUI", // Substitua pelo título real
          description: "Descrição enriquecida: O que você vai aprender neste vídeo e por que é importante",
          context: "Contexto adicional: Pré-requisitos, o que esperar, e como aplicar o conhecimento",
          youtubeId: "VIDEO_ID_6", // ID real do YouTube
          duration: "22:15",
          thumbnail: "https://img.youtube.com/vi/VIDEO_ID_6/maxresdefault.jpg",
          order: 6,
          learningObjectives: [
            "Objetivo de aprendizado 1",
            "Objetivo de aprendizado 2"
          ],
          prerequisites: "Conhecimento avançado do sistema",
          expectedOutcome: "Ao final deste vídeo, você será capaz de..."
        }
      ]
    }
  ]
};

// Função para obter todos os vídeos em sequência
export const getAllVideos = () => {
  const allVideos = [];
  playlistData.trilhas.forEach(trilha => {
    trilha.videos.forEach(video => {
      allVideos.push({
        ...video,
        trilhaId: trilha.id,
        trilhaName: trilha.name,
        trilhaColor: trilha.color,
        trilhaOverview: trilha.overview
      });
    });
  });
  return allVideos.sort((a, b) => a.order - b.order);
};

// Função para obter vídeo por ID
export const getVideoById = (videoId) => {
  return getAllVideos().find(video => video.id === videoId);
};

// Função para obter trilha por ID
export const getTrilhaById = (trilhaId) => {
  return playlistData.trilhas.find(trilha => trilha.id === trilhaId);
};

// Função para obter próximo vídeo
export const getNextVideo = (currentVideoId) => {
  const allVideos = getAllVideos();
  const currentIndex = allVideos.findIndex(video => video.id === currentVideoId);
  if (currentIndex < allVideos.length - 1) {
    return allVideos[currentIndex + 1];
  }
  return null;
};

// Função para obter vídeo anterior
export const getPreviousVideo = (currentVideoId) => {
  const allVideos = getAllVideos();
  const currentIndex = allVideos.findIndex(video => video.id === currentVideoId);
  if (currentIndex > 0) {
    return allVideos[currentIndex - 1];
  }
  return null;
};

// Função para obter progresso do usuário (mock - será integrado com backend)
export const getUserProgress = () => {
  // Mock data - será integrado com o backend
  return {
    completedVideos: [],
    currentVideo: null,
    progressPercentage: 0
  };
};
