@echo off
echo.
echo ========================================
echo   SOLUCAO ERRO 500 - PASSO A PASSO
echo ========================================
echo.
echo O erro 500 esta acontecendo porque o
echo type="Proxy" no web.config requer que
echo o ARR esteja totalmente configurado.
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
    copy "C:\inetpub\wwwroot\UniSpin-Web\web.config" "C:\inetpub\wwwroot\UniSpin-Web\web.config.backup" >nul 2>&1
    echo [OK] Backup criado
)

echo [2/4] Testando sem proxy primeiro...
copy /Y "C:\apps\UniSpin\apps\web\web.config.teste" "C:\inetpub\wwwroot\UniSpin-Web\web.config" >nul 2>&1
echo [OK] web.config sem proxy aplicado

echo [3/4] Reiniciando IIS...
net stop w3svc /y >nul 2>&1
timeout /t 2 /nobreak >nul
net start w3svc >nul 2>&1
timeout /t 3 /nobreak >nul

echo [4/4] Testando se o site funciona sem proxy...
timeout /t 2 /nobreak >nul
powershell -Command "[System.Net.ServicePointManager]::ServerCertificateValidationCallback = {$true}; try { $r = Invoke-WebRequest -Uri 'https://localhost:8443' -UseBasicParsing -TimeoutSec 5; Write-Host '[OK] Site funciona sem proxy! Status:' $r.StatusCode -ForegroundColor Green } catch { Write-Host '[ERRO] Site ainda nao funciona:' $_.Exception.Message -ForegroundColor Red }; [System.Net.ServicePointManager]::ServerCertificateValidationCallback = $null"

echo.
echo ========================================
echo   TESTE CONCLUIDO
echo ========================================
echo.
echo Se o site funcionou sem proxy, execute
echo CONFIGURAR-ARR.bat novamente e depois
echo REBUILD-E-DEPLOY.bat para restaurar o
echo web.config com proxy.
echo.
pause
