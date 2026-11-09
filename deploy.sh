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

# 4. Restart Server process using PM2
echo "🔄 Step 4/4: Reloading application with PM2..."
if command -v pm2 >/dev/null 2>&1; then
  if pm2 list | grep -q "assistance-server"; then
    pm2 reload assistance-server --update-env || pm2 restart assistance-server --update-env
  elif pm2 list | grep -q "server"; then
    pm2 reload server --update-env || pm2 restart server --update-env
  else
    echo "⚠️ Starting new PM2 instance for assistance-server..."
    cd "$APP_DIR/server"
    pm2 start src/server.js --name "assistance-server"
    pm2 save
    cd "$APP_DIR"
  fi
  pm2 status
else
  echo "⚠️ PM2 not found globally. You can install it with: npm install -g pm2"
fi

# 5. Reload Nginx if active
if command -v nginx >/dev/null 2>&1; then
  echo "🌐 Reloading Nginx reverse proxy..."
  if systemctl is-active --quiet nginx; then
    sudo systemctl reload nginx || systemctl reload nginx || true
    echo "✅ Nginx reloaded successfully."
  fi
fi

echo "=========================================="
echo "🎉 Deployment successfully completed!"
echo "=========================================="

