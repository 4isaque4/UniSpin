@echo off
echo.
echo ========================================
echo   APLICAR PROXY CORRETO
echo ========================================
echo.
echo Este script aplica o web.config corrigido
echo com proxy reverso usando type="Rewrite"
echo.

:: Verificar se eh admin
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Este script precisa ser executado como Administrador!
    pause
    exit /b 1
)

echo [1/4] Copiando web.config corrigido para IIS...
copy /Y "C:\apps\UniSpin\apps\web\web.config" "C:\inetpub\wwwroot\UniSpin-Web\web.config" >nul 2>&1
if %errorLevel% equ 0 (
    echo [OK] web.config copiado
) else (
    echo [ERRO] Nao foi possivel copiar web.config
    pause
    exit /b 1
)

echo [2/4] Verificando sintaxe XML...
powershell -Command "try { [xml](Get-Content 'C:\inetpub\wwwroot\UniSpin-Web\web.config') | Out-Null; Write-Host '[OK] Sintaxe XML valida!' -ForegroundColor Green } catch { Write-Host '[ERRO] Erro na sintaxe XML:' $_.Exception.Message -ForegroundColor Red; pause; exit 1 }"

echo [3/4] Reiniciando IIS...
net stop w3svc /y >nul 2>&1
timeout /t 2 /nobreak >nul
net start w3svc >nul 2>&1
timeout /t 3 /nobreak >nul

echo [4/4] Testando HTTP, HTTPS e Proxy...
timeout /t 2 /nobreak >nul

echo.
echo Testando HTTP...
powershell -Command "try { $r = Invoke-WebRequest -Uri 'http://localhost:8081' -UseBasicParsing -TimeoutSec 5; Write-Host '[OK] HTTP funciona! Status:' $r.StatusCode -ForegroundColor Green } catch { Write-Host '[ERRO] HTTP nao funciona:' $_.Exception.Message -ForegroundColor Red }"

echo.
echo Testando HTTPS...
powershell -Command "[System.Net.ServicePointManager]::ServerCertificateValidationCallback = {$true}; try { $r = Invoke-WebRequest -Uri 'https://localhost:8443' -UseBasicParsing -TimeoutSec 10; Write-Host '[OK] HTTPS funciona! Status:' $r.StatusCode -ForegroundColor Green } catch { Write-Host '[ERRO] HTTPS nao funciona:' $_.Exception.Message -ForegroundColor Red }; [System.Net.ServicePointManager]::ServerCertificateValidationCallback = $null"

echo.
echo Testando Proxy /api/status...
powershell -Command "[System.Net.ServicePointManager]::ServerCertificateValidationCallback = {$true}; try { $r = Invoke-WebRequest -Uri 'https://localhost:8443/api/status' -UseBasicParsing -TimeoutSec 10; Write-Host '[OK] Proxy funciona! Status:' $r.StatusCode -ForegroundColor Green; Write-Host '     Resposta:' ($r.Content.Substring(0, [Math]::Min(100, $r.Content.Length))) -ForegroundColor Gray } catch { Write-Host '[ERRO] Proxy nao funciona:' $_.Exception.Message -ForegroundColor Red }; [System.Net.ServicePointManager]::ServerCertificateValidationCallback = $null"

echo.
echo ========================================
echo   APLICACAO CONCLUIDA
echo ========================================
echo.
echo Agora teste acessando:
echo   https://192.168.0.90:8443/trilhas
echo.
echo O proxy deve funcionar corretamente agora!
echo.
pause
