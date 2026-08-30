'use client';

import { useAuthStore } from '@/lib/stores/auth.store';
import { useSubmissionsStore } from '@/lib/stores/submissions.store';
import Link from 'next/link';
import { 
  FileText, Calendar, DollarSign, Clock, HelpCircle, 
  BookOpen, Compass, Award, ExternalLink, Send, ArrowRight 
} from 'lucide-react';
import { DEMO_ARCHIVES_VOLUMES } from '@/lib/demo-data';
import { AuthorHero } from '@/components/author/AuthorHero';
import { SubmissionPipeline } from '@/components/author/SubmissionPipeline';
import { ActivityTimeline } from '@/components/author/ActivityTimeline';
import { AuthorResources } from '@/components/author/AuthorResources';
import { SectionHeader } from '@/components/reader/SectionHeader';

export default function AuthorDashboardPage() {
  const { user } = useAuthStore();
  const { submissions } = useSubmissionsStore();

  // Find latest active submission in pipeline
  const activeSubmissions = submissions.filter(s => s.status !== 'PUBLISHED');
  const latestSub = activeSubmissions[0] || submissions[0];

  // Completed published articles
  const publishedSubmissions = submissions.filter(s => s.status === 'PUBLISHED');

  // Generate deadlines dynamically
  const deadlines = submissions
    .filter(s => s.status === 'REVISION' && s.revisionDeadline)
    .map(s => ({
      title: 'Revision Due Date',
      meta: s.id,
      date: s.revisionDeadline,
      desc: `Revise and upload manuscript for '${s.title}'`
    }))
    .concat(
      submissions
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
        name={user?.fullName ?? 'Author'} 
        avatarUrl={user?.avatarUrl}
        latestSubmissionId={latestSub?.id} 
        activeCount={activeSubmissions.length}
        publishedCount={publishedSubmissions.length}
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
                  <div key={sub.id} className="rounded-3xl border border-sand/30 border-l-4 border-l-ochre bg-gradient-to-br from-white via-white to-ivory/50 p-6 shadow-card hover:shadow-lg transition-all">
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
                {publishedSubmissions.map((pub, idx) => (
                  <div
                    key={pub.id}
                    className={`group rounded-3xl border border-sand/30 border-l-4 border-l-ochre bg-gradient-to-br from-white via-white to-ivory/60 p-6 shadow-card hover:shadow-lg hover:border-sand transition-all flex flex-col justify-between ${
                      publishedSubmissions.length === 1 ? 'sm:col-span-2' : ''
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-ochre uppercase bg-ochre/10 border border-sand/20 px-2.5 py-0.5 rounded-full">{pub.id}</span>
                          <span className="text-[10px] font-bold text-forest-green/50 uppercase">{pub.journal}</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                          Published & Indexed
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-forest-green text-base sm:text-lg group-hover:text-ochre transition-colors line-clamp-2 mt-1">
                        {pub.title}
                      </h3>
                      <p className="text-xs text-forest-green/50 font-medium mt-1">
                        DOI: {pub.doi || '10.vyom/pub.doi'} · Volume 14, Issue 1
                      </p>
                    </div>

                    <div className="border-t border-sand/20 pt-4 mt-5 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex gap-6 text-center">
                        <div>
                          <p className="font-display text-lg font-bold text-forest-green">148</p>
                          <p className="text-[8px] font-extrabold uppercase tracking-widest text-forest-green/45">Views</p>
                        </div>
                        <div>
                          <p className="font-display text-lg font-bold text-forest-green">42</p>
                          <p className="text-[8px] font-extrabold uppercase tracking-widest text-forest-green/45">Downloads</p>
                        </div>
                        <div>
                          <p className="font-display text-lg font-bold text-ochre">12</p>
                          <p className="text-[8px] font-extrabold uppercase tracking-widest text-forest-green/45">Citations</p>
                        </div>
                      </div>
                      
                      <Link 
                        href={`/author/submissions/${pub.id}`}
                        className="rounded-full bg-ochre px-5 py-2 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 shadow-sm transition-colors flex items-center gap-1.5"
                      >
                        View Paper <ExternalLink className="h-3.5 w-3.5" />
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
                { title: 'Publication Fee', desc: 'APC & Policies', link: '/guidelines', icon: DollarSign },
                { title: 'Upcoming Deadlines', desc: 'Deadlines Log', link: '#deadlines', icon: Calendar }
              ].map(action => {
                const Icon = action.icon;
                return (
                  <Link 
                    key={action.title} 
                    href={action.link} 
                    className="group rounded-3xl border border-sand/30 bg-gradient-to-br from-white via-white to-ivory/50 p-5 flex flex-col gap-2.5 shadow-card hover:shadow-lg hover:border-ochre/40 hover:-translate-y-0.5 transition-all"
                  >
                    <div className="h-9 w-9 rounded-2xl bg-ochre/15 text-ochre border border-sand/20 flex items-center justify-center shrink-0 group-hover:bg-ochre group-hover:text-ivory transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-forest-green text-xs group-hover:text-ochre transition-colors">{action.title}</h4>
                      <p className="text-[10px] text-forest-green/45 mt-0.5 font-medium">{action.desc}</p>
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
                  <div key={idx} className="rounded-3xl border border-sand/30 border-l-4 border-l-ochre bg-gradient-to-br from-white via-white to-ivory/60 p-5 shadow-card flex gap-4 items-start">
                    <div className="h-9 w-9 rounded-2xl bg-ochre/15 text-ochre border border-sand/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 justify-between">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-ochre">{dl.title}</span>
                        <span className="text-[10px] font-bold text-forest-green/50 shrink-0">{dl.date}</span>
                      </div>
                      <p className="text-xs text-forest-green font-bold mt-1">{dl.meta}</p>
                      <p className="text-[10px] text-forest-green/50 leading-normal mt-0.5">{dl.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Activity Timeline */}
          <section aria-label="Recent Activity Log">
            <SectionHeader label="Activity Feed" title="Recent Activity" />
            <div className="rounded-3xl border border-sand/30 bg-gradient-to-br from-white via-white to-ivory/60 p-6 shadow-card">
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
                <div key={idx} className="group rounded-3xl border border-sand/30 border-l-4 border-l-ochre bg-gradient-to-br from-white via-white to-ivory/60 p-5 flex flex-col justify-between shadow-card hover:shadow-lg transition-all">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-ochre bg-ochre/10 border border-sand/20 px-2.5 py-0.5 rounded-full">{call.category}</span>
                    <h4 className="font-display font-bold text-forest-green text-sm group-hover:text-ochre transition-colors mt-2 leading-snug">{call.title}</h4>
                    <p className="text-[10px] text-forest-green/45 mt-2 font-semibold">Deadline: {call.deadline}</p>
                  </div>
                  <Link 
                    href="/author/submissions/new" 
                    className="mt-4 text-[10px] font-bold uppercase tracking-widest text-ochre hover:underline inline-flex items-center gap-1 self-start"
                  >
                    Submit Manuscript <ArrowRight className="h-3 w-3" />
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
