import TrilhaCard from "./TrilhaCard.jsx";
import { TRILHAS } from "../data/trilhas.js";

export default function TrilhaList({ trilhasAPI = [], loading = false }) {
  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Carregando trilhas...</h2>
        <p>Por favor, aguarde...</p>
      </div>
    );
  }

  return (
    <div
      className="trilhas-container"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: "24px",
        flexWrap: "nowrap",
        padding: "20px 40px",
        minHeight: "420px",
        overflowX: "auto",
        maxWidth: "none",
        width: "100%",
      }}
    >
      {TRILHAS.map((trilha) => (
        <TrilhaCard key={trilha.id} trilha={trilha} />
      ))}

      {trilhasAPI
        .filter((trilha) => trilha.quantidadeVideos && trilha.quantidadeVideos > 0 && trilha.videos && trilha.videos.length > 0)
        .map((trilha) => (
          <TrilhaCard key={trilha.id} trilha={trilha} />
        ))}
    </div>
  );
}
