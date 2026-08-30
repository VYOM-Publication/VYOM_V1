'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/common/PageHeader';
import { DEMO_USERS } from '@/lib/demo-data';
import { Search, Users, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

const ROLE_COLOR: Record<string, string> = {
  Admin:    'bg-red-50 text-red-700 border border-red-200',
  Editor:   'bg-purple-50 text-purple-700 border border-purple-200',
  Reviewer: 'bg-blue-50 text-blue-700 border border-blue-200',
  Author:   'bg-ochre/10 text-ochre border border-ochre/20',
  Member:   'bg-sand/30 text-forest-green/60 border border-sand/30',
};

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const filtered = DEMO_USERS.filter(u =>
    (roleFilter === 'All' || u.role === roleFilter) &&
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <PageHeader title="User Accounts Directory" subtitle="Platform Account Governance & Role Directory" role="admin" />

      <main className="flex-1 px-8 py-6 flex flex-col gap-6">
        {/* Banner linking to Editors Roster */}
        <div className="rounded-3xl border border-ochre/30 bg-ochre/10 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <UserCheck className="h-8 w-8 text-ochre shrink-0" />
            <div>
              <h3 className="font-display text-base font-bold text-forest-green">Managing Editors & Board Management</h3>
              <p className="text-xs text-forest-green/70">To onboard new editors, assign manuscripts, or view editor workloads, use the dedicated Editor Roster.</p>
            </div>
          </div>
          <Link
            href="/admin/editors"
            className="rounded-full bg-ochre px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 shadow-xs transition-all inline-flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
          >
            Go to Editor Roster <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
          {['All', 'Admin', 'Editor', 'Reviewer', 'Author', 'Member'].map(role => {
            const count = role === 'All' ? DEMO_USERS.length : DEMO_USERS.filter(u => u.role === role).length;
            const isSelected = roleFilter === role;
            return (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`rounded-2xl border p-4 text-left transition-all ${
                  isSelected ? 'border-ochre bg-ochre/10 shadow-xs ring-1 ring-ochre/20' : 'border-sand/40 bg-white hover:border-sand'
                }`}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-forest-green/45">{role}</p>
                <p className="font-display text-2xl font-bold text-forest-green mt-1">{count}</p>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-forest-green/40" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search accounts by user name, email, or role..."
            className="w-full rounded-2xl border border-sand/40 bg-white pl-11 pr-4 py-3 text-xs text-forest-green focus:outline-none focus:border-ochre shadow-xs font-medium"
          />
        </div>

        {/* Table */}
        <div className="rounded-3xl border border-sand/40 bg-white overflow-hidden shadow-sm">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-sand/20 bg-ivory/40">
                {['ID', 'NAME', 'EMAIL', 'ROLE', 'STATUS', 'JOINED', 'SUBMISSIONS'].map(h => (
                  <th key={h} className="px-5 py-3.5 font-bold uppercase tracking-widest text-forest-green/40 text-[10px]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/20">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-sand/10 transition-colors">
                  <td className="px-5 py-4 font-bold text-forest-green/40 whitespace-nowrap">{u.id}</td>
                  <td className="px-5 py-4 font-bold text-forest-green whitespace-nowrap">{u.name}</td>
                  <td className="px-5 py-4 text-forest-green/70 font-semibold whitespace-nowrap">{u.email}</td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-widest ${ROLE_COLOR[u.role] || 'bg-sand/30 text-forest-green'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-widest ${
                      u.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-forest-green/50 whitespace-nowrap">{u.joined}</td>
                  <td className="px-5 py-4 text-forest-green/70 font-bold whitespace-nowrap">{u.submissions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
