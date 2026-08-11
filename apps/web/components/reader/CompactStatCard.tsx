import { LucideIcon } from 'lucide-react';

interface CompactStatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
}

export function CompactStatCard({ label, value, icon: Icon }: CompactStatCardProps) {
  return (
    <div className="rounded-2xl border border-sand/40 bg-white p-5 flex items-center justify-between gap-4">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-forest-green/40">
          {label}
        </p>
        <p className="font-display text-2xl font-bold text-forest-green mt-1">
          {value}
        </p>
      </div>
      <div className="h-10 w-10 rounded-xl bg-sand/20 flex items-center justify-center text-forest-green/40 shrink-0">
        <Icon className="h-5 w-5" />
      </div>
    </div>
  );
}
