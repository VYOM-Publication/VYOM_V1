'use client';

import { useDemoAuth } from '@/lib/demo-auth';
import Link from 'next/link';
import { 
  ClipboardList, Clock, CheckCircle, AlertCircle, ArrowRight, 
  FileText, Award, Calendar, ShieldCheck, Compass, BookOpen 
} from 'lucide-react';
import { DEMO_REVIEW_ASSIGNMENTS, DEMO_COMPLETED_REVIEWS, DEMO_REVIEWER_PROFILE } from '@/lib/demo-data';
import { ReviewerHero } from '@/components/reviewer/ReviewerHero';
import { ReviewPipeline } from '@/components/reviewer/ReviewPipeline';
import { ReviewerResources } from '@/components/reviewer/ReviewerResources';
import { SectionHeader } from '@/components/reader/SectionHeader';

export default function ReviewerDashboardPage() {
  const { session } = useDemoAuth();

  const activeAssignments = DEMO_REVIEW_ASSIGNMENTS;
  const completedReviews = DEMO_COMPLETED_REVIEWS;

  // Timeline events for Reviewer Workspace
  const activityEvents = [
    { title: 'New Review Assignment Assigned', date: 'Yesterday', desc: 'Assigned manuscript MS-2025-008 for Vyom Journal of Language Studies.' },
    { title: 'Draft Review Saved', date: '3 days ago', desc: 'Saved evaluation draft for MS-2025-008 with score 8.5/10.' },
    { title: 'Review Report Submitted', date: '1 week ago', desc: 'Submitted final recommendation for MS-2025-003.' },
    { title: 'Editorial Decision Published', date: '2 weeks ago', desc: 'Editor accepted manuscript MS-2024-089 following review cycle.' }
  ];

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
      {/* 1. Welcome Hero */}
      <ReviewerHero 
        name={session?.name ?? 'Dr. Ananya Sharma'} 
        activeCount={activeAssignments.length} 
      />

      {/* 2. Reviewer Performance Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <div className="rounded-2xl border border-sand/40 bg-white p-5 flex flex-col gap-1 shadow-sm">
          <div className="flex items-center justify-between text-forest-green/40 mb-1">
            <span className="text-[9px] font-bold uppercase tracking-widest">Active Requests</span>
            <ClipboardList className="h-4 w-4 text-ochre" />
          </div>
          <p className="font-display text-3xl font-bold text-forest-green">{activeAssignments.length}</p>
          <p className="text-[10px] text-forest-green/45 mt-0.5">Pending Manuscripts</p>
        </div>

        <div className="rounded-2xl border border-sand/40 bg-white p-5 flex flex-col gap-1 shadow-sm">
          <div className="flex items-center justify-between text-forest-green/40 mb-1">
            <span className="text-[9px] font-bold uppercase tracking-widest">Reviews Completed</span>
            <CheckCircle className="h-4 w-4 text-forest-green" />
          </div>
          <p className="font-display text-3xl font-bold text-forest-green">{DEMO_REVIEWER_PROFILE.totalReviews}</p>
          <p className="text-[10px] text-forest-green/45 mt-0.5">Total Contributions</p>
        </div>

        <div className="rounded-2xl border border-sand/40 bg-white p-5 flex flex-col gap-1 shadow-sm">
          <div className="flex items-center justify-between text-forest-green/40 mb-1">
            <span className="text-[9px] font-bold uppercase tracking-widest">Avg Turnaround</span>
            <Clock className="h-4 w-4 text-ochre" />
          </div>
          <p className="font-display text-3xl font-bold text-forest-green">{DEMO_REVIEWER_PROFILE.avgTurnaround}d</p>
          <p className="text-[10px] text-forest-green/45 mt-0.5">Fast Response Time</p>
        </div>

        <div className="rounded-2xl border border-sand/40 bg-white p-5 flex flex-col gap-1 shadow-sm">
          <div className="flex items-center justify-between text-forest-green/40 mb-1">
            <span className="text-[9px] font-bold uppercase tracking-widest">Reviewer Rating</span>
            <Award className="h-4 w-4 text-ochre" />
          </div>
          <p className="font-display text-3xl font-bold text-forest-green">{DEMO_REVIEWER_PROFILE.performanceScore}/5</p>
          <p className="text-[10px] text-forest-green/45 mt-0.5">h-Index: {DEMO_REVIEWER_PROFILE.hIndex}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Active Manuscripts Cards + Reviewer Resources */}
        <div className="lg:col-span-2 space-y-12">
          {/* Active Review Assignments */}
          <section aria-label="Active Review Assignments">
            <SectionHeader 
              label="Assigned Manuscripts" 
              title="Active Review Queue" 
              linkHref="/reviewer/assignments" 
              linkLabel="All Assignments" 
            />
            <div className="flex flex-col gap-6">
              {activeAssignments.map(a => {
                const isUrgent = a.daysLeft <= 7;
                return (
                  <div key={a.id} className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm hover:border-sand hover:shadow-card transition-all flex flex-col gap-5">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-sand/20 pb-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-xs font-bold text-ochre">{a.submissionId}</span>
                          <span className="text-[10px] font-bold text-forest-green/45 uppercase tracking-wider">{a.journal}</span>
                          {isUrgent && (
                            <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-[9px] font-bold text-red-600 uppercase tracking-wider animate-pulse">
                              URGENT ({a.daysLeft} days left)
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-base font-bold text-forest-green leading-snug">
                          {a.title}
                        </h3>
                        <p className="text-xs text-forest-green/50 mt-1">
                          Author: {a.author} · Subject Area: {a.journal}
                        </p>
                      </div>

                      <Link 
                        href={`/reviewer/assignments/${a.id}`} 
                        className="rounded-full bg-ochre px-5 py-2 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 transition-colors inline-flex items-center gap-1.5 self-start shrink-0 shadow-sm"
                      >
                        {a.status === 'IN PROGRESS' ? 'Continue Review' : 'Start Review'} <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>

                    {/* Stage Pipeline */}
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-widest text-forest-green/35 mb-2">
                        Review Workflow Progress
                      </p>
                      <ReviewPipeline status={a.status} />
                    </div>

                    {/* Due Date & Abstract preview */}
                    <div className="bg-sand/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-forest-green/70">
                      <p className="line-clamp-2 italic text-forest-green/60">
                        "{a.abstract}"
                      </p>
                      <div className="shrink-0 text-left sm:text-right font-bold text-forest-green">
                        <span className="text-[9px] text-forest-green/40 block uppercase tracking-widest font-normal">Review Due</span>
                        {a.deadline}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Reviewer Resources Guide */}
          <section aria-label="Reviewer Resources">
            <SectionHeader label="Scholarly Assets" title="Reviewer Guidelines & Ethical Standards" />
            <ReviewerResources />
          </section>
        </div>

        {/* Right Column: Deadlines + Activity Timeline + Expertise Tags */}
        <div className="space-y-12">
          {/* Upcoming Review Deadlines */}
          <section aria-label="Upcoming Review Deadlines">
            <SectionHeader label="Action Deadlines" title="Upcoming Deadlines" />
            <div className="flex flex-col gap-3">
              {activeAssignments.map(a => {
                const isUrgent = a.daysLeft <= 7;
                return (
                  <div key={a.id} className={`rounded-2xl border p-4 flex gap-3 ${
                    isUrgent ? 'border-red-200 bg-red-50/40' : 'border-sand/40 bg-white'
                  }`}>
                    <div className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      isUrgent ? 'bg-red-100 text-red-600' : 'bg-sand/30 text-forest-green/60'
                    }`}>
                      <AlertCircle className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-forest-green truncate">{a.submissionId}</span>
                        <span className={`text-[10px] font-bold ${isUrgent ? 'text-red-600' : 'text-forest-green/50'}`}>
                          {a.daysLeft} days left
                        </span>
                      </div>
                      <p className="text-xs text-forest-green/70 font-semibold line-clamp-1 mt-0.5">{a.title}</p>
                      <p className="text-[10px] text-forest-green/40 mt-1">Due Date: {a.deadline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Activity Timeline */}
          <section aria-label="Recent Activity Timeline">
            <SectionHeader label="Activity Feed" title="Recent Activity Log" />
            <div className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm">
              <div className="relative border-l border-sand/40 pl-5 ml-2 space-y-6">
                {activityEvents.map((evt, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[27px] top-0.5 h-3.5 w-3.5 rounded-full bg-ochre border border-white" />
                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="font-bold text-forest-green text-xs">{evt.title}</h4>
                        <span className="text-[9px] font-bold text-forest-green/35 uppercase tracking-wider shrink-0">{evt.date}</span>
                      </div>
                      <p className="text-[11px] text-forest-green/55 leading-relaxed mt-1">{evt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Areas of Expertise */}
          <section aria-label="Areas of Expertise">
            <SectionHeader label="Specialization" title="Areas of Expertise" />
            <div className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                {DEMO_REVIEWER_PROFILE.expertiseDomains.map(area => (
                  <span key={area} className="rounded-full bg-sand/30 border border-sand/20 px-3 py-1 text-[10px] font-bold text-forest-green/70 uppercase tracking-wider">
                    {area}
                  </span>
                ))}
              </div>
              <Link 
                href="/reviewer/profile" 
                className="text-[10px] font-bold uppercase tracking-widest text-ochre hover:underline mt-2 self-start"
              >
                Update Expertise Areas →
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
