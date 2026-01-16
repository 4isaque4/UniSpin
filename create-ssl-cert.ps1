# Script para criar certificado SSL self-signed para UniSpin
# Execute como Administrador

param(
    [string]$DnsName = "svmunispin.spinengenharia.local"
)

Write-Host "=== Criando Certificado SSL para $DnsName ===" -ForegroundColor Green

# Verificar se está rodando como administrador
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "ERRO: Execute este script como Administrador!" -ForegroundColor Red
    exit 1
}

# Criar certificado self-signed
$cert = New-SelfSignedCertificate `
    -DnsName $DnsName `
    -CertStoreLocation "Cert:\LocalMachine\My" `
    -KeyLength 2048 `
    -KeyAlgorithm RSA `
    -HashAlgorithm SHA256 `
    -KeyUsage KeyEncipherment, DigitalSignature `
    -Type SSLServerAuthentication `
    -NotAfter (Get-Date).AddYears(2) `
    -FriendlyName "UniSpin SSL Certificate"

Write-Host "`nCertificado criado com sucesso!" -ForegroundColor Green
Write-Host "Thumbprint: $($cert.Thumbprint)" -ForegroundColor Cyan
Write-Host "DnsName: $DnsName" -ForegroundColor Cyan
Write-Host "Válido até: $($cert.NotAfter)" -ForegroundColor Cyan

Write-Host "`nUse este thumbprint no deploy:" -ForegroundColor Yellow
Write-Host ".\deploy-iis.ps1 -CertThumbprint '$($cert.Thumbprint)' -DomainName '$DnsName'" -ForegroundColor White

# Retornar o thumbprint
return $cert.Thumbprint
