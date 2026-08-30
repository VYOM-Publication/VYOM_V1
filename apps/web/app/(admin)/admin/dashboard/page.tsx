'use client';

import { useAuthStore } from '@/lib/stores/auth.store';
import { useSubmissionsStore } from '@/lib/stores/submissions.store';
import { useEditorsStore } from '@/lib/stores/editors.store';
import Link from 'next/link';
import { 
  Users, FileText, CreditCard, BarChart2, ArrowRight, 
  ScrollText, Megaphone, Shield, UserCheck, Sparkles, Clock, CheckCircle2
} from 'lucide-react';
import { DEMO_PAYMENTS } from '@/lib/demo-data';

export default function AdminDashboardPage() {
  const { user } = useAuthStore();
  const { submissions } = useSubmissionsStore();
  const { editors } = useEditorsStore();

  const unassignedCount = submissions.filter(s => s.status === 'SUBMITTED_TO_ADMIN').length;
  const inPipelineCount = submissions.filter(s => s.status !== 'PUBLISHED' && s.status !== 'REJECTED').length;
  const publishedCount  = submissions.filter(s => s.status === 'PUBLISHED').length;

  const totalRevenue = DEMO_PAYMENTS
    .filter(p => p.status === 'COMPLETED')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10 space-y-8">
      {/* 1. Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-ochre/30 bg-gradient-to-r from-forest-green via-forest-green/95 to-forest-green/85 p-8 text-ivory shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-ochre/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest text-ochre border border-ochre/30">
              <Shield className="h-3.5 w-3.5" /> Platform Governance Console
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-ivory">
              Welcome back, {user?.fullName ?? 'Administrator'}
            </h1>
            <p className="text-xs md:text-sm text-ivory/70 leading-relaxed font-medium">
              Manage executive editor appointments, route author manuscript submissions, oversee platform revenue, and issue final publication releases.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/admin/submissions"
              className="rounded-full bg-ochre px-6 py-3 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 shadow-md transition-all inline-flex items-center justify-center gap-2"
            >
              <FileText className="h-4 w-4" /> Route Submissions ({unassignedCount})
            </Link>
            <Link
              href="/admin/editors"
              className="rounded-full bg-ivory/10 border border-ivory/20 px-6 py-3 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ivory hover:text-forest-green shadow-sm transition-all inline-flex items-center justify-center gap-2"
            >
              <Users className="h-4 w-4" /> Editors Roster ({editors.length})
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Key Platform Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between text-forest-green/40">
            <span className="text-[9px] font-bold uppercase tracking-widest">Managing Editors</span>
            <Users className="h-4 w-4 text-ochre" />
          </div>
          <p className="font-display text-3xl font-bold text-forest-green">{editors.length}</p>
          <p className="text-[10px] text-forest-green/45 font-medium">Active Board Roster</p>
        </div>

        <div className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between text-forest-green/40">
            <span className="text-[9px] font-bold uppercase tracking-widest">Unassigned Queue</span>
            <Clock className="h-4 w-4 text-amber-600 animate-pulse" />
          </div>
          <p className="font-display text-3xl font-bold text-amber-600">{unassignedCount}</p>
          <p className="text-[10px] text-amber-700/60 font-medium">Author Papers Awaiting Editor</p>
        </div>

        <div className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between text-forest-green/40">
            <span className="text-[9px] font-bold uppercase tracking-widest">In Pipeline</span>
            <FileText className="h-4 w-4 text-forest-green" />
          </div>
          <p className="font-display text-3xl font-bold text-forest-green">{inPipelineCount}</p>
          <p className="text-[10px] text-forest-green/45 font-medium">Peer Review & Revision</p>
        </div>

        <div className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between text-forest-green/40">
            <span className="text-[9px] font-bold uppercase tracking-widest">APC Revenue</span>
            <CreditCard className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="font-display text-3xl font-bold text-forest-green">₹{(totalRevenue / 1000).toFixed(1)}K</p>
          <p className="text-[10px] text-forest-green/45 font-medium">Total Fees Collected</p>
        </div>
      </div>

      {/* 3. Quick Actions & Control Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl border border-sand/40 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-sand/20 pb-4 mb-6">
              <div>
                <h2 className="font-display text-xl font-bold text-forest-green">Admin Governance Modules</h2>
                <p className="text-xs text-forest-green/50 mt-0.5">Platform control centers and operational tools</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Editor Roster & Staff', desc: 'Onboard & manage managing editors', href: '/admin/editors', icon: Users },
                { title: 'Submissions Governance', desc: 'Route papers & assign managing editors', href: '/admin/submissions', icon: FileText },
                { title: 'Payment & Financials', desc: 'Track APC payments & invoices', href: '/admin/payments', icon: CreditCard },
                { title: 'Platform Announcements', desc: 'Post site notices & Calls for Papers', href: '/admin/announcements', icon: Megaphone },
                { title: 'Audit Trail Logs', desc: 'Inspect security & role logs', href: '/admin/audit-logs', icon: ScrollText },
                { title: 'Analytics & Reports', desc: 'Readership metrics & DOI stats', href: '/admin/reports', icon: BarChart2 },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group rounded-2xl border border-sand/30 bg-ivory/30 p-5 flex flex-col justify-between hover:bg-sand/15 hover:border-ochre/40 transition-all shadow-xs"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-9 w-9 rounded-xl bg-ochre/15 text-ochre flex items-center justify-center font-bold text-xs group-hover:bg-ochre group-hover:text-ivory transition-colors">
                        <Icon className="h-4 w-4" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-forest-green/30 group-hover:text-ochre transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-forest-green text-sm group-hover:text-ochre transition-colors">{item.title}</h4>
                      <p className="text-xs text-forest-green/50 mt-0.5">{item.desc}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Activity Feed */}
        <div className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm space-y-4">
          <div className="border-b border-sand/20 pb-3">
            <h3 className="font-display text-base font-bold text-forest-green">Recent Governance Log</h3>
            <p className="text-xs text-forest-green/45 mt-0.5">Real-time system events</p>
          </div>

          <div className="relative border-l border-sand/30 pl-4 ml-2 space-y-5">
            {[
              { title: 'New Submission Received', date: 'Just now', desc: 'Author submitted abstract MS-2026-8942.' },
              { title: 'Editor Onboarded', date: 'Today', desc: 'Prof. Shital R Kalekar appointed to Board.' },
              { title: 'Paper Final Approved', date: 'Yesterday', desc: 'MS-2025-003 approved & published with DOI.' },
              { title: 'APC Payment Settled', date: '2 days ago', desc: 'Invoice INV-2026-8491 paid successfully.' },
            ].map((log, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[23px] top-1 h-3 w-3 rounded-full bg-ochre border border-white" />
                <div className="flex items-center justify-between gap-1">
                  <h4 className="font-bold text-forest-green text-xs">{log.title}</h4>
                  <span className="text-[9px] font-bold text-forest-green/35 uppercase">{log.date}</span>
                </div>
                <p className="text-[11px] text-forest-green/55 mt-0.5 leading-normal">{log.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
