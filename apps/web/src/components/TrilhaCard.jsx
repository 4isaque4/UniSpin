import { Link } from "react-router-dom";
import { calcularProgressoTrilha, getVideosCompletados } from "../data/trilhas.js";

export default function TrilhaCard({ trilha }) {
  const progresso = calcularProgressoTrilha(trilha.id);
  const videosCompletados = getVideosCompletados(trilha.id);

  return (
    <div className="card" style={{ 
      border: `2px solid ${trilha.cor}`,
      background: `linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(59, 130, 246, 0.1))`,
      textAlign: "center",
      maxWidth: "400px",
      margin: "0 auto"
    }}>
      {/* Cabeçalho com categoria */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        gap: "12px", 
        marginBottom: "16px" 
      }}>
        <div style={{ 
          width: "12px", 
          height: "12px", 
          borderRadius: "50%", 
          backgroundColor: trilha.cor 
        }}></div>
        <span style={{ 
          fontSize: "12px", 
          fontWeight: "600", 
          color: trilha.cor,
          textTransform: "uppercase",
          letterSpacing: "0.5px"
        }}>
          {trilha.categoria}
        </span>
      </div>

      {/* Título da trilha */}
      <h3 style={{ 
        margin: "0 0 8px 0", 
        fontSize: "20px", 
        fontWeight: "700",
        color: "#fff"
      }}>
        {trilha.icone} {trilha.titulo}
      </h3>

      {/* Descrição */}
      <p style={{ 
        margin: "0 0 16px 0", 
        color: "#c7d2fe", 
        lineHeight: "1.5",
        fontSize: "14px"
      }}>
        {trilha.descricao}
      </p>

      {/* Informações da trilha */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "20px"
      }}>
        <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "#aab4ff" }}>
          <span>📹 {trilha.quantidadeVideos} vídeos</span>
          <span>⏱️ {trilha.duracaoTotal}</span>
        </div>
        <span style={{ 
          padding: "4px 8px", 
          backgroundColor: trilha.cor, 
          color: "#fff", 
          borderRadius: "12px",
          fontSize: "11px",
          fontWeight: "600"
        }}>
          {trilha.nivel}
        </span>
      </div>

      {/* Barra de Progresso */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          marginBottom: "8px"
        }}>
          <span style={{ fontSize: "12px", color: "#aab4ff" }}>
            Progresso: {videosCompletados.length}/{trilha.quantidadeVideos} vídeos
          </span>
          <span style={{ fontSize: "12px", color: "#aab4ff", fontWeight: "600" }}>
            {progresso}%
          </span>
        </div>
        
        {/* Barra de progresso */}
        <div style={{
          width: "100%",
          height: "8px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "4px",
          overflow: "hidden"
        }}>
          <div style={{
            width: `${progresso}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${trilha.cor}, #60a5fa)`,
            borderRadius: "4px",
            transition: "width 0.3s ease",
            boxShadow: `0 0 10px ${trilha.cor}40`
          }}></div>
        </div>
      </div>

      {/* Botão de ação */}
      <Link 
        to={trilha.rota} 
        className="btn" 
        style={{ 
          width: "100%", 
          textAlign: "center",
          backgroundColor: trilha.cor,
          border: "none"
        }}
      >
        {progresso === 100 ? "🎉 Trilha Concluída!" : "Começar Trilha"}
      </Link>
    </div>
  );
}
