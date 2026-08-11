'use client';

// TODO: Replace demo data with GET /api/v1/submissions once backend credentials are available.

import { useState } from 'react';
import Link from 'next/link';
import { DEMO_SUBMISSIONS } from '@/lib/demo-data';
import { StatusBadge } from '@/components/common/StatusBadge';
import { EditorialPipeline } from '@/components/editor/EditorialPipeline';
import { EmptyState } from '@/components/common/EmptyState';
import { 
  FileText, Search, Filter, Users, ArrowRight, 
  Calendar, CheckCircle, Clock, AlertCircle 
} from 'lucide-react';

export default function EditorSubmissionsPage() {
  const [filterJournal, setFilterJournal] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSubmissions = DEMO_SUBMISSIONS.filter(s => {
    const matchJournal = filterJournal === 'ALL' || s.journal === filterJournal;
    const matchStatus = filterStatus === 'ALL' || s.status === filterStatus;
    const matchSearch = !searchQuery.trim() || 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchJournal && matchStatus && matchSearch;
  });

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
      {/* Header */}
      <div className="border-b border-sand/30 pb-6 mb-8">
        <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">Editorial Desk</span>
        <h1 className="font-display text-3xl font-bold text-forest-green mt-1">Submission Queue</h1>
      </div>

      {/* Filter & Search Bar */}
      <div className="rounded-3xl border border-sand/40 bg-white p-5 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-forest-green/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by manuscript ID, title, or author name..."
            className="w-full rounded-2xl border border-sand/40 bg-ivory/40 pl-11 pr-4 py-2.5 text-xs text-forest-green focus:outline-none focus:border-ochre transition-all font-medium"
          />
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-forest-green/60">
            <Filter className="h-3.5 w-3.5 text-ochre" /> Filter Journal:
          </div>
          {['ALL', 'VJLS', 'VQR'].map(j => (
            <button
              key={j}
              onClick={() => setFilterJournal(j)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${
                filterJournal === j
                  ? 'bg-ochre text-white shadow-sm'
                  : 'bg-sand/20 text-forest-green/60 hover:bg-sand/45'
              }`}
            >
              {j}
            </button>
          ))}

          <div className="h-4 w-px bg-sand/30 mx-1 hidden sm:block" />

          {['ALL', 'UNDER REVIEW', 'REVISION', 'ACCEPTED'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${
                filterStatus === st
                  ? 'bg-forest-green text-white shadow-sm'
                  : 'bg-sand/20 text-forest-green/60 hover:bg-sand/45'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Manuscripts List */}
      <div className="space-y-6">
        {filteredSubmissions.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No submissions match your filters."
            description="Try adjusting your search terms or status filters."
          />
        ) : (
          <div className="flex flex-col gap-6">
            {filteredSubmissions.map(s => {
              const isUrgent = s.daysInPipeline >= 30;

              return (
                <div
                  key={s.id}
                  className={`rounded-3xl border bg-white p-6 shadow-sm hover:shadow-card hover:border-sand transition-all flex flex-col gap-5 ${
                    isUrgent ? 'border-amber-200 bg-amber-50/5' : 'border-sand/40'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-sand/20 pb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <span className="text-xs font-bold text-ochre">{s.id}</span>
                        <span className="text-[10px] font-bold text-forest-green/45 uppercase tracking-wider">{s.journal}</span>
                        <StatusBadge status={s.status} />
                        {isUrgent && (
                          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[9px] font-bold text-amber-700 uppercase tracking-widest inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {s.daysInPipeline} Days in Pipeline
                          </span>
                        )}
                      </div>

                      <h3 className="font-display text-lg font-bold text-forest-green leading-snug">
                        {s.title}
                      </h3>

                      <p className="text-xs text-forest-green/55 mt-1">
                        Author: <span className="font-bold text-forest-green">{s.author}</span> · Submitted Date: {s.submittedDate}
                      </p>
                    </div>

                    <div className="flex flex-row sm:flex-col gap-2 items-center sm:items-end shrink-0">
                      <Link
                        href={`/editor/submissions/${s.id}`}
                        className="rounded-full bg-ochre px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 transition-colors inline-flex items-center gap-1.5 shadow-sm"
                      >
                        Open Workspace <ArrowRight className="h-3.5 w-3.5" />
                      </Link>

                      <span className="text-xs font-bold text-forest-green/60 flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-ochre" /> {s.reviewerCount} Reviewers Assigned
                      </span>
                    </div>
                  </div>

                  {/* Stage Workflow Pipeline */}
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-forest-green/35 mb-2">
                      Editorial Stage Progress
                    </p>
                    <EditorialPipeline status={s.status} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
