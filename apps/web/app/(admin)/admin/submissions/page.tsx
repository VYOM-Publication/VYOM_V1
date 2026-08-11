'use client';

// TODO: Replace demo data with GET /api/v1/admin/submissions once backend credentials are available.

import { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DEMO_SUBMISSIONS } from '@/lib/demo-data';
import { Search } from 'lucide-react';

const STATUS_COLOR: Record<string, string> = {
  'UNDER REVIEW': 'bg-ochre/10 text-ochre',
  'REVISION':     'bg-amber-50 text-amber-600',
  'ACCEPTED':     'bg-green-50 text-green-600',
  'PUBLISHED':    'bg-teal-50 text-teal-600',
  'REJECTED':     'bg-red-50 text-red-500',
};

export default function AdminSubmissionsPage() {
  const [search, setSearch] = useState('');
  const filtered = DEMO_SUBMISSIONS.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.id.toLowerCase().includes(search.toLowerCase()) ||
    s.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <PageHeader title="All Submissions" subtitle="Platform-wide Manuscript Pipeline" role="admin" />

      <main className="flex-1 px-8 py-6 flex flex-col gap-4">
        {/* Status summary */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {['UNDER REVIEW', 'REVISION', 'ACCEPTED', 'PUBLISHED', 'REJECTED'].map(status => {
            const count = DEMO_SUBMISSIONS.filter(s => s.status === status).length;
            return (
              <div key={status} className={`rounded-2xl border p-4 ${STATUS_COLOR[status]}`}>
                <p className="text-xs font-bold uppercase tracking-widest opacity-60">{status}</p>
                <p className="font-display text-2xl font-bold mt-1">{count}</p>
              </div>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-forest-green/30" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by title, author, ID..."
            className="w-full rounded-xl border border-sand/40 bg-white pl-9 pr-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre" />
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-sand/40 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sand/20">
                {['ID', 'TITLE', 'AUTHOR', 'JOURNAL', 'STATUS', 'DAYS', 'PAYMENT', 'EDITOR'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-forest-green/30">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id} className="border-b border-sand/10 hover:bg-ivory/50 transition-colors">
                  <td className="px-4 py-3 text-xs font-bold text-ochre">{s.id}</td>
                  <td className="px-4 py-3 text-forest-green font-medium max-w-[180px] truncate">{s.title}</td>
                  <td className="px-4 py-3 text-xs text-forest-green/60">{s.author}</td>
                  <td className="px-4 py-3 text-xs text-forest-green/40">{s.journal}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${STATUS_COLOR[s.status]}`}>{s.status}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-forest-green/40">{s.daysInPipeline}d</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${s.paymentStatus === 'paid' ? 'bg-green-50 text-green-600' : 'bg-sand/30 text-forest-green/40'}`}>
                      {s.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-forest-green/50">{s.editorName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
