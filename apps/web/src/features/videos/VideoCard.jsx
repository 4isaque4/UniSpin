import { Link } from 'react-router-dom';
import './VideoCard.css';

export default function VideoCard({ video, showContext = false }) {
  return (
    <div className="video-card">
      {/* Thumbnail e Duração */}
      <div className="video-thumbnail-container">
        <img 
          src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
          alt={video.titulo}
          className="video-thumbnail"
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
              <p>Treinamento corporativo da UniSpin para desenvolvimento profissional.</p>
            </div>

            {/* Objetivos de aprendizado */}
            <div className="video-context-section">
              <h4>🎯 O que você vai aprender</h4>
              <ul className="learning-objectives">
                <li>Conceitos fundamentais da tecnologia</li>
                <li>Práticas recomendadas</li>
                <li>Aplicação em projetos reais</li>
              </ul>
            </div>

            {/* Pré-requisitos */}
            <div className="video-context-section">
              <h4>📋 Pré-requisitos</h4>
              <p>Conhecimento básico em programação e interesse em aprender.</p>
            </div>

            {/* Resultado esperado */}
            <div className="video-context-section">
              <h4>🚀 Resultado esperado</h4>
              <p>Ao final deste treinamento, você estará preparado para aplicar os conceitos aprendidos.</p>
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
  