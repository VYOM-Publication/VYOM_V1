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

interface ReadingProgressCardProps {
  book: InProgressBook;
}

export function ReadingProgressCard({ book }: ReadingProgressCardProps) {
  return (
    <div className="rounded-3xl border border-sand/30 border-l-4 border-l-ochre bg-gradient-to-br from-white via-white to-ivory/50 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-card hover:shadow-lg transition-all">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="h-10 w-10 rounded-xl bg-ochre/15 flex items-center justify-center text-ochre shrink-0">
          <BookOpen className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between sm:justify-start gap-2">
            <h3 className="font-semibold text-forest-green text-sm truncate">{book.title}</h3>
            <span className="text-[10px] font-bold text-ochre shrink-0">{book.progress}%</span>
          </div>
          <p className="text-xs text-forest-green/50 mt-0.5">{book.author} · Last read {book.lastRead}</p>
          <div className="w-full h-1.5 rounded-full bg-sand/30 mt-2 max-w-sm" aria-hidden="true">
            <div className="h-full rounded-full bg-ochre" style={{ width: `${book.progress}%` }} />
          </div>
        </div>
      </div>
      <Link
        href={`/member/read/${book.bookId}`}
        className="shrink-0 rounded-full bg-ochre px-5 py-2 text-xs font-bold uppercase tracking-wider text-ivory hover:bg-ochre/90 shadow-xs transition-colors text-center inline-flex items-center justify-center gap-1"
      >
        Continue Reading <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
