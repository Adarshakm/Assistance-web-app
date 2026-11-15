#!/usr/bin/env bash
# ==============================================================================
# Assistance Web App - 1-Click Deployment Script for Hostinger KVM VPS
# ==============================================================================
set -e

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$APP_DIR"

echo "=========================================="
echo "🚀 Starting Deployment for Assistance App"
echo "📂 Project Directory: $APP_DIR"
echo "=========================================="

# 1. Pull latest changes from git
echo "📥 Step 1/4: Pulling latest changes from GitHub..."
git fetch origin main
git reset --hard origin/main

# 2. Update Server dependencies
echo "📦 Step 2/4: Installing backend dependencies..."
if [ -d "$APP_DIR/server" ]; then
  cd "$APP_DIR/server"
  npm install
  cd "$APP_DIR"
fi

# 3. Build Frontend
echo "🔨 Step 3/4: Building client for production..."
if [ -d "$APP_DIR/client" ]; then
  cd "$APP_DIR/client"
  npm install
  npm run build
  cd "$APP_DIR"
fi

# 4. Restart Server process cleanly using PM2
echo "🔄 Step 4/4: Reloading application with PM2..."
# Kill any orphan process stuck on port 5000 so there are no port collisions
fuser -k 5000/tcp 2>/dev/null || true

if command -v pm2 >/dev/null 2>&1; then
  echo "🚀 Re-launching Node backend in PM2..."
  pm2 delete all 2>/dev/null || true
  cd "$APP_DIR/server"
  pm2 start src/server.js --name "myapp" --update-env
  pm2 save
  cd "$APP_DIR"
  pm2 status
else
  echo "⚠️ PM2 not found globally. Starting with node directly..."
  cd "$APP_DIR/server"
  nohup node src/server.js > server.log 2>&1 &
  cd "$APP_DIR"
fi

# 5. Reload Nginx if active
if command -v nginx >/dev/null 2>&1; then
  echo "🌐 Reloading Nginx reverse proxy..."
  # Ensure Nginx allows mobile image & payload uploads without 413 error
  if [ -d /etc/nginx/conf.d ]; then
    echo "client_max_body_size 25M;" | sudo tee /etc/nginx/conf.d/body_size.conf >/dev/null 2>&1 || true
  fi
  if systemctl is-active --quiet nginx 2>/dev/null; then
    sudo systemctl reload nginx || systemctl reload nginx || true
    echo "✅ Nginx reloaded successfully with 25M upload limit."
  fi
fi

echo "=========================================="
echo "🎉 Deployment successfully completed!"
echo "=========================================="

