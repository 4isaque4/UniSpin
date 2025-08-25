import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext.jsx";

export default function Header() {
  const { user } = useAuth();

  // Usuários não autenticados vão para login, usuários autenticados vão para videos
  const trilhasTo = user ? "/trilhas" : "/login";
  const videosTo = user ? "/videos" : "/login";
  const ctaTo = user ? "/videos" : "/login";

  return (
    <header className="nav">
      <div className="container">
        <Link to="/" className="logo">
          {/* Logo da SPIN simplificada */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Diamante da SPIN */}
            <div style={{ 
              width: "40px", 
              height: "40px", 
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <div style={{
                width: "36px",
                height: "36px",
                transform: "rotate(45deg)",
                position: "relative"
              }}>
                {/* Quadrado superior esquerdo - azul claro */}
                <div style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "18px",
                  height: "18px",
                  backgroundColor: "#87CEEB",
                  borderRadius: "3px"
                }}></div>
                {/* Quadrado superior direito - azul médio */}
                <div style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  width: "18px",
                  height: "18px",
                  backgroundColor: "#4A90E2",
                  borderRadius: "3px"
                }}></div>
                {/* Quadrado inferior esquerdo - azul médio */}
                <div style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  width: "18px",
                  height: "18px",
                  backgroundColor: "#4A90E2",
                  borderRadius: "3px"
                }}></div>
                {/* Quadrado inferior direito - azul escuro */}
                <div style={{
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                  width: "18px",
                  height: "18px",
                  backgroundColor: "#2E5BBA",
                  borderRadius: "3px"
                }}></div>
                {/* Centro branco */}
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "8px",
                  height: "8px",
                  backgroundColor: "white",
                  borderRadius: "2px",
                  transform: "translate(-50%, -50%)"
                }}></div>
              </div>
            </div>
            
            {/* Texto da logo */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <span style={{ 
                fontSize: "28px", 
                fontWeight: "700", 
                color: "#2E5BBA",
                lineHeight: "1"
              }}>
                spin
              </span>
              <span style={{ 
                fontSize: "11px", 
                fontWeight: "500", 
                color: "#87CEEB",
                lineHeight: "1",
                textTransform: "uppercase",
                letterSpacing: "1px"
              }}>
                Engenharia de Automação
              </span>
            </div>
          </div>
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <NavLink to="/" style={{ color: "#E2E8F0", textDecoration: "none", fontWeight: "500" }}>
            Home
          </NavLink>
          <NavLink to={trilhasTo} style={{ color: "#E2E8F0", textDecoration: "none", fontWeight: "500" }}>
            Trilhas
          </NavLink>
          <NavLink to={videosTo} style={{ color: "#E2E8F0", textDecoration: "none", fontWeight: "500" }}>
            Vídeos
          </NavLink>
          <Link to={ctaTo} className="btn" style={{ 
            backgroundColor: "#10B981",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            fontWeight: "600"
          }}>
            Acessar plataforma
          </Link>
        </nav>
      </div>
    </header>
  );
}
