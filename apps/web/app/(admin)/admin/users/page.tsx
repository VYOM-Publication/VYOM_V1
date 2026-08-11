'use client';

// TODO: Replace demo data with GET /api/v1/admin/users once backend credentials are available.

import { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DEMO_USERS } from '@/lib/demo-data';
import { Search, Users } from 'lucide-react';

const ROLE_COLOR: Record<string, string> = {
  Admin:    'bg-red-50 text-red-600',
  Editor:   'bg-purple-50 text-purple-600',
  Reviewer: 'bg-blue-50 text-blue-600',
  Author:   'bg-ochre/10 text-ochre',
  Member:   'bg-sand/40 text-forest-green/60',
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
      <PageHeader title="Users" subtitle="Platform User Management" role="admin" />

      <main className="flex-1 px-8 py-6 flex flex-col gap-4">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {['All', 'Admin', 'Editor', 'Reviewer', 'Author', 'Member'].slice(0, 5).map(role => {
            const count = role === 'All' ? DEMO_USERS.length : DEMO_USERS.filter(u => u.role === role).length;
            return (
              <button key={role} onClick={() => setRoleFilter(role)}
                className={`rounded-2xl border p-4 text-left transition-colors ${roleFilter === role ? 'border-ochre bg-ochre/5' : 'border-sand/40 bg-white hover:border-sand'}`}>
                <p className="text-xs font-bold uppercase tracking-widest text-forest-green/40">{role}</p>
                <p className="font-display text-2xl font-bold text-forest-green mt-1">{count}</p>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-forest-green/30" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full rounded-xl border border-sand/40 bg-white pl-9 pr-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre" />
          </div>
          <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
            className="rounded-xl border border-sand/40 bg-white px-4 py-2.5 text-sm text-forest-green/60 focus:outline-none">
            {['All', 'Admin', 'Editor', 'Reviewer', 'Author', 'Member'].map(r => <option key={r}>{r}</option>)}
          </select>
          <span className="flex items-center px-4 text-sm font-bold text-forest-green/40">{filtered.length} RESULTS</span>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-sand/40 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sand/20">
                {['ID', 'NAME', 'EMAIL', 'ROLE', 'STATUS', 'JOINED', 'SUBMISSIONS', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-forest-green/30">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id} className="border-b border-sand/10 hover:bg-ivory/50 transition-colors">
                  <td className="px-4 py-3 text-xs font-bold text-forest-green/40">{u.id}</td>
                  <td className="px-4 py-3 font-medium text-forest-green">{u.name}</td>
                  <td className="px-4 py-3 text-xs text-forest-green/60">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${ROLE_COLOR[u.role]}`}>{u.role}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${u.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-forest-green/40">{u.joined}</td>
                  <td className="px-4 py-3 text-xs text-forest-green/60">{u.submissions}</td>
                  <td className="px-4 py-3">
                    <button className="text-xs font-bold text-ochre hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-12 text-forest-green/30">
            <Users className="h-8 w-8" />
            <p className="text-sm">No users match your search.</p>
          </div>
        )}
      </main>
    </>
  );
}
