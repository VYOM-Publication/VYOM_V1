'use client';

import { useState } from 'react';
import { useReviewersStore, ReviewerProfile } from '@/lib/stores/reviewers.store';
import { useSubmissionsStore } from '@/lib/stores/submissions.store';
import { EmptyState } from '@/components/common/EmptyState';
import { 
  Users, Search, GraduationCap, Clock, Award, 
  CheckCircle, UserPlus, Filter, Check, X, FileText
} from 'lucide-react';
import { toast } from 'sonner';

export default function EditorReviewersPage() {
  const { reviewers, assignReviewerToManuscript } = useReviewersStore();
  const { submissions, assignReviewer } = useSubmissionsStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReviewer, setSelectedReviewer] = useState<ReviewerProfile | null>(null);

  const filteredReviewers = reviewers.filter(r => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.institution.toLowerCase().includes(q) ||
      r.expertise.some(e => e.toLowerCase().includes(q))
    );
  });

  const handlePairAssignment = (manuscriptId: string, manuscriptTitle: string) => {
    if (!selectedReviewer) return;

    // 1. Update manuscript store
    assignReviewer(manuscriptId, selectedReviewer.name);

    // 2. Update reviewer store & workload
    assignReviewerToManuscript(selectedReviewer.name, manuscriptId);

    toast.success(`Assigned ${selectedReviewer.name} to "${manuscriptTitle}"!`);
    setSelectedReviewer(null);
  };

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
      {/* Header */}
      <div className="border-b border-sand/30 pb-6 mb-8">
        <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">Academic Panel</span>
        <h1 className="font-display text-3xl font-bold text-forest-green mt-1">Reviewer Directory & Assignment</h1>
      </div>

      {/* Search Bar */}
      <div className="rounded-3xl border border-sand/40 bg-white p-5 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-forest-green/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by reviewer name, institution, or expertise domain (e.g. AI, Biotechnology, Herbal)..."
            className="w-full rounded-2xl border border-sand/40 bg-ivory/40 pl-11 pr-4 py-2.5 text-xs text-forest-green focus:outline-none focus:border-ochre transition-all font-medium"
          />
        </div>
        <span className="text-xs font-bold text-forest-green/50 shrink-0">
          Showing {filteredReviewers.length} Reviewers
        </span>
      </div>

      {/* Assignment Modal */}
      {selectedReviewer && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-3xl border border-sand/40 bg-white p-6 shadow-2xl space-y-5 max-h-[85vh] flex flex-col">
            <div className="flex items-start justify-between pb-3 border-b border-sand/20">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">Peer Review Matching</span>
                <h3 className="font-display text-xl font-bold text-forest-green mt-0.5">
                  Assign {selectedReviewer.name}
                </h3>
                <p className="text-xs text-forest-green/60">{selectedReviewer.institution} · h-Index {selectedReviewer.hIndex}</p>
              </div>
              <button 
                onClick={() => setSelectedReviewer(null)}
                className="p-1 rounded-lg text-forest-green/40 hover:text-forest-green hover:bg-sand/20 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Expertise Tags */}
            <div className="flex flex-wrap gap-1.5">
              <span className="text-xs font-bold text-forest-green/40 self-center mr-1">Expertise:</span>
              {selectedReviewer.expertise.map(exp => (
                <span key={exp} className="rounded-full bg-ochre/10 border border-ochre/20 px-2.5 py-0.5 text-[9px] font-bold text-ochre uppercase tracking-wider">
                  {exp}
                </span>
              ))}
            </div>

            <p className="text-xs font-bold uppercase tracking-widest text-forest-green/60 pt-2">
              Select Manuscript from Active Submissions Queue:
            </p>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {submissions.filter(s => s.status !== 'SUBMITTED_TO_ADMIN' && s.assignedEditorName).map(sub => {
                const isAlreadyAssigned = (selectedReviewer.assignedManuscriptIds || []).includes(sub.id) || (sub.assignedReviewers || []).includes(selectedReviewer.name);

                return (
                  <div 
                    key={sub.id} 
                    className="rounded-2xl border border-sand/40 bg-ivory/30 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-sand hover:shadow-xs transition-all"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="h-9 w-9 rounded-xl bg-ochre/15 text-ochre flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-bold text-ochre">{sub.id}</span>
                          <span className="text-[9px] font-bold text-forest-green/40 uppercase">{sub.journal}</span>
                          <span className="rounded-full bg-sand/30 px-2 py-0.5 text-[8px] font-bold text-forest-green/60 uppercase">{sub.status}</span>
                        </div>
                        <h4 className="font-display text-sm font-bold text-forest-green truncate">{sub.title}</h4>
                        <p className="text-[11px] text-forest-green/50 truncate">Author: {sub.author} ({sub.affiliation})</p>
                      </div>
                    </div>

                    <button
                      disabled={isAlreadyAssigned}
                      onClick={() => handlePairAssignment(sub.id, sub.title)}
                      className={`shrink-0 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all inline-flex items-center gap-1.5 ${
                        isAlreadyAssigned
                          ? 'bg-emerald-100 text-emerald-700 cursor-not-allowed opacity-80'
                          : 'bg-ochre text-ivory hover:bg-ochre/90 shadow-xs'
                      }`}
                    >
                      {isAlreadyAssigned ? (
                        <>
                          <Check className="h-3.5 w-3.5" /> Assigned
                        </>
                      ) : (
                        <>
                          <UserPlus className="h-3.5 w-3.5" /> Assign to Paper
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Reviewer Profile Cards Grid */}
      {filteredReviewers.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No reviewers match your search query."
          description="Try searching with a different expertise domain or researcher name."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviewers.map(rev => (
            <div
              key={rev.name}
              className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm hover:border-sand hover:shadow-card transition-all flex flex-col justify-between gap-5"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="h-12 w-12 rounded-full bg-ochre/15 text-ochre flex items-center justify-center font-bold text-base shadow-sm shrink-0 border border-sand/30">
                    {rev.initials}
                  </div>

                  <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest ${
                    rev.available 
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                      : 'bg-sand/30 text-forest-green/45'
                  }`}>
                    {rev.available ? 'Available' : 'Busy'}
                  </span>
                </div>

                <h3 className="font-display text-base font-bold text-forest-green leading-snug">
                  {rev.name}
                </h3>
                
                <p className="text-xs text-forest-green/55 mt-1 font-medium flex items-center gap-1">
                  <GraduationCap className="h-3.5 w-3.5 text-ochre shrink-0" /> {rev.institution}
                </p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {rev.expertise.map(exp => (
                    <span key={exp} className="rounded-full bg-sand/25 border border-sand/20 px-2.5 py-0.5 text-[9px] font-bold text-forest-green/65 uppercase tracking-wider">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics & Action */}
              <div className="border-t border-sand/20 pt-4 flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div>
                    <p className="font-display text-base font-bold text-forest-green">{rev.active}</p>
                    <p className="text-[8px] font-extrabold uppercase tracking-widest text-forest-green/40">Active Workload</p>
                  </div>
                  <div>
                    <p className="font-display text-base font-bold text-forest-green">{rev.hIndex}</p>
                    <p className="text-[8px] font-extrabold uppercase tracking-widest text-forest-green/40">h-Index</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedReviewer(rev)}
                  className="w-full rounded-full py-2.5 text-xs font-bold uppercase tracking-widest bg-ochre text-ivory hover:bg-ochre/90 shadow-sm transition-all inline-flex items-center justify-center gap-1.5"
                >
                  <UserPlus className="h-3.5 w-3.5" /> Assign to Manuscript
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
