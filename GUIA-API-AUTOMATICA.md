# Guia: Como Fazer a API Iniciar Automaticamente

Existem **três opções** para fazer a API iniciar automaticamente:

## Opção 1: IIS com iisnode (RECOMENDADO) ⭐

**Vantagens:**
- ✅ Não precisa iniciar manualmente
- ✅ IIS gerencia automaticamente (reinicia se cair)
- ✅ Mais integrado com o ambiente Windows
- ✅ Logs do IIS
- ✅ Gerenciamento pelo IIS Manager

**Como usar:**
1. Execute como **Administrador**: `CONFIGURAR-API-IIS.bat`
2. A API vai rodar via IIS na porta 8080
3. **Pronto!** Não precisa fazer mais nada

**Gerenciar a API:**
- **Iniciar**: `Start-Website -Name 'UniSpin-API'` (ou pelo IIS Manager)
- **Parar**: `Stop-Website -Name 'UniSpin-API'`
- **Reiniciar**: `Restart-WebAppPool -Name 'UniSpin-API-Pool'`

**IMPORTANTE:** 
- Se o IIS estiver rodando, a API está rodando
- Não precisa mais rodar `npm start` manualmente
- O proxy reverso do frontend já está configurado para usar a porta 8080

---

## Opção 2: Task Scheduler (Simples)

**Vantagens:**
- Não precisa instalar nada extra
- Fácil de configurar e remover
- Funciona bem no Windows

**Como usar:**
1. Execute como **Administrador**: `INSTALAR-API-AUTOSTART.bat`
2. A API vai iniciar automaticamente quando você fizer login no Windows
3. Uma janela do CMD vai aparecer mostrando os logs da API

**Gerenciar a API:**
- **Iniciar agora**: `GERENCIAR-API.bat` → Opção 5
- **Parar**: `PARAR-API.bat` ou feche a janela do CMD
- **Remover autostart**: Execute no CMD como admin:
  ```batch
  schtasks /Delete /TN "UniSpin-API"
  ```

---

## Opção 3: PM2 (Mais Avançado)

**Vantagens:**
- Reinicia automaticamente se a API cair
- Logs mais organizados
- Pode rodar em background (sem janela)

**Como usar:**
1. Execute como **Administrador**: `INSTALAR-API-SERVICO.bat`
2. Ele vai instalar o PM2 globalmente
3. **IMPORTANTE**: Execute o comando que aparecer no final do script (será algo como `pm2 startup`)
4. A API vai iniciar automaticamente no boot do Windows

**Gerenciar a API:**
- **Ver status**: `GERENCIAR-API.bat` → Opção 1
- **Ver logs**: `GERENCIAR-API.bat` → Opção 2
- **Reiniciar**: `GERENCIAR-API.bat` → Opção 3
- **Parar**: `GERENCIAR-API.bat` → Opção 4
- **Iniciar**: `GERENCIAR-API.bat` → Opção 5

**Comandos PM2 diretos:**
```batch
pm2 status unispin-api
pm2 logs unispin-api
pm2 restart unispin-api
pm2 stop unispin-api
pm2 start unispin-api
```

---

## Qual Escolher?

- **Use Opção 1 (IIS/iisnode)** se você quer a solução mais profissional e integrada ⭐
- **Use Opção 2 (Task Scheduler)** se você quer algo simples e rápido
- **Use Opção 3 (PM2)** se você quer mais controle e reinício automático em caso de erro

---

## Verificar se a API Está Rodando

**Para IIS:**
```powershell
Get-Website -Name "UniSpin-API" | Select-Object Name, State
```

**Para Processo Node (PM2 ou Task Scheduler):**
```batch
netstat -ano | findstr :8080
```

Se aparecer algo com `LISTENING`, a API está rodando!

---

## Parar a API Atual

**Se rodando via IIS:**
```powershell
Stop-Website -Name "UniSpin-API"
```

**Se rodando via PM2 ou Task Scheduler:**
```batch
PARAR-API.bat
```

---

## Testar a API

Depois de configurar, teste se está funcionando:

1. Abra o navegador
2. Acesse: `https://192.168.0.90:8443/trilhas`
3. Se funcionar, está tudo certo! 🎉

**Teste direto na API:**
- Via IIS: `http://localhost:8080/status`
- Deve retornar JSON com status da API
