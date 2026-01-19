@echo off
:: Solucao completa em um unico arquivo
echo.
echo ========================================
echo   SOLUCAO COMPLETA - UNISPIN HTTPS
echo ========================================
echo.

:: Verificar se eh admin
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Este script precisa ser executado como Administrador!
    echo.
    echo Clique com botao direito e selecione "Executar como administrador"
    pause
    exit /b 1
)

echo [1/6] Parando IIS...
net stop w3svc /y >nul 2>&1
timeout /t 3 /nobreak >nul

echo [2/6] Limpando diretorio dist travado...
rd /s /q "C:\apps\UniSpin\apps\web\dist" >nul 2>&1
timeout /t 2 /nobreak >nul

echo [3/6] Fazendo build do frontend...
cd /d "C:\apps\UniSpin\apps\web"
call npm run build
if errorlevel 1 (
    echo.
    echo [ERRO] Build falhou!
    echo.
    net start w3svc >nul 2>&1
    pause
    exit /b 1
)

echo [4/6] Iniciando IIS...
net start w3svc >nul 2>&1
timeout /t 2 /nobreak >nul

echo [5/6] Copiando para IIS...
if not exist "C:\inetpub\wwwroot\UniSpin-Web" mkdir "C:\inetpub\wwwroot\UniSpin-Web"
xcopy /E /I /Y "C:\apps\UniSpin\apps\web\dist\*" "C:\inetpub\wwwroot\UniSpin-Web\" >nul

echo [6/6] Configurando site IIS...
powershell -ExecutionPolicy Bypass -Command "& { Import-Module WebAdministration; $site = Get-Website -Name 'UniSpin-Web' -ErrorAction SilentlyContinue; if ($site) { Start-Website -Name 'UniSpin-Web' } else { $pool = New-WebAppPool -Name 'UniSpin-Web-Pool' -ErrorAction SilentlyContinue; if ($pool) { $pool.managedRuntimeVersion = ''; $pool | Set-Item }; New-Website -Name 'UniSpin-Web' -Port 8081 -PhysicalPath 'C:\inetpub\wwwroot\UniSpin-Web' -ApplicationPool 'UniSpin-Web-Pool' -Force | Out-Null; New-WebBinding -Name 'UniSpin-Web' -Protocol https -Port 8443 -SslFlags 0 -ErrorAction SilentlyContinue | Out-Null; $cert = Get-ChildItem Cert:\LocalMachine\My | Where-Object { $_.FriendlyName -like '*UniSpin*' } | Select-Object -First 1; if ($cert) { $binding = Get-WebBinding -Name 'UniSpin-Web' -Protocol https; $binding.AddSslCertificate($cert.Thumbprint, 'My') }; Start-Website -Name 'UniSpin-Web' } }"

timeout /t 2 /nobreak >nul

echo.
echo ========================================
echo   DEPLOY CONCLUIDO!
echo ========================================
echo.

:: Obter IP
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
echo   http://localhost:8081
echo.

echo Testando conexao local...
powershell -Command "try { $r = Invoke-WebRequest -Uri 'http://localhost:8081' -UseBasicParsing -TimeoutSec 3; Write-Host '[OK] Frontend HTTP respondendo!' -ForegroundColor Green } catch { Write-Host '[ERRO] Frontend nao responde' -ForegroundColor Red }"

echo.
pause
