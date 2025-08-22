import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export default function Trilhas() {
  const [data, setData] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    api("/trilhas")
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
