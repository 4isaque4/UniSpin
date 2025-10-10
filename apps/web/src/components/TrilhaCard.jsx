import { Link } from "react-router-dom";
import { calcularProgressoTrilha, getVideosCompletados } from "../data/trilhas.js";

export default function TrilhaCard({ trilha }) {
  const progresso = calcularProgressoTrilha(trilha.id);
  const videosCompletados = getVideosCompletados(trilha.id);

  return (
    <div className="card" style={{ 
      background: "white",
      border: "1px solid rgba(0, 0, 0, 0.08)",
      borderRadius: "12px",
      padding: "24px",
      textAlign: "center",
      maxWidth: "400px",
      margin: "0 auto",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)"
    }}>
      {/* Cabeçalho com categoria */}
      <div style={{ 
        marginBottom: "16px" 
      }}>
        <span style={{ 
          fontSize: "12px", 
          fontWeight: "600", 
          color: "#6b7280",
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
        color: "#374151"
      }}>
        {trilha.titulo}
      </h3>

      {/* Descrição */}
      <p style={{ 
        margin: "0 0 16px 0", 
        color: "#6b7280", 
        lineHeight: "1.5",
        fontSize: "14px",
        fontWeight: "400"
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
        <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "#6b7280", fontWeight: "500" }}>
          <span>{trilha.quantidadeVideos} vídeos</span>
          <span>{trilha.duracaoTotal}</span>
        </div>
        <span style={{ 
          padding: "4px 8px", 
          backgroundColor: "var(--color-primary)", 
          color: "#fff", 
          borderRadius: "8px",
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
          <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: "500" }}>
            Progresso: {videosCompletados.length}/{trilha.quantidadeVideos} vídeos
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
          transition: "all 0.2s ease"
        }}
      >
        {progresso === 100 ? "Trilha Concluída!" : "Começar Trilha"}
      </Link>
    </div>
  );
}
