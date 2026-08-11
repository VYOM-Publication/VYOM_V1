const STYLES: Record<string, string> = {
  // Submission statuses
  'UNDER REVIEW':  'border border-ochre/40 text-ochre',
  'REVISION':      'border border-amber-400/40 text-amber-600',
  'ACCEPTED':      'border border-green-400/40 text-green-600',
  'PUBLISHED':     'border border-teal-400/40 text-teal-600',
  'REJECTED':      'border border-red-400/40 text-red-500',
  'NEW':           'border border-blue-400/40 text-blue-600',
  // Review statuses
  'PENDING':       'bg-ochre/10 text-ochre',
  'IN PROGRESS':   'bg-teal-50 text-teal-700',
  'COMPLETED':     'bg-green-50 text-green-700',
  // Recommendation
  'ACCEPT':        'bg-green-50 text-green-600',
  'MINOR REVISION':'bg-amber-50 text-amber-600',
  'MAJOR REVISION':'bg-orange-50 text-orange-600',
  'REJECT':        'bg-red-50 text-red-500',
  // Payment
  'paid':          'bg-green-50 text-green-600',
  'pending':       'bg-sand/30 text-forest-green/50',
  'PAYMENT DUE':   'bg-red-50 text-red-500',
  // User
  'Active':        'bg-green-50 text-green-600',
  'Suspended':     'bg-red-50 text-red-500',
};

interface Props {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className = '' }: Props) {
  const style = STYLES[status] ?? 'bg-sand/30 text-forest-green/50';
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${style} ${className}`}>
      {status}
    </span>
  );
}
