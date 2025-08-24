import { useParams, Link } from "react-router-dom";

const MOCK = {
  "intro-react": { 
    titulo: "Certificação 1 - Apresentação SPIN", 
    embed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    descricao: "Primeiro vídeo da série do treinamento para certificação em Action.NET. Este vídeo apresenta os conceitos fundamentais e prepara você para os módulos avançados.",
    duracao: "5:30"
  },
  "hooks-usestate": { 
    titulo: "useState na prática", 
    embed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    descricao: "Aprendendo a usar o hook useState do React de forma prática e eficiente.",
    duracao: "9:31"
  },
  "roteamento": { 
    titulo: "Roteamento com React Router", 
    embed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    descricao: "Como implementar roteamento em aplicações React de forma profissional.",
    duracao: "11:05"
  },
};

export default function Video() {
  const { id } = useParams();
  const data = MOCK[id];

  if (!data) {
    return (
      <main className="features">
        <div className="container">
          <h2>Vídeo não encontrado</h2>
          <p style={{ marginBottom: "20px", color: "#666" }}>
            O vídeo solicitado não foi encontrado em nossa base de dados.
          </p>
          <Link to="/videos" className="btn" style={{ marginTop: 12 }}>Voltar aos vídeos</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="features">
      <div className="container">
        <p className="kicker">Treinamento</p>
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

        <div style={{ marginTop: "24px" }}>
          <div style={{ display: "flex", gap: "16px", marginBottom: "20px", alignItems: "center" }}>
            <span style={{ color: "#666", fontSize: "14px" }}>Duração: {data.duracao}</span>
            <span style={{ color: "#666", fontSize: "14px" }}>•</span>
            <span style={{ color: "#666", fontSize: "14px" }}>Treinamento UniSpin</span>
          </div>
          
          <h3 style={{ marginBottom: "12px" }}>Descrição</h3>
          <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "20px" }}>
            {data.descricao}
          </p>
        </div>

        <div style={{ marginTop: "32px", display: "flex", gap: "16px" }}>
          <Link to="/videos" className="btn secondary">Ver todos os vídeos</Link>
          <Link to="/" className="btn">Voltar ao início</Link>
        </div>
      </div>
    </main>
  );
}
