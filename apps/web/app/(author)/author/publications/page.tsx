'use client';

import { DEMO_SUBMISSIONS } from '@/lib/demo-data';
import { BookOpen, ExternalLink, Download, BarChart2, Eye, Award } from 'lucide-react';
import Link from 'next/link';

const published = DEMO_SUBMISSIONS.filter(s => s.status === 'PUBLISHED');

export default function AuthorPublicationsPage() {
  return (
    <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
      {/* Page Header */}
      <div className="border-b border-sand/30 pb-6 mb-8">
        <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">Published Works</span>
        <h1 className="font-display text-3xl font-bold text-forest-green mt-1">My Publications</h1>
      </div>

      {published.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-forest-green/30 text-center">
          <BookOpen className="h-10 w-10 text-forest-green/20" />
          <div>
            <p className="font-semibold text-forest-green/70">No published articles yet.</p>
            <p className="text-xs text-forest-green/40 mt-1">Your publications will appear here once accepted and processed.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Summary Metric Header Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-sand/40 bg-white p-5 flex items-center gap-4">
              <div className="rounded-xl bg-ochre/15 p-3 text-ochre shrink-0">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-forest-green/35">Total Publications</p>
                <p className="font-display text-2xl font-bold text-forest-green mt-0.5">{published.length}</p>
              </div>
            </div>
            
            <div className="rounded-2xl border border-sand/40 bg-white p-5 flex items-center gap-4">
              <div className="rounded-xl bg-forest-green/10 p-3 text-forest-green shrink-0">
                <Eye className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-forest-green/35">Total Views</p>
                <p className="font-display text-2xl font-bold text-forest-green mt-0.5">342</p>
              </div>
            </div>

            <div className="rounded-2xl border border-sand/40 bg-white p-5 flex items-center gap-4">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600 shrink-0">
                <Download className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-forest-green/35">PDF Downloads</p>
                <p className="font-display text-2xl font-bold text-forest-green mt-0.5">98</p>
              </div>
            </div>
          </div>

          {/* Publications List */}
          <div className="flex flex-col gap-6">
            {published.map(s => (
              <div 
                key={s.id} 
                className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm hover:shadow-card hover:border-sand transition-all flex flex-col md:flex-row gap-6 justify-between items-start"
              >
                {/* Paper details */}
                <div className="flex-1 min-w-0 flex gap-4">
                  {/* Mock Paper Cover Book Binder Illustration */}
                  <div className="hidden sm:flex h-28 w-20 rounded-lg bg-gradient-to-br from-forest-green to-forest-green/80 text-ivory p-2 flex-col justify-between shrink-0 shadow-sm relative overflow-hidden select-none border-l-4 border-ochre">
                    <div className="absolute right-0 top-0 w-8 h-8 bg-white/10 rounded-full blur-md" />
                    <span className="text-[7px] font-bold opacity-65 tracking-widest uppercase">VJLS</span>
                    <span className="text-[8px] font-bold leading-tight line-clamp-3 mt-2">{s.title}</span>
                    <span className="text-[6px] font-bold opacity-50 truncate mt-auto">2025</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold text-ochre uppercase">{s.id}</span>
                      <span className="text-[10px] font-bold text-forest-green/45 uppercase tracking-wider">{s.journal}</span>
                      <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[9px] font-bold text-teal-700 uppercase tracking-widest">Published</span>
                    </div>
                    
                    <h3 className="font-display text-lg font-bold text-forest-green mt-2 leading-snug">
                      {s.title}
                    </h3>
                    
                    <p className="text-xs text-forest-green/60 mt-1">
                      {s.author} · {s.affiliation}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs border-t border-sand/20 pt-4 mt-4">
                      {[
                        { label: 'Published Date', value: s.publishedDate },
                        { label: 'Volume / Issue', value: `Vol. ${s.volume}, No. ${s.issue}` },
                        { label: 'Page Range', value: s.pageRange },
                        { label: 'DOI Code', value: s.doi }
                      ].map((spec, idx) => (
                        <div key={idx}>
                          <p className="font-bold uppercase tracking-widest text-forest-green/30 text-[9px]">{spec.label}</p>
                          <p className="text-forest-green/70 mt-0.5 font-semibold break-all">{spec.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Metrics and Link */}
                <div className="w-full md:w-auto flex flex-row md:flex-col justify-between md:justify-start items-center md:items-end gap-4 shrink-0 border-t md:border-t-0 border-sand/20 pt-4 md:pt-0 self-stretch md:self-auto">
                  <div className="flex md:flex-col gap-4 text-left md:text-right">
                    <div>
                      <p className="text-xs font-bold text-forest-green flex items-center md:justify-end gap-1">
                        <Eye className="h-3.5 w-3.5 text-forest-green/30" /> 148
                      </p>
                      <p className="text-[8px] font-bold uppercase tracking-widest text-forest-green/40">Article Views</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-forest-green flex items-center md:justify-end gap-1">
                        <Download className="h-3.5 w-3.5 text-forest-green/30" /> 42
                      </p>
                      <p className="text-[8px] font-bold uppercase tracking-widest text-forest-green/40">Downloads</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-forest-green flex items-center md:justify-end gap-1">
                        <Award className="h-3.5 w-3.5 text-forest-green/30" /> 12
                      </p>
                      <p className="text-[8px] font-bold uppercase tracking-widest text-forest-green/40">Citations</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/author/submissions/${s.id}`}
                      className="rounded-full border border-sand px-4 py-2 text-xs font-bold uppercase tracking-widest text-forest-green/60 hover:border-forest-green hover:text-forest-green transition-colors inline-flex items-center gap-1"
                    >
                      Track
                    </Link>
                    <a 
                      href="#" 
                      className="rounded-full bg-ochre px-4 py-2 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 transition-colors inline-flex items-center gap-1 shadow-sm"
                    >
                      View <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
