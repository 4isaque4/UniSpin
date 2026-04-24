import "../styles/DownloadList.css";

const DOWNLOAD_SECTIONS = {
  "sage-treinamento": {
    title: "Arquivos de Download - SAGE",
    subtitle: "Materiais e ferramentas da trilha SAGE para uso no treinamento.",
    folderTitle: "Arquivos do SAGE",
    folderMeta: "Pasta completa • Vários arquivos",
    folderDescription: "Acesse a pasta centralizada com os materiais do curso.",
    href: "https://www.dropbox.com/home/_TEMP/Unispin/Pdfs/Cont%C3%A9udo%20SAGE",
    tone: "sage",
  },
  "curso-solar-fotovoltaico": {
    title: "Arquivos de Download - Energia Solar",
    subtitle: "Exercícios e materiais complementares da trilha de energia solar.",
    folderTitle: "Exercícios do Curso",
    folderMeta: "Pasta completa • Vários arquivos",
    folderDescription: "Conteúdo da trilha para consulta e acompanhamento das aulas.",
    href: "https://www.dropbox.com/scl/fo/ojsuasksfjkjmrkyr28lg/AFuZ4nfA6DGAEW0e6GYo9wE?rlkey=oqwl322pt3r9t2fl137l6sjj6&st=d5tw4bba&dl=0",
    tone: "solar",
  },
};

function DownloadIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7,10 12,15 17,10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function FolderIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export default function DownloadList({ trilhaId }) {
  const section = DOWNLOAD_SECTIONS[trilhaId];
  if (!section) return null;

  return (
    <section className={`download-section download-section--${section.tone}`}>
      <div className="download-section__header">
        <h2 className="download-section__title">
          <DownloadIcon />
          {section.title}
        </h2>
        <p className="download-section__subtitle">{section.subtitle}</p>
      </div>

      <a className="download-card" href={section.href} target="_blank" rel="noopener noreferrer">
        <div className="download-card__head">
          <span className="download-card__icon">
            <FolderIcon size={22} />
          </span>
          <div>
            <h3 className="download-card__title">{section.folderTitle}</h3>
            <p className="download-card__meta">{section.folderMeta}</p>
          </div>
        </div>

        <p className="download-card__description">{section.folderDescription}</p>

        <span className="download-card__cta">
          Abrir pasta no Dropbox
          <FolderIcon size={16} />
        </span>
      </a>
    </section>
  );
}
