import { useParams, Link } from "react-router-dom";
import { marcarVideoCompleto, marcarVideoIncompleto, isVideoCompleto } from "../../data/trilhas.js";
import { useState, useEffect } from "react";
import { MOCK } from "../../data/videoData.js";

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
              {(video.pdf || video.udemy) && (
                <div style={{ marginBottom: "20px" }}>
                  <strong style={{ color: "#374151" }}>Material Complementar:</strong>
                  <div style={{ marginTop: "8px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    {video.pdf && (
                      <a 
                        href={video.pdf} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "10px 16px",
                          backgroundColor: "#3B82F6",
                          color: "white",
                          borderRadius: "8px",
                          fontSize: "14px",
                          fontWeight: "600",
                          textDecoration: "none",
                          border: "1px solid #3B82F6",
                          transition: "all 0.2s ease"
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = "#2563EB";
                          e.target.style.borderColor = "#2563EB";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = "#3B82F6";
                          e.target.style.borderColor = "#3B82F6";
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "4px" }}>
                          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                        </svg>
                        Baixar PDF
                      </a>
                    )}
                    {video.udemy && (
                      <a 
                        href={video.udemy} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "10px 16px",
                          backgroundColor: "#10B981",
                          color: "white",
                          borderRadius: "8px",
                          fontSize: "14px",
                          fontWeight: "600",
                          textDecoration: "none",
                          border: "1px solid #10B981",
                          transition: "all 0.2s ease"
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = "#059669";
                          e.target.style.borderColor = "#059669";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = "#10B981";
                          e.target.style.borderColor = "#10B981";
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "4px" }}>
                          <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z" />
                        </svg>
                        Curso Completo na Udemy
                      </a>
                    )}
                  </div>
                </div>
              )}
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