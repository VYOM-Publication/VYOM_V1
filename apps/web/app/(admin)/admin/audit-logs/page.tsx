'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DEMO_AUDIT_LOGS } from '@/lib/demo-data';
import { Search, Shield, Lock, Activity, RefreshCw } from 'lucide-react';

const ROLE_COLOR: Record<string, string> = {
  Admin:    'bg-red-50 text-red-700 border border-red-200',
  Editor:   'bg-purple-50 text-purple-700 border border-purple-200',
  Reviewer: 'bg-blue-50 text-blue-700 border border-blue-200',
  Author:   'bg-ochre/10 text-ochre border border-ochre/20',
  System:   'bg-sand/30 text-forest-green/60 border border-sand/30',
};

export default function AuditLogsPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  const filtered = DEMO_AUDIT_LOGS.filter(l => {
    const matchRole = roleFilter === 'ALL' || l.role === roleFilter;
    const matchSearch = !search.trim() ||
      l.actor.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.entity.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  return (
    <>
      <PageHeader title="Platform Audit Trail & Security Logs" subtitle="Immutable System Event Logging & Role Governance" role="admin" />

      <main className="flex-1 px-8 py-6 flex flex-col gap-6">
        {/* Search & Filter Bar */}
        <div className="rounded-3xl border border-sand/40 bg-white p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-forest-green/40" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search security log by actor name, action, or entity ID..."
              className="w-full rounded-2xl border border-sand/40 bg-ivory/40 pl-11 pr-4 py-2.5 text-xs text-forest-green focus:outline-none focus:border-ochre font-medium"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-forest-green/50 mr-1">Role:</span>
            {['ALL', 'Admin', 'Editor', 'Reviewer', 'Author', 'System'].map(r => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${
                  roleFilter === r
                    ? 'bg-forest-green text-white shadow-xs'
                    : 'bg-sand/20 text-forest-green/60 hover:bg-sand/40'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="rounded-3xl border border-sand/40 bg-white overflow-hidden shadow-sm">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-sand/20 bg-ivory/40">
                {['TIMESTAMP', 'ACTOR', 'ROLE', 'ACTION', 'TARGET ENTITY', 'EVENT DETAILS', 'IP ADDRESS'].map(h => (
                  <th key={h} className="px-5 py-3.5 font-bold uppercase tracking-widest text-forest-green/40 text-[10px]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/20">
              {filtered.map(l => (
                <tr key={l.id} className="hover:bg-sand/10 transition-colors">
                  <td className="px-5 py-4 font-mono text-forest-green/50 whitespace-nowrap text-[11px]">{l.timestamp}</td>
                  <td className="px-5 py-4 font-bold text-forest-green whitespace-nowrap">{l.actor}</td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest ${ROLE_COLOR[l.role] ?? 'bg-sand/30 text-forest-green/50'}`}>
                      {l.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-mono text-forest-green/70 whitespace-nowrap text-[11px]">{l.action}</td>
                  <td className="px-5 py-4 font-bold text-ochre whitespace-nowrap">{l.entity}</td>
                  <td className="px-5 py-4 font-medium text-forest-green/70 max-w-[240px] truncate">{l.detail}</td>
                  <td className="px-5 py-4 font-mono text-forest-green/40 whitespace-nowrap text-[11px]">{l.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
