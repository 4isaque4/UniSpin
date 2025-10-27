import { Link, useSearchParams } from "react-router-dom";
import VideoCard from "../../features/videos/VideoCard.jsx";
import DownloadList from "../../components/DownloadList.jsx";
import { TRILHAS } from "../../data/trilhas.js";
import { MOCK } from "../../data/videoData.js";

// Trilha padrão (Action.NET) e opção de SAGE
const VIDEOS_ACTION = [
  { 
    id: "5x6pCc8xUDk", 
    titulo: "Certificação 1 - Apresentação SPIN", 
    duracao: "15:42",
    descricao: "Primeiro vídeo da série do treinamento para certificação em Action.NET."
  },
  { 
    id: "vRMNHAvUrvs", 
    titulo: "Certificação 2 - SCADA Action.NET", 
    duracao: "18:35",
    descricao: "Segundo vídeo da série de treinamento para certificação em Action.NET - Introdução ao software SCADA e apresentação do Action.NET. Para acessar o projeto demo: Usuário: super, Senha: s"
  },
  { 
    id: "RenjvRMXPHg", 
    titulo: "Certificação 3 - Draw", 
    duracao: "22:18",
    descricao: "Terceiro vídeo da série do treinamento para certificação em Action.NET - Draw: Desenhando telas. Layouts: 0:22, DisplaySettings: 2:49, DynamicsConfigurations: 4:36, Menu Vertical: 17:50, Menu Horizontal: 23:54, Montagem de um disjuntor: 26:49, Introdução aos templates: 35:21, Símbolos: 42:53, Variáveis de Referência: 48:04, Janela de comando: 52:55, Value As String: 1:07:57"
  },
  { 
    id: "kS-76E2vLss", 
    titulo: "Certificação 4 - Tags", 
    duracao: "19:47",
    descricao: "Quarto vídeo da série do treinamento para certificação em Action.NET - Tags e histórico."
  },
  { 
    id: "Yge9ayUUFoo", 
    titulo: "Certificação 5 - Security", 
    duracao: "16:53",
    descricao: "Quinto vídeo da série do treinamento para certificação em Action.NET - Security."
  },
  { 
    id: "tg35dYFJsH0", 
    titulo: "Certificação 6 - Devices", 
    duracao: "21:29",
    descricao: "Sexto vídeo da série do treinamento para certificação em Action.NET - Devices."
  },
  { 
    id: "Zrq8Gnmspaw", 
    titulo: "Certificação 7 - Alarms", 
    duracao: "17:44",
    descricao: "Sétimo vídeo da série do treinamento para certificação em Action.NET - Alarms."
  },
  { 
    id: "wYFWtV_Uv0c", 
    titulo: "Certificação 8 - Datasets", 
    duracao: "20:16",
    descricao: "Oitavo vídeo da série do treinamento para certificação em Action.NET - Datasets."
  },
  { 
    id: "gDgoMQ_-U0U", 
    titulo: "Certificação 9 - Scripts", 
    duracao: "18:52",
    descricao: "Nono vídeo da série do treinamento para certificação em Action.NET - Scripts."
  },
  { 
    id: "UwdINYOCHZ4", 
    titulo: "Certificação 10 - Run", 
    duracao: "19:38",
    descricao: "Décimo vídeo da série do treinamento para certificação em Action.NET - Run."
  },
  { 
    id: "-sSdhGooQzQ", 
    titulo: "Certificação 11 - LeanAutomation", 
    duracao: "16:25",
    descricao: "Décimo primeiro vídeo da série do treinamento para certificação em Action.NET - LeanAutomation."
  },
];

const VIDEOS_SAGE = [
  { id: "oUYIUIFT4sk", titulo: "Treinamento SAGE 1",  duracao: "3:31:05", descricao: "Introdução ao SAGE, visão geral do sistema e objetivos." },
  { id: "k9zDvNElls4", titulo: "Treinamento SAGE 2",  duracao: "3:33:05", descricao: "Arquitetura do SAGE e componentes em centros de operação." },
  { id: "uCkJH3JeIJQ", titulo: "Treinamento SAGE 3",  duracao: "3:31:05", descricao: "Instalação, configuração inicial e serviços do ambiente SAGE." },
  { id: "WNyFiNu671M", titulo: "Treinamento SAGE 4",  duracao: "3:33:05", descricao: "Integração com bancos de dados e persistência de dados operacionais." },
  { id: "UOcDsoPI6hU", titulo: "Treinamento SAGE 5",  duracao: "5:13:33", descricao: "Modelagem de ativos, cadastro de pontos e topologia de rede." },
  { id: "Who63QFr0GA", titulo: "Treinamento SAGE 6",  duracao: "3:25:48", descricao: "Comunicação com IEDs/RTUs, protocolos e boas práticas de telemetria." },
  { id: "l05gsBesqg4", titulo: "Treinamento SAGE 7",  duracao: "3:17:28", descricao: "Construção de telas SCADA, sinóticos e padrões de navegação." },
  { id: "LvOwfeikA4Q", titulo: "Treinamento SAGE 8",  duracao: "2:35:49", descricao: "Alarmes, eventos e tratamento de contingências." },
  { id: "6Jsb8AlLOlo", titulo: "Treinamento SAGE 9",  duracao: "3:23:52", descricao: "Tendências, históricos e análise de dados operacionais." },
  { id: "n6RfHyfAYEw", titulo: "Treinamento SAGE 10", duracao: "3:28:17", descricao: "Relatórios, auditoria e trilhas de operação." },
  { id: "AhMMO_MmfgU", titulo: "Treinamento SAGE 11 (parte 1)", duracao: "0:13:21", descricao: "Segurança, perfis de usuário e gestão de permissões (parte 1)." },
  { id: "TgnsPPu2VY8", titulo: "Treinamento SAGE 12", duracao: "3:36:13", descricao: "Scripts/macros e automações no ambiente SAGE." },
  { id: "6Y0FlnY6vO0", titulo: "Treinamento SAGE 13", duracao: "4:10:57", descricao: "Simulações operativas e estudos de rede." },
  { id: "LDK3VixwPeU", titulo: "Treinamento SAGE 14", duracao: "4:16:51", descricao: "Integração com sistemas externos e APIs." },
  { id: "nzJWokOQaMo", titulo: "Treinamento SAGE 15", duracao: "3:06:19", descricao: "Boas práticas de operação e confiabilidade." },
  { id: "SdaocXBGevo", titulo: "Treinamento SAGE 16", duracao: "3:42:23", descricao: "Encerramento, revisão de conceitos e próximos passos." },
];

// Função para buscar informações completas do vídeo
function getVideoInfo(videoId) {
  // Buscar informações reais no MOCK
  const videoInfo = MOCK[videoId];
  
  if (videoInfo) {
    return {
      titulo: videoInfo.titulo,
      descricao: videoInfo.descricao,
      duracao: videoInfo.duracao
    };
  }
  
  // Fallback se não encontrar no MOCK
  return {
    titulo: `Vídeo ${videoId.substring(0, 8)}...`,
    descricao: "Descrição do vídeo será carregada em breve.",
    duracao: "00:00"
  };
}

export default function Videos() {
  const trilhasDisponiveis = [
    { id: "action-net-certificacao", nome: "Action.NET" },
    { id: "action-net-x-completo", nome: "Action Net X" },
    { id: "curso-solar-fotovoltaico", nome: "Energia Solar" },
    { id: "sage-treinamento", nome: "SAGE" },
    { id: "falcon-bi-40", nome: "Falcon BI 4.0" },
  ];
  const [searchParams, setSearchParams] = useSearchParams();
  const trilha = searchParams.get("trilha") || "action-net-certificacao";
  // Buscar trilha específica
  const trilhaData = TRILHAS.find(t => t.id === trilha);
  
  // Criar lista com informações completas dos vídeos
  let lista = [];
  if (trilhaData?.videos) {
    lista = trilhaData.videos.map(videoId => ({
      id: videoId,
      ...getVideoInfo(videoId)
    }));
  } else if (trilha === "sage-treinamento") {
    lista = VIDEOS_SAGE;
  } else {
    lista = VIDEOS_ACTION;
  }

  return (
    <main className="features">
      <div className="container">
        {/* título removido a pedido */}
        <h2 style={{ margin: "6px 0 12px", textAlign: "center", color: "#374151" }}>
          {trilhaData ? trilhaData.titulo : "Vídeos de Treinamento"}
        </h2>
        {trilhaData && (
          <p style={{ margin: "0 0 20px", textAlign: "center", color: "#6B7280", fontSize: "16px" }}>
            {trilhaData.descricao}
          </p>
        )}

        {/* Filtro de trilha (pill/segmented) */}
        <div className="filter-bar" role="tablist" aria-label="Filtrar trilha">
          {trilhasDisponiveis.map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSearchParams({ trilha: t.id })}
              className={`filter-pill ${trilha === t.id ? 'active' : ''}`}
              role="tab"
              aria-selected={trilha === t.id}
              aria-controls="videos-lista"
            >
              {t.nome}
            </button>
          ))}
        </div>

        {/* Seção de Downloads - apenas para trilhas SAGE e Energia Solar */}
        {(trilha === "sage-treinamento" || trilha === "curso-solar-fotovoltaico") && (
          <div style={{ marginTop: "24px", marginBottom: "40px" }}>
            <DownloadList trilhaId={trilha} />
          </div>
        )}



        <div id="videos-lista" className="grid videos-grid">
          {lista.map(v => (
            <div key={v.id} style={{ width: "100%", maxWidth: "400px" }}>
              <VideoCard video={v} trilhaId={trilha} />
            </div>
          ))}
        </div>

        <div style={{ marginTop: "40px", textAlign: "center" }}>
          {trilhaData && (
            <p style={{ color: "#6b7280", marginBottom: "16px" }}>
              {trilhaData.quantidadeVideos} vídeos • Duração total: {trilhaData.duracaoTotal} • Nível: {trilhaData.nivel}
            </p>
          )}
          <Link to="/" className="btn secondary">
            Voltar ao início
          </Link>
        </div>
      </div>
    </main>
  );
}
