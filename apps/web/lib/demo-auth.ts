/**
 * ─────────────────────────────────────────────────────────────────────────────
 * TEMPORARY DEMO AUTHENTICATION SYSTEM
 * ─────────────────────────────────────────────────────────────────────────────
 * This module implements a client-side only, localStorage-backed session for
 * the MVP demonstration. It uses hardcoded dummy credentials to simulate the
 * full publication workflow without a real backend.
 *
 * This will be replaced by the production authentication service (JWT + API)
 * before the platform goes live.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ── Demo credentials → role → dashboard mapping ───────────────────────────────
export const DEMO_USERS: Record<string, { name: string; role: DemoRole; dashboard: string }> = {
  'reader@demo.com':  { name: 'Demo Reader',  role: 'member',   dashboard: '/member/dashboard' },
  'author@demo.com':  { name: 'Demo Author',  role: 'author',   dashboard: '/author/dashboard' },
  'editor@demo.com':  { name: 'Demo Editor',  role: 'editor',   dashboard: '/editor/dashboard' },
  'reviewer@demo.com':{ name: 'Demo Reviewer',role: 'reviewer', dashboard: '/reviewer/dashboard' },
  'admin@demo.com':   { name: 'Demo Admin',   role: 'admin',    dashboard: '/admin/dashboard' },
};

export const DEMO_PASSWORD = 'demo123';

export type DemoRole = 'member' | 'author' | 'editor' | 'reviewer' | 'admin';

export interface DemoSession {
  name: string;
  email: string;
  role: DemoRole;
  dashboard: string;
}

interface DemoAuthState {
  session: DemoSession | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  loginAsRole: (role: DemoRole) => void;         // bypass credentials — for demo direct navigation
  register: (name: string, email: string, role: DemoRole) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useDemoAuth = create<DemoAuthState>()(
  persist(
    (set, get) => ({
      session: null,

      login: (email, password) => {
        const user = DEMO_USERS[email.toLowerCase()];
        if (!user) {
          return { success: false, error: 'No demo account found for this email.' };
        }
        if (password !== DEMO_PASSWORD) {
          return { success: false, error: 'Incorrect password. Use demo123 for all demo accounts.' };
        }
        set({ session: { name: user.name, email, role: user.role, dashboard: user.dashboard } });
        return { success: true };
      },

      loginAsRole: (role) => {
        // Allow direct role-based login for any entered email during demo
        const dashboard = role === 'admin'
          ? '/admin/dashboard'
          : role === 'editor'
          ? '/editor/dashboard'
          : `/${role}/dashboard`;
        set({ session: { name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`, email: `${role}@demo.com`, role, dashboard } });
      },

      register: (name, email, role) => {
        const dashboard = role === 'editor' || role === 'admin' ? '/editor/dashboard' : `/${role}/dashboard`;
        set({ session: { name, email, role, dashboard } });
      },

      logout: () => set({ session: null }),

      isAuthenticated: () => get().session !== null,
    }),
    {
      name: 'vyom-demo-session', // localStorage key
    },
  ),
);
