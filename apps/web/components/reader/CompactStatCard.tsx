import { LucideIcon } from 'lucide-react';

interface CompactStatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
}

export function CompactStatCard({ label, value, icon: Icon }: CompactStatCardProps) {
  return (
    <div className="rounded-3xl border border-sand/30 bg-gradient-to-br from-white via-white to-ivory/50 p-5 flex items-center justify-between gap-4 shadow-card hover:shadow-lg transition-all">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-forest-green/45">
          {label}
        </p>
        <p className="font-display text-2xl font-bold text-forest-green mt-1">
          {value}
        </p>
      </div>
      <div className="h-10 w-10 rounded-2xl bg-ochre/15 text-ochre border border-sand/20 flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5" />
      </div>
    </div>
  );
}
