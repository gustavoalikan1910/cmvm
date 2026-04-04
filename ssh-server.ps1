# SSH rápido para o servidor Oracle Cloud CVMC
# Uso: .\ssh-server.ps1
# Ou via workflow Antigravity: /ssh

$KEY = "C:\Users\gufev\Downloads\private_key_oracle.ppk"
$SSH_HOST = "ubuntu@163.176.241.242"
$PLINK = "C:\Program Files\PuTTY\plink.exe"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CVMC Oracle Server - SSH Connection   " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Host: $SSH_HOST" -ForegroundColor Gray
Write-Host "  Key:  $KEY" -ForegroundColor Gray
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

& $PLINK -i $KEY $SSH_HOST -t "bash -l"
