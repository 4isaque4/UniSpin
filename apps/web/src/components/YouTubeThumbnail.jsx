import { useState } from "react";

export default function YouTubeThumbnail({ videoId, alt, className, style }) {
  const [currentResolution, setCurrentResolution] = useState(0);
  
  // Array de resoluções do YouTube em ordem de preferência
  const resolutions = [
    'maxresdefault.jpg',    // Máxima resolução (1280x720)
    'hqdefault.jpg',        // Alta qualidade (480x360)
    'mqdefault.jpg',        // Média qualidade (320x180)
    'sddefault.jpg',        // Definição padrão (640x480)
    'default.jpg'           // Padrão (120x90)
  ];

  const handleImageError = () => {
    // Tenta próxima resolução
    if (currentResolution < resolutions.length - 1) {
      setCurrentResolution(prev => prev + 1);
    }
  };

  const getCurrentThumbnailUrl = () => {
    return `https://img.youtube.com/vi/${videoId}/${resolutions[currentResolution]}`;
  };

  // Se todas as resoluções falharam, usa SVG personalizado
  if (currentResolution >= resolutions.length) {
    return (
      <div 
        className={className}
        style={{
          ...style,
          backgroundColor: "#3B82F6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "48px"
        }}
        title={alt}
      >
        ▶️
      </div>
    );
  }

  return (
    <img
      src={getCurrentThumbnailUrl()}
      alt={alt}
      className={className}
      style={style}
      onError={handleImageError}
    />
  );
}
