// Configuração e validação de variáveis de ambiente
export const FRONTEND_ORIGINS = (process.env.FRONTEND_ORIGINS ||
    'https://uni-spin-web.vercel.app,http://localhost:5173'
  ).split(',').map(s => s.trim()).filter(Boolean);
  
export const SUPABASE_URL = process.env.SUPABASE_URL;
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validação das variáveis obrigatórias
export function validateEnv() {
  const required = ['DATABASE_URL', 'SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('Variáveis de ambiente obrigatórias não configuradas:', missing);
    console.error('Por favor, configure as seguintes variáveis:');
    missing.forEach(key => console.error(`  - ${key}`));
    return false;
  }
  
  console.log('Todas as variáveis de ambiente obrigatórias estão configuradas');
  console.log('Configurações:');
  console.log(`  - DATABASE_URL: ${process.env.DATABASE_URL ? 'Configurada' : 'Não configurada'}`);
  console.log(`  - SUPABASE_URL: ${SUPABASE_URL ? 'Configurada' : 'Não configurada'}`);
  console.log(`  - SUPABASE_SERVICE_ROLE_KEY: ${SUPABASE_SERVICE_ROLE_KEY ? 'Configurada' : 'Não configurada'}`);
  console.log(`  - FRONTEND_ORIGINS: ${FRONTEND_ORIGINS.join(', ')}`);
  
  return true;
}
  