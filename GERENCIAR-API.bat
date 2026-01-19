@echo off
echo.
echo ========================================
echo   GERENCIADOR DA API UNISPIN
echo ========================================
echo.
echo 1. Ver Status da API
echo 2. Ver Logs da API
echo 3. Reiniciar API
echo 4. Parar API
echo 5. Iniciar API
echo 6. Sair
echo.
set /p opcao="Escolha uma opcao (1-6): "

if "%opcao%"=="1" (
    echo.
    echo Status da API:
    pm2 status unispin-api
    echo.
    pause
    goto :eof
)

if "%opcao%"=="2" (
    echo.
    echo Logs da API (Ctrl+C para sair):
    pm2 logs unispin-api
    goto :eof
)

if "%opcao%"=="3" (
    echo.
    echo Reiniciando API...
    pm2 restart unispin-api
    echo [OK] API reiniciada!
    echo.
    pause
    goto :eof
)

if "%opcao%"=="4" (
    echo.
    echo Parando API...
    pm2 stop unispin-api
    echo [OK] API parada!
    echo.
    pause
    goto :eof
)

if "%opcao%"=="5" (
    echo.
    echo Iniciando API...
    pm2 start unispin-api
    echo [OK] API iniciada!
    echo.
    pause
    goto :eof
)

if "%opcao%"=="6" (
    exit /b 0
)

echo Opcao invalida!
pause
