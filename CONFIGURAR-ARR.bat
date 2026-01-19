@echo off
echo.
echo ========================================
echo   CONFIGURAR APPLICATION REQUEST ROUTING
echo ========================================
echo.
echo Este script configura o ARR para permitir
echo proxy reverso funcionar corretamente.
echo.

:: Verificar se eh admin
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Este script precisa ser executado como Administrador!
    pause
    exit /b 1
)

echo [1/4] Verificando se ARR esta instalado...
powershell -ExecutionPolicy Bypass -Command "Import-Module WebAdministration; $proxy = Get-WebConfigurationProperty -PSPath 'MACHINE/WEBROOT/APPHOST' -Filter 'system.webServer/proxy' -Name '.' -ErrorAction SilentlyContinue; if ($proxy) { Write-Host '[OK] ARR encontrado!' -ForegroundColor Green } else { Write-Host '[ERRO] ARR nao encontrado. Instale-o primeiro!' -ForegroundColor Red; exit 1 }"

echo [2/4] Habilitando proxy reverso no ARR...
powershell -ExecutionPolicy Bypass -Command "Import-Module WebAdministration; Set-WebConfigurationProperty -PSPath 'MACHINE/WEBROOT/APPHOST' -Filter 'system.webServer/proxy' -Name 'enabled' -Value $true; Write-Host '[OK] Proxy reverso habilitado!' -ForegroundColor Green"

echo [3/4] Habilitando variaveis de servidor necessarias...
powershell -ExecutionPolicy Bypass -Command "Import-Module WebAdministration; $existing = Get-WebConfigurationProperty -PSPath 'MACHINE/WEBROOT/APPHOST' -Filter 'system.webServer/rewrite/allowedServerVariables' -Name '.' | Select-Object -ExpandProperty Collection | Select-Object -ExpandProperty Name; $vars = @('HTTP_X_FORWARDED_HOST', 'HTTP_X_FORWARDED_PROTO', 'HTTP_X_FORWARDED_FOR'); foreach ($v in $vars) { if ($existing -notcontains $v) { Add-WebConfigurationProperty -PSPath 'MACHINE/WEBROOT/APPHOST' -Filter 'system.webServer/rewrite/allowedServerVariables' -Name '.' -Value @{name=$v}; Write-Host \"[OK] Variavel $v adicionada!\" -ForegroundColor Green } else { Write-Host \"[OK] Variavel $v ja existe!\" -ForegroundColor Yellow } }"

echo [4/4] Reiniciando IIS...
net stop w3svc /y >nul 2>&1
timeout /t 2 /nobreak >nul
net start w3svc >nul 2>&1
timeout /t 2 /nobreak >nul

echo.
echo ========================================
echo   CONFIGURACAO CONCLUIDA!
echo ========================================
echo.
echo Agora execute REBUILD-E-DEPLOY.bat para
echo aplicar as mudancas e testar o proxy.
echo.
pause
