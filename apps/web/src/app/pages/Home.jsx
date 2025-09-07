// Removido: cards/ícones de funcionalidades

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container" style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
          <span className="eyebrow" style={{ color: "#6b7280" }}>Plataforma corporativa</span>
          <h1 style={{ color: "#374151" }}>Aprender, criar e compartilhar — no ritmo da inovação.</h1>
          <p className="lead" style={{ color: "#6b7280" }}>
            A UniSpin centraliza treinamentos, projetos e conhecimento em uma experiência rápida, responsiva e acessível.
            Construída com uma base moderna para nossa equipe.
          </p>
          {/* Botão removido a pedido */}
        </div>
      </section>

      {/* FEATURES (texto separado com ícones contrastantes) */}
      <section id="features" className="features">
        <div className="container" style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <p className="kicker" style={{ color: "#6b7280" }}>Por que UniSpin</p>
          <div className="features-list">
            <div className="feature-item">
              <div className="feature-icon" aria-hidden>✓</div>
              <div className="feature-content">
                <h4 style={{ color: "#374151" }}>Trilhas de Certificação</h4>
                <p style={{ color: "#6b7280" }}>Série completa de vídeos para certificação em Action.NET.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon" aria-hidden>↺</div>
              <div className="feature-content">
                <h4 style={{ color: "#374151" }}>Progresso Personalizado</h4>
                <p style={{ color: "#6b7280" }}>Acompanhe seu avanço com tracking e barra de progresso.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon" aria-hidden>
                <svg className="icon-tech" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M9 3h5v5h-2v4h5a3 3 0 0 1 3 3v2h2v5h-5v-5h2v-2a2 2 0 0 0-2-2h-5v4h2v5H9v-5h2v-4H6a2 2 0 0 0-2 2v2h2v5H1v-5h2v-2a3 3 0 0 1 3-3h5V8H9zm4 4V4h-3v3zM5 21v-3H2v3zm8 0v-3h-3v3zm8 0v-3h-3v3z"/>
                </svg>
              </div>
              <div className="feature-content">
                <h4 style={{ color: "#374151" }}>Conteúdo Técnico</h4>
                <p style={{ color: "#6b7280" }}>Treinamentos focados em SCADA, automação e Action.NET.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon" aria-hidden>⬇</div>
              <div className="feature-content">
                <h4 style={{ color: "#374151" }}>Recursos & Downloads</h4>
                <p style={{ color: "#6b7280" }}>Manuais, e‑books e scripts de exemplo para praticar.</p>
              </div>
            </div>
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
          <h3 style={{ margin: 0, color: "#374151" }}>Plataforma UniSpin</h3>
          <p style={{ margin: "8px 0 0 0", opacity: 0.8, color: "#6b7280" }}>
            Voltado para a capacitação da equipe SPIN 
          </p>
        </div>
      </section>
    </>
  );
}

