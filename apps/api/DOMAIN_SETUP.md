# Configuração de Domínio Personalizado no Heroku

## ✅ Status Atual

- ✅ Aplicação criada: `unispin-api`
- ✅ Deploy concluído com sucesso
- ✅ Aplicação rodando em: https://unispin-api-b916b4ae49e1.herokuapp.com/
- ✅ SSL Automático habilitado
- ✅ Todas as variáveis de ambiente configuradas

## 🌐 Configurar Domínio Personalizado

### Opção 1: Via Painel do Heroku (Recomendado)

1. Acesse: https://dashboard.heroku.com/apps/unispin-api/settings
2. Role até a seção **"Domains"**
3. Clique em **"Add domain"**
4. Adicione os seguintes domínios:
   - `unispin.site`
   - `www.unispin.site`
5. O Heroku fornecerá um DNS target para cada domínio (exemplo: `xxxx.herokudns.com`)

### Opção 2: Via CLI (Se a Opção 1 não funcionar)

Caso o erro de SNI persista, você pode precisar fazer upgrade do plano:

```bash
# Upgrade para plano Eco (que suporta domínios personalizados)
heroku dyno:type eco -a unispin-api

# Após o upgrade, adicione os domínios
heroku domains:add unispin.site -a unispin-api
heroku domains:add www.unispin.site -a unispin-api

# Verifique os domínios
heroku domains -a unispin-api
```

## 📝 Configuração do DNS

Após adicionar os domínios no Heroku, você receberá um DNS target. Configure no seu provedor de domínio:

### Onde você comprou o domínio unispin.site?

**Configuração para Registro.br:**
1. Acesse: https://registro.br/
2. Faça login
3. Vá em "Meus Domínios" > "unispin.site"
4. Clique em "Alterar Servidores DNS"

**Adicione os seguintes registros:**

```
Tipo: CNAME
Host: @
Valor: [DNS target fornecido pelo Heroku]
TTL: 3600

Tipo: CNAME  
Host: www
Valor: [DNS target fornecido pelo Heroku]
TTL: 3600
```

**Nota:** Alguns provedores não permitem CNAME no root (@). Nesse caso, use:
- Para o root (@): ALIAS ou ANAME (se disponível)
- Ou configure um redirecionamento de @ para www

### Configuração para Cloudflare:
1. Acesse: https://dash.cloudflare.com/
2. Selecione o domínio "unispin.site"
3. Vá em "DNS" > "Records"
4. Adicione:

```
Type: CNAME
Name: @
Target: [DNS target do Heroku]
Proxy status: DNS only (nuvem cinza)

Type: CNAME
Name: www
Target: [DNS target do Heroku]
Proxy status: DNS only (nuvem cinza)
```

### Configuração para GoDaddy:
1. Acesse sua conta GoDaddy
2. Vá em "Meus Produtos" > "DNS"
3. Adicione:

```
Type: CNAME
Name: @
Value: [DNS target do Heroku]
TTL: 1 Hour

Type: CNAME
Name: www
Value: [DNS target do Heroku]
TTL: 1 Hour
```

### Configuração para Namecheap:
1. Acesse: https://www.namecheap.com/
2. Domain List > Manage
3. Advanced DNS

```
Type: CNAME Record
Host: @
Value: [DNS target do Heroku]
TTL: Automatic

Type: CNAME Record
Host: www
Value: [DNS target do Heroku]
TTL: Automatic
```

## 🔒 SSL/HTTPS

O Heroku fornece SSL automático e gratuito para todos os domínios personalizados através do ACM (Automated Certificate Management). Após configurar o DNS:

1. Aguarde a propagação do DNS (pode levar de 15 minutos a 48 horas)
2. O Heroku automaticamente emitirá um certificado SSL
3. Verifique o status:

```bash
heroku certs:auto -a unispin-api
```

## ✅ Verificação

Após configurar o DNS, teste:

```bash
# Verificar domínios configurados
heroku domains -a unispin-api

# Verificar SSL
heroku certs -a unispin-api

# Testar no navegador
https://unispin.site
https://www.unispin.site
```

## 🔧 Troubleshooting

**Problema: DNS não propaga**
- Aguarde até 48 horas
- Verifique com: `nslookup unispin.site`

**Problema: SSL não ativa**
- Aguarde alguns minutos após DNS propagar
- Execute: `heroku certs:auto:wait -a unispin-api`

**Problema: Erro SNI**
- Considere fazer upgrade para plano Eco ($5/mês)
- Ou configure via painel web do Heroku

## 💰 Custos

- **Plano Basic**: Gratuito (pode ter limitações com domínios personalizados)
- **Plano Eco**: $5/mês (suporta domínios personalizados sem problemas)
- **SSL**: Gratuito (incluído em todos os planos)

## 📞 Suporte

Se tiver problemas:
1. Tente adicionar o domínio via painel web: https://dashboard.heroku.com/apps/unispin-api/settings
2. Verifique a documentação: https://devcenter.heroku.com/articles/custom-domains
3. Entre em contato com suporte Heroku

