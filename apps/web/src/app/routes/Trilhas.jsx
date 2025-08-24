import { useEffect, useState } from "react";
import { apiFetch } from "../../lib/api";

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
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Carregando trilhas...</h2>
      <p>Por favor, aguarde...</p>
    </div>
  );

  if (err) return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Erro ao carregar trilhas</h2>
      <p style={{ color: '#ff6b6b', marginBottom: '20px' }}>Erro: {err}</p>
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
