import { useParams, Link } from "react-router-dom";
import { marcarVideoCompleto, marcarVideoIncompleto, isVideoCompleto } from "../../data/trilhas.js";
import { useState, useEffect } from "react";

const MOCK = {
  "5x6pCc8xUDk": { 
    titulo: "Certificação 1 - Apresentação SPIN", 
    embed: "https://www.youtube.com/embed/5x6pCc8xUDk",
    descricao: "Primeiro vídeo da série do treinamento para certificação em Action.NET. Este vídeo apresenta a empresa SPIN e introduz o programa de certificação em Action.NET.",
    duracao: "15:42"
  },
  "vRMNHAvUrvs": { 
    titulo: "Certificação 2 - SCADA Action.NET", 
    embed: "https://www.youtube.com/embed/vRMNHAvUrvs",
    descricao: "Segundo vídeo da série do treinamento para certificação em Action.NET - Introdução ao software SCADA e apresentação do Action.NET. Para acessar o projeto demo: Usuário: super, Senha: s",
    duracao: "18:35"
  },
  "RenjvRMXPHg": { 
    titulo: "Certificação 3 - Draw", 
    embed: "https://www.youtube.com/embed/RenjvRMXPHg",
    descricao: "Terceiro vídeo da série do treinamento para certificação em Action.NET - Draw: Desenhando telas. Layouts: 0:22 DisplaySettings: 2:49 DynamicsConfigurations: 4:36 Menu Vertical: 17:50 Menu Horizontal: 23:54 Montagem de um disjuntor: 26:49 Introdução aos templates: 35:21 Símbolos: 42:53 Variáveis de Referência: 48:04 Janela de comando: 52:55 Value As String: 1:07:57",
    duracao: "22:18"
  },
  "kS-76E2vLss": { 
    titulo: "Certificação 4 - Tags", 
    embed: "https://www.youtube.com/embed/kS-76E2vLss",
    descricao: "Quarto vídeo da série do treinamento para certificação em Action.NET - Tags e histórico.",
    duracao: "19:47"
  },
  "Yge9ayUUFoo": { 
    titulo: "Certificação 5 - Security", 
    embed: "https://www.youtube.com/embed/Yge9ayUUFoo",
    descricao: "Quinto vídeo da série do treinamento para certificação em Action.NET - Security.",
    duracao: "16:53"
  },
  "tg35dYFJsH0": { 
    titulo: "Certificação 6 - Devices", 
    embed: "https://www.youtube.com/embed/tg35dYFJsH0",
    descricao: "Sexto vídeo da série do treinamento para certificação em Action.NET - Devices.",
    duracao: "21:29"
  },
  "Zrq8Gnmspaw": { 
    titulo: "Certificação 7 - Alarms", 
    embed: "https://www.youtube.com/embed/Zrq8Gnmspaw",
    descricao: "Sétimo vídeo da série do treinamento para certificação em Action.NET - Alarms.",
    duracao: "17:44"
  },
  "wYFWtV_Uv0c": { 
    titulo: "Certificação 8 - Datasets", 
    embed: "https://www.youtube.com/embed/wYFWtV_Uv0c",
    descricao: "Oitavo vídeo da série do treinamento para certificação em Action.NET - Datasets.",
    duracao: "20:16"
  },
  "gDgoMQ_-U0U": { 
    titulo: "Certificação 9 - Scripts", 
    embed: "https://www.youtube.com/embed/gDgoMQ_-U0U",
    descricao: "Nono vídeo da série do treinamento para certificação em Action.NET - Scripts.",
    duracao: "18:52"
  },
  "UwdINYOCHZ4": { 
    titulo: "Certificação 10 - Run", 
    embed: "https://www.youtube.com/embed/UwdINYOCHZ4",
    descricao: "Décimo vídeo da série do treinamento para certificação em Action.NET - Run.",
    duracao: "19:38"
  },
  "-sSdhGooQzQ": { 
    titulo: "Certificação 11 - LeanAutomation", 
    embed: "https://www.youtube.com/embed/-sSdhGooQzQ",
    descricao: "Décimo primeiro vídeo da série do treinamento para certificação em Action.NET - LeanAutomation.",
    duracao: "16:25"
  },
  // SAGE (aponta embeds da playlist informada)
  "oUYIUIFT4sk": { titulo: "Treinamento SAGE 1",  embed: "https://www.youtube.com/embed/oUYIUIFT4sk", descricao: "Introdução ao SAGE, visão geral do sistema e objetivos do treinamento.", duracao: "3:31:05" },
  "k9zDvNElls4": { titulo: "Treinamento SAGE 2",  embed: "https://www.youtube.com/embed/k9zDvNElls4", descricao: "Arquitetura do SAGE e componentes principais no contexto de centros de operação.", duracao: "3:33:05" },
  "uCkJH3JeIJQ": { titulo: "Treinamento SAGE 3",  embed: "https://www.youtube.com/embed/uCkJH3JeIJQ", descricao: "Instalação, configuração inicial e serviços do ambiente SAGE.", duracao: "3:31:05" },
  "WNyFiNu671M": { titulo: "Treinamento SAGE 4",  embed: "https://www.youtube.com/embed/WNyFiNu671M", descricao: "Integração com bancos de dados (ex.: PostgreSQL) e persistência de dados operacionais.", duracao: "3:33:05" },
  "UOcDsoPI6hU": { titulo: "Treinamento SAGE 5",  embed: "https://www.youtube.com/embed/UOcDsoPI6hU", descricao: "Modelagem de ativos, cadastro de pontos e topologia de rede.", duracao: "5:13:33" },
  "Who63QFr0GA": { titulo: "Treinamento SAGE 6",  embed: "https://www.youtube.com/embed/Who63QFr0GA", descricao: "Comunicação com IEDs/RTUs, protocolos e boas práticas de telemetria.", duracao: "3:25:48" },
  "l05gsBesqg4": { titulo: "Treinamento SAGE 7",  embed: "https://www.youtube.com/embed/l05gsBesqg4", descricao: "Construção de telas SCADA, sinóticos e padrões de navegação.", duracao: "3:17:28" },
  "LvOwfeikA4Q": { titulo: "Treinamento SAGE 8",  embed: "https://www.youtube.com/embed/LvOwfeikA4Q", descricao: "Alarmes, eventos e tratamento de contingências.", duracao: "2:35:49" },
  "6Jsb8AlLOlo": { titulo: "Treinamento SAGE 9",  embed: "https://www.youtube.com/embed/6Jsb8AlLOlo", descricao: "Tendências, históricos e análise de dados operacionais.", duracao: "3:23:52" },
  "n6RfHyfAYEw": { titulo: "Treinamento SAGE 10", embed: "https://www.youtube.com/embed/n6RfHyfAYEw", descricao: "Relatórios, auditoria e trilhas de operação.", duracao: "3:28:17" },
  "AhMMO_MmfgU": { titulo: "Treinamento SAGE 11 (parte 1)", embed: "https://www.youtube.com/embed/AhMMO_MmfgU", descricao: "Segurança, perfis de usuário e gestão de permissões.", duracao: "0:13:21" },
  "TgnsPPu2VY8": { titulo: "Treinamento SAGE 12", embed: "https://www.youtube.com/embed/TgnsPPu2VY8", descricao: "Scripts/macros e automações no ambiente SAGE.", duracao: "3:36:13" },
  "6Y0FlnY6vO0": { titulo: "Treinamento SAGE 13", embed: "https://www.youtube.com/embed/6Y0FlnY6vO0", descricao: "Simulações operativas e estudos de rede.", duracao: "4:10:57" },
  "LDK3VixwPeU": { titulo: "Treinamento SAGE 14", embed: "https://www.youtube.com/embed/LDK3VixwPeU", descricao: "Integração com sistemas externos e APIs.", duracao: "4:16:51" },
  "nzJWokOQaMo": { titulo: "Treinamento SAGE 15", embed: "https://www.youtube.com/embed/nzJWokOQaMo", descricao: "Boas práticas de operação e confiabilidade.", duracao: "3:06:19" },
  "SdaocXBGevo": { titulo: "Treinamento SAGE 16", embed: "https://www.youtube.com/embed/SdaocXBGevo", descricao: "Encerramento, revisão dos conceitos e próximos passos.", duracao: "3:42:23" },
};

export default function Video() {
  const { id } = useParams();
  const video = MOCK[id];
  const [isCompleto, setIsCompleto] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (video) {
      setIsCompleto(isVideoCompleto("action-net-certificacao", id));
    }
  }, [id, video]);

  if (!video) {
    return (
      <main className="features">
        <div className="container">
          <h2 style={{ color: "#374151" }}>Vídeo não encontrado</h2>
          <p style={{ color: "#6b7280" }}>O vídeo solicitado não foi encontrado.</p>
          <Link to="/videos" className="btn secondary">
            Voltar aos vídeos
          </Link>
        </div>
      </main>
    );
  }

  const toggleCompleto = async () => {
    setIsUpdating(true);
    
    try {
      if (isCompleto) {
        marcarVideoIncompleto("action-net-certificacao", id);
        setIsCompleto(false);
      } else {
        marcarVideoCompleto("action-net-certificacao", id);
        setIsCompleto(true);
      }
    } catch (error) {
      console.error("Erro ao atualizar progresso:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Helper para obter próximo e anterior baseado na ordem do MOCK
  const orderedIds = Object.keys(MOCK);
  const currentIndex = orderedIds.indexOf(id);
  const nextId = currentIndex >= 0 && currentIndex < orderedIds.length - 1 ? orderedIds[currentIndex + 1] : null;
  const prevId = currentIndex > 0 ? orderedIds[currentIndex - 1] : null;

  return (
    <main className="features">
      <div className="container">
        <div style={{ marginBottom: "24px" }}>
          <Link to="/videos" className="btn secondary" style={{ marginBottom: "16px", display: "inline-block" }}>
            ← Voltar aos vídeos
          </Link>
          
          <h1 style={{ margin: "0 0 8px 0", fontSize: "2rem", color: "#374151" }}>{video.titulo}</h1>
          <p style={{ margin: "0 0 16px 0", color: "#6b7280" }}>
            Duração: {video.duracao} | Treinamento Action.NET
          </p>
        </div>

        {/* Layout: player + navegação lateral */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "2fr 1fr", 
          gap: "32px",
          alignItems: "start"
        }}>
          {/* Player de vídeo */}
          <div>
            <div style={{
              position: "relative",
              width: "100%",
              paddingBottom: "56.25%", // 16:9
              backgroundColor: "#000",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 10px 26px rgba(37,99,235,0.25)"
            }}>
              <iframe
                src={video.embed}
                title={video.titulo}
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                allowFullScreen
              />
            </div>
            {/* Informações do vídeo abaixo do player */}
            <div className="card" style={{ marginTop: "20px", maxWidth: "100%" }}>
              <h3 style={{ margin: "0 0 16px 0", color: "#374151" }}>
                Informações do Vídeo
              </h3>
              <div style={{ marginBottom: "16px" }}>
                <strong style={{ color: "#374151" }}>Duração:</strong> <span style={{ color: "#6b7280" }}>{video.duracao}</span>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <strong style={{ color: "#374151" }}>Descrição:</strong>
                <p style={{ margin: "8px 0 0 0", fontSize: "14px", lineHeight: "1.6", color: "#6b7280" }}>
                  {video.descricao}
                </p>
              </div>
              <button
                onClick={toggleCompleto}
                disabled={isUpdating}
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: isCompleto ? "var(--neutral-900)" : "var(--color-primary)",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "700",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px"
                }}
                title={isCompleto ? "Marcar como não assistido" : "Marcar como assistido"}
              >
                {isUpdating ? "Atualizando..." : (isCompleto ? "Vídeo Concluído" : "Marcar como Concluído")}
              </button>
            </div>
          </div>

          {/* Navegação entre vídeos */}
          <div>
            <div className="card" style={{ maxWidth: "100%" }}>
              <h4 style={{ margin: "0 0 16px 0", color: "#374151" }}>Navegação</h4>
              {/* Lista de navegação sem thumbnails */}
              <div style={{ display: "grid", gap: "12px" }}>
                <Link to="/videos" className="btn secondary" style={{ textAlign: "center" }}>
                  Ver Todos os Vídeos
                </Link>
                <div style={{ display: "grid", gap: "8px", maxHeight: "360px", overflow: "auto" }}>
                  {/* Próximos */}
                  {orderedIds.slice(currentIndex + 1).length > 0 && (
                    <div>
                      <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "6px" }}>Próximos</div>
                      <div style={{ display: "grid", gap: "6px" }}>
                        {orderedIds.slice(currentIndex + 1).map(vid => (
                          <Link key={vid} to={`/videos/${vid}`} style={{ textDecoration: "none" }}>
                            <div style={{ fontWeight: 600, color: "#374151" }}>{MOCK[vid]?.titulo || vid}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Anteriores */}
                  {orderedIds.slice(0, currentIndex).length > 0 && (
                    <div style={{ marginTop: "12px" }}>
                      <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "6px" }}>Anteriores</div>
                      <div style={{ display: "grid", gap: "6px" }}>
                        {orderedIds.slice(0, currentIndex).reverse().map(vid => (
                          <Link key={vid} to={`/videos/${vid}`} style={{ textDecoration: "none" }}>
                            <div style={{ fontWeight: 600, color: "#374151" }}>{MOCK[vid]?.titulo || vid}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
