# Deploy UniSpin no IIS com HTTPS

## 📋 Resumo da Configuração

Este guia documenta o deploy do UniSpin no Windows Server com IIS e HTTPS.

## ✅ O que foi Configurado

### 1. Certificado SSL
- Certificado self-signed criado: `svmunispin.spinengenharia.local`
- Thumbprint: `A683E07105FD11C430ABCBF09585A33DE564C82C`
- Validade: 2 anos

### 2. Sites IIS
- **UniSpin-API**: Porta 8080 (HTTP)
- **UniSpin-Web**: Portas 8081 (HTTP/HTTPS) e 8443 (HTTPS)

### 3. Arquivos de Configuração
- `apps/api/web.config`: Configuração IIS para Node.js com iisnode
- `apps/web/web.config`: Configuração IIS para SPA (React)
- `deploy-iis.ps1`: Script PowerShell para deploy automatizado
- `create-ssl-cert.ps1`: Script para criar certificado SSL

## 🚨 Problema Conhecido: Conexão com Supabase

### Descrição do Problema
A API não consegue conectar ao banco Supabase devido a problema de resolução DNS:

```
Error: getaddrinfo ENOTFOUND db.xiuycdutdnjqpsmoglqz.supabase.co
```

### Causa
- O Supabase fornece apenas endereço IPv6 via DNS
- O Windows Server não tem roteamento IPv6 funcional
- DNS não resolve o hostname para IPv4

### ✅ Solução

Adicionar entrada manual no arquivo `C:\Windows\System32\drivers\etc\hosts`:

```
52.45.94.125    db.xiuycdutdnjqpsmoglqz.supabase.co
```

**Como aplicar:**
1. Abrir PowerShell como Administrador
2. Executar:
```powershell
notepad C:\Windows\System32\drivers\etc\hosts
```
3. Adicionar a linha acima no final do arquivo
4. Salvar e fechar
5. Limpar cache DNS:
```powershell
Clear-DnsClientCache
ipconfig /flushdns
```
6. Reiniciar a API

### Configuração .env da API

```env
# Configuração do Banco de Dados
DATABASE_URL=postgresql://postgres:DjdxiR91jzWM7SYW@db.xiuycdutdnjqpsmoglqz.supabase.co:5432/postgres

# Configuração do Supabase
SUPABASE_URL=https://xiuycdutdnjqpsmoglqz.supabase.co
SUPABASE_SERVICE_ROLE_KEY=[sua-key]

# Configuração do CORS
FRONTEND_ORIGINS=https://svmunispin.spinengenharia.local,https://uni-spin-web.vercel.app,http://localhost:5173,https://localhost:8081

# Configuração do Servidor
PORT=8080

# Ambiente
NODE_ENV=production

# SSL - aceitar certificado (necessário para Connection Pooler)
NODE_TLS_REJECT_UNAUTHORIZED=0
```

## 📦 Deploy

### Pré-requisitos
- Windows Server com IIS instalado
- Node.js v20.x ou superior
- iisnode instalado
- PowerShell com permissões de administrador

### Passos de Deploy

1. **Clonar o repositório e mudar para branch:**
```powershell
git clone https://github.com/4isaque4/UniSpin.git
cd UniSpin
git checkout iis-deployment
```

2. **Configurar DNS (IMPORTANTE):**
Adicionar ao hosts conforme descrito acima.

3. **Configurar variáveis de ambiente:**
```powershell
# Copiar e editar .env da API
copy apps\api\.env.example apps\api\.env
notepad apps\api\.env

# Copiar e editar .env do Frontend
copy apps\web\.env.example apps\web\.env
notepad apps\web\.env
```

4. **Executar deploy automatizado:**
```powershell
# Como Administrador
.\create-ssl-cert.ps1 -DnsName "svmunispin.spinengenharia.local"
$thumbprint = (Get-ChildItem Cert:\LocalMachine\My | Where-Object {$_.Subject -like "*svmunispin*"}).Thumbprint
.\deploy-iis.ps1 -CertThumbprint $thumbprint -DomainName "svmunispin.spinengenharia.local" -ApiPort 8080
```

5. **Ajustar bindings (evitar conflito com outros sites):**
```powershell
Remove-WebBinding -Name "UniSpin-Web" -Protocol "http" -Port 80
Remove-WebBinding -Name "UniSpin-Web" -Protocol "https" -Port 443
New-WebBinding -Name "UniSpin-Web" -Protocol "https" -Port 8081
New-WebBinding -Name "UniSpin-Web" -Protocol "https" -Port 8443 -HostHeader "svmunispin.spinengenharia.local"
```

6. **Rodar API manualmente (alternativa ao iisnode):**
```powershell
# Parar site da API no IIS
Stop-Website -Name "UniSpin-API"

# Rodar API com Node.js direto
cd C:\apps\UniSpin\apps\api
npm start
```

## 🌐 URLs de Acesso

- **Frontend HTTP**: http://localhost:8081
- **Frontend HTTPS**: https://localhost:8081
- **Frontend HTTPS (domínio)**: https://svmunispin.spinengenharia.local:8443
- **API**: http://localhost:8080

## 📝 Notas Importantes

1. **iisnode**: Tentamos usar iisnode mas não funcionou bem. Recomendamos rodar a API com Node.js direto.

2. **SSL Self-Signed**: O navegador vai mostrar aviso de certificado não confiável. Isso é normal para certificados self-signed.

3. **NODE_TLS_REJECT_UNAUTHORIZED=0**: Desabilita validação de certificado SSL. Use apenas em ambiente interno/desenvolvimento.

4. **CORS**: Certifique-se de que `FRONTEND_ORIGINS` no `.env` da API inclui todas as URLs do frontend.

## 🔧 Troubleshooting

### API não conecta ao banco
- Verifique se a entrada no hosts foi adicionada
- Execute `ping db.xiuycdutdnjqpsmoglqz.supabase.co` - deve retornar `52.45.94.125`
- Verifique logs da API para detalhes do erro

### Site não inicia no IIS
- Verifique conflito de portas: `Get-Website | Select Name, State, Bindings`
- Verifique logs do IIS em `C:\inetpub\logs\LogFiles`

### Erro de CORS
- Adicione a URL do frontend ao `FRONTEND_ORIGINS` no `.env` da API
- Reinicie a API

## 👥 Autores

Deploy configurado por: AI Assistant + Isaque Nunes
Data: Janeiro 2026
Branch: iis-deployment
