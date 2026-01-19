@echo off
echo.
echo ========================================
echo   APLICAR PROXY REVERSO FINAL
echo ========================================
echo.
echo Este script aplica o web.config final com:
echo - Proxy reverso usando type="Rewrite"
echo - ServerVariables configuradas
echo - preserveHostHeader="true"
echo.

:: Verificar se eh admin
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Este script precisa ser executado como Administrador!
    pause
    exit /b 1
)

echo [1/5] Verificando se ARR esta configurado...
powershell -ExecutionPolicy Bypass -Command "Import-Module WebAdministration; $proxy = Get-WebConfigurationProperty -PSPath 'MACHINE/WEBROOT/APPHOST' -Filter 'system.webServer/proxy' -Name 'enabled' -ErrorAction SilentlyContinue; if ($proxy -eq $true) { Write-Host '[OK] ARR proxy habilitado!' -ForegroundColor Green } else { Write-Host '[AVISO] Execute CONFIGURAR-ARR.bat primeiro!' -ForegroundColor Yellow; pause }"

echo.
echo [2/5] Verificando variaveis de servidor...
powershell -ExecutionPolicy Bypass -Command "Import-Module WebAdministration; $existing = Get-WebConfigurationProperty -PSPath 'MACHINE/WEBROOT/APPHOST' -Filter 'system.webServer/rewrite/allowedServerVariables' -Name '.' | Select-Object -ExpandProperty Collection | Select-Object -ExpandProperty Name -ErrorAction SilentlyContinue; if ($existing -contains 'HTTP_X_FORWARDED_PROTO' -and $existing -contains 'HTTP_X_FORWARDED_HOST') { Write-Host '[OK] Variaveis de servidor configuradas!' -ForegroundColor Green } else { Write-Host '[AVISO] Execute CONFIGURAR-ARR.bat para configurar variaveis!' -ForegroundColor Yellow }"

echo.
echo [3/5] Copiando web.config para IIS...
copy /Y "C:\apps\UniSpin\apps\web\web.config" "C:\inetpub\wwwroot\UniSpin-Web\web.config" >nul 2>&1
if %errorLevel% equ 0 (
    echo [OK] web.config copiado
) else (
    echo [ERRO] Nao foi possivel copiar web.config
    pause
    exit /b 1
)

echo [4/5] Verificando sintaxe XML...
powershell -Command "try { [xml](Get-Content 'C:\inetpub\wwwroot\UniSpin-Web\web.config') | Out-Null; Write-Host '[OK] Sintaxe XML valida!' -ForegroundColor Green } catch { Write-Host '[ERRO] Erro na sintaxe XML:' $_.Exception.Message -ForegroundColor Red; pause; exit 1 }"

echo [5/5] Reiniciando IIS...
net stop w3svc /y >nul 2>&1
timeout /t 2 /nobreak >nul
net start w3svc >nul 2>&1
timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo   TESTANDO CONFIGURACAO
echo ========================================
echo.

timeout /t 2 /nobreak >nul

echo Testando HTTP...
powershell -Command "try { $r = Invoke-WebRequest -Uri 'http://localhost:8081' -UseBasicParsing -TimeoutSec 5; Write-Host '[OK] HTTP funciona! Status:' $r.StatusCode -ForegroundColor Green } catch { Write-Host '[ERRO] HTTP nao funciona:' $_.Exception.Message -ForegroundColor Red }"

echo.
echo Testando HTTPS...
powershell -Command "[System.Net.ServicePointManager]::ServerCertificateValidationCallback = {$true}; try { $r = Invoke-WebRequest -Uri 'https://localhost:8443' -UseBasicParsing -TimeoutSec 10; Write-Host '[OK] HTTPS funciona! Status:' $r.StatusCode -ForegroundColor Green } catch { Write-Host '[ERRO] HTTPS nao funciona:' $_.Exception.Message -ForegroundColor Red }; [System.Net.ServicePointManager]::ServerCertificateValidationCallback = $null"

echo.
echo Testando Proxy /api/status...
powershell -Command "[System.Net.ServicePointManager]::ServerCertificateValidationCallback = {$true}; try { $r = Invoke-WebRequest -Uri 'https://localhost:8443/api/status' -UseBasicParsing -TimeoutSec 10; Write-Host '[OK] Proxy funciona! Status:' $r.StatusCode -ForegroundColor Green; $content = $r.Content | ConvertFrom-Json -ErrorAction SilentlyContinue; if ($content) { Write-Host \"     API Status: $($content.status)\" -ForegroundColor Gray } else { Write-Host '     Resposta recebida (pode ser HTML se proxy nao funcionou)' -ForegroundColor Yellow } } catch { $status = $_.Exception.Response.StatusCode.value__; if ($status) { Write-Host \"[AVISO] Proxy retornou status: $status\" -ForegroundColor Yellow } else { Write-Host '[ERRO] Proxy nao funciona:' $_.Exception.Message -ForegroundColor Red } }; [System.Net.ServicePointManager]::ServerCertificateValidationCallback = $null"

echo.
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
    set IP=%%a
    goto :ipfound
)
:ipfound
set IP=%IP:~1%

echo ========================================
echo   CONFIGURACAO APLICADA!
echo ========================================
echo.
echo Teste acessando:
echo   https://localhost:8443/trilhas (local)
echo   https://%IP%:8443/trilhas (de outra maquina)
echo.
echo Se o proxy funcionar, a API retornara JSON
echo em vez de HTML e a pagina Trilhas carregara!
echo.
pause
