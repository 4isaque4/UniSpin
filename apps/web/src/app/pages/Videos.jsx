import { Link } from "react-router-dom";
import VideoCard from "../../features/videos/VideoCard.jsx";

const MOCK_VIDEOS = [
  { 
    id: "5x6pCc8xUDk", 
    titulo: "Vídeo 1 - Treinamento UniSpin", 
    duracao: "00:00",
    descricao: "Primeiro vídeo da série de treinamentos UniSpin"
  },
  { 
    id: "vRMNHAvUrvs", 
    titulo: "Vídeo 2 - Treinamento UniSpin", 
    duracao: "00:00",
    descricao: "Segundo vídeo da série de treinamentos UniSpin"
  },
  { 
    id: "RenjvRMXPHg", 
    titulo: "Vídeo 3 - Treinamento UniSpin", 
    duracao: "00:00",
    descricao: "Terceiro vídeo da série de treinamentos UniSpin"
  },
  { 
    id: "kS-76E2vLss", 
    titulo: "Vídeo 4 - Treinamento UniSpin", 
    duracao: "00:00",
    descricao: "Quarto vídeo da série de treinamentos UniSpin"
  },
  { 
    id: "Yge9ayUUFoo", 
    titulo: "Vídeo 5 - Treinamento UniSpin", 
    duracao: "00:00",
    descricao: "Quinto vídeo da série de treinamentos UniSpin"
  },
  { 
    id: "tg35dYFJsH0", 
    titulo: "Vídeo 6 - Treinamento UniSpin", 
    duracao: "00:00",
    descricao: "Sexto vídeo da série de treinamentos UniSpin"
  },
  { 
    id: "Zrq8Gnmspaw", 
    titulo: "Vídeo 7 - Treinamento UniSpin", 
    duracao: "00:00",
    descricao: "Sétimo vídeo da série de treinamentos UniSpin"
  },
  { 
    id: "wYFWtV_Uv0c", 
    titulo: "Vídeo 8 - Treinamento UniSpin", 
    duracao: "00:00",
    descricao: "Oitavo vídeo da série de treinamentos UniSpin"
  },
  { 
    id: "gDgoMQ_-U0U", 
    titulo: "Vídeo 9 - Treinamento UniSpin", 
    duracao: "00:00",
    descricao: "Nono vídeo da série de treinamentos UniSpin"
  },
  { 
    id: "UwdINYOCHZ4", 
    titulo: "Vídeo 10 - Treinamento UniSpin", 
    duracao: "00:00",
    descricao: "Décimo vídeo da série de treinamentos UniSpin"
  },
  { 
    id: "-sSdhGooQzQ", 
    titulo: "Vídeo 11 - Treinamento UniSpin", 
    duracao: "00:00",
    descricao: "Décimo primeiro vídeo da série de treinamentos UniSpin"
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
            Série completa de 11 vídeos de treinamento UniSpin
          </p>
          <Link to="/" className="btn secondary">
            Voltar ao início
          </Link>
        </div>
      </div>
    </main>
  );
}
