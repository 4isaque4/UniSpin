@echo off
echo.
echo ========================================
echo   CONFIGURAR API NO IIS (iisnode)
echo ========================================
echo.
echo Este script vai configurar a API para rodar
echo via IIS usando iisnode, sem precisar iniciar
echo manualmente.
echo.

:: Verificar se eh admin
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Este script precisa ser executado como Administrador!
    pause
    exit /b 1
)

echo [1/5] Verificando se iisnode esta instalado...
if not exist "C:\Program Files\iisnode" (
    echo [ERRO] iisnode nao encontrado!
    echo.
    echo Instale o iisnode primeiro:
    echo https://github.com/Azure/iisnode/releases
    echo.
    pause
    exit /b 1
)
echo [OK] iisnode encontrado!
echo.

echo [2/5] Verificando se Node.js esta instalado...
where node >nul 2>&1
if %errorLevel% neq 0 (
    echo [ERRO] Node.js nao encontrado!
    pause
    exit /b 1
)
echo [OK] Node.js encontrado!
echo.

echo [3/5] Parando site antigo se existir...
powershell -ExecutionPolicy Bypass -Command "Import-Module WebAdministration; Stop-Website -Name 'UniSpin-API' -ErrorAction SilentlyContinue; Remove-Website -Name 'UniSpin-API' -ErrorAction SilentlyContinue; Remove-WebAppPool -Name 'UniSpin-API-Pool' -ErrorAction SilentlyContinue"
echo.

echo [4/5] Criando Application Pool...
powershell -ExecutionPolicy Bypass -Command "Import-Module WebAdministration; $pool = New-WebAppPool -Name 'UniSpin-API-Pool'; $pool.managedRuntimeVersion = ''; $pool.processModel.identityType = 'ApplicationPoolIdentity'; $pool.startMode = 'AlwaysRunning'; $pool | Set-Item; Write-Host '[OK] Pool criado!' -ForegroundColor Green"
echo.

echo [5/5] Criando e iniciando site da API na porta 8080...
powershell -ExecutionPolicy Bypass -Command "Import-Module WebAdministration; New-Website -Name 'UniSpin-API' -Port 8080 -PhysicalPath 'C:\apps\UniSpin\apps\api' -ApplicationPool 'UniSpin-API-Pool' -Force | Out-Null; Start-Website -Name 'UniSpin-API'; Start-Sleep -Seconds 2; $status = (Get-Website -Name 'UniSpin-API').State; if ($status -eq 'Started') { Write-Host '[OK] Site iniciado!' -ForegroundColor Green } else { Write-Host '[AVISO] Site criado mas status:' $status -ForegroundColor Yellow }"
echo.

echo.
echo ========================================
echo   TESTANDO API...
echo ========================================
echo.

timeout /t 3 /nobreak >nul

powershell -Command "try { $r = Invoke-WebRequest -Uri 'http://localhost:8080/status' -UseBasicParsing -TimeoutSec 5; Write-Host '[OK] API respondendo! Status:' $r.StatusCode -ForegroundColor Green; Write-Host 'Resposta:' ($r.Content.Substring(0, [Math]::Min(100, $r.Content.Length))) } catch { Write-Host '[ERRO] API nao responde:' $_.Exception.Message -ForegroundColor Red }"
echo.

echo.
echo ========================================
echo   CONFIGURACAO CONCLUIDA!
echo ========================================
echo.
echo A API agora esta rodando via IIS na porta 8080.
echo.
echo IMPORTANTE:
echo - A API vai iniciar automaticamente com o IIS
echo - Nao precisa mais iniciar manualmente
echo - Se o IIS estiver rodando, a API esta rodando
echo.
echo Para parar: Stop-Website -Name 'UniSpin-API'
echo Para iniciar: Start-Website -Name 'UniSpin-API'
echo.
echo O proxy reverso no frontend ja esta configurado
echo para redirecionar /api/* para http://localhost:8080/*
echo.
pause
