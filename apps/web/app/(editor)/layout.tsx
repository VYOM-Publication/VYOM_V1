'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/auth.store';
import { useAuth } from '@/lib/hooks/useAuth';
import { useEffect } from 'react';
import { Role } from '@vyom/constants';
import Navbar from '@/components/layout/Navbar';
import PublicFooter from '@/components/layout/PublicFooter';

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const { initAuth } = useAuth();

  useEffect(() => {
    initAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) { router.replace('/login'); return; }
    if (!user?.roles?.includes(Role.EDITOR)) router.replace('/unauthorized');
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="animate-pulse text-xs font-bold uppercase tracking-widest text-forest-green/50">
          Loading Workspace…
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user?.roles?.includes(Role.EDITOR)) return null;

  return (
    <div className="min-h-screen bg-ivory font-body flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col">{children}</div>
      <PublicFooter />
    </div>
  );
}
