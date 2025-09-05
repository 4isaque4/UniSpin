import FeatureCard from "../../components/FeatureCard.jsx";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container" style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
          <span className="eyebrow">Plataforma corporativa</span>
          <h1>Aprender, criar e compartilhar — no ritmo da inovação.</h1>
          <p className="lead">
            A UniSpin centraliza treinamentos, projetos e conhecimento em uma experiência rápida, responsiva e acessível.
            Construída com uma base moderna para nossa equipe.
          </p>
          <div className="pill" style={{ justifyContent: "center", gap: "16px" }}>
            <a className="btn secondary" href="#features">Ver funcionalidades</a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="features">
        <div className="container" style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <p className="kicker">Por que UniSpin</p>
          <div className="grid" style={{ 
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "32px",
            marginTop: "40px"
          }}>
            <FeatureCard 
              title="Trilhas de Certificação" 
              desc="Série completa de  vídeos para certificação em Action.NET da SPIN Engenharia de Automação."
              iconType="certification"
            />
            <FeatureCard 
              title="Progresso Personalizado" 
              desc="Acompanhe seu avanço com sistema de tracking e barra de progresso para cada trilha."
              iconType="progress"
            />
            <FeatureCard 
              title="Conteúdo Técnico" 
              desc="Treinamentos especializados em SCADA, automação industrial e ferramentas Action.NET."
              iconType="technical"
            />
            <FeatureCard
              title="Recursos & Downloads"
              desc="Materiais complementares (manuais, e‑books, scripts de exemplo) para praticar e reforçar os contéudos."
              iconType="resources"
            />
            <FeatureCard
              title="Suporte & Comunidade"
              desc="Canais de ajuda e espaço para interação entre os usuários."
              iconType="community"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="ctaStrip">
        <div className="container" style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          gap: "16px", 
          flexWrap: "wrap",
          textAlign: "center"
        }}>
          <h3 style={{ margin: 0 }}>Plataforma UniSpin</h3>
          <p style={{ margin: "8px 0 0 0", opacity: 0.8 }}>
            Treinamentos corporativos para sua equipe
          </p>
        </div>
      </section>
    </>
  );
}

