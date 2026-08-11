'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, FileText, CreditCard, BarChart2, Megaphone, ScrollText, Settings, LogOut } from 'lucide-react';
import { useDemoAuth } from '@/lib/demo-auth';
import { useEffect } from 'react';

const NAV = [
  { label: 'Dashboard',      href: '/admin/dashboard',       icon: LayoutDashboard },
  { label: 'Users',          href: '/admin/users',           icon: Users },
  { label: 'Submissions',    href: '/admin/submissions',     icon: FileText },
  { label: 'Payments',       href: '/admin/payments',        icon: CreditCard },
  { label: 'Reports',        href: '/admin/reports',         icon: BarChart2 },
  { label: 'Announcements',  href: '/admin/announcements',   icon: Megaphone },
  { label: 'Audit Logs',     href: '/admin/audit-logs',      icon: ScrollText },
  { label: 'Settings',       href: '/admin/settings',        icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();
  const { session, logout } = useDemoAuth();

  useEffect(() => {
    if (!session) {
      router.replace('/login');
    } else if (session.role !== 'admin') {
      router.replace('/unauthorized');
    }
  }, [session, router]);

  function handleLogout() { logout(); router.push('/'); }

  return (
    <div className="flex min-h-screen bg-ivory font-body">
      <aside className="w-44 shrink-0 bg-ivory border-r border-sand/30 flex flex-col py-5 px-3">
        <Link href="/" className="flex flex-col items-center gap-1 mb-8 px-2">
          <Image src="/vyom-logo.png" alt="VYOM" width={44} height={44} className="object-contain" />
        </Link>
        <nav className="flex flex-col gap-0.5 flex-1">
          {NAV.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link key={href} href={href}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                  active ? 'bg-forest-green text-ivory' : 'text-forest-green/60 hover:bg-sand/30 hover:text-forest-green'
                }`}>
                <Icon className="h-4 w-4 shrink-0" />{label}
              </Link>
            );
          })}
        </nav>
        <button onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-forest-green/50 hover:text-forest-green transition-colors">
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">{children}</div>
    </div>
  );
}
