// Configuração e validação de variáveis de ambiente
export const FRONTEND_ORIGINS = (process.env.FRONTEND_ORIGINS ||
    'https://unispin.sbs,https://www.unispin.sbs,http://localhost:5173'
  ).split(',').map(s => s.trim()).filter(Boolean);

// Validação das variáveis obrigatórias
export function validateEnv() {
  const required = ['DATABASE_URL', 'JWT_SECRET'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.error('Variáveis de ambiente obrigatórias não configuradas:', missing);
    missing.forEach(key => console.error(`  - ${key}`));
    return false;
  }

  console.log('Configurações:');
  console.log(`  - DATABASE_URL: configurada`);
  console.log(`  - JWT_SECRET: configurada (${process.env.JWT_SECRET.length} chars)`);
  console.log(`  - FRONTEND_ORIGINS: ${FRONTEND_ORIGINS.join(', ')}`);
  return true;
}
