import { NavLink, Link } from "react-router-dom";
import Logo from "./Logo.jsx";

const navStyle = ({ isActive }) => ({
  opacity: isActive ? 1 : 0.85,
  textDecoration: "none",
});

export default function Header() {
  return (
    <header className="header">
      <div className="container nav">
        <div className="brand">
          <Logo size={28} />
          <div className="wordmark">UniSpin</div>
        </div>

        <nav style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <NavLink to="/" end style={navStyle} className="btn secondary">Home</NavLink>
          <NavLink to="/trilhas" style={navStyle} className="btn secondary">Trilhas</NavLink>
          <NavLink to="/videos" style={navStyle} className="btn secondary">Vídeos</NavLink>
          <Link to="/videos" className="btn">Acessar plataforma</Link>
        </nav>
      </div>
    </header>
  );
}
