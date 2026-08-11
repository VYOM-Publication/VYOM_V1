'use client';

// TODO: Replace demo data with GET /api/v1/reviews/history once backend credentials are available.

import { DEMO_COMPLETED_REVIEWS, DEMO_REVIEWER_PROFILE } from '@/lib/demo-data';
import { CheckCircle, Award, Clock, Star, BookOpen, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const REC_COLOR: Record<string, string> = {
  'ACCEPT':         'bg-emerald-50 text-emerald-600 border-emerald-100',
  'MINOR REVISION': 'bg-amber-50 text-amber-600 border-amber-100',
  'MAJOR REVISION': 'bg-orange-50 text-orange-600 border-orange-100',
  'REJECT':         'bg-red-50 text-red-500 border-red-100',
};

export default function ReviewHistoryPage() {
  return (
    <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
      {/* Page Header */}
      <div className="border-b border-sand/30 pb-6 mb-8">
        <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">Evaluation Archives</span>
        <h1 className="font-display text-3xl font-bold text-forest-green mt-1">Review History</h1>
      </div>

      {/* Metrics Header Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Completed Reviews', value: DEMO_REVIEWER_PROFILE.totalReviews, icon: CheckCircle },
          { label: 'Avg Turnaround', value: `${DEMO_REVIEWER_PROFILE.avgTurnaround} Days`, icon: Clock },
          { label: 'Performance Score', value: `${DEMO_REVIEWER_PROFILE.performanceScore} / 5.0`, icon: Star },
          { label: 'Reviewer h-Index', value: DEMO_REVIEWER_PROFILE.hIndex, icon: Award }
        ].map(item => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-2xl border border-sand/40 bg-white p-5 flex flex-col gap-2 shadow-sm">
              <div className="flex items-center justify-between text-forest-green/35">
                <span className="text-[9px] font-bold uppercase tracking-widest">{item.label}</span>
                <Icon className="h-4 w-4 text-ochre" />
              </div>
              <p className="font-display text-2xl font-bold text-forest-green mt-0.5">{item.value}</p>
            </div>
          );
        })}
      </div>

      {/* Completed Reviews List */}
      <div className="space-y-6">
        {DEMO_COMPLETED_REVIEWS.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-forest-green/30 text-center">
            <CheckCircle className="h-10 w-10 text-forest-green/20" />
            <div>
              <p className="font-semibold text-forest-green/70">No completed reviews yet.</p>
              <p className="text-xs text-forest-green/40 mt-1">Your submitted review reports will be archived here.</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {DEMO_COMPLETED_REVIEWS.map(r => (
              <div 
                key={r.id} 
                className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm hover:border-sand hover:shadow-card transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <span className="text-xs font-bold text-ochre">{r.submissionId}</span>
                    <span className="text-[10px] font-bold text-forest-green/45 uppercase tracking-wider">{r.journal}</span>
                    <span className={`rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest ${REC_COLOR[r.recommendation] || 'bg-sand/30 text-forest-green/60'}`}>
                      {r.recommendation}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-forest-green leading-snug">
                    {r.title}
                  </h3>
                  
                  <p className="text-xs text-forest-green/55 mt-1">
                    Author: {r.author} · Completed on {r.completedDate}
                  </p>
                </div>

                <div className="flex items-center gap-6 shrink-0 border-t sm:border-t-0 border-sand/20 pt-4 sm:pt-0">
                  <div className="text-left sm:text-right">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-forest-green/35 block">Evaluation Score</span>
                    <span className="font-display text-xl font-bold text-forest-green">{r.score} <span className="text-xs font-normal text-forest-green/40">/ 10</span></span>
                  </div>

                  <Link
                    href={`/reviewer/assignments/${r.id}`}
                    className="rounded-full border border-sand px-5 py-2 text-xs font-bold uppercase tracking-widest text-forest-green/60 hover:border-forest-green hover:text-forest-green transition-colors inline-flex items-center gap-1"
                  >
                    View Report
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
