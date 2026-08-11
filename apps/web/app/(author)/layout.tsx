'use client';

import { useRouter } from 'next/navigation';
import { useDemoAuth } from '@/lib/demo-auth';
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import PublicFooter from '@/components/layout/PublicFooter';

export default function AuthorLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { session } = useDemoAuth();

  useEffect(() => {
    if (!session) {
      router.replace('/login');
    } else if (session.role !== 'author') {
      router.replace('/unauthorized');
    }
  }, [session, router]);

  return (
    <div className="min-h-screen bg-ivory font-body flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col">{children}</div>
      <PublicFooter />
    </div>
  );
}
