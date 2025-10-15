import { Link } from "react-router-dom";
import { calcularProgressoTrilha, getVideosCompletados } from "../data/trilhas.js";
import { useAuth } from "../features/auth/AuthContext.jsx";

export default function TrilhaCard({ trilha }) {
  const { user } = useAuth();
  
  // Para trilhas locais, usa as funções existentes
  // Para trilhas da API, calcula progresso baseado na estrutura da trilha
  let progresso, videosCompletados;
  const userId = user?.id || null;
  
  if (trilha.videos && trilha.videos.length > 0) {
    // Trilha com estrutura de vídeos (API ou local)
    const progressoLocal = getVideosCompletados(trilha.id, userId);
    videosCompletados = progressoLocal;
    const totalVideos = trilha.quantidadeVideos || trilha.videos.length;
    progresso = Math.round((progressoLocal.length / totalVideos) * 100);
  } else {
    // Fallback para trilhas locais sem estrutura completa
    progresso = calcularProgressoTrilha(trilha.id, userId);
    videosCompletados = getVideosCompletados(trilha.id, userId);
  }

  return (
    <div className="card" style={{ 
      background: "white",
      border: "1px solid rgba(0, 0, 0, 0.08)",
      borderRadius: "12px",
      padding: "24px",
      textAlign: "center",
      width: "350px",
      minWidth: "350px",
      maxWidth: "350px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
      display: "flex",
      flexDirection: "column",
      height: "400px",
      minHeight: "400px",
      maxHeight: "400px",
      flexShrink: 0,
      margin: "0"
    }}>
      {/* Título da trilha */}
      <h3 style={{ 
        margin: "0 0 16px 0", 
        fontSize: "20px", 
        fontWeight: "700",
        color: "#374151",
        lineHeight: "1.3"
      }}>
        {trilha.titulo || trilha.name}
      </h3>

      {/* Descrição */}
      <p style={{ 
        margin: "0 0 20px 0", 
        color: "#6b7280", 
        lineHeight: "1.5",
        fontSize: "14px",
        fontWeight: "400",
        flex: "1",
        overflow: "hidden",
        display: "-webkit-box",
        WebkitLineClamp: "4",
        WebkitBoxOrient: "vertical"
      }}>
        {trilha.descricao || trilha.description || "Sem descrição"}
      </p>

      {/* Barra de Progresso */}
      <div style={{ marginBottom: "20px", marginTop: "auto" }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          marginBottom: "8px"
        }}>
          <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: "500" }}>
            Progresso: {videosCompletados.length}/{trilha.quantidadeVideos || (trilha.videos ? trilha.videos.length : 0)} vídeos
          </span>
          <span style={{ fontSize: "12px", color: "#374151", fontWeight: "600" }}>
            {progresso}%
          </span>
        </div>
        
        {/* Barra de progresso */}
        <div style={{
          width: "100%",
          height: "6px",
          backgroundColor: "rgba(0, 0, 0, 0.08)",
          borderRadius: "3px",
          overflow: "hidden"
        }}>
          <div style={{
            width: `${progresso}%`,
            height: "100%",
            background: "var(--color-primary)",
            borderRadius: "3px",
            transition: "width 0.3s ease"
          }}></div>
        </div>
      </div>

      {/* Botão de ação */}
      <Link 
        to={`${trilha.rota}?trilha=${trilha.id}`} 
        className="btn" 
        style={{ 
          width: "100%", 
          textAlign: "center",
          backgroundColor: "var(--color-primary)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "12px 16px",
          fontSize: "14px",
          fontWeight: "600",
          textDecoration: "none",
          display: "inline-block",
          transition: "all 0.2s ease",
          marginTop: "auto"
        }}
      >
        {progresso === 100 ? "Trilha Concluída!" : "Começar Trilha"}
      </Link>
    </div>
  );
}