export default function TrilhaCard({ trilha }) {
    return (
      <article className="card">
        <h3 style={{ marginTop: 0 }}>{trilha.titulo}</h3>
        <p style={{ marginBottom: 8, color: "#c9d3ff" }}>
          {trilha.aulas} aulas • {trilha.nivel}
        </p>
        <button className="btn">Ver conteúdo</button>
      </article>
    );
  }
  