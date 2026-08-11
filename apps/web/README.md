# VYOM Publication Frontend

This is the Next.js 14 frontend application for the VYOM Publication platform. Built using the React App Router, TypeScript, and Tailwind CSS.

## Architecture & Layouts

The application utilizes Next.js Route Groups to segregate user dashboards and public interfaces:
- `app/(public)/*`: Public routes (homepage, about, achievements, blog, editorial boards).
- `app/(admin)/*`: Dashboard for platform administration. Enforces `admin` role boundary.
- `app/(author)/*`: Dashboard for manuscript submitters. Enforces `author` role boundary.
- `app/(editor)/*`: Dashboard for journal management & issue compilers. Enforces `editor` role boundary.
- `app/(member)/*`: Dashboard for registered readers. Enforces `member` role boundary.
- `app/(reviewer)/*`: Dashboard for peer reviewers. Enforces `reviewer` role boundary.

## Navigation & Authentication Guard
Each dashboard route group contains a custom `layout.tsx` that reads the client-side session from `useDemoAuth()` and guards the routes.
- Unauthorized access attempts redirect to `/login`.
- Mismatched role navigations (e.g. author attempting to read `/admin`) redirect to `/unauthorized`.

## Centralized Demo Data
To keep the pages consistent and clean, all hardcoded lists, mock statistics, and dropdown selection lists are centralized in:
- `apps/web/lib/demo-data.ts`

## Integration Guidelines (Phase 8)
Each page has commented instruction blocks describing the exact endpoints to connect:
1. Locate the `TODO Phase 8` block at the top of the route file.
2. Replace local references (e.g. `DEMO_*` constants) with `fetch`/`axios` queries inside React state or server actions.
3. Bind form submission actions to the backend port (default: `5000`).
4. Set loading states (`isLoading`, `isSubmitting`) to toggle disabled states and submit spinners.
5. Render error alerts for API responses with statuses other than `2xx`.
