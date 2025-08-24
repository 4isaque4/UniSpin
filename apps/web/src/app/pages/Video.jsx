import { useParams, Link } from "react-router-dom";
import { getVideoById } from "../../data/playlist.js";

export default function Video() {
  const { id } = useParams();
  const video = getVideoById(id);

  if (!video) {
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
        <h2 style={{ margin: "6px 0 18px" }}>{video.title}</h2>

        <div className="card">
          <div style={{ position: "relative", paddingTop: "56.25%" }}>
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, borderRadius: 12 }}
            />
          </div>
        </div>

        <div style={{ marginTop: "24px" }}>
          <h3>Descrição</h3>
          <p>{video.description}</p>
          
          {video.context && (
            <>
              <h3>Contexto</h3>
              <p>{video.context}</p>
            </>
          )}
          
          {video.learningObjectives && (
            <>
              <h3>O que você vai aprender</h3>
              <ul>
                {video.learningObjectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </>
          )}
          
          <h3>Pré-requisitos</h3>
          <p>{video.prerequisites}</p>
          
          <h3>Resultado esperado</h3>
          <p>{video.expectedOutcome}</p>
        </div>

        <Link to="/videos" className="btn secondary" style={{ marginTop: 16 }}>Ver todos</Link>
      </div>
    </main>
  );
}
