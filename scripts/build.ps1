$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
Push-Location (Join-Path $projectRoot 'frontend')
try { npm.cmd run build; if ($LASTEXITCODE) { throw 'Build failed.' } } finally { Pop-Location }
Write-Host 'Build ready in frontend/dist.'
