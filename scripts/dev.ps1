$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
$pythonPath = Join-Path $projectRoot 'backend/.venv/Scripts/python.exe'
if (!(Test-Path $pythonPath)) { throw 'Run scripts/setup.ps1 first.' }
$server = Start-Process -FilePath $pythonPath -WorkingDirectory (Join-Path $projectRoot 'backend') -ArgumentList '-m','uvicorn','app.main:app','--host','127.0.0.1','--port','8000' -WindowStyle Hidden -PassThru
Push-Location (Join-Path $projectRoot 'frontend')
try { npm.cmd run dev } finally { Pop-Location; if (!$server.HasExited) { $server.Kill() } }
