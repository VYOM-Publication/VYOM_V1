'use client';

// TODO: Replace demo data with GET /api/v1/admin/reports once backend credentials are available.

import { PageHeader } from '@/components/common/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { DEMO_MONTHLY_SUBMISSIONS, DEMO_JOURNAL_DIST } from '@/lib/demo-data';

const maxCount = Math.max(...DEMO_MONTHLY_SUBMISSIONS.map(m => m.count));

export default function AdminReportsPage() {
  return (
    <>
      <PageHeader title="Reports" subtitle="Platform Analytics · 2025" role="admin" />

      <main className="flex-1 px-8 py-6 flex flex-col gap-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Submissions" value="38" />
          <StatCard label="Acceptance Rate"   value="34%" />
          <StatCard label="Avg Review Time"   value="21 days" />
          <StatCard label="Total Revenue"     value="₹17,000" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Monthly submissions bar chart */}
          <div className="rounded-2xl border border-sand/40 bg-white p-6">
            <h2 className="font-display text-lg font-bold text-forest-green mb-5">Monthly Submissions</h2>
            <div className="flex items-end gap-3 h-32">
              {DEMO_MONTHLY_SUBMISSIONS.map(m => (
                <div key={m.month} className="flex flex-col items-center gap-1 flex-1">
                  <span className="text-xs font-bold text-forest-green/60">{m.count}</span>
                  <div className="w-full rounded-t-lg bg-ochre/80 transition-all"
                    style={{ height: `${(m.count / maxCount) * 100}%` }} />
                  <span className="text-xs text-forest-green/40">{m.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Journal distribution */}
          <div className="rounded-2xl border border-sand/40 bg-white p-6">
            <h2 className="font-display text-lg font-bold text-forest-green mb-5">Submissions by Journal</h2>
            <div className="flex flex-col gap-4">
              {DEMO_JOURNAL_DIST.map(j => (
                <div key={j.journal}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-bold text-forest-green">{j.journal}</span>
                    <span className="text-forest-green/50">{j.count} ({j.pct}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-sand/30">
                    <div className="h-2 rounded-full bg-ochre" style={{ width: `${j.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submission funnel */}
          <div className="rounded-2xl border border-sand/40 bg-white p-6">
            <h2 className="font-display text-lg font-bold text-forest-green mb-5">Submission Funnel</h2>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Submitted', count: 38, pct: 100 },
                { label: 'Passed Abstract Review', count: 31, pct: 82 },
                { label: 'Completed Peer Review', count: 22, pct: 58 },
                { label: 'Accepted', count: 13, pct: 34 },
                { label: 'Published', count: 8, pct: 21 },
              ].map(f => (
                <div key={f.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-forest-green/70">{f.label}</span>
                    <span className="font-bold text-forest-green">{f.count}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-sand/30">
                    <div className="h-1.5 rounded-full bg-forest-green/60" style={{ width: `${f.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue summary */}
          <div className="rounded-2xl border border-sand/40 bg-white p-6">
            <h2 className="font-display text-lg font-bold text-forest-green mb-5">Revenue Summary</h2>
            <div className="flex flex-col gap-3">
              {[
                ['Completed Payments', '₹17,000', 'text-green-600'],
                ['Pending Payments', '₹8,500', 'text-amber-600'],
                ['Failed / Refunded', '₹0', 'text-red-500'],
                ['Total Invoiced', '₹25,500', 'text-forest-green font-bold'],
              ].map(([label, value, cls]) => (
                <div key={label} className="flex justify-between items-center border-b border-sand/20 pb-2">
                  <span className="text-sm text-forest-green/60">{label}</span>
                  <span className={`text-sm ${cls}`}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
