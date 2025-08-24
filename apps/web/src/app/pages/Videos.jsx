import { Link } from "react-router-dom";
import VideoCard from "../../features/videos/VideoCard.jsx";

const MOCK_VIDEOS = [
  { 
    id: "intro-react", 
    titulo: "Certificação 1 - Apresentação SPIN", 
    duracao: "5:30",
    descricao: "Primeiro vídeo da série do treinamento para certificação em Action.NET"
  },
  { 
    id: "hooks-usestate", 
    titulo: "useState na prática", 
    duracao: "9:31",
    descricao: "Aprendendo a usar o hook useState do React"
  },
  { 
    id: "roteamento", 
    titulo: "Roteamento com React Router", 
    duracao: "11:05",
    descricao: "Como implementar roteamento em aplicações React"
  },
];

export default function Videos() {
  return (
    <main className="features">
      <div className="container">
        <p className="kicker">Vídeos</p>
        <h2 style={{ margin: "6px 0 18px" }}>Catálogo de Treinamentos</h2>
        <p style={{ marginBottom: "32px", color: "#666", textAlign: "center" }}>
          Acesse os treinamentos e vídeos institucionais da UniSpin
        </p>

        <div className="grid">
          {MOCK_VIDEOS.map(v => (
            <Link key={v.id} to={`/videos/${v.id}`} style={{ textDecoration: "none" }}>
              <VideoCard video={v} />
            </Link>
          ))}
        </div>

        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <p style={{ color: "#666", marginBottom: "16px" }}>
            Mais vídeos serão adicionados conforme necessário
          </p>
          <Link to="/" className="btn secondary">
            Voltar ao início
          </Link>
        </div>
      </div>
    </main>
  );
}
