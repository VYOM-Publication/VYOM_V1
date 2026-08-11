import { type LucideIcon } from 'lucide-react';

interface Props {
  label: string;
  value: string | number;
  sub?: string;
  icon?: LucideIcon;
  accent?: boolean;
}

export function StatCard({ label, value, sub, icon: Icon, accent }: Props) {
  return (
    <div className={`rounded-2xl border p-5 flex flex-col gap-2 ${accent ? 'border-ochre/30 bg-ochre/5' : 'border-sand/40 bg-white'}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-forest-green/40">{label}</span>
        {Icon && <Icon className="h-4 w-4 text-ochre" aria-hidden="true" />}
      </div>
      <span className="font-display text-3xl font-bold text-forest-green">{value}</span>
      {sub && <span className="text-xs text-forest-green/50">{sub}</span>}
    </div>
  );
}
