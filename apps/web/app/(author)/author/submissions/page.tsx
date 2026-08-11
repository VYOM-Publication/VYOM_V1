'use client';

import Link from 'next/link';
import { Plus, FileText, ArrowRight, DollarSign } from 'lucide-react';
import { DEMO_SUBMISSIONS } from '@/lib/demo-data';
import { StatusBadge } from '@/components/common/StatusBadge';
import { EmptyState } from '@/components/common/EmptyState';
import { SubmissionPipeline } from '@/components/author/SubmissionPipeline';
import { SectionHeader } from '@/components/reader/SectionHeader';

export default function AuthorSubmissionsPage() {
  return (
    <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-sand/30 pb-6 mb-8 gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">Manuscript Pipeline</span>
          <h1 className="font-display text-3xl font-bold text-forest-green mt-1">My Submissions</h1>
        </div>
        <Link
          href="/author/submissions/new"
          className="rounded-full bg-ochre px-6 py-3 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 transition-colors inline-flex items-center justify-center gap-2 self-start shadow-sm"
        >
          <Plus className="h-4 w-4" /> New Submission
        </Link>
      </div>

      {/* Submissions List */}
      <div className="space-y-6">
        {DEMO_SUBMISSIONS.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No submissions yet."
            description="Submit your first manuscript abstract to get started."
            action={
              <Link
                href="/author/submissions/new"
                className="rounded-full bg-ochre px-6 py-2.5 text-xs font-bold text-ivory hover:bg-ochre/90 transition-colors"
              >
                New Submission
              </Link>
            }
          />
        ) : (
          <div className="flex flex-col gap-6">
            {DEMO_SUBMISSIONS.map(s => {
              const needsPayment = s.status === 'ACCEPTED' && s.paymentStatus === 'pending';
              const needsRevision = s.status === 'REVISION';
              
              return (
                <div
                  key={s.id}
                  className={`rounded-3xl border bg-white p-6 shadow-sm hover:shadow-card hover:border-sand transition-all flex flex-col gap-5 ${
                    needsRevision 
                      ? 'border-amber-200 bg-amber-50/5' 
                      : needsPayment 
                        ? 'border-green-200 bg-green-50/5' 
                        : 'border-sand/40'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-sand/20 pb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-ochre">{s.id}</span>
                        <span className="text-xs font-bold text-forest-green/45 uppercase tracking-wider">{s.journal}</span>
                        <StatusBadge status={s.status} />
                        {needsPayment && <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-bold text-green-700">PAYMENT DUE</span>}
                      </div>
                      <h3 className="font-display text-lg font-bold text-forest-green mt-2 leading-snug">
                        {s.title}
                      </h3>
                      <p className="text-xs text-forest-green/50 mt-1">
                        Submitted {s.submittedDate} · {s.daysInPipeline} days in pipeline · Version {s.currentVersion}
                      </p>
                    </div>

                    <div className="flex flex-row sm:flex-col gap-2 items-center sm:items-end shrink-0">
                      <Link
                        href={`/author/submissions/${s.id}`}
                        className="rounded-full border border-sand px-5 py-2 text-xs font-bold uppercase tracking-widest text-forest-green/60 hover:border-forest-green hover:text-forest-green transition-colors inline-flex items-center gap-1.5"
                      >
                        Details <ArrowRight className="h-3 w-3" />
                      </Link>
                      {needsPayment && (
                        <Link
                          href={`/author/submissions/${s.id}/payment`}
                          className="rounded-full bg-ochre px-5 py-2 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 transition-colors inline-flex items-center gap-1 shadow-sm"
                        >
                          <DollarSign className="h-3 w-3" /> Pay APC
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Submission Tracking Progress Pipeline */}
                  <div className="py-2">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-forest-green/35 mb-2">
                      Pipeline Tracking
                    </p>
                    <SubmissionPipeline status={s.status} />
                  </div>

                  {/* Revisions Comments / Deadlines alerts */}
                  {needsRevision && s.revisionDeadline && (
                    <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-4 text-xs text-amber-800">
                      <p className="font-bold uppercase tracking-wider text-amber-700">Revision Action Required</p>
                      <p className="mt-1 leading-relaxed">{s.revisionComments}</p>
                      <p className="font-bold mt-2">Deadline: {s.revisionDeadline}</p>
                    </div>
                  )}

                  {/* DOI badge for published */}
                  {s.status === 'PUBLISHED' && s.doi && (
                    <div className="rounded-2xl border border-teal-100 bg-teal-50/30 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-teal-800">
                      <div>
                        <p className="font-bold uppercase tracking-wider text-teal-700">Manuscript Published</p>
                        <p className="mt-0.5 font-medium">DOI Identifier: {s.doi}</p>
                      </div>
                      <Link 
                        href={`/author/submissions/${s.id}`}
                        className="text-[10px] font-bold uppercase tracking-widest text-ochre hover:underline inline-flex items-center gap-0.5"
                      >
                        View Publication <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
