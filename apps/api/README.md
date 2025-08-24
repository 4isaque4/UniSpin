# UniSpin API

API backend para o projeto UniSpin.

## Configuração

### 1. Variáveis de Ambiente

Copie o arquivo `env.example` para `.env` e configure as seguintes variáveis:

```bash
cp env.example .env
```

**Variáveis obrigatórias:**

- `DATABASE_URL`: URL de conexão com o banco PostgreSQL
- `SUPABASE_URL`: URL do projeto Supabase
- `SUPABASE_SERVICE_ROLE_KEY`: Chave de serviço do Supabase

**Variáveis opcionais:**

- `CORS_ORIGIN`: Origens permitidas para CORS (padrão: https://uni-spin-web.vercel.app,http://localhost:5173)
- `PORT`: Porta do servidor (padrão: 8080)
- `FORCE_DB_SSL`: Forçar SSL para conexão com banco (padrão: false)

### 2. Instalação de Dependências

```bash
npm install
```

### 3. Execução

**Desenvolvimento:**
```bash
npm run dev
```

**Produção:**
```bash
npm start
```

## Estrutura do Banco

A API espera as seguintes tabelas:

### Tabela `Trilha`
```sql
CREATE TABLE "Trilha" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Solução de Problemas

### Erro 500 na rota `/trilhas`

1. **Verificar variáveis de ambiente:**
   - Certifique-se de que `DATABASE_URL` está configurada
   - Verifique se `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` estão corretos

2. **Testar conexão com banco:**
   - Acesse `/trilhas/test` para verificar a estrutura do banco
   - Verifique os logs da aplicação para erros de conexão

3. **Verificar estrutura da tabela:**
   - Execute a rota de teste para ver se a tabela `Trilha` existe
   - Verifique se as colunas `id`, `name`, `description` e `created_at` existem

### Logs de Debug

A aplicação inclui logs detalhados para debug:

- `[DB]`: Logs de conexão com banco
- `[requireAuth]`: Logs de autenticação
- `[trilhas]`: Logs da rota de trilhas
- `[Error Handler]`: Logs de tratamento de erros

## Endpoints

### Autenticação
- `POST /auth/login` - Login de usuário
- `POST /auth/register` - Registro de usuário

### Trilhas
- `GET /trilhas` - Listar trilhas (requer autenticação)
- `GET /trilhas/test` - Testar estrutura do banco

### Vídeos
- `GET /videos` - Listar vídeos

### Progresso
- `GET /progresso` - Obter progresso do usuário
