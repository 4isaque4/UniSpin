import { Link, NavLink } from "react-router-dom";

export default function Header() {

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
                color: "#44d2f2",
                lineHeight: "1",
                letterSpacing: "-0.5px"
              }}>
                Unispin
              </span>
              <span style={{ 
                fontSize: "12px", 
                fontWeight: "600", 
                color: "#0d0d0d",
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
          <NavLink to="/videos" style={{ 
            color: "#1F2937", 
            textDecoration: "none", 
            fontWeight: "700",
            fontSize: "15px",
            transition: "color 0.2s ease",
            textShadow: "0 1px 2px rgba(255, 255, 255, 0.8)"
          }}>
            Vídeos
          </NavLink>
          <Link
            to="/videos"
            className="btn"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "#fff",
              border: "none",
              padding: "12px 20px",
              borderRadius: "10px",
              fontWeight: "700",
              fontSize: "14px",
              boxShadow: "0 6px 16px rgba(68, 210, 242, 0.25)",
              transition: "all 0.2s ease"
            }}
          >
            Acessar plataforma
          </Link>
        </nav>
      </div>
    </header>
  );
}