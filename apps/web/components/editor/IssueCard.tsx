import Link from 'next/link';
import { BookOpen, Calendar, Layers, ArrowRight } from 'lucide-react';

interface IssueCardProps {
  id: string;
  volume: number;
  issue: number;
  year: number;
  title: string;
  publishDate: string;
  articlesCount: number;
  status: 'PUBLISHED' | 'SCHEDULED' | 'DRAFT';
}

const STATUS_STYLE: Record<string, string> = {
  'PUBLISHED': 'bg-emerald-50 text-emerald-600 border-emerald-100',
  'SCHEDULED': 'bg-amber-50 text-amber-600 border-amber-100',
  'DRAFT':     'bg-sand/30 text-forest-green/60 border-sand/30',
};

export function IssueCard({
  id,
  volume,
  issue,
  year,
  title,
  publishDate,
  articlesCount,
  status
}: IssueCardProps) {
  return (
    <div className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm hover:shadow-card hover:border-sand transition-all flex flex-col justify-between gap-5">
      {/* Cover Mockup Header */}
      <div className="relative rounded-2xl bg-gradient-to-br from-forest-green to-deep-green p-6 text-ivory flex flex-col justify-between h-40 overflow-hidden shadow-inner">
        <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-ochre/15 blur-2xl" />
        
        <div className="flex items-center justify-between z-10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">
            Vol. {volume}, Issue {issue} ({year})
          </span>
          <span className={`rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest ${STATUS_STYLE[status]}`}>
            {status}
          </span>
        </div>

        <div className="z-10 mt-auto">
          <h3 className="font-display text-lg font-bold text-ivory line-clamp-1 leading-snug">
            {title}
          </h3>
          <p className="text-[10px] text-ivory/60 mt-1">VYOM Academic Press</p>
        </div>
      </div>

      {/* Details */}
      <div className="flex items-center justify-between text-xs text-forest-green/60">
        <span className="flex items-center gap-1.5 font-semibold">
          <Calendar className="h-3.5 w-3.5 text-ochre" /> {publishDate}
        </span>
        <span className="flex items-center gap-1.5 font-semibold">
          <Layers className="h-3.5 w-3.5 text-ochre" /> {articlesCount} Articles
        </span>
      </div>

      <Link
        href={`/editor/issues`}
        className="rounded-full border border-sand px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-forest-green/70 hover:border-forest-green hover:text-forest-green transition-colors inline-flex items-center justify-center gap-1.5"
      >
        Manage Volume <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
