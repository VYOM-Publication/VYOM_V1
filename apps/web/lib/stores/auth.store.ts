import { create } from 'zustand';
import { User } from '@vyom/types';
import { Role } from '@vyom/constants';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  /**
   * Starts true so layouts hold the render guard until initAuth() resolves.
   * This prevents the redirect-to-login flash on page navigation when the
   * user has a valid session but the in-memory store is cold (e.g. after a
   * full-page refresh or navigating to a new route).
   */
  isLoading: boolean;
  setUser: (user: User, accessToken: string) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  hasRole: (role: Role) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // ← true by default; initAuth() sets it false when done

  setUser: (user, accessToken) => {
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
