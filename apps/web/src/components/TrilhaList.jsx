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
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: "24px",
        flexWrap: "nowrap",
        padding: "20px 40px",
        minHeight: "420px",
        overflowX: "auto",
        maxWidth: "none",
        width: "100%"
      }}>
      {/* Trilhas locais (hardcoded) */}
      {TRILHAS.map(trilha => (
        <TrilhaCard key={trilha.id} trilha={trilha} />
      ))}

      {/* Trilhas da API são filtradas - só exibimos se tiverem estrutura completa */}
      {trilhasAPI.filter(trilha => 
        trilha.quantidadeVideos && 
        trilha.quantidadeVideos > 0 && 
        trilha.videos && 
        trilha.videos.length > 0
      ).map(trilha => (
        <TrilhaCard key={trilha.id} trilha={trilha} />
      ))}
    </div>
  );
}