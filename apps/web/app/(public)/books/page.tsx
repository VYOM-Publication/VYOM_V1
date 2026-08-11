'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, BookOpen } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { ALL_BOOKS } from '@/lib/books-data';

// TODO: Replace demo data with GET /api/v1/books once backend credentials are available.

const CATEGORIES = ['All', 'ACADEMIC', 'FICTION', 'LITERATURE', 'NON-FICTION', 'SCIENCE & TECHNOLOGY'];

// ── Book Card ──────────────────────────────────────────────────────────────────
function BookCard({ id, title, author, category }: {
  id: string; title: string; author: string; category: string;
}) {
  return (
    <div className="group bg-ivory rounded-2xl border border-sand/40 hover:border-sand hover:shadow-card transition-all overflow-hidden flex flex-col">
      {/* Cover placeholder — TODO: replace with real cover images */}
      <div className="relative bg-gradient-to-b from-sand/20 to-sand/10 flex items-center justify-center min-h-[220px]">
        <BookOpen className="h-14 w-14 text-sand" />
      </div>
      {/* Info */}
      <div className="p-5 flex flex-col gap-1.5 border-t border-sand/30">
        <span className="text-xs font-bold uppercase tracking-widest text-ochre">{category}</span>
        <h3 className="font-display text-lg font-bold text-forest-green leading-snug">{title}</h3>
        <p className="text-sm text-forest-green/50">{author}</p>
        <Link href={`/books/${id}`}
          className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-ochre hover:underline">
          View Details <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

// ── Page Content ───────────────────────────────────────────────────────────────────
function BooksCatalogContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [query, setQuery]       = useState('');
  const [category, setCategory] = useState('All');

  // Sync category search param to local state
  useEffect(() => {
    if (categoryParam) {
      const matched = CATEGORIES.find(
        (c) => c.toLowerCase() === categoryParam.toLowerCase()
      );
      if (matched) {
        setCategory(matched);
      }
    }
  }, [categoryParam]);

  const filtered = useMemo(() => {
    return ALL_BOOKS.filter((b) => {
      const matchCat   = category === 'All' || b.category === category;
      const matchQuery = query.trim() === '' ||
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.author.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [query, category]);

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-ivory py-16 px-6 text-center border-b border-sand/30">
        <div className="mx-auto max-w-3xl flex flex-col items-center gap-8">
          <div className="flex items-center gap-4">
            <span className="block h-px w-12 bg-ochre" />
            <span className="text-xs font-bold uppercase tracking-widest text-ochre">Published Works</span>
            <span className="block h-px w-12 bg-ochre" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-forest-green leading-tight">
            Explore Our Book Catalogue
          </h1>

          {/* Search bar */}
          <div className="flex w-full max-w-xl gap-0 rounded-full border border-sand/50 bg-white overflow-hidden shadow-sm">
            <div className="flex items-center pl-5 pr-2">
              <Search className="h-4 w-4 text-forest-green/40 shrink-0" />
            </div>
            <input
              type="search"
              placeholder="Search by title or author…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search books"
              className="flex-1 py-3 pr-2 text-sm text-forest-green placeholder:text-forest-green/35 bg-transparent focus:outline-none"
            />
            <button
              aria-label="Search"
              className="m-1.5 rounded-full bg-ochre px-6 py-2 text-sm font-semibold text-ivory hover:bg-ochre/90 transition-colors flex items-center gap-2 shrink-0">
              Search <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2 justify-center" role="group" aria-label="Filter by category">
            {CATEGORIES.map((cat) => (
              <button key={cat}
                onClick={() => setCategory(cat)}
                aria-pressed={category === cat}
                className={`rounded-full px-5 py-1.5 text-xs font-bold tracking-widest transition-colors ${
                  category === cat
                    ? 'bg-forest-green text-ivory'
                    : 'border border-sand/50 text-forest-green/60 hover:border-forest-green/40 hover:text-forest-green'
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOK GRID ─────────────────────────────────────────────────────── */}
      <main className="flex-1 px-6 py-12 pb-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-widest text-forest-green/40 mb-6">
            {filtered.length} {filtered.length === 1 ? 'title' : 'titles'} found
          </p>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((book) => (
                <BookCard key={book.id} {...book} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
              <BookOpen className="h-16 w-16 text-sand" aria-hidden="true" />
              <h3 className="font-display text-2xl font-bold text-forest-green">No books found</h3>
              <p className="text-forest-green/50 text-sm max-w-xs">
                Try adjusting your search or selecting a different category.
              </p>
              <button onClick={() => { setQuery(''); setCategory('All'); }}
                className="rounded-full border border-forest-green/40 px-6 py-2 text-sm font-semibold text-forest-green hover:bg-forest-green hover:text-ivory transition-colors">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

function BooksPageFallback() {
  return (
    <div className="flex-1 flex items-center justify-center bg-ivory text-forest-green/50 py-24">
      <div className="animate-pulse text-xs font-bold uppercase tracking-widest">Loading Catalogue...</div>
    </div>
  );
}

export default function BooksPage() {
  return (
    <Suspense fallback={<BooksPageFallback />}>
      <BooksCatalogContent />
    </Suspense>
  );
}
