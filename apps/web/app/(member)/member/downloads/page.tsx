'use client';

// TODO: Replace demo data with GET /api/v1/member/downloads once backend credentials are available.

import Link from 'next/link';
import { PageHeader } from '@/components/common/PageHeader';
import { DEMO_DOWNLOADS } from '@/lib/demo-data';
import { Download, FileText, BookOpen } from 'lucide-react';

export default function DownloadsPage() {
  return (
    <>
      <PageHeader
        title="Downloads"
        subtitle={`${DEMO_DOWNLOADS.length} Offline Manuscripts Saved`}
        role="member"
      />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8 flex flex-col gap-5">
        {DEMO_DOWNLOADS.map(d => (
          <div
            key={d.id}
            className="group rounded-3xl border border-sand/30 border-l-4 border-l-ochre bg-gradient-to-br from-white via-white to-ivory/60 p-6 shadow-card hover:shadow-lg hover:border-sand transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-5"
          >
            <div className="flex items-center gap-5 flex-1 min-w-0">
              <div className="h-12 w-12 rounded-2xl bg-ochre/15 text-ochre border border-sand/20 flex items-center justify-center shrink-0">
                <FileText className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-ochre bg-ochre/10 border border-sand/20 px-2.5 py-0.5 rounded-full">
                    {d.fileType}
                  </span>
                  <span className="text-[10px] text-forest-green/40">· {d.fileSize}</span>
                </div>
                <h3 className="font-display text-base font-bold text-forest-green group-hover:text-ochre transition-colors truncate">
                  {d.title}
                </h3>
                <p className="text-xs text-forest-green/50 font-medium">By {d.author} · Downloaded on {d.downloadDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={`/member/read/${d.bookId}`}
                className="flex items-center justify-center gap-2 rounded-full bg-ochre px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 shadow-sm transition-colors"
              >
                <BookOpen className="h-4 w-4" /> Open PDF
              </Link>
              <button
                type="button"
                onClick={() => alert(`Re-syncing offline copy for "${d.title}"`)}
                className="p-2.5 rounded-full border border-sand/40 text-forest-green/50 hover:text-ochre hover:border-ochre transition-colors"
                title="Redownload File"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}
