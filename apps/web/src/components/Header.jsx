import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext.jsx";

export default function Header() {
  const { user } = useAuth();

  // Usuários não autenticados vão para login, usuários autenticados vão para videos
  const trilhasTo = user ? "/trilhas" : "/login";
  const videosTo = user ? "/videos" : "/login";
  const ctaTo = user ? "/videos" : "/login";

  console.log("Header - user:", user, "ctaTo:", ctaTo);

  return (
    <header className="nav">
      <div className="container">
        <Link to="/" className="logo">
          {/* Logo da SPIN com diamante azul */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ 
              width: "32px", 
              height: "32px", 
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {/* Diamante da SPIN */}
              <div style={{
                width: "28px",
                height: "28px",
                transform: "rotate(45deg)",
                position: "relative"
              }}>
                {/* Quadrado superior esquerdo - azul claro */}
                <div style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "14px",
                  height: "14px",
                  backgroundColor: "#87CEEB",
                  borderRadius: "2px"
                }}></div>
                {/* Quadrado superior direito - azul médio */}
                <div style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  width: "14px",
                  height: "14px",
                  backgroundColor: "#4A90E2",
                  borderRadius: "2px"
                }}></div>
                {/* Quadrado inferior esquerdo - azul médio */}
                <div style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  width: "14px",
                  height: "14px",
                  backgroundColor: "#4A90E2",
                  borderRadius: "2px"
                }}></div>
                {/* Quadrado inferior direito - azul escuro */}
                <div style={{
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                  width: "14px",
                  height: "14px",
                  backgroundColor: "#2E5BBA",
                  borderRadius: "2px"
                }}></div>
                {/* Centro branco */}
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "6px",
                  height: "6px",
                  backgroundColor: "white",
                  borderRadius: "1px",
                  transform: "translate(-50%, -50%)"
                }}></div>
              </div>
            </div>
            
            {/* Texto da logo */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <span style={{ 
                fontSize: "24px", 
                fontWeight: "700", 
                color: "#2E5BBA",
                lineHeight: "1"
              }}>
                spin
              </span>
              <span style={{ 
                fontSize: "10px", 
                fontWeight: "500", 
                color: "#666",
                lineHeight: "1",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                Engenharia de Automação
              </span>
            </div>
          </div>
        </Link>

        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to={trilhasTo}>Trilhas</NavLink>
          <NavLink to={videosTo}>Vídeos</NavLink>
          <Link to={ctaTo} className="btn">
            Acessar plataforma
          </Link>
        </nav>
      </div>
    </header>
  );
}
