@echo off
REM Script para iniciar a API UniSpin
REM Este script e executado pelo Agendador de Tarefas do Windows

cd /d "C:\apps\UniSpin\apps\api"
set NODE_ENV=production

REM Manter janela aberta e mostrar logs
title API UniSpin - Porta 8080
echo ========================================
echo   API UNISPIN - INICIANDO...
echo ========================================
echo.
echo Diretorio: %CD%
echo Ambiente: %NODE_ENV%
echo Porta: 8080
echo.
echo Mantenha esta janela aberta para a API funcionar.
echo Feche esta janela para parar a API.
echo.
echo ========================================
echo.

call npm start

REM Se der erro, manter janela aberta para ver erro
if %errorLevel% neq 0 (
    echo.
    echo [ERRO] A API parou inesperadamente!
    echo.
    pause
)
