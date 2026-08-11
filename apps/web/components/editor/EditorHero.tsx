import Link from 'next/link';
import { ArrowRight, BookPlus, Layers, FileText } from 'lucide-react';

interface EditorHeroProps {
  name: string;
}

export function EditorHero({ name }: EditorHeroProps) {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-sand/15 via-sand/5 to-transparent border border-sand/40 p-8 sm:p-10 mb-8">
      {/* Background ambient light */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-ochre/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-1/3 bottom-0 w-48 h-48 bg-forest-green/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-xl flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">
            Editorial Management Console
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-forest-green leading-tight mt-1">
            Welcome back, {name}
          </h1>
          <p className="text-sm text-forest-green/60 leading-relaxed mt-1">
            Manage submissions, reviewers, and publication workflows efficiently across VYOM's academic journals.
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
          <Link
            href="/editor/submissions"
            className="rounded-full bg-ochre px-6 py-3 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 transition-colors inline-flex items-center justify-center gap-2 shadow-sm"
          >
            <FileText className="h-4 w-4" /> Review Queue
          </Link>
          <Link
            href="/editor/issues"
            className="rounded-full border border-sand px-6 py-3 text-xs font-bold uppercase tracking-widest text-forest-green/60 hover:border-forest-green hover:text-forest-green transition-colors inline-flex items-center justify-center gap-2"
          >
            <BookPlus className="h-4 w-4" /> Create New Issue
          </Link>
        </div>
      </div>
    </div>
  );
}
