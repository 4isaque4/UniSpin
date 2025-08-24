import { Link } from 'react-router-dom';
import './VideoCard.css';

export default function VideoCard({ video, showContext = false }) {
  return (
    <div className="video-card">
      {/* Thumbnail e Duração */}
      <div className="video-thumbnail-container">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="video-thumbnail"
        />
        <span className="video-duration">{video.duration}</span>
        
        {/* Indicador de Trilha */}
        <div 
          className="video-trilha-indicator"
          style={{ backgroundColor: video.trilhaColor }}
        >
          {video.trilhaName?.split(':')[0]}
        </div>
      </div>

      {/* Informações do Vídeo */}
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
        
        {showContext ? (
          // Modo detalhado com contexto rico
          <div className="video-context">
            <p className="video-description">{video.description}</p>
            
            {/* Contexto adicional */}
            <div className="video-context-section">
              <h4>📚 Contexto</h4>
              <p>{video.context}</p>
            </div>

            {/* Objetivos de aprendizado */}
            {video.learningObjectives && (
              <div className="video-context-section">
                <h4>🎯 O que você vai aprender</h4>
                <ul className="learning-objectives">
                  {video.learningObjectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pré-requisitos */}
            <div className="video-context-section">
              <h4>📋 Pré-requisitos</h4>
              <p>{video.prerequisites}</p>
            </div>

            {/* Resultado esperado */}
            <div className="video-context-section">
              <h4>🚀 Resultado esperado</h4>
              <p>{video.expectedOutcome}</p>
            </div>
          </div>
        ) : (
          // Modo compacto
          <p className="video-description">{video.description}</p>
        )}

        {/* Botão de ação */}
        <div className="video-actions">
          <Link 
            to={`/video/${video.id}`}
            className="watch-button"
            style={{ backgroundColor: video.trilhaColor }}
          >
            {showContext ? 'Assistir Vídeo' : 'Assistir'}
          </Link>
          
          {showContext && (
            <Link 
              to={`/trilhas/${video.trilhaId}`}
              className="view-module-button"
            >
              Ver Módulo
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
  