import { useState, useEffect } from 'react';

export default function DownloadList({ trilhaId }) {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Link da pasta compartilhada do Dropbox
  const DROPBOX_FOLDER_URL = 'https://www.dropbox.com/scl/fo/5stpiz277gqe711x9hc15/AIDn_ionlSG5WwVdIdFjHvI?rlkey=hmo24rzrm6paaffnw9xacmaym&st=bmn41su5&dl=0';

  useEffect(() => {
    if (trilhaId === 'sage-treinamento') {
      loadSageDownloads();
    }
  }, [trilhaId]);

  const loadSageDownloads = async () => {
    try {
      setLoading(true);
      
      // Lista de arquivos do SAGE baseada na estrutura da pasta
      const sageFiles = [
        {
          id: "aplicacao-usuario",
          nome: "Aplicação Usuario",
          descricao: "Arquivos da aplicação do usuário SAGE",
          tipo: "Aplicação",
          tamanho: "~50MB",
          icone: "application",
          categoria: "Sistema"
        },
        {
          id: "apresentacao-teamgov",
          nome: "Apresentação Teamgov",
          descricao: "Apresentação para equipe governamental",
          tipo: "Apresentação",
          tamanho: "~15MB",
          icone: "presentation",
          categoria: "Documentação"
        },
        {
          id: "atualizacao",
          nome: "Atualização",
          descricao: "Arquivos de atualização do sistema SAGE",
          tipo: "Atualização",
          tamanho: "~30MB",
          icone: "update",
          categoria: "Sistema"
        },
        {
          id: "bizus",
          nome: "Bizus",
          descricao: "Dicas e truques para uso do SAGE",
          tipo: "Documentação",
          tamanho: "~5MB",
          icone: "tips",
          categoria: "Documentação"
        },
        {
          id: "cid",
          nome: "CID",
          descricao: "Documentação CID do SAGE",
          tipo: "Documentação",
          tamanho: "~10MB",
          icone: "document",
          categoria: "Documentação"
        },
        {
          id: "cnfs",
          nome: "CNFs",
          descricao: "Arquivos de configuração CNF",
          tipo: "Configuração",
          tamanho: "~8MB",
          icone: "config",
          categoria: "Configuração"
        },
        {
          id: "comandos-especificos",
          nome: "Comandos Específicos",
          descricao: "Lista de comandos específicos do SAGE",
          tipo: "Documentação",
          tamanho: "~3MB",
          icone: "command",
          categoria: "Documentação"
        },
        {
          id: "compareit",
          nome: "CompareIT",
          descricao: "Ferramenta de comparação CompareIT",
          tipo: "Ferramenta",
          tamanho: "~20MB",
          icone: "tool",
          categoria: "Ferramentas"
        },
        {
          id: "efi",
          nome: "EFI",
          descricao: "Arquivos relacionados ao EFI",
          tipo: "Sistema",
          tamanho: "~25MB",
          icone: "system",
          categoria: "Sistema"
        },
        {
          id: "iec-teste",
          nome: "IEC TESTE",
          descricao: "Arquivos de teste IEC",
          tipo: "Teste",
          tamanho: "~12MB",
          icone: "test",
          categoria: "Testes"
        },
        {
          id: "iecbrowser",
          nome: "IECBrowser",
          descricao: "Navegador IEC para SAGE",
          tipo: "Ferramenta",
          tamanho: "~18MB",
          icone: "browser",
          categoria: "Ferramentas"
        }
      ];

      setDownloads(sageFiles);
      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar arquivos de download');
      setLoading(false);
    }
  };

  const getDownloadUrl = (fileId) => {
    // Usa o link da pasta compartilhada do Dropbox que você forneceu
    // O Dropbox automaticamente permite navegar pelos arquivos da pasta
    return DROPBOX_FOLDER_URL;
  };

  const getIconComponent = (iconType) => {
    const iconMap = {
      application: "📱",
      presentation: "📊",
      update: "🔄",
      tips: "💡",
      document: "📄",
      config: "⚙️",
      command: "⌨️",
      tool: "🔧",
      system: "💻",
      test: "🧪",
      browser: "🌐"
    };
    return iconMap[iconType] || "📁";
  };

  const getCategoryColor = (categoria) => {
    const colorMap = {
      "Sistema": "#3B82F6",
      "Documentação": "#10B981",
      "Configuração": "#F59E0B",
      "Ferramentas": "#8B5CF6",
      "Testes": "#EF4444"
    };
    return colorMap[categoria] || "#6B7280";
  };

  if (loading) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 197, 253, 0.05))',
        borderRadius: '12px',
        border: '1px solid rgba(59, 130, 246, 0.2)'
      }}>
        <div style={{ fontSize: '24px', marginBottom: '12px' }}>📥</div>
        <h3 style={{ color: '#374151', marginBottom: '8px' }}>Carregando Arquivos...</h3>
        <p style={{ color: '#6B7280', fontSize: '14px' }}>Preparando downloads disponíveis</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(252, 165, 165, 0.05))',
        borderRadius: '12px',
        border: '1px solid rgba(239, 68, 68, 0.2)'
      }}>
        <div style={{ fontSize: '24px', marginBottom: '12px' }}>⚠️</div>
        <h3 style={{ color: '#DC2626', marginBottom: '8px' }}>Erro ao Carregar</h3>
        <p style={{ color: '#6B7280', fontSize: '14px' }}>{error}</p>
      </div>
    );
  }

  if (downloads.length === 0) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(107, 114, 128, 0.1), rgba(156, 163, 175, 0.05))',
        borderRadius: '12px',
        border: '1px solid rgba(107, 114, 128, 0.2)'
      }}>
        <div style={{ fontSize: '24px', marginBottom: '12px' }}>📁</div>
        <h3 style={{ color: '#374151', marginBottom: '8px' }}>Nenhum Arquivo Disponível</h3>
        <p style={{ color: '#6B7280', fontSize: '14px' }}>Não há arquivos de download para esta trilha</p>
      </div>
    );
  }

  // Agrupar downloads por categoria
  const downloadsByCategory = downloads.reduce((acc, download) => {
    if (!acc[download.categoria]) {
      acc[download.categoria] = [];
    }
    acc[download.categoria].push(download);
    return acc;
  }, {});

  return (
    <div style={{ marginTop: '24px' }}>
      <div style={{ 
        marginBottom: '20px',
        padding: '16px',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 197, 253, 0.05))',
        borderRadius: '12px',
        border: '1px solid rgba(59, 130, 246, 0.2)'
      }}>
        <h2 style={{ 
          color: '#1F2937', 
          margin: '0 0 8px 0', 
          fontSize: '20px',
          fontWeight: '700'
        }}>
          📥 Arquivos de Download - SAGE
        </h2>
        <p style={{ 
          color: '#6B7280', 
          margin: '0', 
          fontSize: '14px'
        }}>
          Acesse todos os arquivos e ferramentas do SAGE disponíveis para download
        </p>
      </div>

      {Object.entries(downloadsByCategory).map(([categoria, arquivos]) => (
        <div key={categoria} style={{ marginBottom: '24px' }}>
          <h3 style={{
            color: getCategoryColor(categoria),
            margin: '0 0 12px 0',
            fontSize: '16px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ fontSize: '18px' }}>📂</span>
            {categoria}
          </h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '16px' 
          }}>
            {arquivos.map((arquivo) => (
              <div key={arquivo.id} style={{
                background: 'white',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
              }}
              onClick={() => window.open(getDownloadUrl(arquivo.id), '_blank')}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '12px' 
                }}>
                  <span style={{ fontSize: '24px', marginRight: '12px' }}>
                    {getIconComponent(arquivo.icone)}
                  </span>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ 
                      margin: '0 0 4px 0', 
                      fontSize: '16px', 
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      {arquivo.nome}
                    </h4>
                    <p style={{ 
                      margin: '0', 
                      fontSize: '12px', 
                      color: '#6B7280',
                      fontWeight: '500'
                    }}>
                      {arquivo.tipo} • {arquivo.tamanho}
                    </p>
                  </div>
                </div>
                
                <p style={{ 
                  margin: '0 0 12px 0', 
                  fontSize: '14px', 
                  color: '#6B7280',
                  lineHeight: '1.4'
                }}>
                  {arquivo.descricao}
                </p>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 197, 253, 0.05))',
                  borderRadius: '8px',
                  border: '1px solid rgba(59, 130, 246, 0.2)'
                }}>
                  <span style={{ 
                    fontSize: '12px', 
                    color: '#3B82F6',
                    fontWeight: '600'
                  }}>
                    Acessar pasta do Dropbox
                  </span>
                  <span style={{ fontSize: '16px' }}>📁</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
