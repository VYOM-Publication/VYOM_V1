'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/auth.store';
import { useAuth } from '@/lib/hooks/useAuth';
import { ROLE_HIERARCHY, Role } from '@vyom/constants';

export default function DashboardRedirectPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const { initAuth } = useAuth();

  useEffect(() => { initAuth(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated || !user) { router.replace('/login'); return; }
    const highest = (user.roles as Role[]).reduce((best, r) =>
      (ROLE_HIERARCHY[r] ?? 0) > (ROLE_HIERARCHY[best] ?? 0) ? r : best,
      (user.roles as Role[])[0],
    );
    router.replace(`/${highest}/dashboard`);
  }, [isAuthenticated, isLoading, user, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory text-forest-green">
      <div className="animate-pulse text-sm font-semibold tracking-wider uppercase">Loading Dashboard...</div>
    </div>
  );
}
