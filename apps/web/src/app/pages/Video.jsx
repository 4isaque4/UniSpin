import { useParams, Link } from "react-router-dom";

const MOCK = {
  "5x6pCc8xUDk": { 
    titulo: "Vídeo 1 - Treinamento UniSpin", 
    embed: "https://www.youtube.com/embed/5x6pCc8xUDk",
    descricao: "Primeiro vídeo da série de treinamentos UniSpin. Este vídeo apresenta os conceitos fundamentais e prepara você para os módulos avançados.",
    duracao: "00:00"
  },
  "vRMNHAvUrvs": { 
    titulo: "Vídeo 2 - Treinamento UniSpin", 
    embed: "https://www.youtube.com/embed/vRMNHAvUrvs",
    descricao: "Segundo vídeo da série de treinamentos UniSpin. Continuação dos conceitos fundamentais.",
    duracao: "00:00"
  },
  "RenjvRMXPHg": { 
    titulo: "Vídeo 3 - Treinamento UniSpin", 
    embed: "https://www.youtube.com/embed/RenjvRMXPHg",
    descricao: "Terceiro vídeo da série de treinamentos UniSpin. Aprofundamento nos conceitos.",
    duracao: "00:00"
  },
  "kS-76E2vLss": { 
    titulo: "Vídeo 4 - Treinamento UniSpin", 
    embed: "https://www.youtube.com/embed/kS-76E2vLss",
    descricao: "Quarto vídeo da série de treinamentos UniSpin. Aplicação prática dos conceitos.",
    duracao: "00:00"
  },
  "Yge9ayUUFoo": { 
    titulo: "Vídeo 5 - Treinamento UniSpin", 
    embed: "https://www.youtube.com/embed/Yge9ayUUFoo",
    descricao: "Quinto vídeo da série de treinamentos UniSpin. Exercícios práticos.",
    duracao: "00:00"
  },
  "tg35dYFJsH0": { 
    titulo: "Vídeo 6 - Treinamento UniSpin", 
    embed: "https://www.youtube.com/embed/tg35dYFJsH0",
    descricao: "Sexto vídeo da série de treinamentos UniSpin. Casos de uso reais.",
    duracao: "00:00"
  },
  "Zrq8Gnmspaw": { 
    titulo: "Vídeo 7 - Treinamento UniSpin", 
    embed: "https://www.youtube.com/embed/Zrq8Gnmspaw",
    descricao: "Sétimo vídeo da série de treinamentos UniSpin. Melhores práticas.",
    duracao: "00:00"
  },
  "wYFWtV_Uv0c": { 
    titulo: "Vídeo 8 - Treinamento UniSpin", 
    embed: "https://www.youtube.com/embed/wYFWtV_Uv0c",
    descricao: "Oitavo vídeo da série de treinamentos UniSpin. Otimizações e performance.",
    duracao: "00:00"
  },
  "gDgoMQ_-U0U": { 
    titulo: "Vídeo 9 - Treinamento UniSpin", 
    embed: "https://www.youtube.com/embed/gDgoMQ_-U0U",
    descricao: "Nono vídeo da série de treinamentos UniSpin. Debugging e troubleshooting.",
    duracao: "00:00"
  },
  "UwdINYOCHZ4": { 
    titulo: "Vídeo 10 - Treinamento UniSpin", 
    embed: "https://www.youtube.com/embed/UwdINYOCHZ4",
    descricao: "Décimo vídeo da série de treinamentos UniSpin. Deploy e produção.",
    duracao: "00:00"
  },
  "-sSdhGooQzQ": { 
    titulo: "Vídeo 11 - Treinamento UniSpin", 
    embed: "https://www.youtube.com/embed/-sSdhGooQzQ",
    descricao: "Décimo primeiro vídeo da série de treinamentos UniSpin. Conclusão e próximos passos.",
    duracao: "00:00"
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
