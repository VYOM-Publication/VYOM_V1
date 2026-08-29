# VYOM PUBLICATION — Hostinger Production Deployment Guide

This guide provides step-by-step instructions for deploying the **VYOM Publication** monorepo on **Hostinger Node.js Application Manager** or **Hostinger VPS** (PM2 / Passenger).

> **SECURITY NOTE**: This file contains no real secrets. All values marked `<replace-...>` are
> placeholders. Generate your own secrets using the commands shown. Never commit `.env` files
> containing real secrets to version control.

---

## 1. Prerequisites & System Requirements

### Hostinger Environment Requirements
* **Hosting Plan**: Hostinger Business Web Hosting, Cloud Hosting, or VPS Hosting with Node.js Application Support.
* **Node.js Runtime**: Node.js `v20.x` LTS.
* **Package Manager**: `pnpm` (recommended) or `npm`.
* **Database Services**:
  * **MongoDB**: MongoDB Atlas Cluster (free or paid).
  * **Redis Cache**: Redis Cloud instance (required for production rate limiting).

---

## 2. Environment Variables Setup

**Never put real secrets in files committed to git.**
Set all production environment variables directly in Hostinger hPanel → Node.js App → Environment Variables,
or place them in `.env.local` files on the server (never committed).

### A. Backend API (`apps/api/.env.local` on the server)

```env
NODE_ENV=production
PORT=5000
API_VERSION=v1

# MongoDB Atlas connection string (URL-encode special chars in password)
MONGODB_URI=mongodb+srv://<db-user>:<url-encoded-password>@<cluster>.mongodb.net/vyom_publication?retryWrites=true&w=majority

# Redis (required in production — in-memory fallback is NOT safe for multi-instance)
REDIS_URL=redis://<host>:<port>

# JWT secrets — generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_ACCESS_SECRET=<replace-with-64-byte-random-hex>
JWT_REFRESH_SECRET=<replace-with-64-byte-random-hex>
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Cookie
COOKIE_SECRET=<replace-with-32-byte-random-hex>
COOKIE_DOMAIN=vyompublication.com

# Email (SMTP)
EMAIL_PROVIDER=smtp
EMAIL_FROM=noreply@vyompublication.com
EMAIL_FROM_NAME=VYOM Publication
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=noreply@vyompublication.com
SMTP_PASS=<replace-with-hostinger-smtp-password>

# Payment Gateway (Razorpay)
PAYMENT_PROVIDER=razorpay
RAZORPAY_KEY_ID=<replace-with-razorpay-live-key-id>
RAZORPAY_KEY_SECRET=<replace-with-razorpay-live-key-secret>

# File Storage
STORAGE_PROVIDER=s3
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=<replace-with-aws-access-key>
AWS_SECRET_ACCESS_KEY=<replace-with-aws-secret-key>
AWS_S3_BUCKET=<replace-with-s3-bucket-name>

# CORS — must match the deployed frontend domain exactly
FRONTEND_URL=https://vyompublication.com
```

### B. Frontend (`apps/web/.env.local` on the server)

```env
NEXT_PUBLIC_API_URL=https://api.vyompublication.com
NEXT_PUBLIC_APP_NAME=VYOM Publication
NEXT_PUBLIC_DEMO_MODE=false
```

> **Important**: `NEXT_PUBLIC_DEMO_MODE` must be `false` in production.
> This variable is baked into the Next.js bundle at build time.
> A build made with `NEXT_PUBLIC_DEMO_MODE=true` must NOT be deployed.

---

## 3. Installation & Production Build Steps

```bash
# 1. Install dependencies
pnpm install

# 2. Build shared packages and apps
pnpm build
```

---

## 4. Startup Configuration

### Option A: Hostinger hPanel Node.js Application Manager

#### Backend (`api.vyompublication.com`)
* **Application Root**: `apps/api`
* **Startup File**: `dist/server.js`
* **Node.js Version**: `20.x`

#### Frontend (`vyompublication.com`)
* **Application Root**: `apps/web`
* **Startup File**: `node_modules/next/dist/bin/next`
* **Script Arguments**: `start -p 3000`
* **Node.js Version**: `20.x`

### Option B: PM2 (VPS)

```javascript
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'vyom-api',
      cwd: './apps/api',
      script: 'dist/server.js',
      env_production: { NODE_ENV: 'production', PORT: 5000 },
    },
    {
      name: 'vyom-web',
      cwd: './apps/web',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      env_production: { NODE_ENV: 'production', PORT: 3000 },
    },
  ],
};
```

```bash
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

---

## 5. Pre-Launch Checklist

1. SSL activated for both `vyompublication.com` and `api.vyompublication.com` (Let's Encrypt via hPanel).
2. `FRONTEND_URL` in API env matches `https://vyompublication.com` exactly.
3. `NEXT_PUBLIC_DEMO_MODE=false` verified in frontend env before build.
4. All `<replace-...>` placeholders replaced with real values.
5. Health check passes: `GET https://api.vyompublication.com/api/v1/health`
6. Verify protected routes redirect unauthenticated users to `/login`.

---
*End of Hostinger Deployment Guide.*
