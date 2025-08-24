import { Link } from 'react-router-dom';
import { playlistData } from '../../data/playlist.js';
import '../../styles/Home.css';

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            🎓 UniSpin Treinamentos
          </h1>
          <p className="hero-description">
            Conheça a UniSpin através de nossos vídeos institucionais e treinamentos corporativos
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">{playlistData.trilhas.length}</span>
              <span className="stat-label">Módulos</span>
            </div>
            <div className="stat">
              <span className="stat-number">{playlistData.trilhas.reduce((total, trilha) => total + trilha.videos.length, 0)}</span>
              <span className="stat-label">Vídeos</span>
            </div>
            <div className="stat">
              <span className="stat-number">UniSpin</span>
              <span className="stat-label">Empresa</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src={playlistData.thumbnail} 
            alt="Playlist UniSpin"
            className="playlist-thumbnail"
          />
        </div>
      </section>

      {/* Módulos/Trilhas */}
      <section className="modules-section">
        <div className="container">
          <h2 className="section-title">📚 Áreas de Atuação</h2>
          <p className="section-description">
            Conheça as diferentes áreas e serviços da UniSpin
          </p>
          
          <div className="modules-grid">
            {playlistData.trilhas.map((trilha) => (
              <div key={trilha.id} className="module-card" style={{ borderColor: trilha.color }}>
                <div className="module-header">
                  <span className="module-icon">{trilha.icon}</span>
                  <h3 className="module-title">{trilha.name}</h3>
                </div>
                <p className="module-description">{trilha.description}</p>
                <p className="module-overview">{trilha.overview}</p>
                
                <div className="module-stats">
                  <span className="module-video-count">{trilha.videos.length} vídeos</span>
                </div>
                
                <div className="module-videos-preview">
                  {trilha.videos.slice(0, 3).map((video) => (
                    <Link 
                      key={video.id} 
                      to={`/video/${video.id}`}
                      className="video-preview-item"
                    >
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="video-preview-thumbnail"
                      />
                      <div className="video-preview-info">
                        <span className="video-preview-title">{video.title}</span>
                        <span className="video-preview-duration">{video.duration}</span>
                      </div>
                    </Link>
                  ))}
                  {trilha.videos.length > 3 && (
                    <div className="more-videos">
                      +{trilha.videos.length - 3} vídeos mais
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Todos os Vídeos */}
      <section className="all-videos-section">
        <div className="container">
          <h2 className="section-title">🎬 Conteúdo Institucional</h2>
          <p className="section-description">
            Acesse todos os vídeos institucionais e treinamentos da UniSpin
          </p>
          
          <div className="videos-grid">
            {playlistData.trilhas.flatMap(trilha => 
              trilha.videos.map(video => ({
                ...video,
                trilhaName: trilha.name,
                trilhaColor: trilha.color
              }))
            ).map((video) => (
              <div key={video.id} className="video-card-home">
                <div className="video-thumbnail-container">
                  <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
                  <span className="video-duration">{video.duration}</span>
                  <div className="video-trilha-indicator" style={{ backgroundColor: video.trilhaColor }}>
                    {video.trilhaName?.split(':')[0]}
                  </div>
                </div>
                <div className="video-info">
                  <h3 className="video-title">{video.title}</h3>
                  <p className="video-description">{video.description}</p>
                  <div className="video-actions">
                    <Link to={`/video/${video.id}`} className="watch-button" style={{ backgroundColor: video.trilhaColor }}>
                      Assistir
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

