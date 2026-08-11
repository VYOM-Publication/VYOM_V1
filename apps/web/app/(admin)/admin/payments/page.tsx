'use client';

// TODO: Replace demo data with GET /api/v1/admin/payments once backend credentials are available.

import { PageHeader } from '@/components/common/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { DEMO_PAYMENTS } from '@/lib/demo-data';
import { CreditCard, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const totalRevenue = DEMO_PAYMENTS.filter(p => p.status === 'COMPLETED').reduce((sum, p) => sum + p.amount, 0);

export default function AdminPaymentsPage() {
  return (
    <>
      <PageHeader title="Payments" subtitle="Publication Fee Transactions" role="admin" />

      <main className="flex-1 px-8 py-6 flex flex-col gap-5">
        {/* Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Revenue" value={`₹${totalRevenue.toLocaleString('en-IN')}`} icon={CreditCard} accent />
          <StatCard label="Completed"     value={DEMO_PAYMENTS.filter(p => p.status === 'COMPLETED').length} icon={CheckCircle} />
          <StatCard label="Pending"       value={DEMO_PAYMENTS.filter(p => p.status === 'PENDING').length} icon={Clock} />
          <StatCard label="Failed"        value={DEMO_PAYMENTS.filter(p => p.status === 'FAILED').length} icon={AlertCircle} />
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-sand/40 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sand/20">
                {['INVOICE', 'AUTHOR', 'SUBMISSION', 'AMOUNT', 'METHOD', 'STATUS', 'DATE', 'TRANSACTION'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-forest-green/30">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DEMO_PAYMENTS.map(p => (
                <tr key={p.id} className="border-b border-sand/10 hover:bg-ivory/50 transition-colors">
                  <td className="px-4 py-3 text-xs font-bold text-ochre">{p.invoiceNo}</td>
                  <td className="px-4 py-3 text-forest-green font-medium">{p.author}</td>
                  <td className="px-4 py-3 text-xs text-forest-green/60">{p.submission}</td>
                  <td className="px-4 py-3 text-sm font-bold text-forest-green">₹{p.amount.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 text-xs text-forest-green/50">{p.method}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="px-4 py-3 text-xs text-forest-green/40">{p.date}</td>
                  <td className="px-4 py-3 text-xs text-forest-green/30 font-mono">{p.transactionId ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center gap-2 text-xs text-forest-green/30">
          <CreditCard className="h-3.5 w-3.5" />
          <span>Demo mode — real payment gateway integration pending production credentials.</span>
        </div>
      </main>
    </>
  );
}
