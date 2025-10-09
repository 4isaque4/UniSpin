# Configuração de Variáveis de Ambiente para Heroku

## Variáveis Obrigatórias

Configure as seguintes variáveis no painel do Heroku:

### 1. DATABASE_URL
```
postgresql://username:password@host:port/database
```
- URL completa de conexão com o banco PostgreSQL

### 2. SUPABASE_URL
```
https://your-project.supabase.co
```
- URL do seu projeto Supabase

### 3. SUPABASE_SERVICE_ROLE_KEY
```
your-service-role-key
```
- Chave de serviço do Supabase (não a chave pública)

### 4. FRONTEND_ORIGINS
```
https://unispin.site,https://www.unispin.site
```
- Domínios permitidos para CORS (separados por vírgula)

## Comandos para configurar no Heroku

```bash
# Após criar a aplicação no Heroku, configure as variáveis:
heroku config:set DATABASE_URL="sua-database-url"
heroku config:set SUPABASE_URL="sua-supabase-url"
heroku config:set SUPABASE_SERVICE_ROLE_KEY="sua-service-role-key"
heroku config:set FRONTEND_ORIGINS="https://unispin.site,https://www.unispin.site"
heroku config:set NODE_ENV="production"
```

## Adicionar Domínio Personalizado

```bash
# Adicionar domínio personalizado
heroku domains:add unispin.site
heroku domains:add www.unispin.site

# Verificar domínios configurados
heroku domains
```
