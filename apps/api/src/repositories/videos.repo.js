const VIDEOS = [
    { id: "intro-react",     titulo: "Introdução ao React",         duracao: "12:45", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { id: "hooks-usestate",  titulo: "useState na prática",         duracao: "09:31", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { id: "roteamento",      titulo: "Roteamento com React Router", duracao: "11:05", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  ];
  
export const list = async () => VIDEOS;
export const get  = async (id) => VIDEOS.find(v => v.id === id);
  