'use client';

// TODO: Replace demo data with GET /api/v1/notifications once backend credentials are available.

import Link from 'next/link';
import { PageHeader } from '@/components/common/PageHeader';
import { EmptyState } from '@/components/common/EmptyState';
import { DEMO_NOTIFICATIONS } from '@/lib/demo-data';
import { Bell, CheckCheck } from 'lucide-react';
import { useState } from 'react';

const TYPE_STYLE: Record<string, string> = {
  success: 'bg-green-50 border-green-200',
  warning: 'bg-amber-50 border-amber-200',
  info:    'bg-blue-50 border-blue-200',
  error:   'bg-red-50 border-red-200',
};

const DOT_COLOR: Record<string, string> = {
  success: 'bg-green-500',
  warning: 'bg-amber-500',
  info:    'bg-blue-500',
  error:   'bg-red-500',
};

export default function NotificationsPage() {
  const [items, setItems] = useState(DEMO_NOTIFICATIONS);
  const unread = items.filter(n => !n.read).length;

  const markAllRead = () => setItems(i => i.map(n => ({ ...n, read: true })));
  const markRead = (id: string) => setItems(i => i.map(n => n.id === id ? { ...n, read: true } : n));

  return (
    <>
      <PageHeader
        title="Notifications"
        subtitle={unread > 0 ? `${unread} Unread` : 'All caught up'}
        role="member"
      />

      <main className="flex-1 px-8 py-6 flex flex-col gap-4">
        {unread > 0 && (
          <div className="flex justify-end">
            <button onClick={markAllRead}
              className="flex items-center gap-1.5 text-xs font-bold text-forest-green/50 hover:text-ochre transition-colors">
              <CheckCheck className="h-3.5 w-3.5" /> Mark all as read
            </button>
          </div>
        )}

        {items.length === 0 ? (
          <EmptyState
            icon={Bell}
            title="No notifications."
          />
        ) : (
          <div className="flex flex-col gap-2">
            {items.map(n => (
              <div key={n.id}
                className={`rounded-2xl border px-6 py-4 flex items-start gap-4 transition-opacity ${TYPE_STYLE[n.type]} ${n.read ? 'opacity-60' : ''}`}>
                <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${n.read ? 'bg-forest-green/20' : DOT_COLOR[n.type]}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-forest-green">{n.title}</p>
                    <span className="text-xs text-forest-green/40 shrink-0">{n.date}</span>
                  </div>
                  <p className="text-sm text-forest-green/70 mt-1">{n.message}</p>
                  {n.link && (
                    <Link href={n.link} onClick={() => markRead(n.id)}
                      className="text-xs font-bold text-ochre hover:underline mt-2 inline-block">
                      View →
                    </Link>
                  )}
                </div>
                {!n.read && (
                  <button onClick={() => markRead(n.id)}
                    className="shrink-0 text-xs text-forest-green/30 hover:text-forest-green transition-colors mt-0.5">
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
