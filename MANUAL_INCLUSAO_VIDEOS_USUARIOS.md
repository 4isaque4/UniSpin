# Manual de Inclusão de Vídeos e Usuários - UniSpin

## Visão Geral do Sistema

O UniSpin é uma plataforma de aprendizado que utiliza:
- **Frontend**: React com Vite (apps/web)
- **Backend**: Node.js com Express (apps/api)
- **Banco de Dados**: PostgreSQL com Supabase
- **Autenticação**: JWT + Supabase Auth
- **Estrutura**: ESM modules (import/export com extensão .js)

## 📹 Inclusão de Novos Vídeos

### 1. Estrutura Atual dos Vídeos

Os vídeos são gerenciados em duas camadas:

#### Frontend (apps/web/src/data/)
- `trilhas.js`: Define trilhas de aprendizado com vídeos
- `playlist.js`: Estrutura detalhada de playlists e módulos

#### Backend (apps/api/src/)
- `repositories/videos.repo.js`: Dados estáticos dos vídeos
- `controllers/videos.controller.js`: Lógica de controle
- `services/videos.service.js`: Camada de serviço
- `routes/videos.routes.js`: Endpoints da API

### 2. Passos para Adicionar Novos Vídeos

#### Passo 1: Adicionar Vídeo no Frontend

**Arquivo: `apps/web/src/data/trilhas.js`**

```javascript
// Adicionar novo vídeo na trilha existente
export const TRILHAS = [
  {
    id: "action-net-certificacao",
    titulo: "Certificação Action.NET",
    // ... outros campos
    videos: [
      "5x6pCc8xUDk", // Vídeos existentes
      "vRMNHAvUrvs",
      // ... outros vídeos
      "NOVO_VIDEO_ID" // ← Adicionar aqui
    ]
  }
];
```

**Arquivo: `apps/web/src/data/playlist.js`**

```javascript
// Adicionar vídeo detalhado na playlist
videos: [
  {
    id: "video-novo",
    title: "Título do Novo Vídeo",
    description: "Descrição detalhada do vídeo",
    context: "Contexto adicional e pré-requisitos",
    youtubeId: "NOVO_VIDEO_ID",
    duration: "15:30",
    thumbnail: "https://img.youtube.com/vi/NOVO_VIDEO_ID/maxresdefault.jpg",
    order: 12, // Próximo número na sequência
    learningObjectives: [
      "Objetivo 1",
      "Objetivo 2"
    ],
    prerequisites: "Conhecimento dos vídeos anteriores",
    expectedOutcome: "O que o usuário será capaz de fazer"
  }
]
```

#### Passo 2: Atualizar Backend (se necessário)

**Arquivo: `apps/api/src/repositories/videos.repo.js`**

```javascript
const VIDEOS = [
    { id: "intro-react", titulo: "Introdução ao React", duracao: "12:45", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { id: "hooks-usestate", titulo: "useState na prática", duracao: "09:31", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { id: "roteamento", titulo: "Roteamento com React Router", duracao: "11:05", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    // Adicionar novo vídeo aqui se necessário
    { id: "novo-video", titulo: "Título do Novo Vídeo", duracao: "15:30", embed: "https://www.youtube.com/embed/NOVO_VIDEO_ID" },
];
```

#### Passo 3: Atualizar Duração Total da Trilha

**Arquivo: `apps/web/src/data/trilhas.js`**

```javascript
// Recalcular duração total
duracaoTotal: "4:02:30", // Atualizar com nova duração
quantidadeVideos: 12, // Incrementar quantidade
```

### 3. Estrutura de Dados dos Vídeos

```javascript
{
  id: "identificador-unico",
  titulo: "Título do Vídeo",
  descricao: "Descrição detalhada",
  context: "Contexto e pré-requisitos",
  youtubeId: "ID_DO_YOUTUBE",
  duration: "MM:SS",
  thumbnail: "https://img.youtube.com/vi/ID/maxresdefault.jpg",
  order: 1, // Ordem na sequência
  learningObjectives: ["Objetivo 1", "Objetivo 2"],
  prerequisites: "Pré-requisitos necessários",
  expectedOutcome: "Resultado esperado"
}
```

## 👥 Inclusão de Novos Usuários

### 1. Estrutura Atual dos Usuários

Os usuários são gerenciados através do Supabase:

#### Backend (apps/api/src/)
- `repositories/user.repo.js`: Operações de usuário no banco
- `routes/auth.routes.js`: Endpoints de autenticação
- `middlewares/auth.js`: Middleware de autenticação

### 2. Passos para Adicionar Novos Usuários

#### Opção 1: Via Supabase Dashboard (Recomendado)

1. **Acessar o Supabase Dashboard**
   - URL: `https://supabase.com/dashboard`
   - Selecionar o projeto UniSpin

2. **Navegar para Authentication > Users**
   - Clicar em "Add user"
   - Preencher email e senha
   - Definir role (admin, user, etc.)

3. **Configurar permissões**
   - Verificar se o usuário tem acesso às tabelas necessárias
   - Configurar RLS (Row Level Security) se necessário

#### Opção 2: Via API (Programaticamente)

**Endpoint: `POST /auth/set-password`**

```javascript
// Exemplo de requisição
const response = await fetch('/api/auth/set-password', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'novo.usuario@exemplo.com',
    newPassword: 'senhaSegura123'
  })
});
```

#### Opção 3: Via SQL Direto (Avançado)

```sql
-- Inserir usuário diretamente no banco
INSERT INTO "User" (id, name, email, role, password_hash, created_at)
VALUES (
  gen_random_uuid(),
  'Nome do Usuário',
  'email@exemplo.com',
  'user',
  '$2a$12$hash_da_senha_aqui',
  NOW()
);
```

### 3. Estrutura de Dados dos Usuários

```sql
-- Tabela User no PostgreSQL
CREATE TABLE "User" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  password_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 4. Configuração de Variáveis de Ambiente

**Arquivo: `apps/api/.env`** (baseado em `env.example`)

```env
# Configuração do Banco de Dados
DATABASE_URL=postgresql://username:password@localhost:5432/database_name

# Configuração do Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Configuração do CORS
CORS_ORIGIN=https://uni-spin-web.vercel.app,http://localhost:5173

# Configuração do Servidor
PORT=8080

# Configuração SSL do Banco
FORCE_DB_SSL=false

# Configuração de Rede
FORCE_IPV4=true
```

## 🔧 Endpoints da API

### Vídeos
- `GET /api/videos` - Listar todos os vídeos
- `GET /api/videos/:id` - Obter vídeo por ID

### Trilhas
- `GET /api/trilhas` - Listar trilhas (requer autenticação)
- `GET /api/trilhas/test` - Testar estrutura do banco

### Autenticação
- `POST /api/auth/login` - Fazer login
- `POST /api/auth/logout` - Fazer logout
- `POST /api/auth/set-password` - Definir senha
- `GET /api/auth/me` - Obter dados do usuário logado

## 📋 Checklist para Inclusão

### Para Vídeos:
- [ ] Adicionar ID do YouTube no array de vídeos da trilha
- [ ] Criar entrada detalhada na playlist
- [ ] Atualizar duração total da trilha
- [ ] Incrementar quantidade de vídeos
- [ ] Testar reprodução do vídeo
- [ ] Verificar ordem sequencial

### Para Usuários:
- [ ] Criar usuário no Supabase ou banco de dados
- [ ] Definir senha segura
- [ ] Configurar role apropriado
- [ ] Testar login
- [ ] Verificar permissões de acesso
- [ ] Configurar variáveis de ambiente

## 🚀 Comandos Úteis

### Desenvolvimento
```bash
# Instalar dependências
npm install

# Executar API
cd apps/api
npm run dev

# Executar Frontend
cd apps/web
npm run dev
```

### Banco de Dados
```bash
# Testar conexão
psql $DATABASE_URL

# Verificar tabelas
\dt

# Verificar usuários
SELECT * FROM "User";
```

## ⚠️ Considerações Importantes

1. **Backup**: Sempre faça backup antes de modificar dados
2. **Testes**: Teste em ambiente de desenvolvimento primeiro
3. **IDs Únicos**: Use IDs únicos para vídeos e usuários
4. **Segurança**: Nunca commite senhas ou chaves de API
5. **Validação**: Valide dados antes de inserir no banco
6. **Logs**: Monitore logs para identificar problemas

## 📞 Suporte

Para dúvidas ou problemas:
1. Verificar logs da aplicação
2. Consultar documentação do Supabase
3. Verificar configurações de ambiente
4. Testar endpoints da API individualmente

---

**Última atualização**: $(date)
**Versão do documento**: 1.0
