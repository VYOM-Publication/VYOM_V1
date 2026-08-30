'use client';

import { PageHeader } from '@/components/common/PageHeader';
import { DEMO_MONTHLY_SUBMISSIONS, DEMO_JOURNAL_DIST } from '@/lib/demo-data';
import { BarChart2, TrendingUp, Clock, CreditCard, Award, ArrowUpRight } from 'lucide-react';

const maxCount = Math.max(...DEMO_MONTHLY_SUBMISSIONS.map(m => m.count));

export default function AdminReportsPage() {
  return (
    <>
      <PageHeader title="Platform Analytics & Publishing Reports" subtitle="Submission Velocity, Acceptance Funnel & Readership Trends" role="admin" />

      <main className="flex-1 px-8 py-6 flex flex-col gap-6">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between text-forest-green/40">
              <span className="text-[9px] font-bold uppercase tracking-widest">Total Manuscripts</span>
              <BarChart2 className="h-4 w-4 text-ochre" />
            </div>
            <p className="font-display text-3xl font-bold text-forest-green">38</p>
            <p className="text-[10px] text-forest-green/45 font-medium">+14% vs previous quarter</p>
          </div>

          <div className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between text-forest-green/40">
              <span className="text-[9px] font-bold uppercase tracking-widest">Acceptance Rate</span>
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="font-display text-3xl font-bold text-emerald-700">34%</p>
            <p className="text-[10px] text-forest-green/45 font-medium">Peer Review Selectivity</p>
          </div>

          <div className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between text-forest-green/40">
              <span className="text-[9px] font-bold uppercase tracking-widest">Avg Turnaround</span>
              <Clock className="h-4 w-4 text-ochre" />
            </div>
            <p className="font-display text-3xl font-bold text-forest-green">21d</p>
            <p className="text-[10px] text-forest-green/45 font-medium">Submission to Decision</p>
          </div>

          <div className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between text-forest-green/40">
              <span className="text-[9px] font-bold uppercase tracking-widest">Gross Revenue</span>
              <CreditCard className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="font-display text-3xl font-bold text-forest-green">₹25.5K</p>
            <p className="text-[10px] text-forest-green/45 font-medium">Article Processing Charges</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Submissions Chart */}
          <div className="rounded-3xl border border-sand/40 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-sand/20 pb-4 mb-6">
              <div>
                <h2 className="font-display text-lg font-bold text-forest-green">Monthly Submission Velocity</h2>
                <p className="text-xs text-forest-green/50 mt-0.5">Incoming author abstracts by month</p>
              </div>
              <span className="text-xs font-bold text-ochre uppercase tracking-wider">2026 YTD</span>
            </div>

            <div className="flex items-end gap-4 h-40 pt-4">
              {DEMO_MONTHLY_SUBMISSIONS.map(m => (
                <div key={m.month} className="flex flex-col items-center gap-2 flex-1">
                  <span className="text-xs font-bold text-forest-green">{m.count}</span>
                  <div 
                    className="w-full rounded-t-xl bg-gradient-to-t from-ochre to-ochre/80 transition-all hover:opacity-90"
                    style={{ height: `${(m.count / maxCount) * 100}%` }}
                  />
                  <span className="text-[10px] font-bold uppercase text-forest-green/50">{m.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Journal Distribution */}
          <div className="rounded-3xl border border-sand/40 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-sand/20 pb-4 mb-6">
              <div>
                <h2 className="font-display text-lg font-bold text-forest-green">Submissions by Journal Domain</h2>
                <p className="text-xs text-forest-green/50 mt-0.5">Share of manuscript distribution</p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {DEMO_JOURNAL_DIST.map(j => (
                <div key={j.journal}>
                  <div className="flex justify-between text-xs mb-1.5 font-bold">
                    <span className="text-forest-green">{j.journal}</span>
                    <span className="text-ochre">{j.count} Manuscripts ({j.pct}%)</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-sand/25 overflow-hidden">
                    <div className="h-3 rounded-full bg-ochre transition-all" style={{ width: `${j.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submission Funnel */}
          <div className="rounded-3xl border border-sand/40 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-sand/20 pb-4 mb-6">
              <div>
                <h2 className="font-display text-lg font-bold text-forest-green">Publication Pipeline Funnel</h2>
                <p className="text-xs text-forest-green/50 mt-0.5">Conversion rate across editorial stages</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { label: 'Submitted to Admin', count: 38, pct: 100 },
                { label: 'Assigned to Managing Editor', count: 31, pct: 82 },
                { label: 'Under Peer Review', count: 22, pct: 58 },
                { label: 'Accepted by Editor', count: 13, pct: 34 },
                { label: 'Published & Indexed', count: 8, pct: 21 },
              ].map(f => (
                <div key={f.label}>
                  <div className="flex justify-between text-xs mb-1 font-semibold">
                    <span className="text-forest-green/70">{f.label}</span>
                    <span className="font-bold text-forest-green">{f.count} ({f.pct}%)</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-sand/25 overflow-hidden">
                    <div className="h-2.5 rounded-full bg-forest-green" style={{ width: `${f.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="rounded-3xl border border-sand/40 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-sand/20 pb-4 mb-6">
              <div>
                <h2 className="font-display text-lg font-bold text-forest-green">Revenue & Fee Accounting</h2>
                <p className="text-xs text-forest-green/50 mt-0.5">Article Processing Charges (APC) Ledger</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 text-xs font-semibold">
              {[
                ['Settled Payments', '₹17,000', 'text-emerald-700 font-bold'],
                ['Pending Payment Invoices', '₹8,500', 'text-amber-700 font-bold'],
                ['Waived / Scholarship Fees', '₹0', 'text-forest-green/40'],
                ['Total Gross Invoiced', '₹25,500', 'text-forest-green font-display text-base font-bold'],
              ].map(([label, value, cls]) => (
                <div key={label} className="flex justify-between items-center border-b border-sand/20 pb-3">
                  <span className="text-forest-green/70">{label}</span>
                  <span className={cls}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
