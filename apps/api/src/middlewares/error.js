// Middleware de tratamento de erros
export function errorHandler(err, req, res, next) {
  console.error('[Error Handler] Erro capturado:', err);
  
  // Erro de validação do banco de dados
  if (err.code === '23505') { // Unique violation
    return res.status(400).json({
      error: 'validation_error',
      message: 'Dados duplicados não são permitidos'
    });
  }
  
  if (err.code === '23503') { // Foreign key violation
    return res.status(400).json({
      error: 'validation_error',
      message: 'Referência inválida'
    });
  }
  
  if (err.code === '42P01') { // Undefined table
    return res.status(500).json({
      error: 'database_error',
      message: 'Tabela não encontrada'
    });
  }
  
  // Erro de conexão com banco
  if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
    return res.status(503).json({
      error: 'database_unavailable',
      message: 'Banco de dados indisponível'
    });
  }
  
  // Erro padrão
  res.status(500).json({
    error: 'internal_error',
    message: 'Erro interno do servidor'
  });
}

// Middleware para capturar erros assíncronos
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
