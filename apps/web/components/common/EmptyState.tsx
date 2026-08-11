import { type LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <div className="rounded-full bg-sand/20 p-5">
        <Icon className="h-8 w-8 text-forest-green/30" aria-hidden="true" />
      </div>
      <p className="text-sm font-semibold text-forest-green/50">{title}</p>
      {description && <p className="text-xs text-forest-green/30 max-w-xs">{description}</p>}
      {action}
    </div>
  );
}
