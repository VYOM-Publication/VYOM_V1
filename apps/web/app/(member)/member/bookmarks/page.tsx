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
        subtitle={`${items.length} Saved Items`}
        role="member"
      />

      <main className="flex-1 px-8 py-6 flex flex-col gap-3">
        {items.length === 0 ? (
          <EmptyState
            icon={Bookmark}
            title="No bookmarks yet"
            description="Browse books to save them here."
            action={
              <Link href="/books" className="rounded-full bg-ochre px-6 py-2.5 text-xs font-bold text-ivory hover:bg-ochre/90">
                Browse Books
              </Link>
            }
          />
        ) : (
          items.map(b => (
            <div key={b.id} className="rounded-2xl border border-sand/40 bg-white px-6 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="rounded-xl bg-ochre/10 p-3 shrink-0">
                  <Bookmark className="h-5 w-5 text-ochre" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-forest-green">{b.title}</h3>
                  <p className="text-xs text-forest-green/50">{b.author} · {b.category}</p>
                  <p className="text-xs text-forest-green/30 mt-0.5">Saved {b.savedDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link href={`/books/${b.bookId}`}
                  className="rounded-full border border-ochre/40 px-4 py-1.5 text-xs font-bold text-ochre hover:bg-ochre hover:text-ivory transition-colors">
                  Read →
                </Link>
                <button onClick={() => setItems(i => i.filter(x => x.id !== b.id))}
                  className="text-forest-green/20 hover:text-red-400 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </main>
    </>
  );
}
