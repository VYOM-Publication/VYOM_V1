'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuthStore } from '../stores/auth.store';
import { authApi } from '../api/auth.api';
import { ROLE_HIERARCHY, Role } from '@vyom/constants';
import type { LoginInput, RegisterInput } from '@vyom/validations';

function getDashboardPath(roles: Role[], preferredRole?: string): string {
  if (preferredRole && roles.includes(preferredRole as Role)) {
    return `/${preferredRole}/dashboard`;
  }
  const highest = roles.reduce((best, r) =>
    (ROLE_HIERARCHY[r] ?? 0) > (ROLE_HIERARCHY[best] ?? 0) ? r : best,
    roles[0],
  );
  return `/${highest}/dashboard`;
}

export function useAuth() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, setUser, clearAuth } = useAuthStore();

  async function login(data: LoginInput, roleHint?: string) {
    const res = await authApi.login(data);
    const { accessToken, user: loggedInUser } = res.data.data!;
    setUser(loggedInUser, accessToken);
    toast.success('Welcome back!');
    router.replace(getDashboardPath(loggedInUser.roles, roleHint));
  }

  async function register(data: RegisterInput) {
    await authApi.register(data);
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
    // If already authenticated in this tab (e.g. navigating between pages),
    // skip the network call entirely — the store is already populated.
    if (useAuthStore.getState().isAuthenticated) {
      useAuthStore.getState().setLoading(false);
      return;
    }

    useAuthStore.getState().setLoading(true);
    try {
      // The middleware already validated the session and passed the access
      // token in a custom response header (x-vyom-access-token).
      // Read it from the meta tag injected by the server if available,
      // so we can skip a second /auth/refresh round-trip.
      let token: string | undefined;

      if (typeof window !== 'undefined') {
        // Try to get the token the middleware forwarded via a page-level meta tag.
        // Since Next.js 14 doesn't expose response headers to client components
        // directly, we fall back to a fresh refresh call.
        token = window.__VYOM_ACCESS_TOKEN__;
      }

      if (!token) {
        // No in-memory token — call refresh to get one (normal cold start).
        const refreshRes = await authApi.refresh();
        token = refreshRes.data.data?.accessToken;
      }

      if (token) {
        if (typeof window !== 'undefined') {
          window.__VYOM_ACCESS_TOKEN__ = token;
        }
        const meRes = await authApi.getMe();
        if (meRes.data.data?.user) {
          setUser(meRes.data.data.user, token);
          return;
        }
      }
    } catch {
      // No valid session
    } finally {
      useAuthStore.getState().setLoading(false);
    }
    clearAuth();
  }

  return { user, isAuthenticated, isLoading, login, register, logout, initAuth };
}
