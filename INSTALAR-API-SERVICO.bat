@echo off
echo.
echo ========================================
echo   INSTALAR API COMO SERVICO DO WINDOWS
echo ========================================
echo.
echo Este script vai instalar a API para rodar
echo automaticamente sempre que o Windows iniciar.
echo.

:: Verificar se eh admin
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Este script precisa ser executado como Administrador!
    pause
    exit /b 1
)

echo [1/4] Verificando se Node.js esta instalado...
where node >nul 2>&1
if %errorLevel% neq 0 (
    echo [ERRO] Node.js nao encontrado! Instale o Node.js primeiro.
    pause
    exit /b 1
)
echo [OK] Node.js encontrado!
echo.

echo [2/4] Instalando PM2 globalmente...
call npm install -g pm2
if %errorLevel% neq 0 (
    echo [AVISO] PM2 ja pode estar instalado ou houve erro na instalacao.
    echo Continuando...
)
echo.

echo [3/4] Parando API se estiver rodando...
pm2 stop unispin-api 2>nul
pm2 delete unispin-api 2>nul
echo.

echo [4/4] Iniciando API com PM2...
cd /d "C:\apps\UniSpin\apps\api"
set NODE_ENV=production
pm2 start src/server.js --name unispin-api --node-args="--env-file=.env"
echo.

echo [5/5] Configurando para iniciar no boot do Windows...
pm2 startup
echo.
echo IMPORTANTE: Execute o comando que apareceu acima como Administrador!
echo Ele vai configurar o PM2 para iniciar automaticamente no boot.
echo.

echo [6/6] Salvando configuracao do PM2...
pm2 save
echo.

echo.
echo ========================================
echo   INSTALACAO CONCLUIDA!
echo ========================================
echo.
echo A API esta rodando agora com PM2.
echo.
echo Comandos uteis:
echo   pm2 status          - Ver status
echo   pm2 logs unispin-api - Ver logs
echo   pm2 restart unispin-api - Reiniciar
echo   pm2 stop unispin-api - Parar
echo.
echo Nao esquece de executar o comando do "pm2 startup"!
echo.
pause
