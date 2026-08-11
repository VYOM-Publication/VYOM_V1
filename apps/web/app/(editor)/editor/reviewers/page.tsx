'use client';

// TODO: Replace demo data with GET /api/v1/reviewers once backend credentials are available.

import { useState } from 'react';
import { DEMO_REVIEWERS_POOL } from '@/lib/demo-data';
import { EmptyState } from '@/components/common/EmptyState';
import { 
  Users, Search, GraduationCap, Clock, Award, 
  CheckCircle, UserPlus, Filter, Check 
} from 'lucide-react';

export default function EditorReviewersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [assignedName, setAssignedName] = useState<string | null>(null);

  const filteredReviewers = DEMO_REVIEWERS_POOL.filter(r => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.institution.toLowerCase().includes(q) ||
      r.expertise.some(e => e.toLowerCase().includes(q))
    );
  });

  const handleAssign = (name: string) => {
    setAssignedName(name);
    setTimeout(() => setAssignedName(null), 3000);
  };

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
      {/* Header */}
      <div className="border-b border-sand/30 pb-6 mb-8">
        <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">Academic Panel</span>
        <h1 className="font-display text-3xl font-bold text-forest-green mt-1">Reviewer Directory</h1>
      </div>

      {/* Search Bar */}
      <div className="rounded-3xl border border-sand/40 bg-white p-5 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-forest-green/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by reviewer name, institution, or expertise area..."
            className="w-full rounded-2xl border border-sand/40 bg-ivory/40 pl-11 pr-4 py-2.5 text-xs text-forest-green focus:outline-none focus:border-ochre transition-all font-medium"
          />
        </div>
        <span className="text-xs font-bold text-forest-green/50 shrink-0">
          Showing {filteredReviewers.length} Reviewers
        </span>
      </div>

      {/* Reviewer Profile Cards Grid */}
      {filteredReviewers.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No reviewers match your search query."
          description="Try searching with a different expertise domain or researcher name."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviewers.map(rev => {
            const isJustAssigned = assignedName === rev.name;

            return (
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
                    onClick={() => handleAssign(rev.name)}
                    className={`w-full rounded-full py-2.5 text-xs font-bold uppercase tracking-widest transition-all inline-flex items-center justify-center gap-1.5 ${
                      isJustAssigned
                        ? 'bg-emerald-600 text-white'
                        : 'bg-ochre text-ivory hover:bg-ochre/90 shadow-sm'
                    }`}
                  >
                    {isJustAssigned ? (
                      <>
                        <Check className="h-3.5 w-3.5" /> Assigned to Manuscript
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-3.5 w-3.5" /> Assign Reviewer
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
