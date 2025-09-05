import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext.jsx";

export default function Header() {
  const { user, logout } = useAuth();

  // Usuários não autenticados vão para login, usuários autenticados vão para videos
  const trilhasTo = user ? "/trilhas" : "/login";
  const videosTo = user ? "/videos" : "/login";
  const ctaTo = user ? "/videos" : "/login";

  return (
    <header className="nav">
      <div className="container">
        <Link to="/" className="logo">
          {/* Logo da SPIN elegante */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <img
              src="/unispin-logo.svg"
              alt="Logo UniSpin"
              style={{ width: "72px", height: "72px", display: "block" }}
            />

            {/* Texto da logo */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "4px" }}>
              <span style={{ 
                fontSize: "32px", 
                fontWeight: "800", 
                color: "#1E40AF",
                lineHeight: "1",
                letterSpacing: "-0.5px"
              }}>
                spin
              </span>
              <span style={{ 
                fontSize: "12px", 
                fontWeight: "600", 
                color: "#60A5FA",
                lineHeight: "1",
                textTransform: "uppercase",
                letterSpacing: "1.2px"
              }}>
                Engenharia de Automação
              </span>
            </div>
          </div>
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          <NavLink to="/" style={{ 
            color: "#1F2937", 
            textDecoration: "none", 
            fontWeight: "700",
            fontSize: "15px",
            transition: "color 0.2s ease",
            textShadow: "0 1px 2px rgba(255, 255, 255, 0.8)"
          }}>
            Home
          </NavLink>
          <NavLink to={trilhasTo} style={{ 
            color: "#1F2937", 
            textDecoration: "none", 
            fontWeight: "700",
            fontSize: "15px",
            transition: "color 0.2s ease",
            textShadow: "0 1px 2px rgba(255, 255, 255, 0.8)"
          }}>
            Trilhas
          </NavLink>
          <NavLink to={videosTo} style={{ 
            color: "#1F2937", 
            textDecoration: "none", 
            fontWeight: "700",
            fontSize: "15px",
            transition: "color 0.2s ease",
            textShadow: "0 1px 2px rgba(255, 255, 255, 0.8)"
          }}>
            Vídeos
          </NavLink>
          <Link to={ctaTo} className="btn" style={{
            backgroundColor: "#2563EB",
            border: "none",
            padding: "14px 28px",
            borderRadius: "10px",
            fontWeight: "600",
            fontSize: "15px",
            boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
            transition: "all 0.2s ease"
          }}>
            Acessar plataforma
          </Link>
          {user && (
            <button
              onClick={logout}
              className="btn secondary"
              style={{ padding: "14px 28px", borderRadius: "10px" }}
            >
              Sair
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}