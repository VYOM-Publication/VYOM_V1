'use client';

import Link from 'next/link';
import { Bell } from 'lucide-react';
import { DEMO_NOTIFICATIONS } from '@/lib/demo-data';

interface NotificationBellProps {
  role?: string;
}

export default function NotificationBell({ role = 'member' }: NotificationBellProps) {
  // TODO Phase 8: Fetch notification count dynamically from GET /api/v1/notifications/unread
  const unreadCount = DEMO_NOTIFICATIONS.length;

  // Point to member notifications page by default, or console alerts depending on role
  const targetHref = role === 'member' ? '/member/notifications' : `/${role}/dashboard`;

  return (
    <Link 
      href={targetHref}
      className="relative p-1.5 rounded-full text-forest-green/60 hover:text-forest-green hover:bg-sand/30 transition-colors"
      aria-label={`${unreadCount} unread notifications`}
    >
      <Bell className="h-4 w-4" />
      {unreadCount > 0 && (
        <span className="absolute top-1 right-1 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ochre opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-ochre"></span>
        </span>
      )}
    </Link>
  );
}
