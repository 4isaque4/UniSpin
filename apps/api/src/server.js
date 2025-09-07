import 'dotenv/config';
import app, { testDatabaseConnection } from "./app.js";

// Porta inteligente: usa PORT do ambiente ou fallback baseado no ambiente
const PORT = process.env.PORT || (process.env.NODE_ENV === 'production' ? 3000 : 8080);

// Bind para 0.0.0.0 para aceitar conexões externas (necessário no Fly.io)
app.listen(PORT, '0.0.0.0', async () => {
  console.log(`API rodando na porta ${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`URL: http://localhost:${PORT}`);
  
  // Logs temporários para debug CORS
  const isDev = (process.env.NODE_ENV || 'development') !== 'production';
  console.log(`[DEBUG] NODE_ENV: "${process.env.NODE_ENV}"`);
  console.log(`[DEBUG] isDev: ${isDev}`);
  console.log(`[DEBUG] CORS fallback ativo: ${isDev ? 'SIM' : 'NÃO'}`);
  
  // Testar conexão com banco de dados
  await testDatabaseConnection();
});
