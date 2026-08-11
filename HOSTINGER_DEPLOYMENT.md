# VYOM PUBLICATION — Hostinger Production Deployment Guide

This guide provides step-by-step instructions for deploying the **VYOM Publication** monorepo on **Hostinger Node.js Application Manager** or **Hostinger VPS** (PM2 / Passenger).

---

## 1. Prerequisites & System Requirements

### Hostinger Environment Requirements
* **Hosting Plan**: Hostinger Business Web Hosting, Cloud Hosting, or VPS Hosting with Node.js Application Support.
* **Node.js Runtime**: Node.js `v20.x` LTS.
* **Package Manager**: `pnpm` (recommended) or `npm`.
* **Database Services**:
  * **MongoDB**: MongoDB Atlas Cluster (free or paid) or Hostinger self-hosted MongoDB instance.
  * **Redis Cache**: Redis Cloud instance or Hostinger local Redis instance (optional fallback to memory cache).

---

## 2. Environment Variables Setup

Before starting the applications, configure the environment variables on Hostinger.

### A. Backend API Environment (`apps/api/.env`)
Create `apps/api/.env` and paste:
```env
NODE_ENV=production
PORT=5000
API_VERSION=v1

# Database Credentials
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/vyom_publication?retryWrites=true&w=majority
REDIS_URL=redis://localhost:6379

# JWT Security Secrets (Generate using: openssl rand -hex 32)
JWT_ACCESS_SECRET=cb4f8d2e9a1b3c5d7e9f0a2b4c6d8e0f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d
JWT_REFRESH_SECRET=a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Session Cookie Secrets & Domain
COOKIE_SECRET=e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2
COOKIE_DOMAIN=vyompublication.com

# Email Dispatcher Credentials (SMTP)
EMAIL_FROM=noreply@vyompublication.com
EMAIL_FROM_NAME=VYOM Publication
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=noreply@vyompublication.com
SMTP_PASS=your_hostinger_email_password

# Payment Gateway Keys (Razorpay)
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx

# File Storage Credentials (AWS S3)
AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXXXXXXXX
AWS_SECRET_ACCESS_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
AWS_REGION=ap-south-1
AWS_S3_BUCKET=vyom-manuscripts-production

# CORS Allowed Origin
FRONTEND_URL=https://vyompublication.com
```

### B. Frontend Client Environment (`apps/web/.env.local`)
Create `apps/web/.env.local` and paste:
```env
NEXT_PUBLIC_API_URL=https://api.vyompublication.com
NEXT_PUBLIC_APP_NAME=VYOM Publication
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxxx
```

---

## 3. Installation & Production Build Steps

Run the following commands in the Hostinger terminal or SSH session:

```bash
# 1. Install dependencies across the monorepo
pnpm install

# 2. Build shared packages and production apps
pnpm build
```

---

## 4. Hostinger Startup & Entrypoint Configuration

### Option A: Using Hostinger hPanel Node.js Application Manager

#### 1. Backend Application (`api.vyompublication.com`)
* **Application Root**: `apps/api`
* **Application URL**: `api.vyompublication.com`
* **Application Startup File**: `dist/server.js`
* **Node.js Version**: `20.x`
* **Mode**: `Production`

#### 2. Frontend Application (`vyompublication.com`)
* **Application Root**: `apps/web`
* **Application URL**: `vyompublication.com`
* **Application Startup File**: `node_modules/next/dist/bin/next`
* **Script Arguments**: `start -p 3000`
* **Node.js Version**: `20.x`
* **Mode**: `Production`

---

### Option B: Using PM2 Process Manager (Hostinger VPS)

Create an `ecosystem.config.js` file in the root directory:

```javascript
module.exports = {
  apps: [
    {
      name: 'vyom-api',
      cwd: './apps/api',
      script: 'dist/server.js',
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
    },
    {
      name: 'vyom-web',
      cwd: './apps/web',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
```

To start both applications via PM2:
```bash
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

---

## 5. Domain & SSL Verification Checklist

1. **SSL Activation**: Ensure Let's Encrypt SSL is activated in Hostinger hPanel for both `vyompublication.com` and `api.vyompublication.com`.
2. **CORS Headers**: Verify that `FRONTEND_URL` in `apps/api/.env` matches the primary domain `https://vyompublication.com`.
3. **Health Check Endpoint**: Test `GET https://api.vyompublication.com/api/v1/health` to confirm server status.
4. **Demo Mode Verification**: If MongoDB or AWS credentials are omitted during initial setup, the API and client will continue operating in **Demo Mode** gracefully.

---
*End of Hostinger Deployment Guide.*
