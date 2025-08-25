export default function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ 
            fontSize: "18px", 
            color: "#3B82F6",
            fontWeight: "bold"
          }}>✦</span>
          <span>© {new Date().getFullYear()} UniSpin</span>
        </div>
        <div style={{ opacity: .8 }}>Feito com React + Vite</div>
      </div>
    </footer>
  );
}
