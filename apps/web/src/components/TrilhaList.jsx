import TrilhaCard from "./TrilhaCard.jsx";
import { TRILHAS } from "../data/trilhas.js";
import { useAuth } from "../features/auth/AuthContext.jsx";

export default function TrilhaList({ trilhasAPI = [], loading = false, error = null }) {
  const { user } = useAuth();
  
  // Se o usuário não estiver logado, não mostra as trilhas
  if (!user) {
    return (
      <div style={{ 
        padding: '40px 20px', 
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 197, 253, 0.05))',
        borderRadius: '20px',
        border: '2px solid rgba(59, 130, 246, 0.3)',
        margin: '20px'
      }}>
        <h2 style={{ color: '#1F2937', marginBottom: '16px' }}>
          Conteúdo Restrito
        </h2>
        <p style={{ color: '#6B7280', marginBottom: '24px', fontSize: '16px' }}>
          Faça login para acessar as trilhas de aprendizado
        </p>
        <a 
          href="/login" 
          className="btn" 
          style={{ 
            backgroundColor: '#6B7280',
            textDecoration: 'none',
            display: 'inline-block'
          }}
        >
          Fazer Login
        </a>
      </div>
    );
  }
  
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
    <div 
      className="trilhas-container"
      style={{ 
        display: "flex", 
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "24px",
        flexWrap: "nowrap",
        padding: "20px",
        minHeight: "420px",
        overflowX: "auto",
        maxWidth: "none",
        width: "100%"
      }}>
      {/* Trilhas locais (hardcoded) */}
      {TRILHAS.map(trilha => (
        <TrilhaCard key={trilha.id} trilha={trilha} />
      ))}

      {/* Trilhas da API (se existirem) */}
      {trilhasAPI.map(trilha => (
        <div key={trilha.id} className="card" style={{ 
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
          <h3 style={{ margin: "4px 0 4px 0", fontSize: "1.05rem" }}>
            {trilha.name}
          </h3>
          <p style={{ margin: "0", color: "#6b7280" }}>
            {trilha.description || "Sem descrição"}
          </p>
        </div>
      ))}
    </div>
  );
}