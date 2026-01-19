@echo off
echo.
echo ========================================
echo   CORRIGIR HTTPS - DIAGNOSTICO COMPLETO
echo ========================================
echo.
echo Este script diagnostica e corrige problemas
echo com HTTPS e certificado SSL.
echo.

:: Verificar se eh admin
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Este script precisa ser executado como Administrador!
    pause
    exit /b 1
)

echo [1/6] Verificando se HTTP funciona...
powershell -Command "try { $r = Invoke-WebRequest -Uri 'http://localhost:8081' -UseBasicParsing -TimeoutSec 5; Write-Host '[OK] HTTP funciona! Status:' $r.StatusCode -ForegroundColor Green } catch { Write-Host '[ERRO] HTTP nao funciona:' $_.Exception.Message -ForegroundColor Red; Write-Host '      O problema nao e apenas HTTPS!' -ForegroundColor Yellow }"

echo.
echo [2/6] Verificando certificados disponiveis...
powershell -ExecutionPolicy Bypass -Command "Import-Module WebAdministration; $certs = Get-ChildItem Cert:\LocalMachine\My | Where-Object { $_.HasPrivateKey -eq $true } | Select-Object FriendlyName, Thumbprint, Subject; if ($certs) { Write-Host '[OK] Certificados encontrados:' -ForegroundColor Green; $certs | ForEach-Object { Write-Host \"  - $($_.FriendlyName): $($_.Subject)\" } } else { Write-Host '[AVISO] Nenhum certificado com chave privada encontrado' -ForegroundColor Yellow }"

echo.
echo [3/6] Recriando site e binding HTTPS...
powershell -ExecutionPolicy Bypass -Command "& { Import-Module WebAdministration; Write-Host '[1] Parando site...' -ForegroundColor Cyan; Stop-Website -Name 'UniSpin-Web' -ErrorAction SilentlyContinue; Start-Sleep -Seconds 1; Write-Host '[2] Removendo bindings antigos...' -ForegroundColor Cyan; Remove-WebBinding -Name 'UniSpin-Web' -Protocol https -ErrorAction SilentlyContinue; Start-Sleep -Seconds 1; Write-Host '[3] Criando novo binding HTTPS...' -ForegroundColor Cyan; New-WebBinding -Name 'UniSpin-Web' -Protocol https -Port 8443 -IPAddress '*' -ErrorAction SilentlyContinue | Out-Null; Start-Sleep -Seconds 1; Write-Host '[4] Configurando certificado...' -ForegroundColor Cyan; $cert = Get-ChildItem Cert:\LocalMachine\My | Where-Object { $_.HasPrivateKey -eq $true } | Select-Object -First 1; if (-not $cert) { $cert = Get-ChildItem Cert:\LocalMachine\My | Select-Object -First 1 }; if ($cert) { try { $binding = Get-WebBinding -Name 'UniSpin-Web' -Protocol https; $binding.AddSslCertificate($cert.Thumbprint, 'My'); Write-Host \"[OK] Certificado configurado: $($cert.FriendlyName)\" -ForegroundColor Green } catch { Write-Host '[ERRO] Nao foi possivel configurar certificado:' $_.Exception.Message -ForegroundColor Red } } else { Write-Host '[AVISO] Nenhum certificado encontrado para configurar' -ForegroundColor Yellow }; Write-Host '[5] Iniciando site...' -ForegroundColor Cyan; Start-Website -Name 'UniSpin-Web'; Start-Sleep -Seconds 2; $status = (Get-Website -Name 'UniSpin-Web').State; if ($status -eq 'Started') { Write-Host '[OK] Site iniciado!' -ForegroundColor Green } else { Write-Host '[ERRO] Site nao iniciou. Status:' $status -ForegroundColor Red } }"

echo.
echo [4/6] Testando HTTP novamente...
timeout /t 2 /nobreak >nul
powershell -Command "try { $r = Invoke-WebRequest -Uri 'http://localhost:8081' -UseBasicParsing -TimeoutSec 5; Write-Host '[OK] HTTP funciona! Status:' $r.StatusCode -ForegroundColor Green } catch { Write-Host '[ERRO] HTTP ainda nao funciona:' $_.Exception.Message -ForegroundColor Red }"

echo.
echo [5/6] Testando HTTPS...
timeout /t 2 /nobreak >nul
powershell -Command "[System.Net.ServicePointManager]::ServerCertificateValidationCallback = {$true}; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12 -bor [System.Net.SecurityProtocolType]::Tls11 -bor [System.Net.SecurityProtocolType]::Tls; try { $r = Invoke-WebRequest -Uri 'https://localhost:8443' -UseBasicParsing -TimeoutSec 10; Write-Host '[OK] HTTPS funciona! Status:' $r.StatusCode -ForegroundColor Green } catch { Write-Host '[ERRO] HTTPS ainda nao funciona:' $_.Exception.Message -ForegroundColor Red }; [System.Net.ServicePointManager]::ServerCertificateValidationCallback = $null"

echo.
echo [6/6] Verificando Application Pool...
powershell -ExecutionPolicy Bypass -Command "Import-Module WebAdministration; $pool = Get-WebAppPoolState -Name 'UniSpin-Web-Pool' -ErrorAction SilentlyContinue; if ($pool) { Write-Host \"[OK] Application Pool: $($pool.Value)\" -ForegroundColor Green } else { Write-Host '[ERRO] Application Pool nao encontrado!' -ForegroundColor Red }"

echo.
echo ========================================
echo   DIAGNOSTICO CONCLUIDO
echo ========================================
echo.
echo Se HTTPS ainda nao funcionar:
echo 1. Verifique se ha um certificado valido instalado
echo 2. Verifique os logs do IIS em Event Viewer
echo 3. Tente acessar pelo navegador e veja o erro exato
echo.
pause
