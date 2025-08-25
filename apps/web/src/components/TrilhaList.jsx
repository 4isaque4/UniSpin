import TrilhaCard from "./TrilhaCard.jsx";
import { TRILHAS } from "../data/trilhas.js";

export default function TrilhaList({ trilhasAPI = [], loading = false, error = null }) {
  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Carregando trilhas...</h2>
        <p>Por favor, aguarde...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Erro ao carregar trilhas</h2>
        <p style={{ color: '#ff6b6b', marginBottom: '20px' }}>Erro: {error}</p>
        <div style={{ fontSize: '14px', opacity: 0.8 }}>
          <p>Possíveis causas:</p>
          <ul style={{ textAlign: 'left', display: 'inline-block' }}>
            <li>API não configurada (verifique VITE_API_URL)</li>
            <li>Servidor backend não está rodando</li>
            <li>Problema de conectividade</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center",
      gap: "24px"
    }}>
      {/* Trilhas locais (hardcoded) */}
      {TRILHAS.map(trilha => (
        <TrilhaCard key={trilha.id} trilha={trilha} />
      ))}

      {/* Trilhas da API (se existirem) */}
      {trilhasAPI.map(trilha => (
        <div key={trilha.id} className="card" style={{ 
          maxWidth: "400px", 
          width: "100%",
          textAlign: "center"
        }}>
          <h3 style={{ margin: "4px 0 4px 0", fontSize: "1.05rem" }}>
            {trilha.name}
          </h3>
          <p style={{ margin: "0", color: "#c9d3ff" }}>
            {trilha.description || "Sem descrição"}
          </p>
        </div>
      ))}
    </div>
  );
}
