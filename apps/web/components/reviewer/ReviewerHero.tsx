import Link from 'next/link';
import { ArrowRight, ClipboardList, CheckCircle } from 'lucide-react';

interface ReviewerHeroProps {
  name: string;
  activeCount: number;
}

export function ReviewerHero({ name, activeCount }: ReviewerHeroProps) {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-sand/15 via-sand/5 to-transparent border border-sand/40 p-8 sm:p-10 mb-8">
      {/* Decorative glows */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-ochre/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-1/3 bottom-0 w-48 h-48 bg-forest-green/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-xl flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">
            Reviewer Workspace
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-forest-green leading-tight mt-1">
            Welcome back, {name}
          </h1>
          <p className="text-sm text-forest-green/60 leading-relaxed mt-1">
            Thank you for contributing to academic excellence. Your rigorous peer reviews maintain scholarly integrity across our journals.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link
            href="/reviewer/assignments"
            className="rounded-full bg-ochre px-6 py-3 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 transition-colors inline-flex items-center justify-center gap-2 shadow-sm"
          >
            Continue Review <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/reviewer/history"
            className="rounded-full border border-sand px-6 py-3 text-xs font-bold uppercase tracking-widest text-forest-green/60 hover:border-forest-green hover:text-forest-green transition-colors inline-flex items-center justify-center gap-2"
          >
            <CheckCircle className="h-4 w-4" /> View History
          </Link>
        </div>
      </div>
    </div>
  );
}
