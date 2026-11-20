#!/usr/bin/env bash
# ==============================================================================
# Planet Web App - 1-Click Deployment Script for Hostinger KVM VPS
# ==============================================================================
set -e

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$APP_DIR"

echo "=========================================="
echo "🚀 Starting Deployment for Planet App"
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
# Ensure upload directory exists with full write permissions
mkdir -p "$APP_DIR/server/uploads/chat"
chmod -R 777 "$APP_DIR/server/uploads" 2>/dev/null || chmod -R 775 "$APP_DIR/server/uploads" 2>/dev/null || true

# Kill any orphan process stuck on port 5000 so there are no port collisions
fuser -k 5000/tcp 2>/dev/null || true

if command -v pm2 >/dev/null 2>&1; then
  echo "🚀 Re-launching Node backend in PM2..."
  pm2 delete all 2>/dev/null || true
  cd "$APP_DIR/server"
  pm2 start src/server.js --name "myapp" --update-env
  pm2 save 2>/dev/null || true
  cd "$APP_DIR"
  pm2 status
else
  echo "⚠️ PM2 not found globally. Starting with node directly..."
  cd "$APP_DIR/server"
  nohup node src/server.js > server.log 2>&1 &
  cd "$APP_DIR"
fi

# 5. Configure and reload Nginx reverse proxy
set +e
if command -v nginx >/dev/null 2>&1; then
  echo "🌐 Configuring Nginx reverse proxy upload limits (100MB)..."
  # Ensure Nginx allows image, video, and document payload uploads without 413 error
  if [ -d /etc/nginx/conf.d ]; then
    echo "client_max_body_size 100M;" | sudo tee /etc/nginx/conf.d/body_size.conf >/dev/null 2>&1 || true
    echo "client_body_buffer_size 128k;" | sudo tee -a /etc/nginx/conf.d/body_size.conf >/dev/null 2>&1 || true
  fi

  if sudo nginx -t >/dev/null 2>&1; then
    sudo systemctl reload nginx 2>/dev/null || sudo service nginx reload 2>/dev/null || true
    echo "✅ Nginx reloaded successfully with 100M upload limit."
  fi
fi
set -e

echo "=========================================="
echo "🎉 Deployment successfully completed!"
echo "=========================================="

