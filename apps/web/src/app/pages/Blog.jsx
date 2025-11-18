import { Link } from "react-router-dom";
import { blogVideos, blogVideoIds } from "../../data/blog-videos.js";

export default function Blog() {
  return (
    <main className="features">
      <div className="container">
        <h2 style={{ margin: "6px 0 12px", textAlign: "center", color: "#374151" }}>
          Blog - Vídeos Educativos
        </h2>
        <p style={{ margin: "0 0 40px", textAlign: "center", color: "#6B7280", fontSize: "16px" }}>
          Conteúdo educativo sobre energia elétrica, subestações e energia solar
        </p>

        <div className="grid videos-grid" style={{ gap: "24px" }}>
          {blogVideoIds.map((videoId) => {
            const video = blogVideos[videoId];
            if (!video) return null;

            return (
              <div key={videoId} className="blog-video-card" style={{
                background: "white",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                maxWidth: "400px",
                width: "100%"
              }}>
                <Link 
                  to={`/videos/${videoId}?blog=true`} 
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div style={{ position: "relative", width: "100%", paddingTop: "56.25%" }}>
                    <img
                      src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                      alt={video.titulo}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  </div>
                  <div style={{ padding: "20px" }}>
                    <h3 style={{
                      margin: "0 0 12px 0",
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "#1F2937",
                      lineHeight: "1.4",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden"
                    }}>
                      {video.titulo}
                    </h3>
                    <p style={{
                      margin: 0,
                      fontSize: "14px",
                      color: "#6B7280",
                      lineHeight: "1.6",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden"
                    }}>
                      {video.descricao}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

