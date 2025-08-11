import Logo from "./Logo.jsx";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Logo size={18} />
          <span>© {new Date().getFullYear()} UniSpin</span>
        </div>
        <div style={{ opacity: .8 }}>Feito com React + Vite</div>
      </div>
    </footer>
  );
}
