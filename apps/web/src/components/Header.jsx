import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext.jsx";

  export default function Header() {
    const { user, signOut } = useAuth();

  // Usuários não autenticados vão para login, usuários autenticados vão para videos
  const trilhasTo = user ? "/trilhas" : "/login";
  const videosTo = user ? "/videos" : "/login";
  const ctaTo = user ? "/videos" : "/login";

  return (
    <header className="nav">
      <div className="container">
          <Link to="/" className="logo">
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <img src="/favicon.svg" alt="Logo SPIN" style={{ width: "64px", height: "64px" }} />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "4px" }}>
                <span
                  style={{
                    fontSize: "36px",
                    fontWeight: "800",
                    color: "var(--primary-700)",
                    lineHeight: "1",
                    letterSpacing: "-0.5px"
                  }}
                >
                  spin
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "var(--accent-cyan)",
                    lineHeight: "1",
                    textTransform: "uppercase",
                    letterSpacing: "1.2px"
                  }}
                >
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
            {!user ? (
              <Link
                to={ctaTo}
                className="btn"
                style={{
                  backgroundColor: "var(--primary-700)",
                  border: "none",
                  padding: "14px 28px",
                  borderRadius: "10px",
                  fontWeight: "600",
                  fontSize: "15px",
                  boxShadow: "0 4px 12px rgba(30, 64, 175, 0.3)",
                  transition: "all 0.2s ease"
                }}
              >
                Acessar plataforma
              </Link>
            ) : (
              <button
                className="btn"
                onClick={signOut}
                style={{
                  backgroundColor: "var(--primary-700)",
                  border: "none",
                  padding: "14px 28px",
                  borderRadius: "10px",
                  fontWeight: "600",
                  fontSize: "15px",
                  boxShadow: "0 4px 12px rgba(30, 64, 175, 0.3)",
                  transition: "all 0.2s ease"
                }}
              >
                Sair
              </button>
            )}
          </nav>
        </div>
      </header>
    );
  }
