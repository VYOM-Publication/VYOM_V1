'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DEMO_PAYMENTS } from '@/lib/demo-data';
import { 
  CreditCard, CheckCircle, Clock, AlertCircle, Search, 
  Download, Filter, ShieldCheck, DollarSign, ArrowUpRight 
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminPaymentsPage() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const completedRevenue = DEMO_PAYMENTS.filter(p => p.status === 'COMPLETED').reduce((sum, p) => sum + p.amount, 0);
  const pendingRevenue   = DEMO_PAYMENTS.filter(p => p.status === 'PENDING').reduce((sum, p) => sum + p.amount, 0);

  const filtered = DEMO_PAYMENTS.filter(p => {
    const matchStatus = filterStatus === 'ALL' || p.status === filterStatus;
    const matchSearch = !search.trim() ||
      p.author.toLowerCase().includes(search.toLowerCase()) ||
      p.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
      p.submission.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleDownloadInvoice = (invoiceNo: string) => {
    toast.success(`Downloaded Official Invoice ${invoiceNo}`);
  };

  return (
    <>
      <PageHeader title="APC Payments & Financial Governance" subtitle="Article Processing Charges & Revenue Accounting" role="admin" />

      <main className="flex-1 px-8 py-6 flex flex-col gap-6">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-white via-white to-emerald-50/50 p-6 shadow-sm flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between text-emerald-700">
              <span className="text-[9px] font-bold uppercase tracking-widest">Settled Revenue</span>
              <CreditCard className="h-4 w-4" />
            </div>
            <p className="font-display text-3xl font-bold text-forest-green">₹{completedRevenue.toLocaleString('en-IN')}</p>
            <p className="text-[10px] text-emerald-700 font-medium">Completed Transactions</p>
          </div>

          <div className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between text-forest-green/40">
              <span className="text-[9px] font-bold uppercase tracking-widest">Pending Invoices</span>
              <Clock className="h-4 w-4 text-ochre" />
            </div>
            <p className="font-display text-3xl font-bold text-ochre">₹{pendingRevenue.toLocaleString('en-IN')}</p>
            <p className="text-[10px] text-forest-green/45 font-medium">Awaiting Author Payment</p>
          </div>

          <div className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between text-forest-green/40">
              <span className="text-[9px] font-bold uppercase tracking-widest">Settled Count</span>
              <CheckCircle className="h-4 w-4 text-forest-green" />
            </div>
            <p className="font-display text-3xl font-bold text-forest-green">
              {DEMO_PAYMENTS.filter(p => p.status === 'COMPLETED').length}
            </p>
            <p className="text-[10px] text-forest-green/45 font-medium">Standard APC Fees</p>
          </div>

          <div className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between text-forest-green/40">
              <span className="text-[9px] font-bold uppercase tracking-widest">Standard Fee</span>
              <DollarSign className="h-4 w-4 text-ochre" />
            </div>
            <p className="font-display text-3xl font-bold text-forest-green">₹8,500</p>
            <p className="text-[10px] text-forest-green/45 font-medium">Fixed Article Charge</p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="rounded-3xl border border-sand/40 bg-white p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-forest-green/40" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by invoice number, author name, or manuscript ID..."
              className="w-full rounded-2xl border border-sand/40 bg-ivory/40 pl-11 pr-4 py-2.5 text-xs text-forest-green focus:outline-none focus:border-ochre font-medium"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-forest-green/50 mr-1">Filter:</span>
            {['ALL', 'COMPLETED', 'PENDING', 'FAILED'].map(st => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${
                  filterStatus === st
                    ? 'bg-ochre text-white shadow-xs'
                    : 'bg-sand/20 text-forest-green/60 hover:bg-sand/40'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Financial Table */}
        <div className="rounded-3xl border border-sand/40 bg-white overflow-hidden shadow-sm">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-sand/20 bg-ivory/40">
                {['INVOICE NO', 'AUTHOR', 'MANUSCRIPT', 'AMOUNT', 'PAYMENT METHOD', 'STATUS', 'DATE', 'ACTIONS'].map(h => (
                  <th key={h} className="px-5 py-3.5 font-bold uppercase tracking-widest text-forest-green/40 text-[10px]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/20">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-sand/10 transition-colors">
                  <td className="px-5 py-4 font-bold text-ochre whitespace-nowrap">{p.invoiceNo}</td>
                  <td className="px-5 py-4 font-bold text-forest-green whitespace-nowrap">{p.author}</td>
                  <td className="px-5 py-4 font-medium text-forest-green/70 whitespace-nowrap">{p.submission}</td>
                  <td className="px-5 py-4 font-display font-bold text-forest-green text-sm whitespace-nowrap">₹{p.amount.toLocaleString('en-IN')}</td>
                  <td className="px-5 py-4 text-forest-green/60 font-semibold whitespace-nowrap">{p.method}</td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-widest ${
                      p.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      p.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-red-50 text-red-600 border border-red-200'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-forest-green/50 whitespace-nowrap">{p.date}</td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDownloadInvoice(p.invoiceNo)}
                      className="rounded-full border border-sand px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-forest-green/70 hover:border-forest-green hover:text-forest-green transition-all inline-flex items-center gap-1"
                    >
                      <Download className="h-3 w-3" /> Invoice PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
