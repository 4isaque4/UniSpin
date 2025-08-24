import FeatureCard from "../../components/FeatureCard.jsx";
import Logo from "../../components/Logo.jsx";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container heroGrid">
          <div>
            <span className="eyebrow">Plataforma educacional</span>
            <h1>Aprender, criar e compartilhar — no ritmo da inovação.</h1>
            <p className="lead">
              A UniSpin centraliza cursos, projetos e comunidade em uma experiência rápida, responsiva e acessível.
              Construída com uma base moderna e pensada para escalar com você.
            </p>
            <div className="pill">
              <a className="btn" href="#cta">Começar agora</a>
              <a className="btn secondary" href="#demo">Ver demonstração</a>
            </div>
          </div>

          <div>
            <div className="heroCard">
              <div className="badge"><Logo size={18} /><span>Preview</span></div>
              {/* mock de “preview” em SVG embutido */}
              <img
                alt="Prévia da UniSpin"
                src={`data:image/svg+xml;utf8,${encodeURIComponent(PREVIEW_SVG)}`}
                style={{ width: "100%", marginTop: 12, borderRadius: 12 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="features">
        <div className="container">
          <p className="kicker">Por que UniSpin</p>
          <div className="grid">
            <FeatureCard title="Conteúdo modular" desc="Trilhas e aulas com checkpoints." />
            <FeatureCard title="Integrações" desc="Supabase, APIs externas e autenticação simples." />
            <FeatureCard title="Performance" desc="Frontend estático via CDN e otimizações de build." />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="ctaStrip">
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <h3 style={{ margin: 0 }}>Pronto pra girar o conhecimento?</h3>
          <a className="btn" href="#">Criar conta</a>
        </div>
      </section>
    </>
  );
}
const PREVIEW_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='650'>
  <defs>
    <linearGradient id='bg' x1='0' x2='1' y1='0' y2='1'>
      <stop offset='0' stop-color='#0a35d1'/>
      <stop offset='1' stop-color='#06186f'/>
    </linearGradient>
    <linearGradient id='a' x1='0' x2='1' y1='0' y2='1'>
      <stop offset='0' stop-color='#44c3ee'/>
      <stop offset='1' stop-color='#66e0c2'/>
    </linearGradient>
  </defs>
  <rect width='100%' height='100%' fill='url(#bg)'/>
  <g transform='translate(120,120)'>
    <rect width='108' height='108' rx='18' fill='rgba(255,255,255,.08)' stroke='rgba(255,255,255,.2)'/>
    <g transform='translate(54,54) rotate(45)'>
      <rect x='-18' y='-30' rx='8' ry='8' width='36' height='36' fill='url(#a)'/>
      <rect x='-30' y='-18' rx='8' ry='8' width='36' height='36' fill='url(#a)'/>
      <rect x='-6'  y='-18' rx='8' ry='8' width='36' height='36' fill='url(#a)'/>
      <rect x='-18' y='-6'  rx='8' ry='8' width='36' height='36' fill='url(#a)'/>
    </g>
  </g>
  <text x='320' y='190' fill='white' style='font:700 56px system-ui, -apple-system, Segoe UI, Roboto'>UniSpin</text>
  <text x='320' y='240' fill='#c7d2fe' style='font:400 20px system-ui, -apple-system, Segoe UI, Roboto'>Página inicial — estática e responsiva</text>
</svg>`;

