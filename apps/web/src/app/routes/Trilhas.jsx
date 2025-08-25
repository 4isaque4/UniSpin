import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../../lib/api";
import TrilhaList from "../../components/TrilhaList.jsx";

export default function Trilhas() {
  const [data, setData] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!import.meta.env.VITE_API_URL) {
      setErr("API não configurada. Verifique as variáveis de ambiente.");
      setLoading(false);
      return;
    }
    
    setLoading(true);
    apiFetch("/trilhas")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(setData)
      .catch(e => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <main className="features">
      <div className="container">
        <TrilhaList loading={loading} />
      </div>
    </main>
  );

  if (err) return (
    <main className="features">
      <div className="container">
        <TrilhaList error={err} />
      </div>
    </main>
  );

  return (
    <main className="features">
      <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p className="kicker">Trilhas de Aprendizado</p>
          <h2 style={{ margin: "6px 0 18px", fontSize: "2.5rem" }}>Trilhas Disponíveis</h2>
          <p style={{ marginBottom: "32px", color: "#666", fontSize: "1.1rem", lineHeight: "1.6" }}>
            Escolha uma trilha para começar sua jornada de aprendizado
          </p>
        </div>

        <TrilhaList 
          trilhasAPI={data} 
          loading={loading} 
          error={err} 
        />

        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <p style={{ color: "#666", marginBottom: "16px", fontSize: "1rem" }}>
            Trilhas personalizadas para seu desenvolvimento profissional
          </p>
          <Link to="/" className="btn secondary">
            Voltar ao início
          </Link>
        </div>
      </div>
    </main>
  );
}
