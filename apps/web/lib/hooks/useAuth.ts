'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuthStore } from '../stores/auth.store';
import { authApi } from '../api/auth.api';
import { ROLE_HIERARCHY, Role } from '@vyom/constants';
import type { LoginInput, RegisterInput } from '@vyom/validations';

/** Returns the dashboard path for the user's highest-precedence role. */
function getDashboardPath(roles: Role[]): string {
  const highest = roles.reduce((best, r) =>
    (ROLE_HIERARCHY[r] ?? 0) > (ROLE_HIERARCHY[best] ?? 0) ? r : best,
    roles[0],
  );
  return `/${highest}/dashboard`;
}

export function useAuth() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, setUser, clearAuth } = useAuthStore();

  async function login(data: LoginInput) {
    const res = await authApi.login(data);
    const { accessToken, user: loggedInUser } = res.data.data!;
    setUser(loggedInUser, accessToken);
    toast.success('Welcome back!');
    router.replace(getDashboardPath(loggedInUser.roles));
  }

  async function register(data: RegisterInput) {
    await authApi.register(data);
    // Navigate to verify-email-sent page per SRS Req 4.8
    router.push(`/verify-email-sent?email=${encodeURIComponent(data.email)}`);
  }

  async function logout() {
    try {
      await authApi.logout();
    } finally {
      clearAuth();
      router.replace('/login');
    }
  }

  async function initAuth() {
    // Called once on app mount — attempts a silent token refresh
    // If the HttpOnly refresh cookie is valid, we get a new access token and user
    useAuthStore.getState().setLoading(true);
    try {
      const refreshRes = await authApi.refresh();
      const newToken = refreshRes.data.data?.accessToken;
      if (newToken) {
        if (typeof window !== 'undefined') window.__VYOM_ACCESS_TOKEN__ = newToken;
        const meRes = await authApi.getMe();
        if (meRes.data.data?.user) {
          setUser(meRes.data.data.user, newToken);
          return;
        }
      }
    } catch {
      // No valid session — that's fine, user is a visitor
    } finally {
      useAuthStore.getState().setLoading(false);
    }
    clearAuth();
  }

  return { user, isAuthenticated, isLoading, login, register, logout, initAuth };
}
