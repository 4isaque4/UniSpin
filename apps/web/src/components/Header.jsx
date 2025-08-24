import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext.jsx";
import Logo from "./Logo.jsx";

const navStyle = ({ isActive }) => ({
  opacity: isActive ? 1 : 0.85,
  textDecoration: "none",
});

export default function Header() {
  const { user } = useAuth();

  // Usuários não autenticados vão para login, usuários autenticados vão para videos
  const trilhasTo = user ? "/trilhas" : "/login";
  const videosTo = user ? "/videos" : "/login";
  const ctaTo = user ? "/videos" : "/login";

  console.log("Header - user:", user, "ctaTo:", ctaTo);

  return (
    <header className="header">
      <div className="container nav">
        <div className="brand">
          <Logo size={28} />
          <div className="wordmark">UniSpin</div>
        </div>

        <nav style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <NavLink to="/" end style={navStyle} className="btn secondary">Home</NavLink>
          <NavLink to={trilhasTo} style={navStyle} className="btn secondary">Trilhas</NavLink>
          <NavLink to={videosTo} style={navStyle} className="btn secondary">Vídeos</NavLink>
          <Link to={ctaTo} className="btn">Acessar plataforma</Link>
        </nav>
      </div>
    </header>
  );
}
