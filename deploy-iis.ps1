# Script de Deploy Automático - UniSpin no IIS com HTTPS
# Execute como Administrador

param(
    [string]$DomainName = "unispin.local",
    [int]$ApiPort = 8080,
    [int]$WebPort = 80,
    [int]$WebPortHttps = 443,
    [string]$CertThumbprint = ""
)

Write-Host "=== Deploy UniSpin no IIS com HTTPS ===" -ForegroundColor Green

# Verificar se está rodando como administrador
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "ERRO: Execute este script como Administrador!" -ForegroundColor Red
    exit 1
}

# Importar módulo IIS
Import-Module WebAdministration -ErrorAction Stop

# Definir caminhos
$rootPath = $PSScriptRoot
$apiPath = Join-Path $rootPath "apps\api"
$webPath = Join-Path $rootPath "apps\web"
$webDistPath = Join-Path $webPath "dist"

Write-Host "`n1. Instalando dependências..." -ForegroundColor Yellow
Set-Location $rootPath
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO ao instalar dependências!" -ForegroundColor Red
    exit 1
}

Write-Host "`n2. Fazendo build do frontend..." -ForegroundColor Yellow
Set-Location $webPath
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO ao fazer build do frontend!" -ForegroundColor Red
    exit 1
}

# Copiar web.config para a pasta dist
Copy-Item (Join-Path $webPath "web.config") $webDistPath -Force

Write-Host "`n3. Configurando API no IIS..." -ForegroundColor Yellow

# Criar Application Pool para API
$apiAppPoolName = "UniSpin-API"
if (Test-Path "IIS:\AppPools\$apiAppPoolName") {
    Remove-WebAppPool -Name $apiAppPoolName
}
New-WebAppPool -Name $apiAppPoolName
Set-ItemProperty "IIS:\AppPools\$apiAppPoolName" -Name "managedRuntimeVersion" -Value ""
Set-ItemProperty "IIS:\AppPools\$apiAppPoolName" -Name "startMode" -Value "AlwaysRunning"

# Criar site para API
$apiSiteName = "UniSpin-API"
if (Test-Path "IIS:\Sites\$apiSiteName") {
    Remove-Website -Name $apiSiteName
}
New-Website -Name $apiSiteName -PhysicalPath $apiPath -ApplicationPool $apiAppPoolName -Port $ApiPort

Write-Host "`n4. Configurando Frontend no IIS..." -ForegroundColor Yellow

# Criar Application Pool para Web
$webAppPoolName = "UniSpin-Web"
if (Test-Path "IIS:\AppPools\$webAppPoolName") {
    Remove-WebAppPool -Name $webAppPoolName
}
New-WebAppPool -Name $webAppPoolName
Set-ItemProperty "IIS:\AppPools\$webAppPoolName" -Name "managedRuntimeVersion" -Value ""

# Criar site para Web
$webSiteName = "UniSpin-Web"
if (Test-Path "IIS:\Sites\$webSiteName") {
    Remove-Website -Name $webSiteName
}
New-Website -Name $webSiteName -PhysicalPath $webDistPath -ApplicationPool $webAppPoolName -Port $WebPort

# Adicionar binding HTTPS se certificado for fornecido
if ($CertThumbprint -ne "") {
    Write-Host "`n5. Configurando HTTPS..." -ForegroundColor Yellow
    
    # Remover binding existente na porta 443 se houver
    $existingBinding = Get-WebBinding -Name $webSiteName -Protocol "https" -Port $WebPortHttps -ErrorAction SilentlyContinue
    if ($existingBinding) {
        Remove-WebBinding -Name $webSiteName -Protocol "https" -Port $WebPortHttps
    }
    
    # Adicionar novo binding HTTPS
    New-WebBinding -Name $webSiteName -Protocol "https" -Port $WebPortHttps -HostHeader $DomainName
    
    # Associar certificado
    $cert = Get-ChildItem -Path Cert:\LocalMachine\My | Where-Object { $_.Thumbprint -eq $CertThumbprint }
    if ($cert) {
        $binding = Get-WebBinding -Name $webSiteName -Protocol "https" -Port $WebPortHttps
        $binding.AddSslCertificate($CertThumbprint, "my")
        Write-Host "Certificado SSL configurado com sucesso!" -ForegroundColor Green
    } else {
        Write-Host "AVISO: Certificado não encontrado. HTTPS não configurado." -ForegroundColor Yellow
    }
} else {
    Write-Host "`n5. HTTPS não configurado (forneça -CertThumbprint para configurar)" -ForegroundColor Yellow
}

Write-Host "`n6. Configurando permissões..." -ForegroundColor Yellow

# Dar permissões de leitura para IIS_IUSRS
$acl = Get-Acl $apiPath
$permission = "IIS_IUSRS", "ReadAndExecute", "ContainerInherit,ObjectInherit", "None", "Allow"
$accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule $permission
$acl.SetAccessRule($accessRule)
Set-Acl $apiPath $acl

$acl = Get-Acl $webDistPath
$acl.SetAccessRule($accessRule)
Set-Acl $webDistPath $acl

Write-Host "`n7. Iniciando sites..." -ForegroundColor Yellow
Start-Website -Name $apiSiteName
Start-Website -Name $webSiteName

Write-Host "`n=== Deploy Concluído! ===" -ForegroundColor Green
Write-Host "`nAPI rodando em: http://localhost:$ApiPort" -ForegroundColor Cyan
Write-Host "Web rodando em: http://localhost:$WebPort" -ForegroundColor Cyan
if ($CertThumbprint -ne "") {
    Write-Host "Web HTTPS em: https://$DomainName" -ForegroundColor Cyan
}

Write-Host "`nPróximos passos:" -ForegroundColor Yellow
Write-Host "1. Configure as variáveis de ambiente para a API em: $apiPath\.env"
Write-Host "2. Se ainda não configurou HTTPS, execute:"
Write-Host "   .\deploy-iis.ps1 -CertThumbprint 'SEU_CERTIFICADO_THUMBPRINT' -DomainName 'seu-dominio.com'"
Write-Host "3. Reinicie os sites no IIS Manager se necessário"

Set-Location $rootPath
