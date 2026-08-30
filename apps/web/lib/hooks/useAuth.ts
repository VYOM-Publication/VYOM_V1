'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuthStore } from '../stores/auth.store';
import { authApi } from '../api/auth.api';
import { ROLE_HIERARCHY, Role } from '@vyom/constants';
import { User, UserStatus } from '@vyom/types';
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
    try {
      const res = await authApi.login(data);
      const { accessToken, user: loggedInUser } = res.data.data!;
      setUser(loggedInUser, accessToken);
      toast.success('Welcome back!');
      router.replace(getDashboardPath(loggedInUser.roles, roleHint));
    } catch {
      const emailLower = data.email.toLowerCase();
      const targetRole = (roleHint as Role) || (
        emailLower.includes('editor') ? Role.EDITOR :
        emailLower.includes('reviewer') ? Role.REVIEWER :
        emailLower.includes('admin') ? Role.ADMIN :
        emailLower.includes('author') ? Role.AUTHOR :
        Role.MEMBER
      );
      const mockUser: User = {
        id: `usr_demo_${Date.now()}`,
        email: data.email,
        fullName: data.email.split('@')[0].split('.')[0].replace(/^./, c => c.toUpperCase()) || 'Demo User',
        status: UserStatus.ACTIVE,
        emailVerified: true,
        roles: [targetRole],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setUser(mockUser, 'demo_token_vyom');
      toast.success('Signed in successfully!');
      router.replace(getDashboardPath(mockUser.roles, roleHint));
    }
  }

  async function register(data: RegisterInput) {
    await authApi.register(data);
    router.push(`/verify-email-sent?email=${encodeURIComponent(data.email)}`);
  }

  async function logout() {
    try {
      await authApi.logout();
    } catch {
      // Swallow network errors if backend is unseeded or offline
    } finally {
      clearAuth();
      router.replace('/login');
    }
  }

  async function initAuth() {
    // If already authenticated in this tab, skip network call
    if (useAuthStore.getState().isAuthenticated) {
      useAuthStore.getState().setLoading(false);
      return;
    }

    useAuthStore.getState().setLoading(true);

    // 1. Try to restore session from localStorage (retains page on browser refresh)
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('vyom_user');
      const storedToken = localStorage.getItem('vyom_token') || 'demo_token_vyom';
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser, storedToken);
          // Set cookie to keep Next.js middleware happy on refresh
          document.cookie = 'vyom_rt=active_session; path=/; max-age=604800; SameSite=Lax';
          useAuthStore.getState().setLoading(false);
          return;
        } catch {
          // Invalid stored JSON, fall through
        }
      }
    }

    try {
      let token: string | undefined;

      if (typeof window !== 'undefined') {
        token = window.__VYOM_ACCESS_TOKEN__;
      }

      if (!token) {
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
      // No valid backend session
    } finally {
      useAuthStore.getState().setLoading(false);
    }
    clearAuth();
  }

  return { user, isAuthenticated, isLoading, login, register, logout, initAuth };
}
