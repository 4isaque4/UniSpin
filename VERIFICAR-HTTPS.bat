@echo off
echo.
echo ========================================
echo   VERIFICAR CONFIGURACAO HTTPS
echo ========================================
echo.
echo Este script verifica a configuracao HTTPS
echo e certificado SSL do site.
echo.

:: Verificar se eh admin
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Este script precisa ser executado como Administrador!
    pause
    exit /b 1
)

echo [1/5] Testando HTTP (porta 8081)...
powershell -Command "try { $r = Invoke-WebRequest -Uri 'http://localhost:8081' -UseBasicParsing -TimeoutSec 5; Write-Host '[OK] HTTP funciona! Status:' $r.StatusCode -ForegroundColor Green } catch { Write-Host '[ERRO] HTTP nao funciona:' $_.Exception.Message -ForegroundColor Red }"

echo.
echo [2/5] Verificando certificados SSL...
powershell -ExecutionPolicy Bypass -Command "Import-Module WebAdministration; $cert = Get-ChildItem Cert:\LocalMachine\My | Where-Object { $_.FriendlyName -like '*UniSpin*' } | Select-Object -First 1; if ($cert) { Write-Host '[OK] Certificado encontrado:' $cert.FriendlyName -ForegroundColor Green; Write-Host '    Thumbprint:' $cert.Thumbprint } else { Write-Host '[AVISO] Certificado UniSpin nao encontrado' -ForegroundColor Yellow }"

echo.
echo [3/5] Verificando binding HTTPS...
powershell -ExecutionPolicy Bypass -Command "Import-Module WebAdministration; try { $binding = Get-WebBinding -Name 'UniSpin-Web' -Protocol https -ErrorAction Stop; Write-Host '[OK] Binding HTTPS encontrado' -ForegroundColor Green; Write-Host '    Porta:' $binding.bindingInformation; if ($binding.certificateHash) { Write-Host '    Certificado configurado: SIM' } else { Write-Host '    Certificado configurado: NAO' -ForegroundColor Red } } catch { Write-Host '[ERRO] Binding HTTPS nao encontrado!' -ForegroundColor Red }"

echo.
echo [4/5] Verificando se o site esta rodando...
powershell -ExecutionPolicy Bypass -Command "Import-Module WebAdministration; $site = Get-Website -Name 'UniSpin-Web' -ErrorAction SilentlyContinue; if ($site) { Write-Host '[OK] Site encontrado. Estado:' $site.State -ForegroundColor Green } else { Write-Host '[ERRO] Site nao encontrado!' -ForegroundColor Red }"

echo.
echo [5/5] Verificando Application Pool...
powershell -ExecutionPolicy Bypass -Command "Import-Module WebAdministration; $pool = Get-WebAppPoolState -Name 'UniSpin-Web-Pool' -ErrorAction SilentlyContinue; if ($pool) { Write-Host '[OK] Application Pool encontrado. Estado:' $pool.Value -ForegroundColor Green } else { Write-Host '[ERRO] Application Pool nao encontrado!' -ForegroundColor Red }"

echo.
echo ========================================
echo   DIAGNOSTICO CONCLUIDO
echo ========================================
echo.
echo Se HTTP funciona mas HTTPS nao:
echo 1. Verifique se o certificado esta configurado
echo 2. Verifique se o binding HTTPS esta correto
echo 3. Tente recriar o site com INICIAR-SITE.bat
echo.
pause
