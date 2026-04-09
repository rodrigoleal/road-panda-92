# Script para Deploy do Plugin Road Panda Ads no Servidor de Produção
# IP: 35.188.192.145
# Utilizador sugerido: root (com base no cloud-init)

$IP = "35.188.192.145"
$USER = "root"
$PLUGIN_FILE = "scripts/roadpanda-ads-plugin.php"
$REMOTE_PATH = "/root/roadpanda-ads-plugin.php"
$DEST_PATH = "/var/www/html/wp-content/plugins/roadpanda-ads-plugin.php"

Write-Host "--- Preparando Deploy do Plugin em Produção ---" -ForegroundColor Cyan

if (-not (Test-Path $PLUGIN_FILE)) {
    Write-Error "Ficheiro $PLUGIN_FILE não encontrado!"
    exit 1
}

Write-Host "1. Enviando ficheiro para o servidor via SCP..." -ForegroundColor Yellow
Write-Host "Execute este comando se o script falhar automaticamente:" -ForegroundColor Gray
Write-Host "scp $PLUGIN_FILE ${USER}@${IP}:${REMOTE_PATH}" -ForegroundColor White

scp $PLUGIN_FILE "${USER}@${IP}:${REMOTE_PATH}"

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n[ERRO] Falha ao enviar via SCP. Verifique se tem a chave SSH configurada para este servidor." -ForegroundColor Red
    exit 1
}

Write-Host "`n2. Movendo ficheiro para dentro do contentor Docker e ativando..." -ForegroundColor Yellow
$DOCKER_CMD = "docker cp ${REMOTE_PATH} wordpress:${DEST_PATH} && docker exec wordpress chown www-data:www-data ${DEST_PATH}"

Write-Host "Comando remoto: $DOCKER_CMD" -ForegroundColor Gray
ssh "${USER}@${IP}" "$DOCKER_CMD"

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n[SUCESSO] Plugin instalado e permissões configuradas!" -ForegroundColor Green
    Write-Host "Agora vá ao Painel WordPress (Administração > Plugins) e ative o 'Road Panda Ads Plugin'." -ForegroundColor Cyan
} else {
    Write-Host "`n[ERRO] Falha ao executar comandos via SSH." -ForegroundColor Red
}
