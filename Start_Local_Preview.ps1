param([int]$Port = 8765)
$ErrorActionPreference = 'Stop'
$Downloads = [Environment]::GetFolderPath('UserProfile') + '\Downloads'
$Stamp = Get-Date -Format 'yyyyMMdd_HHmmss'
$Log = Join-Path $Downloads "PortalSupportWorkbench_GitHubPreview_$Stamp.log"
Start-Transcript -Path $Log -Force | Out-Null
try {
    $Root = Split-Path -Parent $MyInvocation.MyCommand.Path
    Write-Host "Preview root: $Root"
    Write-Host "Log: $Log"
    $Python = Get-Command python -ErrorAction SilentlyContinue
    if (-not $Python) { $Python = Get-Command py -ErrorAction SilentlyContinue }
    if (-not $Python) { throw 'Python was not found. Upload the folder to GitHub or install Python to use the local preview helper.' }
    Start-Process "http://127.0.0.1:$Port/"
    if ($Python.Name -eq 'py.exe') { & $Python.Source -m http.server $Port --bind 127.0.0.1 --directory $Root }
    else { & $Python.Source -m http.server $Port --bind 127.0.0.1 --directory $Root }
} catch {
    Write-Error ("Preview failed: " + $_.Exception.Message)
    Write-Error $_.ScriptStackTrace
    exit 1
} finally {
    try { Stop-Transcript | Out-Null } catch {}
}
