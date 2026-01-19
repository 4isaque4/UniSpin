@echo off
:: Script para iniciar o site IIS
echo.
echo ========================================
echo   INICIANDO SITE UNISPIN
echo ========================================
echo.

:: Verificar se eh admin
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Este script precisa ser executado como Administrador!
    pause
    exit /b 1
)

echo [1/3] Parando site se existir...
powershell -ExecutionPolicy Bypass -Command "Import-Module WebAdministration; Stop-Website -Name 'UniSpin-Web' -ErrorAction SilentlyContinue"
timeout /t 2 /nobreak >nul

echo [2/3] Removendo site antigo...
powershell -ExecutionPolicy Bypass -Command "Import-Module WebAdministration; Remove-Website -Name 'UniSpin-Web' -ErrorAction SilentlyContinue; Remove-WebAppPool -Name 'UniSpin-Web-Pool' -ErrorAction SilentlyContinue"
timeout /t 2 /nobreak >nul

echo [3/3] Criando e iniciando site...
powershell -ExecutionPolicy Bypass -Command "& { Import-Module WebAdministration; $pool = New-WebAppPool -Name 'UniSpin-Web-Pool'; $pool.managedRuntimeVersion = ''; $pool.processModel.identityType = 'NetworkService'; $pool | Set-Item; New-Website -Name 'UniSpin-Web' -Port 8081 -PhysicalPath 'C:\inetpub\wwwroot\UniSpin-Web' -ApplicationPool 'UniSpin-Web-Pool' -Force | Out-Null; New-WebBinding -Name 'UniSpin-Web' -Protocol https -Port 8443 -IPAddress '*' -ErrorAction SilentlyContinue | Out-Null; $cert = Get-ChildItem Cert:\LocalMachine\My | Where-Object { $_.FriendlyName -like '*UniSpin*' } | Select-Object -First 1; if ($cert) { $binding = Get-WebBinding -Name 'UniSpin-Web' -Protocol https; try { $binding.AddSslCertificate($cert.Thumbprint, 'My') } catch {} }; Start-Website -Name 'UniSpin-Web'; Start-Sleep -Seconds 2; $status = (Get-Website -Name 'UniSpin-Web').State; Write-Host ''; if ($status -eq 'Started') { Write-Host '[OK] Site iniciado com sucesso!' -ForegroundColor Green } else { Write-Host '[ERRO] Site nao iniciou. Status: ' $status -ForegroundColor Red } }"

echo.
echo ========================================
echo   TESTANDO CONEXAO...
echo ========================================
echo.

timeout /t 3 /nobreak >nul

powershell -Command "try { $r = Invoke-WebRequest -Uri 'http://localhost:8081' -UseBasicParsing -TimeoutSec 5; Write-Host '[OK] HTTP funcionando!' -ForegroundColor Green } catch { Write-Host '[ERRO] HTTP nao responde: ' $_.Exception.Message -ForegroundColor Red }"

echo.
powershell -Command "[System.Net.ServicePointManager]::ServerCertificateValidationCallback = {$true}; try { $r = Invoke-WebRequest -Uri 'https://localhost:8443' -UseBasicParsing -TimeoutSec 5; Write-Host '[OK] HTTPS funcionando!' -ForegroundColor Green } catch { Write-Host '[ERRO] HTTPS nao responde: ' $_.Exception.Message -ForegroundColor Red }; [System.Net.ServicePointManager]::ServerCertificateValidationCallback = $null"

echo.
echo ========================================
echo   ENDERECOS DE ACESSO
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
echo   http://localhost:8081
echo.
pause
