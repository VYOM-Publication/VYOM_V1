# VYOM Publication

A governed, workflow-driven publication management platform.

---

## Repository Structure

```
vyom-publication/
├── apps/
│   ├── api/          # Express.js backend (Node.js + TypeScript)
│   └── web/          # Next.js 14 frontend (App Router + TypeScript)
├── packages/
│   ├── constants/    # Roles, permissions, role-permission map
│   ├── types/        # Shared TypeScript interfaces
│   └── validations/  # Shared Zod schemas
├── .env.example      # All environment variable templates
├── turbo.json        # Turborepo pipeline config
└── pnpm-workspace.yaml
```

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 20.x or higher |
| pnpm | 9.x or higher |
| MongoDB | 7.x (local or Atlas) |
| Redis | 7.x (local or Redis Cloud) |

Install pnpm globally if you don't have it:
```bash
npm install -g pnpm@9
```

---

## Local Setup

### 1. Clone the repository
```bash
git clone <repo-url>
cd vyom-publication
```

### 2. Install all dependencies
```bash
pnpm install
```

### 3. Configure environment variables

Copy the example files and fill in your values:
```bash
# Backend
cp apps/api/.env.example apps/api/.env

# Frontend
cp apps/web/.env.example apps/web/.env.local
```

Generate secure secrets for JWT and cookies:
```bash
node -e "console.log('JWT_ACCESS_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"
node -e "console.log('JWT_REFRESH_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"
node -e "console.log('COOKIE_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"
```

Paste the output values into `apps/api/.env`.

### 4. Start MongoDB and Redis

Using Docker (recommended for local dev):
```bash
docker run -d -p 27017:27017 --name vyom-mongo mongo:7
docker run -d -p 6379:6379 --name vyom-redis redis:7
```

Or use your local installations.

### 5. Run in development mode
```bash
pnpm dev
```

This starts both `apps/api` (port 5000) and `apps/web` (port 3000) in parallel via Turborepo.

To run only the backend:
```bash
pnpm --filter @vyom/api dev
```

To run only the frontend:
```bash
pnpm --filter @vyom/web dev
```

---

## API Endpoints (Phase 5)

All endpoints are prefixed with `/api/v1`.

### Authentication

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/auth/register` | No | Register a new account |
| POST | `/auth/login` | No | Login and receive access token |
| POST | `/auth/logout` | No | Logout and revoke refresh token |
| POST | `/auth/refresh` | No (cookie) | Rotate refresh token, get new access token |
| GET | `/auth/verify-email?token=` | No | Verify email address |
| POST | `/auth/forgot-password` | No | Request password reset email |
| POST | `/auth/reset-password` | No | Reset password with token |
| GET | `/auth/me` | Yes (Bearer) | Get current authenticated user |

### Roles

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/roles` | Yes (Admin only) | List all roles and their permissions |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health status |

---

## Role Hierarchy

| Role | Level | Description |
|------|-------|-------------|
| Visitor | 0 | Unauthenticated public user |
| Member | 1 | Registered reader |
| Author | 2 | Can submit abstracts and manuscripts |
| Reviewer | 3 | Can accept and submit peer reviews |
| Editor | 4 | Editorial decisions, reviewer assignment |
| Admin | 5 | Full platform access |

Permissions are centralized in `packages/constants/src/role-permissions.ts`.
**Never scatter authorization logic** — always import from this file.

---

## Security Notes

- Access tokens: JWT, 15-minute expiry, stored in memory only (never localStorage)
- Refresh tokens: Opaque, 7-day expiry, stored in HttpOnly cookie + hashed in MongoDB
- Token rotation: Every refresh issues a new token and revokes the old one
- Password reset tokens expire in 1 hour
- Email verification tokens expire in 24 hours
- All auth endpoints are rate-limited (10 requests per 15 minutes)

---

## Build for Production

```bash
pnpm build
```

Start the production API server:
```bash
pnpm --filter @vyom/api start
```

---

## Integration Readiness & Demo Mode (Phase 7A)

The frontend dashboards and user workflows are fully implemented and function in **Demo Mode**. 
To facilitate backend integration in Phase 8, the frontend is pre-scaffolded with structured integration guidelines.

### Implemented Dashboards & Workflows
- **Author Portal**: Complete submission wizard for new manuscripts, abstract, keywords, journal selection, and author dashboard tracking.
- **Reviewer Portal**: Interactive evaluation scorecards, grading criteria, recommendations, and reviewer assignments dashboard.
- **Editor Portal**: Issue compilation board, pre-publication checklist, scheduling metadata, reviewer matchmaking pool, archives, and author communications log.
- **Admin Portal**: User management, database stats, financial transaction ledger, reports, and system settings.
- **Public Website**: Modern homepage, journals category directory, upcoming releases carousel, academic blogs, and editorial boards list.

### Integration Ready Architecture
Each page/component includes clear `TODO` integration comments specifying:
1. **Endpoint details**: HTTP verb and URI path (e.g., `POST /api/v1/submissions/new`).
2. **Payload format**: expected JSON keys (e.g., `{ title, journal, abstract, keywords, author, articleType }`).
3. **Loading states**: handling variables for spinners, blocking UI interactions during network requests.
4. **Error states**: user feedback alerts, connection warnings, and mock fallbacks.

The backend maintains a decoupled **Provider Pattern** for swappable third-party integrations (S3 storage, Razorpay payments, SMTP email, database fallback) so that credentials can be plugged in later with zero logic changes.
