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
        subtitle={`${DEMO_READING_HISTORY.length} Publications Logged`}
        role="member"
      />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8 flex flex-col gap-6">
        {DEMO_READING_HISTORY.map(r => {
          const isComplete = r.progress === 100;
          const radius = 18;
          const circumference = 2 * Math.PI * radius;
          const strokeDashoffset = circumference - (r.progress / 100) * circumference;

          return (
            <div
              key={r.id}
              className="group rounded-3xl border border-sand/30 border-l-4 border-l-ochre bg-gradient-to-br from-white via-white to-ivory/60 p-6 shadow-card hover:shadow-lg hover:border-sand transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-5 flex-1 min-w-0">
                {/* Book Cover Thumbnail Graphic */}
                <div className="w-14 h-20 shrink-0 rounded-xl overflow-hidden shadow-sm bg-gradient-to-br from-[#18362F] to-[#0E1F1B] border-l-4 border-l-ochre flex flex-col justify-between p-2 text-ivory select-none">
                  <span className="text-[7px] font-bold uppercase tracking-widest text-ochre">VYOM</span>
                  <p className="font-display text-[9px] font-bold line-clamp-2 leading-tight">{r.title}</p>
                  <span className="text-[6px] text-sand/70">Vol. {r.bookId}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">
                      {isComplete ? 'Archived' : 'In Progress'}
                    </span>
                    <span className="text-[10px] text-forest-green/40">· Last read {r.lastRead}</span>
                  </div>

                  <h3 className="font-display text-base sm:text-lg font-bold text-forest-green group-hover:text-ochre transition-colors mt-0.5 truncate">
                    {r.title}
                  </h3>
                  <p className="text-xs text-forest-green/60 font-medium">By {r.author}</p>

                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-xs font-semibold text-forest-green/50">
                      {r.pagesRead} of {r.totalPages} pages ({r.progress}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Circular Gold Progress Ring & Action Button */}
              <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-sand/20">
                {/* SVG Progress Ring */}
                <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                  <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 44 44">
                    <circle
                      cx="22"
                      cy="22"
                      r={radius}
                      className="text-sand/30 stroke-current"
                      strokeWidth="3.5"
                      fill="transparent"
                    />
                    <circle
                      cx="22"
                      cy="22"
                      r={radius}
                      className={isComplete ? 'text-emerald-600 stroke-current' : 'text-ochre stroke-current'}
                      strokeWidth="3.5"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <span className={`absolute text-[10px] font-bold ${isComplete ? 'text-emerald-600' : 'text-ochre'}`}>
                    {r.progress}%
                  </span>
                </div>

                <Link
                  href={`/member/read/${r.bookId}`}
                  className="rounded-full bg-ochre px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 shadow-sm transition-colors"
                >
                  {isComplete ? 'Read Again' : 'Continue →'}
                </Link>
              </div>
            </div>
          );
        })}
      </main>
    </>
  );
}
