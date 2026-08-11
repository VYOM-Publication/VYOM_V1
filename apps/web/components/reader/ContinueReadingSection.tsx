import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';

interface InProgressBook {
  bookId: string;
  title: string;
  author: string;
  progress: number;
  lastRead: string;
  totalPages: number;
  pagesRead: number;
}

interface ContinueReadingSectionProps {
  book?: InProgressBook;
}

export function ContinueReadingSection({ book }: ContinueReadingSectionProps) {
  if (!book) {
    return (
      <div className="rounded-3xl border border-sand/40 bg-white p-8 text-center flex flex-col items-center gap-4 mb-8">
        <div className="h-12 w-12 rounded-full bg-sand/20 flex items-center justify-center text-forest-green/40">
          <BookOpen className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-forest-green">No books in progress</h3>
          <p className="text-sm text-forest-green/50 mt-1 max-w-xs mx-auto">
            Discover new research, essays, and journals in our library.
          </p>
        </div>
        <Link href="/books" className="rounded-full bg-ochre px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 transition-colors">
          Browse Library
        </Link>
      </div>
    );
  }

  // Generate a mock color scheme based on the bookId to make it look unique
  const colors = [
    { bg: 'from-emerald-800 to-forest-green', accent: 'bg-emerald-500/20' },
    { bg: 'from-teal-800 to-teal-950', accent: 'bg-teal-500/20' },
    { bg: 'from-rose-900 to-rose-950', accent: 'bg-rose-500/20' },
    { bg: 'from-amber-900 to-amber-950', accent: 'bg-amber-500/20' },
    { bg: 'from-blue-900 to-blue-950', accent: 'bg-blue-500/20' },
  ];
  const colorScheme = colors[parseInt(book.bookId) % colors.length] || colors[0];

  return (
    <div className="group rounded-3xl border border-sand/40 bg-white shadow-card hover:shadow-card-hover hover:border-sand transition-all p-6 sm:p-8 mb-8">
      <span className="text-[10px] font-bold uppercase tracking-widest text-ochre mb-4 block">
        Continue Reading
      </span>
      <div className="flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-8">
        {/* Book cover graphic */}
        <div className={`w-36 sm:w-40 h-52 sm:h-56 shrink-0 relative rounded-lg overflow-hidden shadow-[4px_6px_12px_rgba(0,0,0,0.15)] flex flex-col justify-between p-4 text-ivory select-none bg-gradient-to-br border-l-[6px] border-black/25 transform group-hover:scale-[1.02] transition-transform duration-300 ${colorScheme.bg}`}>
          <div className="flex justify-between items-start gap-1">
            <span className="text-[9px] font-bold tracking-widest uppercase opacity-75">VYOM</span>
            <span className="text-[9px] font-bold tracking-widest uppercase opacity-75">VOL. {book.bookId}</span>
          </div>
          <div className="my-auto text-center flex flex-col gap-1.5 justify-center px-1">
            <p className="font-display text-sm font-bold leading-tight tracking-wide line-clamp-3">
              {book.title}
            </p>
            <p className="text-[10px] font-semibold tracking-wider opacity-85">
              {book.author}
            </p>
          </div>
          <div className="w-full h-px bg-white/20 mt-auto" />
        </div>

        {/* Book progress detail */}
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-forest-green group-hover:text-ochre transition-colors leading-snug">
              {book.title}
            </h3>
            <p className="text-sm font-medium text-forest-green/60 mt-1">
              By {book.author}
            </p>
            
            {/* Reading progress bar */}
            <div className="mt-5 max-w-md">
              <div className="flex items-center justify-between text-xs font-bold text-forest-green/50 mb-1.5">
                <span>Reading Progress</span>
                <span className="text-ochre">{book.progress}% Completed</span>
              </div>
              <div className="w-full h-2 rounded-full bg-sand/30 overflow-hidden" aria-hidden="true">
                <div className="h-full rounded-full bg-ochre transition-all duration-500" style={{ width: `${book.progress}%` }} />
              </div>
              <p className="text-xs text-forest-green/40 mt-1.5">
                {book.pagesRead} of {book.totalPages} pages read · Last read {book.lastRead}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href={`/books/${book.bookId}`}
              className="rounded-full bg-ochre px-6 py-3 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 transition-colors inline-flex items-center justify-center gap-2"
            >
              Continue Reading <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/member/reading-history"
              className="rounded-full border border-sand px-6 py-3 text-xs font-bold uppercase tracking-widest text-forest-green/60 hover:border-forest-green hover:text-forest-green transition-colors inline-flex items-center justify-center"
            >
              Reading History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
