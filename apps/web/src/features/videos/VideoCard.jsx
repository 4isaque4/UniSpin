export default function VideoCard({ video }) {
    return (
      <article className="card" role="article">
        <div
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
            border: "1px solid rgba(255,255,255,.12)",
            borderRadius: 12,
            height: 140,
            marginBottom: 10
          }}
        />
        <h3 style={{ margin: "0 0 4px" }}>{video.titulo}</h3>
        <p style={{ margin: 0, color: "#c9d3ff" }}>{video.duracao}</p>
      </article>
    );
  }
  