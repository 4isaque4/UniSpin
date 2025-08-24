import { Link } from "react-router-dom";
import VideoCard from "../../features/videos/VideoCard.jsx";

const MOCK_VIDEOS = [
  { id: "intro-react", titulo: "Introdução ao React", duracao: "12:45" },
  { id: "hooks-usestate", titulo: "useState na prática", duracao: "09:31" },
  { id: "roteamento", titulo: "Roteamento com React Router", duracao: "11:05" },
];

export default function Videos() {
  return (
    <main className="features">
      <div className="container">
        <p className="kicker">Vídeos</p>
        <h2 style={{ margin: "6px 0 18px" }}>Catálogo de aulas</h2>

        <div className="grid">
          {MOCK_VIDEOS.map(v => (
            <Link key={v.id} to={`/videos/${v.id}`} style={{ textDecoration: "none" }}>
              <VideoCard video={v} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
