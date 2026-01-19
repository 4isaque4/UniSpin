@echo off
echo.
echo ========================================
echo   CORRIGIR HTTPS - CONFIGURAR CERTIFICADO
echo ========================================
echo.
echo HTTP funciona! Agora vamos corrigir HTTPS.
echo.

:: Verificar se eh admin
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Este script precisa ser executado como Administrador!
    pause
    exit /b 1
)

echo [1/5] Verificando certificados disponiveis...
powershell -ExecutionPolicy Bypass -Command "Import-Module WebAdministration; $certs = Get-ChildItem Cert:\LocalMachine\My | Where-Object { $_.HasPrivateKey -eq $true -and $_.NotAfter -gt (Get-Date) } | Select-Object FriendlyName, Thumbprint, Subject, NotAfter | Sort-Object NotAfter -Descending; if ($certs) { Write-Host '[OK] Certificados validos encontrados:' -ForegroundColor Green; $certs | ForEach-Object { Write-Host \"  - $($_.FriendlyName): $($_.Subject) (Valido ate $($_.NotAfter.ToString('dd/MM/yyyy')))\" } } else { Write-Host '[AVISO] Nenhum certificado valido encontrado' -ForegroundColor Yellow }"

echo.
echo [2/5] Configurando certificado no binding HTTPS...
powershell -ExecutionPolicy Bypass -Command "& { Import-Module WebAdministration; Write-Host '[1] Parando site...' -ForegroundColor Cyan; Stop-Website -Name 'UniSpin-Web' -ErrorAction SilentlyContinue; Start-Sleep -Seconds 1; Write-Host '[2] Removendo binding HTTPS antigo...' -ForegroundColor Cyan; Remove-WebBinding -Name 'UniSpin-Web' -Protocol https -ErrorAction SilentlyContinue; Start-Sleep -Seconds 1; Write-Host '[3] Criando novo binding HTTPS na porta 8443...' -ForegroundColor Cyan; New-WebBinding -Name 'UniSpin-Web' -Protocol https -Port 8443 -IPAddress '*' -SslFlags 0 -ErrorAction SilentlyContinue | Out-Null; Start-Sleep -Seconds 1; Write-Host '[4] Buscando melhor certificado...' -ForegroundColor Cyan; $cert = Get-ChildItem Cert:\LocalMachine\My | Where-Object { $_.HasPrivateKey -eq $true -and $_.NotAfter -gt (Get-Date) } | Sort-Object NotAfter -Descending | Select-Object -First 1; if (-not $cert) { $cert = Get-ChildItem Cert:\LocalMachine\My | Where-Object { $_.FriendlyName -like '*UniSpin*' } | Select-Object -First 1 }; if (-not $cert) { $cert = Get-ChildItem Cert:\LocalMachine\My | Select-Object -First 1 }; if ($cert) { try { Write-Host \"[5] Configurando certificado: $($cert.FriendlyName)\" -ForegroundColor Cyan; $binding = Get-WebBinding -Name 'UniSpin-Web' -Protocol https; $binding.AddSslCertificate($cert.Thumbprint, 'My'); Write-Host \"[OK] Certificado configurado com sucesso!\" -ForegroundColor Green; Write-Host \"    Certificado: $($cert.FriendlyName)\" -ForegroundColor Gray; Write-Host \"    Thumbprint: $($cert.Thumbprint)\" -ForegroundColor Gray } catch { Write-Host '[ERRO] Nao foi possivel configurar certificado:' $_.Exception.Message -ForegroundColor Red; Write-Host '       Tentando metodo alternativo...' -ForegroundColor Yellow; netsh http add sslcert ipport=0.0.0.0:8443 certhash=$($cert.Thumbprint) appid='{4dc3e181-e14b-4a21-b022-59fc669b0914}' } } else { Write-Host '[ERRO] Nenhum certificado encontrado para configurar!' -ForegroundColor Red }; Write-Host '[6] Iniciando site...' -ForegroundColor Cyan; Start-Website -Name 'UniSpin-Web'; Start-Sleep -Seconds 2; $status = (Get-Website -Name 'UniSpin-Web').State; if ($status -eq 'Started') { Write-Host '[OK] Site iniciado!' -ForegroundColor Green } else { Write-Host '[ERRO] Site nao iniciou. Status:' $status -ForegroundColor Red } }"

echo.
echo [3/5] Testando HTTPS...
timeout /t 3 /nobreak >nul
powershell -Command "[System.Net.ServicePointManager]::ServerCertificateValidationCallback = {$true}; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12 -bor [System.Net.SecurityProtocolType]::Tls11 -bor [System.Net.SecurityProtocolType]::Tls; try { $r = Invoke-WebRequest -Uri 'https://localhost:8443' -UseBasicParsing -TimeoutSec 10; Write-Host '[OK] HTTPS funciona! Status:' $r.StatusCode -ForegroundColor Green } catch { Write-Host '[ERRO] HTTPS ainda nao funciona:' $_.Exception.Message -ForegroundColor Red }; [System.Net.ServicePointManager]::ServerCertificateValidationCallback = $null"

echo.
echo [4/5] Verificando binding HTTPS...
powershell -ExecutionPolicy Bypass -Command "Import-Module WebAdministration; try { $binding = Get-WebBinding -Name 'UniSpin-Web' -Protocol https -ErrorAction Stop; Write-Host '[OK] Binding HTTPS configurado' -ForegroundColor Green; Write-Host \"    Porta: $($binding.bindingInformation)\" -ForegroundColor Gray; if ($binding.certificateHash) { Write-Host '    Certificado: Configurado' -ForegroundColor Gray } else { Write-Host '    Certificado: NAO CONFIGURADO' -ForegroundColor Red } } catch { Write-Host '[ERRO] Binding HTTPS nao encontrado!' -ForegroundColor Red }"

echo.
echo [5/5] Testando de outra maquina...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
    set IP=%%a
    goto :ipfound
)
:ipfound
set IP=%IP:~1%

echo.
echo ========================================
echo   CONFIGURACAO CONCLUIDA
echo ========================================
echo.
echo Teste acessando:
echo   https://localhost:8443 (local)
echo   https://%IP%:8443 (de outra maquina)
echo.
echo Se HTTPS funcionar, o proximo passo e configurar
echo o proxy reverso corretamente.
echo.
pause
