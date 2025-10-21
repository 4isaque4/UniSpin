// Rotas para gerenciar downloads
import express from 'express';
import { requireAuth } from '../middlewares/auth.js';

const router = express.Router();

// Link da pasta compartilhada do Dropbox
const DROPBOX_FOLDER_URL = 'https://www.dropbox.com/scl/fo/5stpiz277gqe711x9hc15/AIDn_ionlSG5WwVdIdFjHvI?rlkey=hmo24rzrm6paaffnw9xacmaym&st=bmn41su5&dl=0';

// Lista de arquivos do SAGE disponíveis para download
const SAGE_FILES = [
  {
    id: "aplicacao-usuario",
    nome: "Aplicação Usuario",
    descricao: "Arquivos da aplicação do usuário SAGE",
    tipo: "Aplicação",
    tamanho: "~50MB",
    icone: "application",
    categoria: "Sistema",
    extensao: "zip"
  },
  {
    id: "apresentacao-teamgov",
    nome: "Apresentação Teamgov",
    descricao: "Apresentação para equipe governamental",
    tipo: "Apresentação",
    tamanho: "~15MB",
    icone: "presentation",
    categoria: "Documentação",
    extensao: "pdf"
  },
  {
    id: "atualizacao",
    nome: "Atualização",
    descricao: "Arquivos de atualização do sistema SAGE",
    tipo: "Atualização",
    tamanho: "~30MB",
    icone: "update",
    categoria: "Sistema",
    extensao: "zip"
  },
  {
    id: "bizus",
    nome: "Bizus",
    descricao: "Dicas e truques para uso do SAGE",
    tipo: "Documentação",
    tamanho: "~5MB",
    icone: "tips",
    categoria: "Documentação",
    extensao: "pdf"
  },
  {
    id: "cid",
    nome: "CID",
    descricao: "Documentação CID do SAGE",
    tipo: "Documentação",
    tamanho: "~10MB",
    icone: "document",
    categoria: "Documentação",
    extensao: "pdf"
  },
  {
    id: "cnfs",
    nome: "CNFs",
    descricao: "Arquivos de configuração CNF",
    tipo: "Configuração",
    tamanho: "~8MB",
    icone: "config",
    categoria: "Configuração",
    extensao: "zip"
  },
  {
    id: "comandos-especificos",
    nome: "Comandos Específicos",
    descricao: "Lista de comandos específicos do SAGE",
    tipo: "Documentação",
    tamanho: "~3MB",
    icone: "command",
    categoria: "Documentação",
    extensao: "pdf"
  },
  {
    id: "compareit",
    nome: "CompareIT",
    descricao: "Ferramenta de comparação CompareIT",
    tipo: "Ferramenta",
    tamanho: "~20MB",
    icone: "tool",
    categoria: "Ferramentas",
    extensao: "zip"
  },
  {
    id: "efi",
    nome: "EFI",
    descricao: "Arquivos relacionados ao EFI",
    tipo: "Sistema",
    tamanho: "~25MB",
    icone: "system",
    categoria: "Sistema",
    extensao: "zip"
  },
  {
    id: "iec-teste",
    nome: "IEC TESTE",
    descricao: "Arquivos de teste IEC",
    tipo: "Teste",
    tamanho: "~12MB",
    icone: "test",
    categoria: "Testes",
    extensao: "zip"
  },
  {
    id: "iecbrowser",
    nome: "IECBrowser",
    descricao: "Navegador IEC para SAGE",
    tipo: "Ferramenta",
    tamanho: "~18MB",
    icone: "browser",
    categoria: "Ferramentas",
    extensao: "zip"
  }
];

// GET /downloads/sage - Lista todos os arquivos do SAGE disponíveis
router.get('/sage', requireAuth, async (req, res) => {
  try {
    console.log('[Downloads] Listando arquivos do SAGE');
    
    // Agrupar arquivos por categoria
    const filesByCategory = SAGE_FILES.reduce((acc, file) => {
      if (!acc[file.categoria]) {
        acc[file.categoria] = [];
      }
      acc[file.categoria].push(file);
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        folder_url: DROPBOX_FOLDER_URL,
        files_by_category: filesByCategory,
        total_files: SAGE_FILES.length,
        categories: Object.keys(filesByCategory)
      }
    });
  } catch (error) {
    console.error('[Downloads] Erro ao listar arquivos do SAGE:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
});

// GET /downloads/sage/:fileId - Obtém link de download para um arquivo específico
router.get('/sage/:fileId', requireAuth, async (req, res) => {
  try {
    const { fileId } = req.params;
    console.log(`[Downloads] Solicitando download do arquivo: ${fileId}`);
    
    const file = SAGE_FILES.find(f => f.id === fileId);
    
    if (!file) {
      return res.status(404).json({
        success: false,
        error: 'Arquivo não encontrado',
        message: `Arquivo com ID ${fileId} não foi encontrado`
      });
    }

    // Gerar URL de download direto
    // Em produção, isso seria feito através da API do Dropbox
    const downloadUrl = `${DROPBOX_FOLDER_URL}&file=${fileId}`;
    
    // Log do download para analytics
    console.log(`[Downloads] Download iniciado: ${file.nome} por usuário ${req.user?.id || 'unknown'}`);
    
    res.json({
      success: true,
      data: {
        file: file,
        download_url: downloadUrl,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 horas
      }
    });
  } catch (error) {
    console.error(`[Downloads] Erro ao gerar link de download para ${req.params.fileId}:`, error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
});

// GET /downloads/sage/:fileId/info - Obtém informações detalhadas de um arquivo
router.get('/sage/:fileId/info', requireAuth, async (req, res) => {
  try {
    const { fileId } = req.params;
    console.log(`[Downloads] Obtendo informações do arquivo: ${fileId}`);
    
    const file = SAGE_FILES.find(f => f.id === fileId);
    
    if (!file) {
      return res.status(404).json({
        success: false,
        error: 'Arquivo não encontrado',
        message: `Arquivo com ID ${fileId} não foi encontrado`
      });
    }

    res.json({
      success: true,
      data: {
        file: file,
        download_stats: {
          total_downloads: 0, // Em produção, isso viria do banco de dados
          last_download: null,
          popularity: 'medium'
        }
      }
    });
  } catch (error) {
    console.error(`[Downloads] Erro ao obter informações do arquivo ${req.params.fileId}:`, error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
});

// POST /downloads/sage/:fileId/track - Registra download para analytics
router.post('/sage/:fileId/track', requireAuth, async (req, res) => {
  try {
    const { fileId } = req.params;
    const { user_id, download_source } = req.body;
    
    console.log(`[Downloads] Registrando download: ${fileId} por usuário ${user_id}`);
    
    // Em produção, isso seria salvo no banco de dados
    // Por enquanto, apenas log
    console.log(`[Downloads] Download registrado:`, {
      file_id: fileId,
      user_id: user_id || req.user?.id,
      download_source: download_source || 'web',
      timestamp: new Date().toISOString()
    });
    
    res.json({
      success: true,
      message: 'Download registrado com sucesso'
    });
  } catch (error) {
    console.error(`[Downloads] Erro ao registrar download:`, error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
});

export default router;
