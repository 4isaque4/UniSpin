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

  return (
    <main className="features">
      <div className="container">
        <p className="kicker">Trilhas de Aprendizado</p>
        <h2 style={{ margin: "6px 0 18px" }}>Trilhas Disponíveis</h2>
        <p style={{ marginBottom: "32px", color: "#666", textAlign: "center" }}>
          Escolha uma trilha para começar sua jornada de aprendizado
        </p>

        <TrilhaList 
          trilhasAPI={data} 
          loading={loading} 
          error={err} 
        />

        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <p style={{ color: "#666", marginBottom: "16px" }}>
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
