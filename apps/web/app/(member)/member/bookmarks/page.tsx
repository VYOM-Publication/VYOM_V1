'use client';

// TODO: Replace demo data with GET /api/v1/member/bookmarks once backend credentials are available.

import Link from 'next/link';
import { PageHeader } from '@/components/common/PageHeader';
import { EmptyState } from '@/components/common/EmptyState';
import { DEMO_BOOKMARKS } from '@/lib/demo-data';
import { Bookmark, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function BookmarksPage() {
  const [items, setItems] = useState(DEMO_BOOKMARKS);

  return (
    <>
      <PageHeader
        title="Bookmarks"
        subtitle={`${items.length} Saved Publications`}
        role="member"
      />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
        {items.length === 0 ? (
          <EmptyState
            icon={Bookmark}
            title="No bookmarks saved yet"
            description="Explore our journals, monographs, and research papers to save titles to your personal library."
            action={
              <Link href="/books" className="rounded-full bg-ochre px-6 py-3 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 shadow-sm transition-colors">
                Explore Publications
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(b => (
              <div
                key={b.id}
                className="group relative rounded-3xl border border-sand/30 border-l-4 border-l-ochre bg-gradient-to-br from-white via-white to-ivory/60 p-6 shadow-card hover:shadow-lg hover:border-sand transition-all flex flex-col justify-between"
              >
                {/* Gold Ribbon Badge */}
                <div className="absolute top-4 right-4 rounded-full bg-ochre/15 text-ochre p-2 border border-sand/20">
                  <Bookmark className="h-4 w-4 fill-ochre text-ochre" />
                </div>

                <div>
                  {/* Category Pill */}
                  <span className="inline-block text-[9px] font-bold uppercase tracking-widest text-ochre bg-ochre/10 border border-sand/20 px-3 py-1 rounded-full mb-3">
                    {b.category}
                  </span>

                  <h3 className="font-display text-base font-bold text-forest-green group-hover:text-ochre transition-colors leading-snug line-clamp-2">
                    {b.title}
                  </h3>
                  <p className="text-xs text-forest-green/60 font-medium mt-1">
                    By {b.author}
                  </p>
                  <p className="text-[10px] text-forest-green/40 mt-3 font-semibold">
                    Saved on {b.savedDate}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-sand/20 flex items-center justify-between">
                  <Link
                    href={`/books/${b.bookId}`}
                    className="rounded-full bg-ochre px-5 py-2 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 transition-colors shadow-sm"
                  >
                    Read Manuscript →
                  </Link>
                  <button
                    onClick={() => setItems(i => i.filter(x => x.id !== b.id))}
                    className="p-2 text-forest-green/30 hover:text-rose-600 transition-colors rounded-full hover:bg-rose-50"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
