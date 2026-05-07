import { useEffect, useState } from "react";
import { apiFetch } from "../../lib/api";
import TrilhaList from "../../components/TrilhaList.jsx";

export default function Trilhas() {
  const [data, setData] = useState([]);
  const [apiLoading, setApiLoading] = useState(false);

  useEffect(() => {
    if (!import.meta.env.VITE_API_URL) return;

    setApiLoading(true);
    apiFetch("/trilhas")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(setData)
      .catch(() => setData([]))
      .finally(() => setApiLoading(false));
  }, []);

  return (
    <main className="features">
      <div style={{ maxWidth: "1400px", margin: "0 auto", overflowX: "auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p className="kicker">Trilhas de Aprendizado</p>
          <h2 style={{ margin: "6px 0 18px", fontSize: "2.5rem" }}>Trilhas Disponíveis</h2>
          <p style={{ marginBottom: "32px", color: "#666", fontSize: "1.1rem", lineHeight: "1.6" }}>
            Escolha uma trilha para começar sua jornada de aprendizado
          </p>
        </div>

        <TrilhaList trilhasAPI={data} loading={apiLoading} />
      </div>
    </main>
  );
}
