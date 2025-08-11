import Logo from "./Logo.jsx";

export default function Header() {
  return (
    <header className="header">
      <div className="container nav">
        <div className="brand">
          <Logo size={28} />
          <div className="wordmark">UniSpin</div>
        </div>
        <nav style={{ display: "flex", gap: 8 }}>
          <a className="btn secondary" href="#features">Recursos</a>
          <a className="btn" href="#cta">Acessar plataforma</a>
        </nav>
      </div>
    </header>
  );
}
