import { NavLink } from "react-router-dom";
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
        </nav>
      </div>
    </header>
  );
}
