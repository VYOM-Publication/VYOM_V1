'use client';

// TODO Phase 8:
// Backend Integration Endpoint:
// - GET /api/v1/blogs -> Returns published blog posts (with filter/search query support)
// Request Payload: ?search=query
// Response Shape: ApiResponse<{ posts: BlogPost[] }>
// Loading State: Show skeleton loader blocks during search fetches
// Error State: Show query failure notice or empty search results

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search, ArrowRight, Calendar,
} from 'lucide-react';
import { DEMO_BLOG_POSTS } from '@/lib/demo-data';

const PAGE_SIZE = 6;

// ── Blog Card ──────────────────────────────────────────────────────────────────
function BlogCard({ id, date, title, excerpt, author, category }: {
  id: string; date: string; title: string; excerpt: string; author: string; category: string;
}) {
  return (
    <div className="group bg-ivory rounded-2xl border border-sand/40 hover:border-sand hover:shadow-card transition-all overflow-hidden flex flex-col">
      {/* Image placeholder — TODO: replace with real cover images */}
      <div className="bg-gradient-to-br from-sand/30 to-sand/10 w-full h-44 shrink-0 flex items-center justify-center">
        <span className="text-xs font-bold uppercase tracking-widest text-ochre">{category}</span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-forest-green/40">
          <Calendar className="h-3.5 w-3.5" />
          {date}
        </div>
        <h2 className="font-display text-lg font-bold text-forest-green leading-snug group-hover:text-ochre transition-colors">
          {title}
        </h2>
        <p className="text-sm text-forest-green/55 leading-relaxed italic flex-1">
          {excerpt}
        </p>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-sand/30">
          <span className="text-sm font-semibold text-forest-green">{author}</span>
          <Link href={`/blogs/${id}`}
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-ochre hover:underline">
            Read More <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function BlogsPage() {
  const [query, setQuery]     = useState('');
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    if (query.trim() === '') return DEMO_BLOG_POSTS;
    const q = query.toLowerCase();
    return DEMO_BLOG_POSTS.filter(
      (p) => p.title.toLowerCase().includes(q) || p.author.toLowerCase().includes(q),
    );
  }, [query]);

  const shown   = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-ivory py-16 px-6 text-center">
        <div className="mx-auto max-w-2xl flex flex-col items-center gap-5">
          <span className="text-xs font-bold uppercase tracking-widest text-ochre">
            Insights &amp; Ideas
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-forest-green leading-tight">
            Our Blog
          </h1>
          <p className="text-base text-forest-green/60 leading-relaxed max-w-xl">
            Thoughts on writing, publishing, research practice, and the literary world —
            curated by the VYOM editorial desk.
          </p>

          {/* Search bar */}
          <div className="flex w-full max-w-lg gap-0 rounded-full border border-sand/50 bg-white overflow-hidden shadow-sm mt-2">
            <div className="flex items-center pl-5 pr-2">
              <Search className="h-4 w-4 text-forest-green/40 shrink-0" />
            </div>
            <input
              type="search"
              placeholder="Search articles, authors, or topics"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setVisible(PAGE_SIZE); }}
              aria-label="Search blog posts"
              className="flex-1 py-3 pr-2 text-sm text-forest-green placeholder:text-forest-green/35 bg-transparent focus:outline-none"
            />
            <button
              className="m-1.5 rounded-full bg-ochre px-6 py-2 text-sm font-semibold text-ivory hover:bg-ochre/90 transition-colors flex items-center gap-2 shrink-0">
              Search <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── BLOG GRID ─────────────────────────────────────────────────────── */}
      <main className="flex-1 px-6 pb-20">
        <div className="mx-auto max-w-4xl">
          {shown.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {shown.map((post) => (
                <BlogCard key={post.id} {...post} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
              <h3 className="font-display text-2xl font-bold text-forest-green">No posts found</h3>
              <p className="text-forest-green/50 text-sm">Try a different search term.</p>
              <button onClick={() => setQuery('')}
                className="rounded-full border border-forest-green/40 px-6 py-2 text-sm font-semibold text-forest-green hover:bg-forest-green hover:text-ivory transition-colors">
                Clear Search
              </button>
            </div>
          )}

          {/* Load More */}
          {hasMore && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="inline-flex items-center gap-2 rounded-full border border-sand/60 bg-ivory px-8 py-3 text-sm font-semibold text-forest-green hover:border-forest-green transition-colors">
                Load More Posts <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
