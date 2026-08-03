@echo off
setlocal
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0Start_Local_Preview.ps1"
set "EXITCODE=%ERRORLEVEL%"
if not "%EXITCODE%"=="0" (
  echo.
  echo Preview failed. Review the newest PortalSupportWorkbench_GitHubPreview log in Downloads.
  pause
)
exit /b %EXITCODE%
