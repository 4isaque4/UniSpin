@echo off
echo.
echo ========================================
echo   REBUILD E DEPLOY RAPIDO
echo ========================================
echo.

:: Verificar se eh admin
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Este script precisa ser executado como Administrador!
    pause
    exit /b 1
)

echo [1/5] Parando IIS...
net stop w3svc /y >nul 2>&1
timeout /t 2 /nobreak >nul

echo [2/5] Limpando build anterior...
rd /s /q "C:\apps\UniSpin\apps\web\dist" >nul 2>&1
timeout /t 1 /nobreak >nul

echo [3/5] Fazendo novo build...
cd /d "C:\apps\UniSpin\apps\web"
call npm run build
if errorlevel 1 (
    echo [ERRO] Build falhou!
    net start w3svc >nul 2>&1
    pause
    exit /b 1
)

echo [4/5] Copiando para IIS...
xcopy /E /I /Y "C:\apps\UniSpin\apps\web\dist\*" "C:\inetpub\wwwroot\UniSpin-Web\" >nul
xcopy /Y "C:\apps\UniSpin\apps\web\web.config" "C:\inetpub\wwwroot\UniSpin-Web\" >nul

echo [5/5] Iniciando IIS...
net start w3svc >nul 2>&1
timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo   DEPLOY CONCLUIDO!
echo ========================================
echo.

for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
    set IP=%%a
    goto :ipfound
)
:ipfound
set IP=%IP:~1%

echo Acesse de outras maquinas:
echo   https://%IP%:8443
echo.
echo Acesse localmente:
echo   https://localhost:8443
echo.

echo Testando...
timeout /t 2 /nobreak >nul
powershell -Command "[System.Net.ServicePointManager]::ServerCertificateValidationCallback = {$true}; try { $r = Invoke-WebRequest -Uri 'https://localhost:8443' -UseBasicParsing -TimeoutSec 5; Write-Host '[OK] Site funcionando!' -ForegroundColor Green } catch { Write-Host '[ERRO] Site nao responde' -ForegroundColor Red }"

echo.
echo Agora recarregue a pagina no navegador!
echo.
pause
