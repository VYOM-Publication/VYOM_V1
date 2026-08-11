'use client';

// TODO: Replace demo data with GET /api/v1/member/reading-history once backend credentials are available.

import Link from 'next/link';
import { PageHeader } from '@/components/common/PageHeader';
import { DEMO_READING_HISTORY } from '@/lib/demo-data';
import { BookOpen } from 'lucide-react';

export default function ReadingHistoryPage() {
  return (
    <>
      <PageHeader
        title="Reading History"
        subtitle={`${DEMO_READING_HISTORY.length} Books`}
        role="member"
      />

      <main className="flex-1 px-8 py-6 flex flex-col gap-3">
        {DEMO_READING_HISTORY.map(r => (
          <div key={r.id} className="rounded-2xl border border-sand/40 bg-white px-6 py-5 flex items-center gap-5">
            <div className="rounded-xl bg-ochre/10 p-3 shrink-0">
              <BookOpen className="h-5 w-5 text-ochre" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h3 className="text-sm font-bold text-forest-green truncate">{r.title}</h3>
                <span className={`text-xs font-bold shrink-0 ${r.progress === 100 ? 'text-green-600' : 'text-ochre'}`}>
                  {r.progress === 100 ? 'Completed' : `${r.progress}%`}
                </span>
              </div>
              <p className="text-xs text-forest-green/50 mb-2">{r.author} · Last read {r.lastRead}</p>
              <div className="w-full h-1.5 rounded-full bg-sand/30">
                <div className={`h-1.5 rounded-full transition-all ${r.progress === 100 ? 'bg-green-500' : 'bg-ochre'}`}
                  style={{ width: `${r.progress}%` }} />
              </div>
              <p className="text-xs text-forest-green/30 mt-1">{r.pagesRead} / {r.totalPages} pages</p>
            </div>
            <Link href={`/books/${r.bookId}`}
              className="shrink-0 rounded-full border border-ochre/40 px-4 py-1.5 text-xs font-bold text-ochre hover:bg-ochre hover:text-ivory transition-colors">
              {r.progress === 100 ? 'Read Again' : 'Continue →'}
            </Link>
          </div>
        ))}
      </main>
    </>
  );
}
