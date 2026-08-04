@echo off
setlocal
cd /d "%~dp0"
start "Portal Support Workbench" http://localhost:8000
py -3 -m http.server 8000 2>nul || python -m http.server 8000
