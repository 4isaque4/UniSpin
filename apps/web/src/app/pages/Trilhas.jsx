import TrilhaCard from "../../features/trilhas/TrilhaCard.jsx";

const MOCK_TRILHAS = [
  { id: "react-basico", titulo: "React Básico", aulas: 18, nivel: "Iniciante" },
  { id: "js-moderno",   titulo: "JavaScript Moderno", aulas: 22, nivel: "Iniciante" },
  { id: "fullstack",    titulo: "Fullstack Web", aulas: 36, nivel: "Intermediário" },
];

export default function Trilhas() {
  return (
    <main className="features">
      <div className="container">
        <p className="kicker">Trilhas</p>
        <h2 style={{ margin: "6px 0 18px" }}>Aprenda no seu ritmo</h2>

        <div className="grid">
          {MOCK_TRILHAS.map(t => (
            <TrilhaCard key={t.id} trilha={t} />
          ))}
        </div>
      </div>
    </main>
  );
}
