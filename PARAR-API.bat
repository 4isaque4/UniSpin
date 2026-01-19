@echo off
echo.
echo ========================================
echo   PARAR API UNISPIN
echo ========================================
echo.

:: Tentar parar via PM2 primeiro
pm2 stop unispin-api >nul 2>&1
if %errorLevel% equ 0 (
    echo [OK] API parada via PM2
    goto :fim
)

:: Se PM2 nao funcionar, matar processos Node na porta 8080
echo Procurando processo Node na porta 8080...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080 ^| findstr LISTENING') do (
    echo Matando processo %%a...
    taskkill /PID %%a /F >nul 2>&1
    if %errorLevel% equ 0 (
        echo [OK] Processo %%a finalizado!
    ) else (
        echo [AVISO] Nao foi possivel finalizar processo %%a
    )
)

:fim
echo.
echo Para verificar se parou:
echo   netstat -ano ^| findstr :8080
echo.
pause
