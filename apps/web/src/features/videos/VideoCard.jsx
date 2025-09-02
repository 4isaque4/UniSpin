import { Link } from "react-router-dom";
import { marcarVideoCompleto, marcarVideoIncompleto, isVideoCompleto } from "../../data/trilhas.js";
import { useState } from "react";
import "../../styles/VideoCard.css";

export default function VideoCard({ video, showContext = false }) {
  const [isCompleto, setIsCompleto] = useState(() => isVideoCompleto("action-net-certificacao", video.id));
  const [isUpdating, setIsUpdating] = useState(false);
  const [imageError, setImageError] = useState(false);

  const toggleCompleto = async () => {
    setIsUpdating(true);
    
    try {
      if (isCompleto) {
        marcarVideoIncompleto("action-net-certificacao", video.id);
        setIsCompleto(false);
      } else {
        marcarVideoCompleto("action-net-certificacao", video.id);
        setIsCompleto(true);
      }
      
      // Força re-render da página para atualizar o progresso
      setTimeout(() => window.location.reload(), 300);
    } catch (error) {
      console.error("Erro ao atualizar progresso:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="video-card">
      <Link to={`/videos/${video.id}`} style={{ textDecoration: "none" }}>
        <div className="video-thumbnail-container">
          {!imageError ? (
            <img 
              src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
              alt={video.titulo}
              className="video-thumbnail"
              onError={handleImageError}
            />
          ) : (
            <div 
              className="video-thumbnail"
              style={{
                backgroundColor: "#3B82F6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "24px",
                fontWeight: "bold"
              }}
            >
              ▶
            </div>
          )}
          <span className="video-duration">{video.duracao}</span>
          
          {/* Indicador de conclusão */}
          {isCompleto && (
            <div style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              backgroundColor: "#3B82F6",
              color: "white",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "bold",
              boxShadow: "0 2px 8px rgba(59, 130, 246, 0.4)"
            }}>
              ✓
            </div>
          )}
        </div>

        <div className="video-info">
          <h3 className="video-title">{video.titulo}</h3>
          {showContext && (
            <p className="video-context">
              Treinamento Action.NET - {video.titulo}
            </p>
          )}
          <p className="video-description">{video.descricao}</p>
        </div>
      </Link>
      
      {/* Botão de conclusão */}
      <div style={{ 
        padding: "0 16px 16px 16px"
      }}>
        <button
          onClick={toggleCompleto}
          disabled={isUpdating}
          style={{
            width: "100%",
            padding: "10px 16px",
            backgroundColor: isCompleto ? "#3B82F6" : "#10b981",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px"
          }}
          title={isCompleto ? "Marcar como não assistido" : "Marcar como assistido"}
        >
          {isUpdating ? "..." : (isCompleto ? "Vídeo Concluído" : "Marcar como Concluído")}
        </button>
      </div>
    </div>
  );
}
  