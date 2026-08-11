'use client';

import { useDemoAuth } from '@/lib/demo-auth';
import Link from 'next/link';
import { 
  FileText, Users, Layers, BookOpen, Clock, AlertTriangle, 
  ArrowRight, CheckCircle2, Send, MessageSquare, Megaphone, Calendar
} from 'lucide-react';
import { DEMO_SUBMISSIONS, DEMO_ARCHIVES_VOLUMES } from '@/lib/demo-data';
import { EditorHero } from '@/components/editor/EditorHero';
import { EditorialPipeline } from '@/components/editor/EditorialPipeline';
import { SectionHeader } from '@/components/reader/SectionHeader';

export default function EditorDashboardPage() {
  const { session } = useDemoAuth();

  const priorityTasks = [
    {
      id: 'MS-2025-041',
      title: 'Prosodic Bootstrapping in Early Bilingual Acquisition',
      type: 'Reviewer Assignment Pending',
      journal: 'VJLS',
      desc: 'Manuscript passed initial screening. 2 reviewers needed.',
      actionLabel: 'Assign Reviewers',
      href: '/editor/submissions/MS-2025-041',
      isUrgent: true,
    },
    {
      id: 'MS-2025-038',
      title: 'Negation Strategies Across Tibeto-Burman Contact Languages',
      type: 'Revision Received',
      journal: 'VQR',
      desc: 'Author submitted revised draft v2.0 with author response letter.',
      actionLabel: 'Review Revision',
      href: '/editor/submissions/MS-2025-038',
      isUrgent: false,
    },
    {
      id: 'MS-2025-029',
      title: 'Semantic Shift in Contemporary Indo-Aryan Loanwords',
      type: 'Editorial Decision Overdue',
      journal: 'VJLS',
      desc: 'All 3 peer review reports submitted. Final decision required.',
      actionLabel: 'Make Decision',
      href: '/editor/submissions/MS-2025-029',
      isUrgent: true,
    },
    {
      id: 'MS-2025-012',
      title: 'Neural Correlates of Syntactic Processing in Multilinguals',
      type: 'Ready for Publication',
      journal: 'VJLS',
      desc: 'APC fee verified and copyediting completed. Ready for Volume assignment.',
      actionLabel: 'Schedule Issue',
      href: '/editor/issues',
      isUrgent: false,
    }
  ];

  const editorialEvents = [
    { title: 'Peer Review Completed', time: '2 hours ago', desc: 'Prof. D. Krishnaswamy submitted scorecard (8.5/10) for MS-2025-041.' },
    { title: 'New Submission Received', time: '5 hours ago', desc: 'Dr. Priya Raghunathan submitted MS-2025-044 for VJLS.' },
    { title: 'Editorial Decision Recorded', time: '1 day ago', desc: 'Minor revision requested for MS-2025-038.' },
    { title: 'Volume 12, Issue 3 Published', time: '3 days ago', desc: 'Published issue containing 14 peer-reviewed research papers.' }
  ];

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
      {/* 1. Welcome Hero */}
      <EditorHero name={session?.name ?? 'Dr. Vikramaditya Sen'} />

      {/* 2. Global Editorial Pipeline Visual Progress */}
      <div className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm mb-10">
        <div className="flex items-center justify-between border-b border-sand/20 pb-4 mb-2">
          <div>
            <h2 className="font-display text-lg font-bold text-forest-green">Editorial Workflow Stages</h2>
            <p className="text-xs text-forest-green/50">Current active manuscript pipeline overview</p>
          </div>
          <span className="text-xs font-bold text-ochre uppercase tracking-wider">Active Queue: {DEMO_SUBMISSIONS.length} Manuscripts</span>
        </div>
        <EditorialPipeline status="UNDER REVIEW" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-12">
        {/* Left Column: Priority Tasks & Quick Actions */}
        <div className="lg:col-span-2 space-y-12">
          {/* Priority Tasks Cards */}
          <section aria-label="Priority Editorial Tasks">
            <SectionHeader 
              label="Action Required" 
              title="Priority Tasks" 
              linkHref="/editor/submissions" 
              linkLabel="View All Submissions" 
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {priorityTasks.map(task => (
                <div 
                  key={task.id} 
                  className={`rounded-3xl border bg-white p-6 shadow-sm flex flex-col justify-between hover:shadow-card transition-all ${
                    task.isUrgent ? 'border-red-200 bg-red-50/5' : 'border-sand/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-ochre">{task.id}</span>
                      <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                        task.isUrgent ? 'bg-red-100 text-red-600' : 'bg-sand/30 text-forest-green/70'
                      }`}>
                        {task.type}
                      </span>
                    </div>

                    <h3 className="font-display text-base font-bold text-forest-green leading-snug line-clamp-2">
                      {task.title}
                    </h3>
                    <p className="text-xs text-forest-green/65 mt-2 leading-relaxed">
                      {task.desc}
                    </p>
                  </div>

                  <Link
                    href={task.href}
                    className="rounded-full bg-ochre px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 transition-colors inline-flex items-center justify-center gap-1.5 self-start mt-5 shadow-sm"
                  >
                    {task.actionLabel} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Actions Grid */}
          <section aria-label="Editorial Shortcuts">
            <SectionHeader label="Management Shortcuts" title="Quick Actions" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Submission Queue', icon: FileText, href: '/editor/submissions' },
                { label: 'Reviewer Directory', icon: Users, href: '/editor/reviewers' },
                { label: 'Issues & Volumes', icon: Layers, href: '/editor/issues' },
                { label: 'Communications', icon: MessageSquare, href: '/editor/communications' },
                { label: 'Archives', icon: BookOpen, href: '/editor/archives' },
                { label: 'Announcements', icon: Megaphone, href: '/admin/announcements' },
                { label: 'Editorial Decisions', icon: CheckCircle2, href: '/editor/submissions' },
                { label: 'Profile Settings', icon: Users, href: '/editor/profile' },
              ].map(action => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="rounded-2xl border border-sand/40 bg-white p-4 flex flex-col items-center justify-center text-center gap-2 hover:border-sand hover:shadow-sm transition-all"
                  >
                    <div className="h-9 w-9 rounded-xl bg-sand/25 text-forest-green flex items-center justify-center">
                      <Icon className="h-4 w-4 text-ochre" />
                    </div>
                    <span className="text-xs font-bold text-forest-green leading-snug">{action.label}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Column: Activity Timeline & Publication Schedule */}
        <div className="space-y-12">
          {/* Recent Activity Feed */}
          <section aria-label="Recent Editorial Activity">
            <SectionHeader label="Live Activity" title="Recent Editorial Log" />
            <div className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm">
              <div className="relative border-l border-sand/40 pl-5 ml-2 space-y-6">
                {editorialEvents.map((evt, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[27px] top-0.5 h-3.5 w-3.5 rounded-full bg-ochre border border-white" />
                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="font-bold text-forest-green text-xs">{evt.title}</h4>
                        <span className="text-[9px] font-bold text-forest-green/35 uppercase tracking-wider shrink-0">{evt.time}</span>
                      </div>
                      <p className="text-[11px] text-forest-green/55 leading-relaxed mt-1">{evt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Upcoming Publication Schedule */}
          <section aria-label="Upcoming Publication Schedule">
            <SectionHeader label="Journal Schedule" title="Upcoming Issues" />
            <div className="flex flex-col gap-3">
              {DEMO_ARCHIVES_VOLUMES.slice(0, 3).map((issue, idx) => (
                <div key={idx} className="rounded-2xl border border-sand/40 bg-white p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-forest-green">{issue.vol} ({issue.year})</span>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-600 uppercase tracking-widest">
                      {issue.access} Access
                    </span>
                  </div>
                  <p className="text-xs text-forest-green/60 font-medium line-clamp-1">{issue.journal} — Edited by {issue.editor}</p>
                  <div className="flex items-center justify-between text-[10px] text-forest-green/45 border-t border-sand/20 pt-2 mt-1">
                    <span>Year: {issue.year}</span>
                    <span>{issue.articles} Papers</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
