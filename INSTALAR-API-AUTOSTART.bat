@echo off
echo.
echo ========================================
echo   INSTALAR API PARA INICIAR AUTOMATICAMENTE
echo ========================================
echo.
echo Este script vai configurar a API para
echo iniciar automaticamente quando o Windows iniciar
echo usando o Agendador de Tarefas.
echo.

:: Verificar se eh admin
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Este script precisa ser executado como Administrador!
    pause
    exit /b 1
)

echo [1/3] Removendo tarefa antiga se existir...
schtasks /Delete /TN "UniSpin-API" /F >nul 2>&1
echo.

echo [2/3] Verificando script de inicializacao...
if not exist "C:\apps\UniSpin\apps\api\INICIAR-API.bat" (
    echo [AVISO] Script INICIAR-API.bat nao encontrado, mas a tarefa vai funcionar mesmo assim.
)
echo [OK] Continuando...
echo.

echo [3/3] Criando tarefa agendada para iniciar no login...
schtasks /Create /TN "UniSpin-API" /TR "C:\apps\UniSpin\apps\api\INICIAR-API.bat" /SC ONLOGON /RL HIGHEST /F >nul
if %errorLevel% equ 0 (
    echo [OK] Tarefa criada com sucesso!
) else (
    echo [ERRO] Falha ao criar tarefa agendada!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   CONFIGURACAO CONCLUIDA!
echo ========================================
echo.
echo A API vai iniciar automaticamente quando
echo voce fizer login no Windows.
echo.
echo IMPORTANTE: A API vai rodar em uma janela
echo do CMD que vai ficar visivel. Se fechar a
echo janela, a API para de rodar.
echo.
echo Para iniciar agora:
echo   1. Execute: GERENCIAR-API.bat
echo   2. Ou: schtasks /Run /TN "UniSpin-API"
echo.
echo Para desinstalar:
echo   schtasks /Delete /TN "UniSpin-API"
echo.
pause
