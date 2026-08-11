import { create } from 'zustand';
import { User } from '@vyom/types';
import { Role } from '@vyom/constants';

// ── Demo Mode ────────────────────────────────────────────────────────────────
// When NEXT_PUBLIC_DEMO_MODE=true the store is pre-seeded with a fake admin
// user so all pages render correctly without a real backend.
const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

const DEMO_USER: User = {
  id: 'demo-admin-001',
  fullName: 'Demo Admin',
  email: 'admin@vyom.com',
  roles: [Role.ADMIN],
  emailVerified: true,
  status: 'active' as unknown as import('@vyom/types').UserStatus,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
} as unknown as User;

// ─────────────────────────────────────────────────────────────────────────────

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User, accessToken: string) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  hasRole: (role: Role) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: DEMO_MODE ? DEMO_USER : null,
  isAuthenticated: DEMO_MODE ? true : false,
  isLoading: false,

  setUser: (user, accessToken) => {
    // Store access token in memory — never in localStorage
    if (typeof window !== 'undefined') {
      window.__VYOM_ACCESS_TOKEN__ = accessToken;
    }
    set({ user, isAuthenticated: true, isLoading: false });
  },

  clearAuth: () => {
    if (typeof window !== 'undefined') {
      window.__VYOM_ACCESS_TOKEN__ = undefined;
    }
    set({ user: null, isAuthenticated: false, isLoading: false });
  },

  setLoading: (isLoading) => set({ isLoading }),

  hasRole: (role) => {
    const { user } = get();
    return user?.roles?.includes(role) ?? false;
  },
}));
