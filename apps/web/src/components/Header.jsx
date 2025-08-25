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
          {/* Logo da SPIN elegante */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* Diamante da SPIN otimizado */}
            <div style={{ 
              width: "48px", 
              height: "48px", 
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <div style={{
                width: "44px",
                height: "44px",
                transform: "rotate(45deg)",
                position: "relative"
              }}>
                {/* Quadrado superior esquerdo - azul claro */}
                <div style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "22px",
                  height: "22px",
                  backgroundColor: "#60A5FA",
                  borderRadius: "4px",
                  boxShadow: "0 2px 8px rgba(96, 165, 250, 0.3)"
                }}></div>
                {/* Quadrado superior direito - azul médio */}
                <div style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  width: "22px",
                  height: "22px",
                  backgroundColor: "#3B82F6",
                  borderRadius: "4px",
                  boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)"
                }}></div>
                {/* Quadrado inferior esquerdo - azul médio */}
                <div style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  width: "22px",
                  height: "22px",
                  backgroundColor: "#3B82F6",
                  borderRadius: "4px",
                  boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)"
                }}></div>
                {/* Quadrado inferior direito - azul escuro */}
                <div style={{
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                  width: "22px",
                  height: "22px",
                  backgroundColor: "#1E40AF",
                  borderRadius: "4px",
                  boxShadow: "0 2px 8px rgba(30, 64, 175, 0.3)"
                }}></div>
                {/* Centro branco com brilho */}
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "10px",
                  height: "10px",
                  backgroundColor: "white",
                  borderRadius: "3px",
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 0 12px rgba(255, 255, 255, 0.8)"
                }}></div>
              </div>
            </div>
            
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
            color: "#E2E8F0", 
            textDecoration: "none", 
            fontWeight: "500",
            fontSize: "15px",
            transition: "color 0.2s ease"
          }}>
            Home
          </NavLink>
          <NavLink to={trilhasTo} style={{ 
            color: "#E2E8F0", 
            textDecoration: "none", 
            fontWeight: "500",
            fontSize: "15px",
            transition: "color 0.2s ease"
          }}>
            Trilhas
          </NavLink>
          <NavLink to={videosTo} style={{ 
            color: "#E2E8F0", 
            textDecoration: "none", 
            fontWeight: "500",
            fontSize: "15px",
            transition: "color 0.2s ease"
          }}>
            Vídeos
          </NavLink>
          <Link to={ctaTo} className="btn" style={{ 
            backgroundColor: "#10B981",
            border: "none",
            padding: "14px 28px",
            borderRadius: "10px",
            fontWeight: "600",
            fontSize: "15px",
            boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
            transition: "all 0.2s ease"
          }}>
            Acessar plataforma
          </Link>
        </nav>
      </div>
    </header>
  );
}
