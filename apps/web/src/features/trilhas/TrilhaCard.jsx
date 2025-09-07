export default function TrilhaCard({ trilha }) {
    return (
      <article className="card" style={{ 
        background: "white", 
        border: "1px solid rgba(0, 0, 0, 0.08)", 
        borderRadius: "12px",
        padding: "24px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)"
      }}>
        <h3 style={{ marginTop: 0, color: "#374151", fontSize: "1.25rem", fontWeight: "700" }}>{trilha.titulo}</h3>
        <p style={{ marginBottom: 16, color: "#6b7280", fontSize: "14px" }}>
          {trilha.aulas} aulas • {trilha.nivel}
        </p>
        <button className="btn" style={{
          backgroundColor: "var(--color-primary)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "10px 16px",
          fontSize: "14px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "all 0.2s ease"
        }}>Ver conteúdo</button>
      </article>
    );
  }
  