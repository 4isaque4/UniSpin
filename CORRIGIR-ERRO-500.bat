@echo off
echo.
echo ========================================
echo   CORRIGIR ERRO 500 - TESTE SEM PROXY
echo ========================================
echo.
echo Este script testa o site sem o proxy
echo para isolar o problema.
echo.

:: Verificar se eh admin
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Este script precisa ser executado como Administrador!
    pause
    exit /b 1
)

echo [1/3] Fazendo backup do web.config atual...
if exist "C:\inetpub\wwwroot\UniSpin-Web\web.config" (
    copy "C:\inetpub\wwwroot\UniSpin-Web\web.config" "C:\inetpub\wwwroot\UniSpin-Web\web.config.backup" >nul
    echo [OK] Backup criado
) else (
    echo [AVISO] web.config nao encontrado
)

echo [2/3] Testando sem proxy (copiando web.config.teste)...
copy /Y "C:\apps\UniSpin\apps\web\web.config.teste" "C:\inetpub\wwwroot\UniSpin-Web\web.config" >nul
if %errorLevel% equ 0 (
    echo [OK] web.config sem proxy copiado
) else (
    echo [ERRO] Nao foi possivel copiar web.config
    pause
    exit /b 1
)

echo [3/3] Reiniciando IIS...
net stop w3svc /y >nul 2>&1
timeout /t 2 /nobreak >nul
net start w3svc >nul 2>&1
timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo   TESTE CONCLUIDO
echo ========================================
echo.
echo Agora teste:
echo   https://localhost:8443
echo.
echo Se funcionar, o problema esta no proxy.
echo Se nao funcionar, o problema e outro.
echo.
echo Para restaurar o web.config com proxy:
echo   copy "C:\inetpub\wwwroot\UniSpin-Web\web.config.backup" "C:\inetpub\wwwroot\UniSpin-Web\web.config"
echo.
pause
