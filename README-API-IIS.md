# Configurar API no IIS (Recomendado) ⭐

## Por que usar IIS com iisnode?

✅ **Vantagens:**
- Não precisa iniciar manualmente - IIS gerencia automaticamente
- Reinicia automaticamente se a API cair
- Integrado com Windows - pode gerenciar pelo IIS Manager
- Logs centralizados no IIS
- Não precisa manter processos Node.js rodando separadamente

## Como Instalar

### Passo 1: Execute o script de configuração

Como **Administrador**, execute:
```batch
CONFIGURAR-API-IIS.bat
```

O script vai:
1. ✅ Verificar se iisnode está instalado
2. ✅ Verificar se Node.js está instalado
3. ✅ Criar Application Pool `UniSpin-API-Pool`
4. ✅ Criar site IIS `UniSpin-API` na porta 8080
5. ✅ Iniciar o site automaticamente

### Passo 2: Testar

Depois de executar o script, teste se funcionou:

1. Abra o navegador
2. Acesse: `http://localhost:8080/status`
3. Deve retornar JSON com o status da API

### Passo 3: Testar via Frontend

1. Abra: `https://192.168.0.90:8443/trilhas`
2. Deve carregar normalmente (sem erro 502)

## Gerenciar a API via IIS

### PowerShell (como Admin):
```powershell
# Iniciar
Start-Website -Name "UniSpin-API"

# Parar
Stop-Website -Name "UniSpin-API"

# Reiniciar Application Pool
Restart-WebAppPool -Name "UniSpin-API-Pool"

# Ver status
Get-Website -Name "UniSpin-API" | Select-Object Name, State
```

### IIS Manager:
1. Abra **IIS Manager**
2. Expanda **Sites**
3. Clique com botão direito em **UniSpin-API**
4. Escolha **Gerenciar Site** → **Iniciar/Parar/Reiniciar**

## Como Funciona

1. O IIS escuta na porta 8080
2. O iisnode captura as requisições HTTP
3. O iisnode repassa para o Node.js (via named pipe)
4. O Node.js processa e retorna a resposta
5. O IIS retorna para o cliente

## Arquivos Importantes

- **web.config**: `C:\apps\UniSpin\apps\api\web.config`
  - Configuração do iisnode
  - URL Rewrite rules
  - Configurações de CORS

- **Site IIS**: 
  - Nome: `UniSpin-API`
  - Porta: `8080`
  - Caminho: `C:\apps\UniSpin\apps\api`
  - Pool: `UniSpin-API-Pool`

## Troubleshooting

### API não responde (erro 502)

1. **Verificar se o site está rodando:**
   ```powershell
   Get-Website -Name "UniSpin-API"
   ```

2. **Verificar logs do iisnode:**
   - Logs ficam em: `C:\apps\UniSpin\apps\api\src\iisnode\`
   - Procure por arquivos `.txt` com erros

3. **Verificar Application Pool:**
   ```powershell
   Get-WebAppPoolState -Name "UniSpin-API-Pool"
   ```
   Se estiver **Stopped**, inicie:
   ```powershell
   Start-WebAppPool -Name "UniSpin-API-Pool"
   ```

4. **Reiniciar o site:**
   ```powershell
   Restart-WebAppPool -Name "UniSpin-API-Pool"
   ```

### Porta 8080 já em uso

Se já tiver um processo Node.js rodando na porta 8080 manualmente:

1. Pare o processo:
   ```batch
   PARAR-API.bat
   ```

2. Ou via PowerShell:
   ```powershell
   Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force
   ```

3. Depois execute `CONFIGURAR-API-IIS.bat` novamente

## Remover Configuração

Se quiser remover o site IIS da API:

```powershell
Stop-Website -Name "UniSpin-API"
Remove-Website -Name "UniSpin-API"
Remove-WebAppPool -Name "UniSpin-API-Pool"
```

---

## Alternativas

Se não quiser usar IIS, veja `GUIA-API-AUTOMATICA.md` para outras opções:
- Task Scheduler (mais simples)
- PM2 (mais avançado)
