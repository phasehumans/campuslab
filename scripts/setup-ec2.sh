#!/usr/bin/env bash
set -euo pipefail

echo "=========================================================="
echo "   CampusLab - EC2 Server Automated Setup & Provisioning   "
echo "=========================================================="

if [ "$EUID" -ne 0 ]; then
    echo "[-] Please run this script with sudo or as root: sudo bash $0"
    exit 1
fi

CURRENT_USER="${SUDO_USER:-ubuntu}"
APP_DIR="/var/www/campuslab"

echo "[1/6] Setting up Swap (2GB) for compilation & memory stability..."
if ! grep -q '/swapfile' /etc/fstab; then
    fallocate -l 2G /swapfile || dd if=/dev/zero of=/swapfile bs=1M count=2048
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' >> /etc/fstab
    echo "[+] Swap configured successfully."
else
    echo "[*] Swapfile already exists, skipping."
fi

echo "[2/6] Updating system packages & installing core tools..."
apt-get update -y
apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    gnupg \
    git \
    nginx \
    ufw

echo "[3/6] Installing official Docker Engine & Docker Compose plugin..."
install -m 0755 -d /etc/apt/keyrings
if [ ! -f /etc/apt/keyrings/docker.gpg ]; then
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    chmod a+r /etc/apt/keyrings/docker.gpg
fi

ARCH=$(dpkg --print-architecture)
CODENAME=$(. /etc/os-release && echo "$VERSION_CODENAME")
echo "deb [arch=${ARCH} signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu ${CODENAME} stable" \
    > /etc/apt/sources.list.d/docker.list

apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

systemctl enable docker
systemctl start docker
usermod -aG docker "$CURRENT_USER" || true
echo "[+] Docker installed and user added to docker group."

echo "[4/6] Setting up application directory ($APP_DIR)..."
mkdir -p "$APP_DIR"
chown -R "$CURRENT_USER:$CURRENT_USER" "$APP_DIR"

echo "[5/6] Configuring Nginx reverse proxy for labapi.trydecember.com..."
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

if [ -f "$REPO_DIR/infra/nginx/campuslab.conf" ]; then
    cp "$REPO_DIR/infra/nginx/campuslab.conf" /etc/nginx/sites-available/campuslab.conf
    ln -sf /etc/nginx/sites-available/campuslab.conf /etc/nginx/sites-enabled/campuslab.conf
    rm -f /etc/nginx/sites-enabled/default
    nginx -t
    systemctl reload nginx
    echo "[+] Nginx configured and reloaded successfully."
else
    echo "[!] Warning: infra/nginx/campuslab.conf not found. Manual Nginx configuration required."
fi

echo "[6/6] Configuring Firewall (UFW)..."
ufw allow OpenSSH || true
ufw allow 'Nginx Full' || true
# Do NOT block active SSH session; enable without prompt
ufw --force enable || true

echo "=========================================================="
echo "   🎉 EC2 Provisioning Complete! Next Steps:              "
echo "=========================================================="
echo "1. Place your production .env inside: $APP_DIR/.env"
echo "   (You can use $REPO_DIR/.env.example as a template)"
echo ""
echo "2. Add these repository secrets in GitHub Actions:"
echo "   - EC2_HOST: $(curl -s ifconfig.me || hostname -I | awk '{print $1}')"
echo "   - EC2_USER: $CURRENT_USER"
echo "   - EC2_SSH_KEY: [Your private SSH key (.pem) content]"
echo ""
echo "3. Ensure Cloudflare DNS has an A record pointing labapi.trydecember.com"
echo "   to this machine's Public IP ($(curl -s ifconfig.me || echo '<PUBLIC_IP>')) with Proxy enabled (Orange Cloud)."
echo "=========================================================="
