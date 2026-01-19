@echo off
echo.
echo ========================================
echo   REMOVER PROXY - TESTE BASICO
echo ========================================
echo.
echo Este script remove o proxy do web.config
echo para testar se o site funciona basico.
echo.

:: Verificar se eh admin
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Este script precisa ser executado como Administrador!
    pause
    exit /b 1
)

echo [1/4] Fazendo backup do web.config atual...
if exist "C:\inetpub\wwwroot\UniSpin-Web\web.config" (
    copy /Y "C:\inetpub\wwwroot\UniSpin-Web\web.config" "C:\inetpub\wwwroot\UniSpin-Web\web.config.proxy.bak" >nul 2>&1
    echo [OK] Backup criado
)

echo [2/4] Aplicando web.config sem proxy...
copy /Y "C:\apps\UniSpin\apps\web\web.config.teste" "C:\inetpub\wwwroot\UniSpin-Web\web.config" >nul 2>&1
if %errorLevel% equ 0 (
    echo [OK] web.config sem proxy aplicado
) else (
    echo [ERRO] Nao foi possivel copiar web.config
    pause
    exit /b 1
)

echo [3/4] Reiniciando IIS...
net stop w3svc /y >nul 2>&1
timeout /t 2 /nobreak >nul
net start w3svc >nul 2>&1
timeout /t 3 /nobreak >nul

echo [4/4] Testando HTTP e HTTPS...
timeout /t 2 /nobreak >nul

echo.
echo Testando HTTP...
powershell -Command "try { $r = Invoke-WebRequest -Uri 'http://localhost:8081' -UseBasicParsing -TimeoutSec 5; Write-Host '[OK] HTTP funciona! Status:' $r.StatusCode -ForegroundColor Green } catch { Write-Host '[ERRO] HTTP nao funciona:' $_.Exception.Message -ForegroundColor Red }"

echo.
echo Testando HTTPS...
powershell -Command "[System.Net.ServicePointManager]::ServerCertificateValidationCallback = {$true}; try { $r = Invoke-WebRequest -Uri 'https://localhost:8443' -UseBasicParsing -TimeoutSec 10; Write-Host '[OK] HTTPS funciona! Status:' $r.StatusCode -ForegroundColor Green } catch { Write-Host '[ERRO] HTTPS nao funciona:' $_.Exception.Message -ForegroundColor Red }; [System.Net.ServicePointManager]::ServerCertificateValidationCallback = $null"

echo.
echo ========================================
echo   TESTE CONCLUIDO
echo ========================================
echo.
echo Se HTTP/HTTPS funcionarem agora:
echo   O problema estava no type="Proxy"
echo   Execute CONFIGURAR-ARR.bat e depois
echo   REBUILD-E-DEPLOY.bat para restaurar o proxy
echo.
echo Para restaurar o web.config com proxy:
echo   copy "C:\inetpub\wwwroot\UniSpin-Web\web.config.proxy.bak" "C:\inetpub\wwwroot\UniSpin-Web\web.config"
echo.
pause
