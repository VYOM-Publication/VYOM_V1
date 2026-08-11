'use client';

import { useDemoAuth } from '@/lib/demo-auth';
import Link from 'next/link';
import { 
  FileText, Calendar, DollarSign, Clock, HelpCircle, 
  BookOpen, Compass, Award, ExternalLink, Send, ArrowRight 
} from 'lucide-react';
import { DEMO_SUBMISSIONS } from '@/lib/demo-data';
import { AuthorHero } from '@/components/author/AuthorHero';
import { SubmissionPipeline } from '@/components/author/SubmissionPipeline';
import { ActivityTimeline } from '@/components/author/ActivityTimeline';
import { AuthorResources } from '@/components/author/AuthorResources';
import { SectionHeader } from '@/components/reader/SectionHeader';

export default function AuthorDashboardPage() {
  const { session } = useDemoAuth();

  // Find latest active submission in pipeline
  const activeSubmissions = DEMO_SUBMISSIONS.filter(s => s.status !== 'PUBLISHED');
  const latestSub = activeSubmissions[0] || DEMO_SUBMISSIONS[0];

  // Completed published articles
  const publishedSubmissions = DEMO_SUBMISSIONS.filter(s => s.status === 'PUBLISHED');

  // Generate deadlines dynamically
  const deadlines = DEMO_SUBMISSIONS
    .filter(s => s.status === 'REVISION' && s.revisionDeadline)
    .map(s => ({
      title: 'Revision Due Date',
      meta: s.id,
      date: s.revisionDeadline,
      desc: `Revise and upload manuscript for '${s.title}'`
    }))
    .concat(
      DEMO_SUBMISSIONS
        .filter(s => s.status === 'ACCEPTED' && s.paymentStatus === 'pending')
        .map(s => ({
          title: 'APC Payment Pending',
          meta: s.id,
          date: 'Immediate',
          desc: `Complete Article Processing Charge for '${s.title}'`
        }))
    );

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
      {/* 1. Welcome Hero */}
      <AuthorHero 
        name={session?.name ?? 'Author'} 
        latestSubmissionId={latestSub?.id} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Active Pipelines + Continuing Work + Published List */}
        <div className="lg:col-span-2 space-y-12">
          {/* Active Submissions Pipelines */}
          {activeSubmissions.length > 0 && (
            <section aria-label="Manuscript Pipelines">
              <SectionHeader 
                label="Active Trackers" 
                title="Manuscript Pipelines" 
                linkHref="/author/submissions" 
                linkLabel="All Submissions" 
              />
              <div className="flex flex-col gap-6">
                {activeSubmissions.map(sub => (
                  <div key={sub.id} className="rounded-2xl border border-sand/40 bg-white p-6 shadow-sm hover:border-sand hover:shadow-card transition-all">
                    <div className="flex items-center justify-between border-b border-sand/20 pb-4 mb-4">
                      <div>
                        <span className="text-xs font-bold text-ochre">{sub.id}</span>
                        <h3 className="font-display font-bold text-forest-green text-sm mt-0.5">{sub.title}</h3>
                      </div>
                      <Link 
                        href={`/author/submissions/${sub.id}`} 
                        className="text-xs font-bold uppercase tracking-widest text-ochre hover:underline shrink-0 ml-4"
                      >
                        Track →
                      </Link>
                    </div>
                    <SubmissionPipeline status={sub.status} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Published Publications */}
          {publishedSubmissions.length > 0 && (
            <section aria-label="Published Works">
              <SectionHeader 
                label="Scholarly Impact" 
                title="My Published Works" 
                linkHref="/author/publications" 
                linkLabel="Publications Index" 
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {publishedSubmissions.map(pub => (
                  <div key={pub.id} className="group rounded-2xl border border-sand/40 bg-white p-5 flex flex-col justify-between hover:shadow-card hover:-translate-y-0.5 transition-all">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold text-ochre uppercase">{pub.id}</span>
                        <span className="text-[10px] font-bold text-forest-green/40 uppercase">{pub.journal}</span>
                      </div>
                      <h3 className="font-display font-bold text-forest-green text-sm group-hover:text-ochre transition-colors line-clamp-2">
                        {pub.title}
                      </h3>
                      <p className="text-[11px] text-forest-green/50 mt-1">
                        DOI: {pub.doi || '10.vyom/pub.doi'}
                      </p>
                    </div>

                    <div className="border-t border-sand/25 pt-3 mt-4 flex items-center justify-between">
                      <div className="flex gap-4 text-center">
                        <div>
                          <p className="text-[10px] font-bold text-forest-green">148</p>
                          <p className="text-[8px] font-bold uppercase tracking-wider text-forest-green/45">Views</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-forest-green">42</p>
                          <p className="text-[8px] font-bold uppercase tracking-wider text-forest-green/45">PDFs</p>
                        </div>
                      </div>
                      
                      <Link 
                        href={`/author/submissions/${pub.id}`}
                        className="text-[10px] font-bold uppercase tracking-widest text-ochre hover:underline flex items-center gap-0.5"
                      >
                        View Paper <ExternalLink className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Quick Actions Grid */}
          <section aria-label="Author Quick Actions">
            <SectionHeader label="Console Actions" title="Quick Actions" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { title: 'Submit Abstract', desc: 'New Paper Proposal', link: '/author/submissions/new', icon: Send },
                { title: 'Upload Revision', desc: 'Submit Revisions', link: '/author/submissions', icon: FileText },
                { title: 'Track Submissions', desc: 'Pipeline Status', link: '/author/submissions', icon: Compass },
                { title: 'Editorial Board', desc: 'Review Process', link: '/editorial-board', icon: HelpCircle },
                { title: 'Publication Fee', desc: 'APC & Policies', link: '/publication-fee', icon: DollarSign },
                { title: 'Upcoming Deadlines', desc: 'Deadlines Log', link: '#deadlines', icon: Calendar }
              ].map(action => {
                const Icon = action.icon;
                return (
                  <Link 
                    key={action.title} 
                    href={action.link} 
                    className="rounded-2xl border border-sand/40 bg-white p-5 flex flex-col gap-2 hover:border-sand hover:shadow-card transition-all"
                  >
                    <div className="h-8 w-8 rounded-xl bg-sand/35 text-forest-green/60 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-forest-green text-xs">{action.title}</h4>
                      <p className="text-[10px] text-forest-green/40 mt-0.5">{action.desc}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Author Resources Guide */}
          <section aria-label="Author Resources">
            <SectionHeader label="Scholarly Assets" title="Author Resources Guide" />
            <AuthorResources />
          </section>
        </div>

        {/* Right Column: Deadlines + Timeline Activity + Call for Papers */}
        <div className="space-y-12">
          {/* Upcoming Deadlines */}
          {deadlines.length > 0 && (
            <section id="deadlines" aria-label="Upcoming Deadlines">
              <SectionHeader label="Action Items" title="Upcoming Deadlines" />
              <div className="flex flex-col gap-3">
                {deadlines.map((dl, idx) => (
                  <div key={idx} className="rounded-2xl border border-amber-100 bg-amber-50/50 p-4 flex gap-3">
                    <div className="h-8 w-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 justify-between">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700">{dl.title}</span>
                        <span className="text-[10px] font-bold text-amber-700 shrink-0">{dl.date}</span>
                      </div>
                      <p className="text-xs text-amber-900 font-semibold mt-1">{dl.meta}</p>
                      <p className="text-[10px] text-amber-800/70 leading-normal mt-0.5">{dl.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Activity Timeline */}
          <section aria-label="Recent Activity Log">
            <SectionHeader label="Activity Feed" title="Recent Activity" />
            <div className="rounded-2xl border border-sand/40 bg-white p-6 shadow-sm">
              <ActivityTimeline />
            </div>
          </section>

          {/* Recommended Calls & Special Issues */}
          <section aria-label="Scholarly Opportunities">
            <SectionHeader label="Latest Calls" title="Scholarly Calls" />
            <div className="flex flex-col gap-4">
              {[
                { title: 'VJLS Special Issue on Multilingualism', category: 'Call for Papers', deadline: '31 Aug 2025' },
                { title: 'VQR Autumn Issue Submission Window', category: 'General Call', deadline: '15 Sep 2025' }
              ].map((call, idx) => (
                <div key={idx} className="rounded-2xl border border-sand/40 bg-white p-5 flex flex-col justify-between hover:border-sand hover:shadow-card transition-all">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-ochre">{call.category}</span>
                    <h4 className="font-display font-bold text-forest-green text-xs mt-1 leading-snug">{call.title}</h4>
                    <p className="text-[10px] text-forest-green/45 mt-2 font-semibold">Deadline: {call.deadline}</p>
                  </div>
                  <Link 
                    href="/blogs" 
                    className="mt-4 text-[10px] font-bold uppercase tracking-widest text-ochre hover:underline inline-flex items-center gap-0.5 self-start"
                  >
                    View Details <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
