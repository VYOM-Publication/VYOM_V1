'use client';

// TODO: Replace demo data with GET /api/v1/admin/audit-logs once backend credentials are available.

import { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DEMO_AUDIT_LOGS } from '@/lib/demo-data';
import { Search, Shield } from 'lucide-react';

const ROLE_COLOR: Record<string, string> = {
  Admin:    'bg-red-50 text-red-600',
  Editor:   'bg-purple-50 text-purple-600',
  Reviewer: 'bg-blue-50 text-blue-600',
  Author:   'bg-ochre/10 text-ochre',
  System:   'bg-sand/40 text-forest-green/50',
};

export default function AuditLogsPage() {
  const [search, setSearch] = useState('');
  const filtered = DEMO_AUDIT_LOGS.filter(l =>
    l.actor.toLowerCase().includes(search.toLowerCase()) ||
    l.action.toLowerCase().includes(search.toLowerCase()) ||
    l.entity.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <PageHeader title="Audit Logs" subtitle="Platform Activity Trail" role="admin" />

      <main className="flex-1 px-8 py-6 flex flex-col gap-4">
        <div className="flex gap-3 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-forest-green/30" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by actor, action, entity..."
              className="w-full rounded-xl border border-sand/40 bg-white pl-9 pr-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre" />
          </div>
          <span className="text-sm font-bold text-forest-green/40">{filtered.length} entries</span>
        </div>

        <div className="rounded-2xl border border-sand/40 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sand/20">
                {['TIMESTAMP', 'ACTOR', 'ROLE', 'ACTION', 'ENTITY', 'DETAIL', 'IP'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-forest-green/30">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(l => (
                <tr key={l.id} className="border-b border-sand/10 hover:bg-ivory/50 transition-colors">
                  <td className="px-4 py-3 text-xs text-forest-green/40 whitespace-nowrap font-mono">{l.timestamp}</td>
                  <td className="px-4 py-3 text-xs font-medium text-forest-green">{l.actor}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${ROLE_COLOR[l.role] ?? 'bg-sand/30 text-forest-green/50'}`}>{l.role}</span>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-forest-green/60">{l.action}</td>
                  <td className="px-4 py-3 text-xs font-bold text-ochre">{l.entity}</td>
                  <td className="px-4 py-3 text-xs text-forest-green/60 max-w-[220px]">{l.detail}</td>
                  <td className="px-4 py-3 text-xs font-mono text-forest-green/30">{l.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center gap-2 text-xs text-forest-green/30">
          <Shield className="h-3.5 w-3.5" />
          <span>Audit logs are immutable. Demo data shown — real logs will be stored in MongoDB.</span>
        </div>
      </main>
    </>
  );
}
