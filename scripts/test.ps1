$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
Push-Location (Join-Path $projectRoot 'frontend')
try { npm.cmd test; if ($LASTEXITCODE) { throw 'Frontend tests failed.' } } finally { Pop-Location }
Push-Location (Join-Path $projectRoot 'backend')
try { & ./.venv/Scripts/python.exe -m pytest -q; if ($LASTEXITCODE) { throw 'Backend tests failed.' } } finally { Pop-Location }
