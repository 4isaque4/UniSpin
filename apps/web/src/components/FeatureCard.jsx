import Logo from "./Logo.jsx";

export default function FeatureCard({ title, desc }) {
  return (
    <article className="card">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Logo size={18} />
        <h3>{title}</h3>
      </div>
      <p>{desc}</p>
    </article>
  );
}
