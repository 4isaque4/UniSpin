import { Link } from "react-router-dom";
import VideoCard from "../../features/videos/VideoCard.jsx";

const MOCK_VIDEOS = [
  { 
    id: "5x6pCc8xUDk", 
    titulo: "Certificação 1 - Apresentação SPIN", 
    duracao: "15:42",
    descricao: "Primeiro vídeo da série do treinamento para certificação em Action.NET."
  },
  { 
    id: "vRMNHAvUrvs", 
    titulo: "Certificação 2 - SCADA Action.NET", 
    duracao: "18:35",
    descricao: "Segundo vídeo da série de treinamento para certificação em Action.NET - Introdução ao software SCADA e apresentação do Action.NET. Para acessar o projeto demo: Usuário: super, Senha: s"
  },
  { 
    id: "RenjvRMXPHg", 
    titulo: "Certificação 3 - Draw", 
    duracao: "22:18",
    descricao: "Terceiro vídeo da série do treinamento para certificação em Action.NET - Draw: Desenhando telas. Layouts: 0:22, DisplaySettings: 2:49, DynamicsConfigurations: 4:36, Menu Vertical: 17:50, Menu Horizontal: 23:54, Montagem de um disjuntor: 26:49, Introdução aos templates: 35:21, Símbolos: 42:53, Variáveis de Referência: 48:04, Janela de comando: 52:55, Value As String: 1:07:57"
  },
  { 
    id: "kS-76E2vLss", 
    titulo: "Certificação 4 - Tags", 
    duracao: "19:47",
    descricao: "Quarto vídeo da série do treinamento para certificação em Action.NET - Tags e histórico."
  },
  { 
    id: "Yge9ayUUFoo", 
    titulo: "Certificação 5 - Security", 
    duracao: "16:53",
    descricao: "Quinto vídeo da série do treinamento para certificação em Action.NET - Security."
  },
  { 
    id: "tg35dYFJsH0", 
    titulo: "Certificação 6 - Devices", 
    duracao: "21:29",
    descricao: "Sexto vídeo da série do treinamento para certificação em Action.NET - Devices."
  },
  { 
    id: "Zrq8Gnmspaw", 
    titulo: "Certificação 7 - Alarms", 
    duracao: "17:44",
    descricao: "Sétimo vídeo da série do treinamento para certificação em Action.NET - Alarms."
  },
  { 
    id: "wYFWtV_Uv0c", 
    titulo: "Certificação 8 - Datasets", 
    duracao: "20:16",
    descricao: "Oitavo vídeo da série do treinamento para certificação em Action.NET - Datasets."
  },
  { 
    id: "gDgoMQ_-U0U", 
    titulo: "Certificação 9 - Scripts", 
    duracao: "18:52",
    descricao: "Nono vídeo da série do treinamento para certificação em Action.NET - Scripts."
  },
  { 
    id: "UwdINYOCHZ4", 
    titulo: "Certificação 10 - Run", 
    duracao: "19:38",
    descricao: "Décimo vídeo da série do treinamento para certificação em Action.NET - Run."
  },
  { 
    id: "-sSdhGooQzQ", 
    titulo: "Certificação 11 - LeanAutomation", 
    duracao: "16:25",
    descricao: "Décimo primeiro vídeo da série do treinamento para certificação em Action.NET - LeanAutomation."
  },
];

export default function Videos() {
  return (
    <main className="features">
      <div className="container">
        <p className="kicker">Vídeos</p>
        <h2 style={{ margin: "6px 0 18px" }}>Catálogo de Treinamentos</h2>
        <p style={{ marginBottom: "32px", color: "#666", textAlign: "center" }}>
          Série completa de treinamentos para certificação em Action.NET da UniSpin
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
            Série completa de 11 vídeos para certificação em Action.NET
          </p>
          <Link to="/" className="btn secondary">
            Voltar ao início
          </Link>
        </div>
      </div>
    </main>
  );
}
