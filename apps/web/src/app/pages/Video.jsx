import { useParams, Link } from "react-router-dom";


const MOCK = {
  "intro-react": { titulo: "Certificação 1 - Apresentação SPIN", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  "hooks-usestate": { titulo: "useState na prática", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  "roteamento": { titulo: "Roteamento com React Router", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
};

export default function Video() {
  const { id } = useParams();
  const data = MOCK[id];

  if (!data) {
    return (
      <main className="features">
        <div className="container">
          <h2>Vídeo não encontrado</h2>
          <Link to="/videos" className="btn" style={{ marginTop: 12 }}>Voltar</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="features">
      <div className="container">
        <p className="kicker">Vídeo</p>
        <h2 style={{ margin: "6px 0 18px" }}>{data.titulo}</h2>

        <div className="card">
          <div style={{ position: "relative", paddingTop: "56.25%" }}>
            <iframe
              src={data.embed}
              title={data.titulo}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, borderRadius: 12 }}
            />
          </div>
        </div>

        <Link to="/videos" className="btn secondary" style={{ marginTop: 16 }}>Ver todos</Link>
      </div>
    </main>
  );
}
