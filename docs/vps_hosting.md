# MERN Stack Deployment Guide - Without Docker
## Hosting Multiple MERN Apps on Hostinger VPS with SSL

This guide will help you deploy **dentalkartnepal** and **surgicalmartnepal** on a single Hostinger VPS using traditional deployment methods with Nginx reverse proxy and SSL certificates.

## Prerequisites

- Hostinger VPS (Ubuntu 20.04 or later)
- Two domain names: `dentalkartnepal.com` and `surgicalmartnepal.com`
- Basic knowledge of Linux commands and server management
- SSH access to your VPS

## Step 1: Initial VPS Setup

### Connect to Your VPS
```bash
ssh root@your-vps-ip
```

### Update System
```bash
sudo apt update
sudo apt upgrade -y
```

### Install Essential Tools
```bash
sudo apt install -y curl wget git nano ufw build-essential
```

### Configure Firewall
```bash
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw status
```

## Step 2: Install Node.js and npm

### Install Node.js via NodeSource
```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Install Node.js
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

## Step 3: Install MongoDB

### Add MongoDB Repository
```bash
# Import MongoDB public key
curl -fsSL https://pgp.mongodb.com/server-6.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg --dearmor

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update package list
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start and enable MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify installation
sudo systemctl status mongod
```

### Secure MongoDB
```bash
# Connect to MongoDB
mongo

# Create admin user
use admin
db.createUser({
  user: "admin",
  pwd: "your_strong_password",
  roles: ["userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase"]
})

# Create databases and users for each project
use dentalkartnepal
db.createUser({
  user: "dentalkart_user",
  pwd: "dentalkart_password",
  roles: ["readWrite"]
})

use surgicalmartnepal
db.createUser({
  user: "surgicalmart_user",
  pwd: "surgicalmart_password",
  roles: ["readWrite"]
})

exit
```

### Enable Authentication
```bash
sudo nano /etc/mongod.conf
```

Add these lines:
```yaml
security:
  authorization: enabled
```

Restart MongoDB:
```bash
sudo systemctl restart mongod
```

## Step 4: Install PM2 Process Manager

```bash
sudo npm install -g pm2
```

## Step 5: Install Nginx

```bash
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
sudo systemctl status nginx
```

## Step 6: Domain Configuration

### Configure DNS Records
For each domain, add these DNS records:
- **A Record**: `@` → Your VPS IP
- **A Record**: `www` → Your VPS IP

Wait for DNS propagation (usually 5-15 minutes).

## Step 7: Prepare Project Structure

```bash
# Create main project directory
sudo mkdir -p /var/www
cd /var/www

# Create directories for each project
sudo mkdir -p dentalkartnepal surgicalmartnepal

# Change ownership
sudo chown -R $USER:$USER /var/www/dentalkartnepal
sudo chown -R $USER:$USER /var/www/surgicalmartnepal
```

## Step 8: Deploy Project 1 - Dental Kart Nepal

### Clone and Setup Backend
```bash
cd /var/www/dentalkartnepal

# Clone your project
git clone https://github.com/your-username/dentalkartnepal.git .

# Install backend dependencies
cd server
npm install

# Create environment file
nano .env
```

Add environment variables:
```env
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb://dentalkart_user:dentalkart_password@localhost:27017/dentalkartnepal
JWT_SECRET=your_jwt_secret_here
```

### Build and Setup Frontend
```bash
cd /var/www/dentalkartnepal/client

# Install dependencies
npm install

# Create production environment file
nano .env.production
```

Add production environment:
```env
REACT_APP_API_URL=https://dentalkartnepal.com/api
```

```bash
# Build for production
npm run build

# Copy build files to nginx directory
sudo mkdir -p /var/www/html/dentalkartnepal.com
sudo cp -r build/* /var/www/html/dentalkartnepal.com/
```

### Start Backend with PM2
```bash
cd /var/www/dentalkartnepal/server

# Start with PM2
pm2 start server.js --name dentalkart-backend --env production

# Save PM2 configuration
pm2 save

# Setup PM2 startup
pm2 startup
```

## Step 9: Deploy Project 2 - Surgical Mart Nepal

### Clone and Setup Backend
```bash
cd /var/www/surgicalmartnepal

# Clone your project
git clone https://github.com/your-username/surgicalmartnepal.git .

# Install backend dependencies
cd server
npm install

# Create environment file
nano .env
```

Add environment variables:
```env
NODE_ENV=production
PORT=5002
MONGODB_URI=mongodb://surgicalmart_user:surgicalmart_password@localhost:27017/surgicalmartnepal
JWT_SECRET=your_jwt_secret_here
```

### Build and Setup Frontend
```bash
cd /var/www/surgicalmartnepal/client

# Install dependencies
npm install

# Create production environment file
nano .env.production
```

Add production environment:
```env
REACT_APP_API_URL=https://surgicalmartnepal.com/api
```

```bash
# Build for production
npm run build

# Copy build files to nginx directory
sudo mkdir -p /var/www/html/surgicalmartnepal.com
sudo cp -r build/* /var/www/html/surgicalmartnepal.com/
```

### Start Backend with PM2
```bash
cd /var/www/surgicalmartnepal/server

# Start with PM2
pm2 start server.js --name surgicalmart-backend --env production

# Save PM2 configuration
pm2 save
```

## Step 10: Configure Nginx

### Remove Default Configuration
```bash
sudo rm /etc/nginx/sites-enabled/default
```

### Create Configuration for Dental Kart Nepal
```bash
sudo nano /etc/nginx/sites-available/dentalkartnepal.com
```

Add configuration:
```nginx
server {
    listen 80;
    server_name dentalkartnepal.com www.dentalkartnepal.com;

    root /var/www/html/dentalkartnepal.com;
    index index.html;

    # Frontend routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API routes
    location /api/ {
        proxy_pass http://localhost:5001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static file caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
}
```

### Create Configuration for Surgical Mart Nepal
```bash
sudo nano /etc/nginx/sites-available/surgicalmartnepal.com
```

Add configuration:
```nginx
server {
    listen 80;
    server_name surgicalmartnepal.com www.surgicalmartnepal.com;

    root /var/www/html/surgicalmartnepal.com;
    index index.html;

    # Frontend routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API routes
    location /api/ {
        proxy_pass http://localhost:5002/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static file caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
}
```

### Enable Sites
```bash
# Create symbolic links
sudo ln -s /etc/nginx/sites-available/dentalkartnepal.com /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/surgicalmartnepal.com /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

## Step 11: Install SSL Certificates with Certbot

### Install Certbot
```bash
sudo apt update
sudo apt install python3 python3-venv libaugeas0 -y

# Create virtual environment for certbot
sudo python3 -m venv /opt/certbot/
sudo /opt/certbot/bin/pip install --upgrade pip
sudo /opt/certbot/bin/pip install certbot certbot-nginx

# Create symlink
sudo ln -s /opt/certbot/bin/certbot /usr/bin/certbot
```

### Obtain SSL Certificates
```bash
# Get certificate