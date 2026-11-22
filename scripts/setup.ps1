$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
Push-Location (Join-Path $projectRoot 'backend')
try {
  if (!(Test-Path '.venv/Scripts/python.exe')) { py -3.12 -m venv .venv; if ($LASTEXITCODE) { throw 'Python 3.12 installation required.' } }
  & ./.venv/Scripts/python.exe -m pip install -r requirements.txt
  if ($LASTEXITCODE) { throw 'Python dependency installation failed.' }
  if (!(Test-Path '.env')) { Copy-Item .env.example .env }
} finally { Pop-Location }
Push-Location (Join-Path $projectRoot 'frontend')
try { npm.cmd ci; if ($LASTEXITCODE) { throw 'npm install failed.' } } finally { Pop-Location }
Write-Host 'Setup complete. Run scripts/dev.ps1.'
