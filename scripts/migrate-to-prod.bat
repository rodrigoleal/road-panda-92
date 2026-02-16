@echo off
echo Starting Migration...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0migrate-to-prod.ps1"
pause
