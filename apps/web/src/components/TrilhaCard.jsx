import { Link } from "react-router-dom";

export default function TrilhaCard({ trilha }) {
  return (
    <div className="card" style={{ 
      background: "white",
      border: "1px solid rgba(0, 0, 0, 0.08)",
      borderRadius: "12px",
      padding: "24px",
      textAlign: "center",
      width: "280px",
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
        margin: "0 0 20px 0", 
        fontSize: "20px", 
        fontWeight: "700",
        color: "#374151"
      }}>
        {trilha.titulo}
      </h3>

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
        Começar Trilha
      </Link>
    </div>
  );
}
