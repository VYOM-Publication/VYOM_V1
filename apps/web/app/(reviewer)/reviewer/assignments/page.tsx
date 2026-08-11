'use client';

import Link from 'next/link';
import { DEMO_REVIEW_ASSIGNMENTS } from '@/lib/demo-data';
import { StatusBadge } from '@/components/common/StatusBadge';
import { EmptyState } from '@/components/common/EmptyState';
import { ReviewPipeline } from '@/components/reviewer/ReviewPipeline';
import { ClipboardList, ArrowRight, Download, Clock, AlertTriangle } from 'lucide-react';

export default function ReviewerAssignmentsPage() {
  return (
    <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-sand/30 pb-6 mb-8 gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">Review Queue</span>
          <h1 className="font-display text-3xl font-bold text-forest-green mt-1">Active Review Assignments</h1>
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-6">
        {DEMO_REVIEW_ASSIGNMENTS.length === 0 ? (
          <EmptyState
            icon={ClipboardList}
            title="No active review assignments."
            description="You currently have no pending review requests."
          />
        ) : (
          <div className="flex flex-col gap-6">
            {DEMO_REVIEW_ASSIGNMENTS.map(a => {
              const isUrgent = a.daysLeft <= 7;

              return (
                <div
                  key={a.id}
                  className={`rounded-3xl border bg-white p-6 shadow-sm hover:shadow-card hover:border-sand transition-all flex flex-col gap-5 ${
                    isUrgent ? 'border-red-200 bg-red-50/5' : 'border-sand/40'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-sand/20 pb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-xs font-bold text-ochre">{a.submissionId}</span>
                        <span className="text-[10px] font-bold text-forest-green/45 uppercase tracking-wider">{a.journal}</span>
                        <StatusBadge status={a.status} />
                        {isUrgent && (
                          <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-[9px] font-bold text-red-600 uppercase tracking-widest inline-flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" /> URGENT ({a.daysLeft} days left)
                          </span>
                        )}
                      </div>
                      
                      <h3 className="font-display text-lg font-bold text-forest-green mt-2 leading-snug">
                        {a.title}
                      </h3>
                      
                      <p className="text-xs text-forest-green/50 mt-1">
                        Author: {a.author} · Assigned Date: {a.assignedDate}
                      </p>
                    </div>

                    <div className="flex flex-row sm:flex-col gap-2 items-center sm:items-end shrink-0">
                      <Link
                        href={`/reviewer/assignments/${a.id}`}
                        className="rounded-full bg-ochre px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 transition-colors inline-flex items-center gap-1.5 shadow-sm"
                      >
                        {a.status === 'IN PROGRESS' ? 'Continue Review' : 'Start Review'} <ArrowRight className="h-3.5 w-3.5" />
                      </Link>

                      {/* TODO: Replace href="#" with GET /api/v1/submissions/:id/file */}
                      <a 
                        href="#" 
                        className="text-xs font-semibold text-forest-green/50 hover:text-forest-green transition-colors inline-flex items-center gap-1"
                      >
                        <Download className="h-3 w-3" /> Download PDF
                      </a>
                    </div>
                  </div>

                  {/* Stage Progress Pipeline */}
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-forest-green/35 mb-2">
                      Evaluation Progress
                    </p>
                    <ReviewPipeline status={a.status} />
                  </div>

                  {/* Abstract preview box */}
                  <div className="rounded-2xl bg-ivory/50 border border-sand/30 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-forest-green/35 mb-1">Abstract Summary</p>
                    <p className="text-xs text-forest-green/70 leading-relaxed italic line-clamp-3">
                      "{a.abstract}"
                    </p>
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
