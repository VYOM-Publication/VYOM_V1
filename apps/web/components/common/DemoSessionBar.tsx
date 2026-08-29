'use client';

/**
 * SessionBar — shows the current logged-in user and a sign-out button.
 * Used inside PageHeader on all protected dashboard pages.
 * Replaces the old DemoSessionBar which used localStorage demo auth.
 */

import { useAuthStore } from '@/lib/stores/auth.store';
import { useAuth } from '@/lib/hooks/useAuth';
import { LogOut } from 'lucide-react';

interface Props {
  /** Kept for API compatibility with existing PageHeader calls — no longer used for auth checks (layouts handle that). */
  requiredRole?: string;
}

export function DemoSessionBar({ requiredRole: _requiredRole }: Props) {
  const { user, isAuthenticated } = useAuthStore();
  const { logout } = useAuth();

  if (!isAuthenticated || !user) return null;

  const initials = user.fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center gap-2 bg-forest-green text-ivory rounded-full pl-1 pr-4 py-1">
      <div className="h-7 w-7 rounded-full bg-ochre flex items-center justify-center text-xs font-bold shrink-0">
        {initials}
      </div>
      <span className="text-sm font-semibold">{user.fullName}</span>
      <button
        onClick={() => logout()}
        className="ml-2 text-ivory/60 hover:text-ivory transition-colors"
        aria-label="Sign out"
      >
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  );
}
