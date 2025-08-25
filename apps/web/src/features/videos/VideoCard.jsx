import { Link } from 'react-router-dom';
import './VideoCard.css';

export default function VideoCard({ video, showContext = false }) {
  const handleImageError = (e) => {
    // Fallback para quando a thumbnail não carregar
    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjM0I4MkY2Ii8+CjxwYXRoIGQ9Ik0xNjAgOTBDMTYwIDg5LjQ0NzcgMTYwLjQ0OCA4OSAxNjEgODlDMTYxLjU1MiA4OSAxNjIgODkuNDQ3NyAxNjIgOTBDMTYyIDkwLjU1MjMgMTYxLjU1MiA5MSAxNjEgOTFDMTYwLjQ0OCA5MSAxNjAgOTAuNTUyMyAxNjAgOTBaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K';
  };

  return (
    <div className="video-card">
      {/* Thumbnail e Duração */}
      <div className="video-thumbnail-container">
        <img 
          src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
          alt={video.titulo}
          className="video-thumbnail"
          onError={handleImageError}
        />
        <span className="video-duration">{video.duracao}</span>
        
        {/* Indicador de Trilha */}
        <div 
          className="video-trilha-indicator"
          style={{ backgroundColor: '#3B82F6' }}
        >
          UniSpin
        </div>
      </div>

      {/* Informações do Vídeo */}
      <div className="video-info">
        <h3 className="video-title">{video.titulo}</h3>
        
        {showContext ? (
          // Modo detalhado com contexto rico
          <div className="video-context">
            <p className="video-description">{video.descricao}</p>
            
            {/* Contexto adicional */}
            <div className="video-context-section">
              <h4>📚 Contexto</h4>
              <p>Treinamento corporativo da UniSpin para certificação em Action.NET.</p>
            </div>

            {/* Objetivos de aprendizado */}
            <div className="video-context-section">
              <h4>🎯 O que você vai aprender</h4>
              <ul className="learning-objectives">
                <li>Conceitos fundamentais do Action.NET</li>
                <li>Práticas recomendadas</li>
                <li>Aplicação em projetos reais</li>
              </ul>
            </div>

            {/* Pré-requisitos */}
            <div className="video-context-section">
              <h4>📋 Pré-requisitos</h4>
              <p>Conhecimento básico em programação e interesse em Action.NET.</p>
            </div>

            {/* Resultado esperado */}
            <div className="video-context-section">
              <h4>🚀 Resultado esperado</h4>
              <p>Ao final deste treinamento, você estará preparado para a certificação em Action.NET.</p>
            </div>
          </div>
        ) : (
          // Modo compacto
          <p className="video-description">{video.descricao}</p>
        )}

        {/* Botão de ação */}
        <div className="video-actions">
          <Link 
            to={`/videos/${video.id}`}
            className="watch-button"
            style={{ backgroundColor: '#3B82F6' }}
          >
            {showContext ? 'Assistir Vídeo' : 'Assistir'}
          </Link>
        </div>
      </div>
    </div>
  );
}
  