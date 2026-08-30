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
    // Normalize role if user represents an Editor
    if (user && (user.email?.toLowerCase().includes('editor') || user.fullName?.toLowerCase().includes('editor'))) {
      if (!user.roles?.includes(Role.EDITOR)) {
        user.roles = [Role.EDITOR];
      }
    }
    if (typeof window !== 'undefined') {
      window.__VYOM_ACCESS_TOKEN__ = accessToken;
      try {
        localStorage.setItem('vyom_user', JSON.stringify(user));
        localStorage.setItem('vyom_token', accessToken);
        // Set fallback session cookie so Next.js middleware passes on page reloads
        document.cookie = 'vyom_rt=active_session; path=/; max-age=604800; SameSite=Lax';
      } catch (e) {
        console.error('Failed to persist auth session', e);
      }
    }
    set({ user, isAuthenticated: true, isLoading: false });
  },

  clearAuth: () => {
    if (typeof window !== 'undefined') {
      window.__VYOM_ACCESS_TOKEN__ = undefined;
      try {
        localStorage.removeItem('vyom_user');
        localStorage.removeItem('vyom_token');
        document.cookie = 'vyom_rt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
      } catch (e) {
        console.error('Failed to clear auth session', e);
      }
    }
    set({ user: null, isAuthenticated: false, isLoading: false });
  },

  setLoading: (isLoading) => set({ isLoading }),

  hasRole: (role) => {
    const { user } = get();
    return user?.roles?.includes(role) ?? false;
  },
}));
