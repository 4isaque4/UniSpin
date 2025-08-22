import { useEffect, useState } from "react";
import { apiFetch } from "../../lib/api";

export default function Trilhas() {
  const [data, setData] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!import.meta.env.VITE_API_URL) {
      setErr("API não configurada. Verifique as variáveis de ambiente.");
      return;
    }
    
    apiFetch("/trilhas")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(setData)
      .catch(e => setErr(e.message));
  }, []);

  if (err) return <p>Erro: {err}</p>;
  return (
    <div>
      <h1>Trilhas</h1>
      <ul>
        {data.map(t => (
          <li key={t.id}>
            <strong>{t.name}</strong> — {t.description || "sem descrição"}
          </li>
        ))}
      </ul>
    </div>
  );
}
