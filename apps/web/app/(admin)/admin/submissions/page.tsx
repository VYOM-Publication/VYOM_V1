'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { useSubmissionsStore, ManuscriptSubmission } from '@/lib/stores/submissions.store';
import { Search, UserCheck, CheckCircle2, ShieldAlert, Sparkles, X } from 'lucide-react';
import { toast } from 'sonner';

const OFFICIAL_EDITORS = [
  'Prof. Shital R Kalekar',
  'Poonam U Nalawade',
  'Dr. Vimla Choudhary',
  'Prof. Ganesh More',
];

const STATUS_COLOR: Record<string, string> = {
  'SUBMITTED_TO_ADMIN': 'bg-amber-100 text-amber-800 border border-amber-300 font-bold animate-pulse',
  'ASSIGNED_TO_EDITOR': 'bg-blue-50 text-blue-700 border border-blue-200',
  'UNDER REVIEW':       'bg-ochre/10 text-ochre border border-ochre/20',
  'REVISION':           'bg-amber-50 text-amber-600 border border-amber-200',
  'ACCEPTED':           'bg-emerald-50 text-emerald-700 border border-emerald-200',
  'PENDING_FINAL_ADMIN_APPROVAL': 'bg-purple-50 text-purple-700 border border-purple-200 font-bold',
  'PUBLISHED':          'bg-teal-50 text-teal-700 border border-teal-200',
  'REJECTED':           'bg-red-50 text-red-600 border border-red-200',
};

export default function AdminSubmissionsPage() {
  const { submissions, adminAssignEditor, adminFinalPublish } = useSubmissionsStore();
  const [search, setSearch] = useState('');
  const [assigningSub, setAssigningSub] = useState<ManuscriptSubmission | null>(null);

  const filtered = submissions.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.id.toLowerCase().includes(search.toLowerCase()) ||
    s.author.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditorSelection = (editorName: string) => {
    if (!assigningSub) return;
    adminAssignEditor(assigningSub.id, editorName);
    toast.success(`Assigned manuscript ${assigningSub.id} to Editor ${editorName}!`);
    setAssigningSub(null);
  };

  const handleFinalApprove = (subId: string) => {
    adminFinalPublish(subId);
    toast.success(`Manuscript ${subId} officially approved & published!`);
  };

  return (
    <>
      <PageHeader title="All Submissions Governance" subtitle="Admin Oversight & Manuscript Routing" role="admin" />

      <main className="flex-1 px-8 py-6 flex flex-col gap-6">
        {/* Status summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
          {[
            { id: 'SUBMITTED_TO_ADMIN', label: 'Unassigned' },
            { id: 'ASSIGNED_TO_EDITOR', label: 'In Editorial' },
            { id: 'UNDER REVIEW',       label: 'Peer Review' },
            { id: 'REVISION',           label: 'Revision' },
            { id: 'ACCEPTED',           label: 'Accepted' },
            { id: 'PUBLISHED',          label: 'Published' },
          ].map(st => {
            const count = submissions.filter(s => s.status === st.id).length;
            return (
              <div key={st.id} className="rounded-2xl border border-sand/40 bg-white p-4 shadow-xs">
                <p className="text-[10px] font-bold uppercase tracking-widest text-forest-green/45">{st.label}</p>
                <p className="font-display text-2xl font-bold text-forest-green mt-1">{count}</p>
              </div>
            );
          })}
        </div>

        {/* Editor Assignment Modal */}
        {assigningSub && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-lg rounded-3xl border border-sand/40 bg-white p-6 shadow-2xl space-y-5">
              <div className="flex items-start justify-between border-b border-sand/20 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">Admin Oversight</span>
                  <h3 className="font-display text-xl font-bold text-forest-green mt-0.5">
                    Assign Editor to Manuscript
                  </h3>
                  <p className="text-xs text-ochre font-bold mt-1">{assigningSub.id} — {assigningSub.title}</p>
                </div>
                <button onClick={() => setAssigningSub(null)} className="p-1 text-forest-green/40 hover:text-forest-green">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="text-xs font-bold text-forest-green/60 uppercase tracking-widest">
                Select Managing Editor:
              </p>

              <div className="space-y-2.5">
                {OFFICIAL_EDITORS.map(edName => (
                  <button
                    key={edName}
                    onClick={() => handleEditorSelection(edName)}
                    className="w-full rounded-2xl border border-sand/40 bg-ivory/30 p-4 text-left hover:border-ochre hover:bg-ochre/5 hover:shadow-xs transition-all flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-bold text-forest-green text-sm">{edName}</h4>
                      <p className="text-[10px] text-forest-green/50">VYOM Editorial Board</p>
                    </div>
                    <UserCheck className="h-4 w-4 text-ochre" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-forest-green/40" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by manuscript ID, title, author, or status..."
            className="w-full rounded-2xl border border-sand/40 bg-white pl-11 pr-4 py-3 text-xs text-forest-green focus:outline-none focus:border-ochre shadow-xs font-medium"
          />
        </div>

        {/* Table */}
        <div className="rounded-3xl border border-sand/40 bg-white overflow-hidden shadow-sm">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-sand/20 bg-ivory/40">
                {['ID', 'TITLE', 'AUTHOR', 'JOURNAL', 'STATUS', 'ASSIGNED EDITOR', 'ADMIN ACTIONS'].map(h => (
                  <th key={h} className="px-5 py-3.5 font-bold uppercase tracking-widest text-forest-green/40 text-[10px]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/20">
              {filtered.map(s => {
                const isUnassigned = s.status === 'SUBMITTED_TO_ADMIN' || !s.assignedEditorName;
                const isPendingPublish = s.status === 'PENDING_FINAL_ADMIN_APPROVAL' || s.status === 'ACCEPTED';

                return (
                  <tr key={s.id} className="hover:bg-sand/10 transition-colors">
                    <td className="px-5 py-4 font-bold text-ochre whitespace-nowrap">{s.id}</td>
                    <td className="px-5 py-4 font-bold text-forest-green max-w-[220px] truncate">{s.title}</td>
                    <td className="px-5 py-4 font-medium text-forest-green/70 whitespace-nowrap">{s.author}</td>
                    <td className="px-5 py-4 text-forest-green/50 whitespace-nowrap">{s.journal}</td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`rounded-full px-3 py-1 text-[9px] uppercase tracking-wider ${STATUS_COLOR[s.status] || 'bg-sand/30 text-forest-green'}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-forest-green/70 font-semibold whitespace-nowrap">
                      {s.assignedEditorName || <span className="text-amber-600 font-bold italic">Unassigned</span>}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      {isUnassigned ? (
                        <button
                          onClick={() => setAssigningSub(s)}
                          className="rounded-full bg-ochre px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 shadow-xs transition-all inline-flex items-center gap-1"
                        >
                          <UserCheck className="h-3 w-3" /> Assign Editor
                        </button>
                      ) : isPendingPublish ? (
                        <button
                          onClick={() => handleFinalApprove(s.id)}
                          className="rounded-full bg-emerald-600 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-emerald-700 shadow-xs transition-all inline-flex items-center gap-1"
                        >
                          <Sparkles className="h-3 w-3" /> Approve & Publish
                        </button>
                      ) : (
                        <span className="text-[10px] text-forest-green/40 italic">In Pipeline</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
