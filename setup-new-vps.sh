#!/usr/bin/env bash
# ==============================================================================
# Planet Web App - Automated Setup Script for New Hostinger KVM VPS
# Target OS: Ubuntu 22.04 / 24.04 LTS
# ==============================================================================
set -e

echo "=========================================================="
echo "🚀 Initializing Planet Web App on New Hostinger VPS"
echo "=========================================================="

# Check if run as root or with sudo
if [ "$EUID" -ne 0 ]; then
  echo "⚠️ Please run this script with sudo or as root: sudo ./setup-new-vps.sh"
  exit 1
fi

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$APP_DIR"

# 1. Update OS packages
echo "📦 Step 1/6: Updating system packages..."
apt-get update -y
apt-get install -y curl git ufw psmisc build-essential nginx certbot python3-certbot-nginx

# 2. Install Node.js 20 LTS (if not installed or version < 20)
echo "📦 Step 2/6: Installing Node.js 20 LTS..."
if ! command -v node >/dev/null 2>&1 || [ "$(node -v | cut -d'.' -f1 | tr -d 'v')" -lt 20 ]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi
echo "✅ Node.js version: $(node -v)"
echo "✅ NPM version: $(npm -v)"

# 3. Install PM2 process manager globally
echo "📦 Step 3/6: Installing PM2 globally..."
npm install -g pm2
pm2 startup systemd -u root --hp /root 2>/dev/null || true

# 4. Configure UFW Firewall
echo "🔒 Step 4/6: Configuring Firewall (UFW)..."
ufw allow 22/tcp || true
ufw allow 'Nginx Full' || true
ufw --force enable || true

# 5. Configure Nginx Reverse Proxy for webmind.cloud
echo "🌐 Step 5/6: Configuring Nginx Reverse Proxy..."
mkdir -p /etc/nginx/conf.d

# Global upload body size config (100MB for media uploads)
cat << 'EOF' > /etc/nginx/conf.d/body_size.conf
client_max_body_size 100M;
client_body_buffer_size 128k;
EOF

# Planet site config
cat << 'EOF' > /etc/nginx/sites-available/planet
server {
    listen 80;
    listen [::]:80;
    server_name webmind.cloud www.webmind.cloud;

    client_max_body_size 100M;
    client_body_buffer_size 128k;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 90s;
    }

    # Direct static caching for media uploads
    location /uploads/ {
        proxy_pass http://127.0.0.1:5000/uploads/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
EOF

# Enable site and remove default
ln -sf /etc/nginx/sites-available/planet /etc/nginx/sites-enabled/planet
rm -f /etc/nginx/sites-enabled/default
rm -f /etc/nginx/sites-enabled/assistance

if nginx -t; then
  systemctl restart nginx
  echo "✅ Nginx configured and restarted."
fi

# 6. Ensure Uploads Directory & Permissions
echo "📁 Step 6/6: Setting up directory permissions & dependencies..."
mkdir -p "$APP_DIR/server/uploads/chat"
chmod -R 777 "$APP_DIR/server/uploads" 2>/dev/null || true

# Check .env file
if [ ! -f "$APP_DIR/server/.env" ]; then
  if [ -f "$APP_DIR/server/.env.example" ]; then
    cp "$APP_DIR/server/.env.example" "$APP_DIR/server/.env"
  else
    cat << 'EOF' > "$APP_DIR/server/.env"
PORT=5000
MONGODB_URI=
NODE_ENV=production
EOF
  fi
  echo ""
  echo "⚠️ NOTICE: Created $APP_DIR/server/.env"
  echo "👉 Remember to set your MongoDB Atlas connection string in $APP_DIR/server/.env!"
fi

# Make deploy.sh executable and run it
chmod +x "$APP_DIR/deploy.sh"
"$APP_DIR/deploy.sh"

echo "=========================================================="
echo "🎉 VPS Setup Completed Successfully!"
echo "=========================================================="
echo ""
echo "Next Steps to complete migration:"
echo "1. Put your MongoDB connection string in: nano $APP_DIR/server/.env"
echo "2. Add your new VPS IP to MongoDB Atlas Network Access whitelist"
echo "3. Update your DNS A-Record for webmind.cloud to point to this new VPS IP"
echo "4. Issue SSL certificate via Certbot by running:"
echo "   sudo certbot --nginx -d webmind.cloud -d www.webmind.cloud"
echo ""

