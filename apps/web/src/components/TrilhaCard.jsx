import { Link } from "react-router-dom";

export default function TrilhaCard({ trilha }) {
  return (
    <div className="card" style={{ 
      border: `2px solid ${trilha.cor}`,
      background: `linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(59, 130, 246, 0.1))`
    }}>
      {/* Cabeçalho com categoria */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
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
        Começar Trilha
      </Link>
    </div>
  );
}
