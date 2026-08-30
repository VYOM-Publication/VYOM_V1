'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, ChevronLeft, ChevronRight, Bookmark, BookOpen,
  Sun, Moon, Type, Download, Share2, List, CheckCircle
} from 'lucide-react';
import { CATALOGUE } from '@/lib/books-data';

export default function BookReaderPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = (params.id as string) || '5';

  const book = CATALOGUE.find((b: { id: string }) => b.id === bookId) || {
    id: bookId,
    title: 'Quantum Computing Frontiers: Algorithms, Hardware & Scalability',
    author: 'Dr. Vikram Singh',
    category: 'Science & Technology',
    pages: 380,
    isbn: '978-3-16-148410-0',
    publicationYear: 2025,
  };

  const [currentPage, setCurrentPage] = useState(258);
  const [theme, setTheme] = useState<'paper' | 'dark' | 'sepia'>('paper');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const totalPages = book.pages || 380;
  const progress = Math.round((currentPage / totalPages) * 100);

  function handleBookmark() {
    setIsBookmarked(prev => !prev);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  }

  const themes = {
    paper: 'bg-[#faf8f5] text-[#1c2c26]',
    dark: 'bg-[#121d19] text-[#e8e4dc]',
    sepia: 'bg-[#f4ecd8] text-[#332b1d]',
  };

  const fontSizes = {
    normal: 'text-base leading-relaxed',
    large: 'text-lg leading-relaxed',
    xlarge: 'text-xl leading-loose',
  };

  const chapters = [
    { title: 'Chapter 1: Foundations of Quantum Information', page: 1 },
    { title: 'Chapter 2: Qubit Architecture & Superconducting Circuits', page: 45 },
    { title: 'Chapter 3: Quantum Error Correction & Surface Codes', page: 112 },
    { title: 'Chapter 4: Variational Quantum Eigensolvers (VQE)', page: 180 },
    { title: 'Chapter 5: Scalability & Fault-Tolerant Architectures', page: 258 },
    { title: 'Chapter 6: Future Outlook & Industrial Applications', page: 340 },
  ];

  return (
    <div className={`min-h-screen ${themes[theme]} flex flex-col font-sans transition-colors duration-300`}>
      {/* ── Top Bar / Reader Header ────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-sand/30 bg-white/80 dark:bg-forest-green/90 backdrop-blur-md px-6 py-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/member/dashboard')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-forest-green/70 hover:text-forest-green dark:text-ivory/70 dark:hover:text-ivory transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to My Library
          </button>
          <span className="hidden md:inline h-4 w-px bg-sand/40" />
          <div className="hidden md:flex flex-col">
            <h1 className="font-display text-sm font-bold text-forest-green dark:text-ivory truncate max-w-xs lg:max-w-md">
              {book.title}
            </h1>
            <p className="text-[10px] text-forest-green/50 dark:text-ivory/50">By {book.author}</p>
          </div>
        </div>

        {/* Reader Controls Toolbar */}
        <div className="flex items-center gap-3">
          {/* Table of Contents Toggle */}
          <button
            onClick={() => setTocOpen(v => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-sand/40 text-xs font-semibold text-forest-green dark:text-ivory hover:bg-sand/20 transition-colors"
            title="Table of Contents"
          >
            <List className="h-4 w-4 text-ochre" />
            <span className="hidden sm:inline">Contents</span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-lg border border-sand/40 transition-colors ${
              isBookmarked ? 'bg-ochre text-ivory border-ochre' : 'text-forest-green dark:text-ivory hover:bg-sand/20'
            }`}
            title="Bookmark Page"
          >
            <Bookmark className="h-4 w-4 fill-current" />
          </button>

          {/* Theme Switcher */}
          <div className="flex items-center rounded-lg border border-sand/40 p-1 bg-ivory/60 dark:bg-forest-green/40">
            <button
              onClick={() => setTheme('paper')}
              className={`p-1 rounded ${theme === 'paper' ? 'bg-white text-forest-green shadow-xs' : 'text-forest-green/40'}`}
              title="Light Paper Theme"
            >
              <Sun className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setTheme('sepia')}
              className={`p-1 rounded ${theme === 'sepia' ? 'bg-[#f4ecd8] text-[#332b1d] shadow-xs' : 'text-forest-green/40'}`}
              title="Sepia Warm Theme"
            >
              <span className="text-[10px] font-bold">Aa</span>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`p-1 rounded ${theme === 'dark' ? 'bg-forest-green text-ivory shadow-xs' : 'text-forest-green/40'}`}
              title="Dark Mode"
            >
              <Moon className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Font Size Adjuster */}
          <button
            onClick={() => {
              if (fontSize === 'normal') setFontSize('large');
              else if (fontSize === 'large') setFontSize('xlarge');
              else setFontSize('normal');
            }}
            className="p-2 rounded-lg border border-sand/40 text-forest-green dark:text-ivory hover:bg-sand/20 transition-colors"
            title="Adjust Font Size"
          >
            <Type className="h-4 w-4 text-ochre" />
          </button>
        </div>
      </header>

      {/* ── Main Content Area ──────────────────────────────────────────────── */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-10 flex flex-col justify-between relative">
        {/* Toast Notice */}
        {savedNotice && (
          <div className="fixed top-16 right-8 z-50 rounded-2xl bg-forest-green text-ivory px-5 py-3 shadow-xl border border-sand/30 flex items-center gap-2 text-xs font-bold">
            <CheckCircle className="h-4 w-4 text-ochre" />
            {isBookmarked ? 'Page 258 bookmarked in your library!' : 'Bookmark removed'}
          </div>
        )}

        {/* Table of Contents Drawer Modal */}
        {tocOpen && (
          <div className="absolute top-4 left-6 z-30 w-80 rounded-2xl border border-sand/40 bg-white dark:bg-forest-green p-6 shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-sand/20">
              <h3 className="font-display font-bold text-sm text-forest-green dark:text-ivory">Table of Contents</h3>
              <button onClick={() => setTocOpen(false)} className="text-xs text-forest-green/40 hover:text-forest-green">✕</button>
            </div>
            <div className="space-y-1.5">
              {chapters.map((ch, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentPage(ch.page);
                    setTocOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                    currentPage >= ch.page && (idx === chapters.length - 1 || currentPage < chapters[idx + 1].page)
                      ? 'bg-ochre/15 text-ochre font-bold'
                      : 'text-forest-green/70 dark:text-ivory/70 hover:bg-sand/20'
                  }`}
                >
                  <span className="truncate pr-2">{ch.title}</span>
                  <span className="text-[10px] text-forest-green/40 shrink-0">p. {ch.page}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chapter Header */}
        <div className="mb-8 border-b border-sand/30 pb-4 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-ochre">
            Chapter 5: Scalability & Fault-Tolerant Architectures
          </span>
          <span className="text-xs font-medium text-forest-green/50 dark:text-ivory/50">
            Section 5.4 · Noise Mitigation
          </span>
        </div>

        {/* e-Reader Book Text Viewer */}
        <article className={`space-y-6 ${fontSizes[fontSize]} font-serif leading-relaxed text-justify`}>
          <p className="first-letter:text-5xl first-letter:font-bold first-letter:font-display first-letter:text-ochre first-letter:float-left first-letter:mr-3 first-letter:leading-none">
            As quantum computing systems transition from noisy intermediate-scale quantum (NISQ) devices to fault-tolerant architectures, the engineering challenges surrounding qubit connectivity and thermal dissipation become paramount. Superconducting transmon qubits require cryogenic isolation at temperatures below 15 millikelvin, posing strict constraints on coaxial cabling density and microwave control electronics.
          </p>

          <p>
            Surface codes represent the leading error-correction candidate for planar 2D lattice topologies. By arranging physical qubits into an alternating grid of data and syndrome qubits, quantum information is encoded non-locally. This spatial redundancy guarantees that single-qubit depolarization or dephasing events can be syndrome-detected without collapsing the underlying superposition.
          </p>

          <div className="my-8 rounded-2xl border border-sand/40 bg-sand/15 dark:bg-forest-green/40 p-6 font-sans text-sm not-italic border-l-4 border-l-ochre space-y-2">
            <p className="font-display font-bold text-forest-green dark:text-ivory">Equation 5.12: Threshold Condition for Surface Codes</p>
            <p className="text-xs text-forest-green/70 dark:text-ivory/70 font-mono">
              P_error &lt; P_threshold ≈ 1.1% (assuming 2D nearest-neighbor coupling)
            </p>
          </div>

          <p>
            Recent experimental demonstrations across trapped-ion and superconducting platforms have achieved physical error rates below this 1% threshold, clearing the fundamental theoretical hurdle. However, scaling to a million physical qubits requires modular inter-chip optical linkages and automated real-time decoding algorithms capable of processing syndrome measurements within the microsecond coherence window.
          </p>
        </article>

        {/* Page Navigation & Progress Footer */}
        <div className="mt-12 pt-6 border-t border-sand/30 flex flex-col gap-4">
          <div className="flex items-center justify-between text-xs font-semibold text-forest-green/60 dark:text-ivory/60">
            <span>Page {currentPage} of {totalPages}</span>
            <span>{progress}% Completed</span>
          </div>

          {/* Visual Progress Bar */}
          <div className="w-full h-2 rounded-full bg-sand/30 overflow-hidden">
            <div className="h-full bg-ochre transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="inline-flex items-center gap-2 rounded-full border border-sand/40 px-5 py-2 text-xs font-bold uppercase tracking-widest text-forest-green dark:text-ivory hover:bg-sand/20 disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" /> Previous Page
            </button>

            <Link
              href="/member/dashboard"
              className="text-xs font-bold uppercase tracking-widest text-ochre hover:underline"
            >
              Save & Exit Reader
            </Link>

            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="inline-flex items-center gap-2 rounded-full bg-ochre px-5 py-2 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 disabled:opacity-30 transition-colors"
            >
              Next Page <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
