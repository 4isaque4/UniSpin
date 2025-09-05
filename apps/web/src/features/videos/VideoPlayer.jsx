import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getVideoById, getNextVideo, getPreviousVideo } from '../../data/playlist.js';
import BrandIcon from '../../components/BrandIcon.jsx';
import '../../styles/VideoPlayer.css';
import BrandIcon from '../../components/BrandIcon.jsx';

export default function VideoPlayer() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [nextVideo, setNextVideo] = useState(null);
  const [previousVideo, setPreviousVideo] = useState(null);
  const [showContext, setShowContext] = useState(true);

  useEffect(() => {
    if (videoId) {
      const currentVideo = getVideoById(videoId);
      const next = getNextVideo(videoId);
      const prev = getPreviousVideo(videoId);
      
      setVideo(currentVideo);
      setNextVideo(next);
      setPreviousVideo(prev);
    }
  }, [videoId]);

  if (!video) {
    return (
      <div className="video-player-container">
        <div className="loading">Carregando vídeo...</div>
      </div>
    );
  }

  return (
    <div className="video-player-container">
      {/* Header do Vídeo */}
      <div className="video-header">
        <div className="video-breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{video.title}</span>
        </div>
        
        <button 
          className="context-toggle"
          onClick={() => setShowContext(!showContext)}
        >
          {showContext ? 'Ocultar Contexto' : 'Mostrar Contexto'}
        </button>
      </div>

      <div className="video-content">
        {/* Player do YouTube */}
        <div className="video-player-main">
          <div className="youtube-container">
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="youtube-player"
            />
          </div>
          
          {/* Informações do Vídeo */}
          <div className="video-info-main">
            <h1 className="video-title-main">{video.title}</h1>
            <div className="video-meta">
              <span className="video-duration-main">{video.duration}</span>
              <span className="video-order">Vídeo {video.order}</span>
              <span 
                className="video-module"
                style={{ backgroundColor: video.trilhaColor }}
              >
                {video.trilhaName?.split(':')[0]}
              </span>
            </div>
            <p className="video-description-main">{video.description}</p>
          </div>
        </div>

        {/* Contexto Rico (lado direito) */}
        {showContext && (
          <div className="video-context-sidebar">
            <div className="context-section">
              <h3>
                <BrandIcon /> Contexto
              </h3>
              <p>{video.context}</p>
            </div>

            {video.learningObjectives && (
              <div className="context-section">
                <h3>O que você vai aprender</h3>
                <ul className="learning-objectives-list">
                  {video.learningObjectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="context-section">
              <h3>
                <BrandIcon /> Pré-requisitos
              </h3>
              <p>{video.prerequisites}</p>
            </div>

            <div className="context-section">
              <h3>
                <BrandIcon /> Resultado esperado
              </h3>
              <p>{video.expectedOutcome}</p>
            </div>

            {/* Navegação entre vídeos */}
            <div className="video-navigation">
              <h3>
                <BrandIcon /> Navegação
              </h3>
              
              {previousVideo && (
                <Link 
                  to={`/video/${previousVideo.id}`}
                  className="nav-button prev"
                >
                  <span className="nav-arrow">←</span>
                  <div className="nav-info">
                    <span className="nav-label">Anterior</span>
                    <span className="nav-title">{previousVideo.title}</span>
                  </div>
                </Link>
              )}

              {nextVideo && (
                <Link 
                  to={`/video/${nextVideo.id}`}
                  className="nav-button next"
                >
                  <div className="nav-info">
                    <span className="nav-label">Próximo</span>
                    <span className="nav-title">{nextVideo.title}</span>
                  </div>
                  <span className="nav-arrow">→</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Vídeos Relacionados */}
      <div className="related-videos">
        <h3>
          <BrandIcon /> Outros vídeos deste módulo
        </h3>
        <div className="related-videos-grid">
          {/* Aqui você pode adicionar outros vídeos do mesmo módulo */}
        </div>
      </div>
    </div>
  );
}
