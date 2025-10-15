import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { apiFetch } from "../../lib/api";
import TrilhaList from "../../components/TrilhaList.jsx";
import { useAuth } from "../../features/auth/AuthContext.jsx";

export default function Trilhas() {
  const { user, loading } = useAuth();
  const [data, setData] = useState([]);
  const [err, setErr] = useState("");
  const [apiLoading, setApiLoading] = useState(false);

  useEffect(() => {
    // Só executa se houver usuário autenticado
    if (!user) return;

    if (!import.meta.env.VITE_API_URL) {
      setErr("API não configurada. Verifique as variáveis de ambiente.");
      return;
    }
    
    setApiLoading(true);
    apiFetch("/trilhas")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(setData)
      .catch(e => setErr(e.message))
      .finally(() => setApiLoading(false));
  }, [user]);

  // Se ainda está carregando, aguarda
  if (loading) {
    return (
      <main className="features">
        <div className="container" style={{ textAlign: "center", padding: "40px" }}>
          <h2>Carregando...</h2>
          <p>Verificando autenticação...</p>
        </div>
      </main>
    );
  }

  // Se não há usuário, redireciona para login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="features">
      <div className="container" style={{ maxWidth: "1400px", margin: "0 auto", overflowX: "auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p className="kicker">Trilhas de Aprendizado</p>
          <h2 style={{ margin: "6px 0 18px", fontSize: "2.5rem" }}>Trilhas Disponíveis</h2>
          <p style={{ marginBottom: "32px", color: "#666", fontSize: "1.1rem", lineHeight: "1.6" }}>
            Escolha uma trilha para começar sua jornada de aprendizado
          </p>
        </div>

        <TrilhaList 
          trilhasAPI={data} 
          loading={apiLoading} 
          error={err} 
        />

        {/* Rodapé removido a pedido */}
      </div>
    </main>
  );
}
