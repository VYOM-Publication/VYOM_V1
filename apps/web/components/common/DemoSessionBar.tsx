'use client';

/**
 * DEMO AUTH — session bar shown on all protected dashboard pages.
 * Displays the current demo user and provides a logout button.
 * Will be removed when real auth is integrated.
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDemoAuth } from '@/lib/demo-auth';
import { LogOut } from 'lucide-react';

interface Props {
  /** Required role to access this area. Redirects to login if session role doesn't match. */
  requiredRole?: string;
}

export function DemoSessionBar({ requiredRole }: Props) {
  const router  = useRouter();
  const { session, logout } = useDemoAuth();

  useEffect(() => {
    if (!session) {
      router.replace('/login');
      return;
    }
    // Role-based access guard
    if (requiredRole && requiredRole !== session.role) {
      // Admin can access everything; editor can access editor + reviewer pages
      const isAllowed =
        session.role === 'admin' ||                          // admin can go anywhere
        (requiredRole === 'editor' && session.role === 'reviewer') || // reviewer can see editor pages in demo
        false;
      if (!isAllowed) {
        router.replace('/login');
      }
    }
  }, [session, requiredRole, router]);

  if (!session) return null;

  function handleLogout() {
    logout();
    router.push('/');
  }

  return (
    <div className="flex items-center gap-2 bg-forest-green text-ivory rounded-full pl-1 pr-4 py-1">
      {/* Avatar */}
      <div className="h-7 w-7 rounded-full bg-ochre flex items-center justify-center text-xs font-bold shrink-0">
        {session.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
      </div>
      <span className="text-sm font-semibold">{session.name}</span>
      <button onClick={handleLogout}
        className="ml-2 text-ivory/60 hover:text-ivory transition-colors"
        aria-label="Sign out">
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  );
}
