'use client';

import { useAuthStore } from '@/lib/stores/auth.store';
import { useSubmissionsStore } from '@/lib/stores/submissions.store';
import Link from 'next/link';
import { 
  FileText, Users, Layers, BookOpen, Clock, AlertTriangle, 
  ArrowRight, CheckCircle2, Send, MessageSquare, Megaphone, Calendar
} from 'lucide-react';
import { DEMO_ARCHIVES_VOLUMES } from '@/lib/demo-data';
import { EditorHero } from '@/components/editor/EditorHero';
import { EditorialPipeline } from '@/components/editor/EditorialPipeline';
import { SectionHeader } from '@/components/reader/SectionHeader';

export default function EditorDashboardPage() {
  const { user } = useAuthStore();
  const { submissions } = useSubmissionsStore();

  // STRICT REAL-WORLD RULE: Editor ONLY sees manuscripts assigned specifically to them by Admin
  const assignedSubmissions = submissions.filter(s => {
    if (s.status === 'SUBMITTED_TO_ADMIN' || !s.assignedEditorName) return false;
    return true;
  });

  const priorityTasks = assignedSubmissions.slice(0, 4).map(sub => {
    const isUrgent = sub.daysInPipeline >= 20 || sub.status === 'UNDER REVIEW';
    let type = 'In Review';
    let actionLabel = 'Open Workspace';
    let href = `/editor/submissions/${sub.id}`;

    if (sub.status === 'ASSIGNED_TO_EDITOR') {
      type = 'Reviewer Assignment Pending';
      actionLabel = 'Assign Reviewers';
    } else if (sub.status === 'UNDER REVIEW') {
      type = 'Peer Review In Progress';
      actionLabel = 'Inspect Evaluation';
    } else if (sub.status === 'REVISION') {
      type = 'Revision Submitted';
      actionLabel = 'Review Revision';
    } else if (sub.status === 'ACCEPTED' || sub.status === 'PENDING_FINAL_ADMIN_APPROVAL') {
      type = 'Pending Admin Sign-Off';
      actionLabel = 'View Approval';
    }

    return {
      id: sub.id,
      title: sub.title,
      type,
      journal: sub.journal,
      desc: `Author: ${sub.author} · ${sub.reviewerCount} Reviewers Assigned`,
      actionLabel,
      href,
      isUrgent,
    };
  });

  const editorialEvents = [
    { title: 'Manuscript Assigned by Admin', time: 'Today', desc: 'Admin routed manuscript MS-2026-0001 for managing editor evaluation.' },
    { title: 'Peer Review Report Submitted', time: 'Yesterday', desc: 'Reviewer score submitted (8.5/10) with inline comments.' },
    { title: 'Author Revision Received', time: '2 days ago', desc: 'Revised draft v2.0 received with author response letter.' },
  ];

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
      {/* 1. Welcome Hero */}
      <EditorHero name={user?.fullName ?? 'Shital Kalekar'} />

      {/* 2. Global Editorial Pipeline Visual Progress */}
      <div className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm mb-10">
        <div className="flex items-center justify-between border-b border-sand/20 pb-4 mb-2">
          <div>
            <h2 className="font-display text-lg font-bold text-forest-green">Editorial Workflow Stages</h2>
            <p className="text-xs text-forest-green/50">Your active assigned manuscript pipeline overview</p>
          </div>
          <span className="text-xs font-bold text-ochre uppercase tracking-wider">
            Assigned Queue: {assignedSubmissions.length} Manuscripts
          </span>
        </div>
        <EditorialPipeline status="UNDER REVIEW" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-12">
        {/* Left Column: Priority Tasks & Quick Actions */}
        <div className="lg:col-span-2 space-y-12">
          {/* Priority Tasks Cards */}
          <section aria-label="Priority Editorial Tasks">
            <SectionHeader 
              label="Assigned Action Queue" 
              title="Priority Assigned Tasks" 
              linkHref="/editor/submissions" 
              linkLabel="View All Queue" 
            />

            {priorityTasks.length === 0 ? (
              <div className="rounded-3xl border border-sand/40 bg-white p-8 text-center text-forest-green/50 space-y-2">
                <FileText className="h-8 w-8 text-ochre mx-auto" />
                <h3 className="font-display text-base font-bold text-forest-green">No Assigned Manuscripts</h3>
                <p className="text-xs max-w-md mx-auto">
                  Admin has not assigned any author submissions to your workspace yet. When Admin assigns a manuscript, it will appear here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {priorityTasks.map(task => (
                  <div 
                    key={task.id} 
                    className={`rounded-3xl border bg-white p-6 shadow-sm flex flex-col justify-between hover:shadow-card transition-all ${
                      task.isUrgent ? 'border-amber-200 bg-amber-50/5' : 'border-sand/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-bold text-ochre">{task.id}</span>
                        <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                          task.isUrgent ? 'bg-amber-100 text-amber-700' : 'bg-sand/30 text-forest-green/70'
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
            )}
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
                { label: 'Announcements', icon: Megaphone, href: '/editor/communications' },
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
