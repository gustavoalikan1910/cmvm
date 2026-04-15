# Sincroniza os arquivos de skills da pasta central para todas as pastas de agents.
# Uso: .\sync-skills.ps1
#
# Fonte central: .agents/skills/<skill>/
# Destinos:      .claude/skills/<skill>/   (Claude Code)
#                .gemini/skills/<skill>/   (Gemini CLI)
#                .qwen/skills/<skill>/     (Qwen Code)
#
# Arquivos de config por agente (NAO sao sincronizados - editar manualmente):
#   .claude/CLAUDE.md   - instrucoes do Claude Code
#   GEMINI.md           - instrucoes do Gemini CLI (raiz do projeto)
#   AGENTS.md           - instrucoes do Qwen Code  (raiz do projeto)

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
