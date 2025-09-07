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
  }
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
              {/* Próximo vídeo com thumb */}
              <div style={{ display: "grid", gap: "12px" }}>
                <Link to="/videos" className="btn secondary" style={{ textAlign: "center" }}>
                  Ver Todos os Vídeos
                </Link>
                <div style={{ display: "grid", gap: "12px" }}>
                  {nextId && MOCK[nextId] && (
                    <Link to={`/videos/${nextId}`} style={{ textDecoration: "none" }}>
                      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        <img src={`https://img.youtube.com/vi/${nextId}/hqdefault.jpg`} alt="Próximo vídeo" style={{ width: "96px", height: "54px", borderRadius: "8px", objectFit: "cover" }} />
                        <div>
                          <div style={{ fontSize: "12px", color: "#6b7280" }}>Próximo</div>
                          <div style={{ fontWeight: 700, color: "#374151" }}>{MOCK[nextId].titulo}</div>
                        </div>
                      </div>
                    </Link>
                  )}
                  {prevId && MOCK[prevId] && (
                    <Link to={`/videos/${prevId}`} style={{ textDecoration: "none" }}>
                      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        <img src={`https://img.youtube.com/vi/${prevId}/hqdefault.jpg`} alt="Anterior" style={{ width: "96px", height: "54px", borderRadius: "8px", objectFit: "cover" }} />
                        <div>
                          <div style={{ fontSize: "12px", color: "#6b7280" }}>Anterior</div>
                          <div style={{ fontWeight: 700, color: "#374151" }}>{MOCK[prevId].titulo}</div>
                        </div>
                      </div>
                    </Link>
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
