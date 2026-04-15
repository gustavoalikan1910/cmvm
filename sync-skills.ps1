# Sincroniza o SKILL.md central para todas as pastas de agents
# Uso: .\sync-skills.ps1

$SOURCE = ".agents\skills\cvmc-assistant"
$TARGETS = @(
    ".qwen\skills\cvmc-assistant",
    ".gemini\skills\cvmc-assistant",
    ".claude\skills\cvmc-assistant"
)

Write-Host "Sincronizando skills..." -ForegroundColor Cyan

foreach ($target in $TARGETS) {
    if (Test-Path $target) {
        Copy-Item -Path "$SOURCE\*" -Destination $target -Recurse -Force
        Write-Host "  [OK] $target" -ForegroundColor Green
    } else {
        New-Item -Path $target -ItemType Directory -Force | Out-Null
        Copy-Item -Path "$SOURCE\*" -Destination $target -Recurse -Force
        Write-Host "  [NEW] $target" -ForegroundColor Yellow
    }
}

Write-Host "Sincronizacao concluida!" -ForegroundColor Cyan
