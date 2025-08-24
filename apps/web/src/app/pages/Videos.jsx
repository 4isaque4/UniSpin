import { Link } from "react-router-dom";
import { playlistData } from "../../data/playlist.js";

export default function Videos() {
  // Flatten all videos from all trilhas
  const allVideos = playlistData.trilhas.flatMap(trilha => 
    trilha.videos.map(video => ({
      ...video,
      trilhaName: trilha.name,
      trilhaColor: trilha.color
    }))
  );

  return (
    <main className="features">
      <div className="container">
        <p className="kicker">Vídeos</p>
        <h2 style={{ margin: "6px 0 18px" }}>Catálogo de aulas</h2>

        <div className="grid">
          {allVideos.map(video => (
            <Link key={video.id} to={`/videos/${video.id}`} style={{ textDecoration: "none" }}>
              <div className="card">
                <div style={{ position: "relative", paddingTop: "56.25%" }}>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    style={{ 
                      position: "absolute", 
                      inset: 0, 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover",
                      borderRadius: 12 
                    }}
                  />
                  <div style={{
                    position: "absolute",
                    top: "8px",
                    left: "8px",
                    background: video.trilhaColor,
                    color: "white",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "0.75rem"
                  }}>
                    {video.trilhaName?.split(':')[0]}
                  </div>
                  <div style={{
                    position: "absolute",
                    bottom: "8px",
                    right: "8px",
                    background: "rgba(0,0,0,0.8)",
                    color: "white",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "0.75rem"
                  }}>
                    {video.duration}
                  </div>
                </div>
                <div style={{ padding: "20px" }}>
                  <h3 style={{ margin: "0 0 12px 0", fontSize: "1.125rem" }}>{video.title}</h3>
                  <p style={{ margin: "0 0 16px 0", color: "#666", fontSize: "0.875rem" }}>
                    {video.description}
                  </p>
                  <div className="btn" style={{ backgroundColor: video.trilhaColor }}>
                    Assistir
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
