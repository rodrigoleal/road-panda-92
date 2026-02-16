@echo off
echo Starting Deployment...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0deploy-gcp.ps1"
pause
