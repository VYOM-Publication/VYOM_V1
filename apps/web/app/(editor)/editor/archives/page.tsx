'use client';

// TODO: Replace demo data with GET /api/v1/archives once backend credentials are available.

import { DEMO_ARCHIVES_VOLUMES } from '@/lib/demo-data';
import { IssueCard } from '@/components/editor/IssueCard';
import { BookOpen, Calendar, Layers } from 'lucide-react';

export default function EditorArchivesPage() {
  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
      {/* Header */}
      <div className="border-b border-sand/30 pb-6 mb-8">
        <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">Published Repository</span>
        <h1 className="font-display text-3xl font-bold text-forest-green mt-1">Journal Archives</h1>
      </div>

      {/* Grid of Published Issues */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEMO_ARCHIVES_VOLUMES.map((issue, idx) => (
          <IssueCard
            key={idx}
            id={`arch-${idx}`}
            volume={14}
            issue={idx + 1}
            year={issue.year}
            title={`${issue.journal} — ${issue.vol}`}
            publishDate={`${issue.year}-01-15`}
            articlesCount={issue.articles}
            status="PUBLISHED"
          />
        ))}
      </div>
    </main>
  );
}
