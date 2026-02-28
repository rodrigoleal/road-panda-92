# Start Local Environment
$ScriptRoot = split-path -parent $MyInvocation.MyCommand.Definition
Set-Location "$ScriptRoot/.."

Write-Host "Starting Docker Backend..."
docker-compose -f infrastructure/docker-compose.yml up -d

Write-Host "Waiting for database..."
Start-Sleep -Seconds 5

Write-Host "Installing dependencies..."
cmd /c npm install

Write-Host "Starting Frontend (Next.js)..."
npm run dev
