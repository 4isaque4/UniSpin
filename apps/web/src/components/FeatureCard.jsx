export default function FeatureCard({ title, desc }) {
  return (
    <article className="card">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ 
          fontSize: "18px", 
          color: "#3B82F6",
          fontWeight: "bold"
        }}>✦</span>
        <h3>{title}</h3>
      </div>
      <p>{desc}</p>
    </article>
  );
}
