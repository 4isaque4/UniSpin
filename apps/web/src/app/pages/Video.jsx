import { useParams, Link } from "react-router-dom";

const MOCK = {
  "5x6pCc8xUDk": { 
    titulo: "Certificação 1 - Apresentação SPIN", 
    embed: "https://www.youtube.com/embed/5x6pCc8xUDk",
    descricao: "Primeiro vídeo da série do treinamento para certificação em Action.NET. Este vídeo apresenta a empresa SPIN e introduz o programa de certificação em Action.NET.",
    duracao: "15:42"
  },
  "vRMNHAvUrvs": { 
    titulo: "Certificação 2 - SCADA Action.NET", 
    embed: "https://www.youtube.com/embed/vRMNHAvUrvs",
    descricao: "Segundo vídeo da série do treinamento para certificação em Action.NET - Introdução ao software SCADA e apresentação do Action.NET. Para acessar o projeto demo: Usuário: super, Senha: s",
    duracao: "18:35"
  },
  "RenjvRMXPHg": { 
    titulo: "Certificação 3 - Draw", 
    embed: "https://www.youtube.com/embed/RenjvRMXPHg",
    descricao: "Terceiro vídeo da série do treinamento para certificação em Action.NET - Draw: Desenhando telas. Layouts: 0:22, DisplaySettings: 2:49, DynamicsConfigurations: 4:36, Menu Vertical: 17:50, Menu Horizontal: 23:54, Montagem de um disjuntor: 26:49, Introdução aos templates: 35:21, Símbolos: 42:53, Variáveis de Referência: 48:04, Janela de comando: 52:55, Value As String: 1:07:57",
    duracao: "22:18"
  },
  "kS-76E2vLss": { 
    titulo: "Certificação 4 - Tags", 
    embed: "https://www.youtube.com/embed/kS-76E2vLss",
    descricao: "Quarto vídeo da série do treinamento para certificação em Action.NET - Tags e histórico. Aprenda a trabalhar com tags e gerenciar histórico de dados no Action.NET.",
    duracao: "19:47"
  },
  "Yge9ayUUFoo": { 
    titulo: "Certificação 5 - Security", 
    embed: "https://www.youtube.com/embed/Yge9ayUUFoo",
    descricao: "Quinto vídeo da série do treinamento para certificação em Action.NET - Security. Implementando segurança e controles de acesso no sistema Action.NET.",
    duracao: "16:53"
  },
  "tg35dYFJsH0": { 
    titulo: "Certificação 6 - Devices", 
    embed: "https://www.youtube.com/embed/tg35dYFJsH0",
    descricao: "Sexto vídeo da série do treinamento para certificação em Action.NET - Devices. Configuração e gerenciamento de dispositivos no sistema Action.NET.",
    duracao: "21:29"
  },
  "Zrq8Gnmspaw": { 
    titulo: "Certificação 7 - Alarms", 
    embed: "https://www.youtube.com/embed/Zrq8Gnmspaw",
    descricao: "Sétimo vídeo da série do treinamento para certificação em Action.NET - Alarms. Configuração e gerenciamento de alarmes no sistema Action.NET.",
    duracao: "17:44"
  },
  "wYFWtV_Uv0c": { 
    titulo: "Certificação 8 - Datasets", 
    embed: "https://www.youtube.com/embed/wYFWtV_Uv0c",
    descricao: "Oitavo vídeo da série do treinamento para certificação em Action.NET - Datasets. Trabalhando com conjuntos de dados e informações no Action.NET.",
    duracao: "20:16"
  },
  "gDgoMQ_-U0U": { 
    titulo: "Certificação 9 - Scripts", 
    embed: "https://www.youtube.com/embed/gDgoMQ_-U0U",
    descricao: "Nono vídeo da série do treinamento para certificação em Action.NET - Scripts. Desenvolvimento e execução de scripts para automação no Action.NET.",
    duracao: "18:52"
  },
  "UwdINYOCHZ4": { 
    titulo: "Certificação 10 - Run", 
    embed: "https://www.youtube.com/embed/UwdINYOCHZ4",
    descricao: "Décimo vídeo da série do treinamento para certificação em Action.NET - Run. Execução e monitoramento de aplicações no Action.NET.",
    duracao: "19:38"
  },
  "-sSdhGooQzQ": { 
    titulo: "Certificação 11 - LeanAutomation", 
    embed: "https://www.youtube.com/embed/-sSdhGooQzQ",
    descricao: "Décimo primeiro vídeo da série do treinamento para certificação em Action.NET - LeanAutomation. Conceitos de automação enxuta e otimização de processos.",
    duracao: "16:25"
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
