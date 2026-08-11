'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDemoAuth } from '@/lib/demo-auth';

export default function DashboardRedirectPage() {
  const router = useRouter();
  const { session } = useDemoAuth();

  useEffect(() => {
    if (session?.dashboard) {
      router.replace(session.dashboard);
    } else {
      router.replace('/login');
    }
  }, [session, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory text-forest-green">
      <div className="animate-pulse text-sm font-semibold tracking-wider uppercase">Loading Dashboard...</div>
    </div>
  );
}
