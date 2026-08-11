'use client';

import { useDemoAuth } from '@/lib/demo-auth';
import Link from 'next/link';
import { Users, FileText, CreditCard, BarChart2, ArrowRight, ScrollText, Megaphone } from 'lucide-react';
import { DEMO_USERS, DEMO_SUBMISSIONS, DEMO_PAYMENTS } from '@/lib/demo-data';
import { PageHeader } from '@/components/common/PageHeader';
import { StatCard } from '@/components/common/StatCard';

const totalRevenue = DEMO_PAYMENTS
  .filter(p => p.status === 'COMPLETED')
  .reduce((sum, p) => sum + p.amount, 0);

export default function AdminDashboardPage() {
  const { session } = useDemoAuth();

  return (
    <>
      <PageHeader
        title="Admin Control Panel"
        subtitle={`Platform Governance · ${session?.name ?? 'Administrator'}`}
        role="admin"
      />

      <main className="flex-1 px-8 py-6 flex flex-col gap-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Users"      value={DEMO_USERS.length}       icon={Users} />
          <StatCard label="All Submissions"  value={DEMO_SUBMISSIONS.length} icon={FileText} />
          <StatCard label="Total Revenue"    value={`₹${(totalRevenue / 1000).toFixed(1)}K`} icon={CreditCard} />
          <StatCard label="Published Issues" value={8}                        icon={BarChart2} />
        </div>

        {/* Quick admin actions */}
        <div className="rounded-2xl border border-sand/40 bg-white p-6">
          <h2 className="font-display text-lg font-bold text-forest-green mb-4">Admin Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: 'Manage Users',    href: '/admin/users',         icon: Users,      desc: `${DEMO_USERS.length} registered users` },
              { label: 'All Submissions', href: '/admin/submissions',   icon: FileText,   desc: `${DEMO_SUBMISSIONS.length} manuscripts` },
              { label: 'Payment Reports', href: '/admin/payments',      icon: CreditCard, desc: `${DEMO_PAYMENTS.length} transactions` },
              { label: 'Audit Logs',      href: '/admin/audit-logs',    icon: ScrollText, desc: 'Full activity trail' },
              { label: 'Announcements',   href: '/admin/announcements', icon: Megaphone,  desc: 'Platform notices & calls' },
              { label: 'Reports',         href: '/admin/reports',       icon: BarChart2,  desc: 'Analytics & metrics' },
            ].map(({ label, href, icon: Icon, desc }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center justify-between px-4 py-3 rounded-xl border border-sand/30 hover:border-sand hover:bg-ivory transition-colors"
              >
                <span className="flex items-center gap-3 text-sm font-medium text-forest-green">
                  <Icon className="h-4 w-4 text-ochre" aria-hidden="true" />
                  <span>
                    <span className="block font-semibold">{label}</span>
                    <span className="text-xs text-forest-green/40">{desc}</span>
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 text-forest-green/30" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>

        <p className="text-xs text-forest-green/30 text-center">
          Demo session — full admin controls will be enabled in production.
        </p>
      </main>
    </>
  );
}
