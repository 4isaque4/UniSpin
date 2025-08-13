const TRILHAS = [
    { id: "react-basico",  titulo: "React Básico",        aulas: 18, nivel: "Iniciante" },
    { id: "js-moderno",    titulo: "JavaScript Moderno",  aulas: 22, nivel: "Iniciante" },
    { id: "fullstack",     titulo: "Fullstack Web",       aulas: 36, nivel: "Intermediário" },
  ];
  
export const list = async () => TRILHAS;
export const get  = async (id) => TRILHAS.find(t => t.id === id);
  