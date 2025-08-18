import { NavLink, Link } from "react-router-dom";
// Se o seu projeto usa 'AuthContext.jsx', mantenha esta linha.
// Se for 'auth-context.js', troque o import abaixo.
import { useAuth } from "../features/auth/AuthContext.jsx";
import Logo from "./Logo.jsx";

const navStyle = ({ isActive }) => ({
  opacity: isActive ? 1 : 0.85,
  textDecoration: "none",
});

export default function Header() {
  const { user, setUser } = useAuth();

  const trilhasTo = user ? "/trilhas" : "/login";
  const videosTo  = user ? "/videos"  : "/login";
  const ctaTo     = user ? "/trilhas" : "/login";

  async function onLogout() {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      // Evita depender de useNavigate: redireciona limpo
      window.location.assign("/");
    } catch (e) {
      console.error(e);
    }
  }

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
          <NavLink to={videosTo}  style={navStyle} className="btn secondary">Vídeos</NavLink>

          <Link to={ctaTo} className="btn">Acessar plataforma</Link>

          {user && (
            <button onClick={onLogout} className="btn secondary" type="button">
              Sair
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
