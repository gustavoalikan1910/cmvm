#!/bin/bash

# Este script resolve o "problema do ovo e da galinha" com o Nginx e Let's Encrypt
# 1. O Nginx precisa do Certificado SSL para ligar
# 2. O Certbot precisa do Nginx ligado (porta 80) para validar o dominio e emitir o Certificado

echo "### 1. Preparando configuração inicial Nginx (sem SSL)..."
cp nginx/conf/nginx-init.conf nginx/conf/default.conf

echo "### 2. Subindo Nginx e Certbot..."
docker compose up -d nginx certbot
sleep 5
docker compose restart nginx
sleep 5

echo "### 3. Solicitando certificado Let's Encrypt..."
docker compose exec -T certbot certbot certonly --webroot -w /var/www/certbot -d soccerdataplatform.duckdns.org --email gu.alikan@gmail.com --agree-tos --no-eff-email --force-renewal

echo "### 4. Baixando configs SSL recomendadas (seguranca)..."
docker compose exec -T certbot wget -O /etc/letsencrypt/options-ssl-nginx.conf https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf
docker compose exec -T certbot wget -O /etc/letsencrypt/ssl-dhparams.pem https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem

echo "### 5. Ativando Nginx com SSL..."
cp nginx/conf/nginx.conf nginx/conf/default.conf
docker compose restart nginx

echo ""
echo "================================================="
echo "✅ SSL configurado! Acesse: https://soccerdataplatform.duckdns.org"
echo "================================================="
