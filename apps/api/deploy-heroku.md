# Deploy para Heroku - Guia Passo a Passo

## 1. Instalar Heroku CLI
- Baixe em: https://devcenter.heroku.com/articles/heroku-cli
- Instale e reinicie o terminal

## 2. Fazer Login no Heroku
```bash
heroku login
```

## 3. Criar Aplicação no Heroku
```bash
# Navegue para a pasta da API
cd apps/api

# Crie a aplicação (substitua 'unispin-api' pelo nome desejado)
heroku create unispin-api

# Ou se já existe, conecte ao repositório
heroku git:remote -a unispin-api
```

## 4. Configurar Variáveis de Ambiente
```bash
# Configure as variáveis necessárias
heroku config:set DATABASE_URL="sua-database-url"
heroku config:set SUPABASE_URL="sua-supabase-url"
heroku config:set SUPABASE_SERVICE_ROLE_KEY="sua-service-role-key"
heroku config:set FRONTEND_ORIGINS="https://unispin.site,https://www.unispin.site"
heroku config:set NODE_ENV="production"
```

## 5. Fazer Deploy
```bash
# Deploy para o Heroku
git add .
git commit -m "Deploy para Heroku"
git push heroku main
```

## 6. Adicionar Domínio Personalizado
```bash
# Adicionar domínio personalizado
heroku domains:add unispin.site
heroku domains:add www.unispin.site

# Verificar domínios
heroku domains
```

## 7. Configurar DNS
No painel do seu provedor de domínio, configure:

### Para unispin.site (domínio principal):
- **Tipo**: CNAME
- **Nome**: @ ou unispin.site
- **Valor**: unispin-api.herokuapp.com

### Para www.unispin.site (subdomínio):
- **Tipo**: CNAME  
- **Nome**: www
- **Valor**: unispin-api.herokuapp.com

## 8. Verificar SSL
O Heroku automaticamente fornece certificados SSL gratuitos para domínios personalizados. Aguarde alguns minutos após configurar o DNS.

## Comandos Úteis
```bash
# Ver logs da aplicação
heroku logs --tail

# Abrir aplicação no navegador
heroku open

# Verificar status
heroku ps

# Ver configurações
heroku config
```
