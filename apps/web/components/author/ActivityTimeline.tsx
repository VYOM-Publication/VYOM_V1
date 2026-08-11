import { FileText, Edit3, CheckCircle, CreditCard, MessageSquare } from 'lucide-react';

interface ActivityEvent {
  id: string;
  title: string;
  description?: string;
  time: string;
  type: 'review' | 'revision' | 'payment' | 'approval' | 'submission';
}

interface ActivityTimelineProps {
  events?: ActivityEvent[];
}

const DEFAULT_EVENTS: ActivityEvent[] = [
  {
    id: '1',
    title: 'Editor requested revisions',
    description: 'Revision requested for manuscript MS-2025-008. Please review reviewers comments and upload a new version.',
    time: 'Yesterday',
    type: 'revision'
  },
  {
    id: '2',
    title: 'Peer Review completed',
    description: 'Two reviews submitted for manuscript MS-2025-008. Status changed to REVISION.',
    time: '3 days ago',
    type: 'review'
  },
  {
    id: '3',
    title: 'Payment received',
    description: 'Publication fee for MS-2024-089 has been processed successfully.',
    time: '1 week ago',
    type: 'payment'
  },
  {
    id: '4',
    title: 'Abstract approved',
    description: 'Abstract for MS-2025-012 approved by Editor Prof. Vikram Das.',
    time: '2 weeks ago',
    type: 'approval'
  }
];

export function ActivityTimeline({ events = DEFAULT_EVENTS }: ActivityTimelineProps) {
  const icons = {
    review: MessageSquare,
    revision: Edit3,
    payment: CreditCard,
    approval: CheckCircle,
    submission: FileText
  };

  const colors = {
    review: 'bg-blue-50 text-blue-600 border-blue-100',
    revision: 'bg-amber-50 text-amber-600 border-amber-100',
    payment: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    approval: 'bg-teal-50 text-teal-600 border-teal-100',
    submission: 'bg-sand/30 text-forest-green border-sand/40'
  };

  return (
    <div className="relative border-l border-sand/40 pl-6 ml-3 space-y-6 py-2">
      {events.map((event) => {
        const Icon = icons[event.type] || FileText;
        const colorClass = colors[event.type] || colors.submission;

        return (
          <div key={event.id} className="relative group">
            {/* Timeline Dot */}
            <div className={`absolute -left-[37px] top-1 h-6 w-6 rounded-full border flex items-center justify-center transition-colors bg-white ${colorClass} group-hover:bg-ochre group-hover:text-white group-hover:border-ochre shadow-sm`}>
              <Icon className="h-3 w-3" />
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-bold text-forest-green text-sm group-hover:text-ochre transition-colors">
                  {event.title}
                </h3>
                <span className="text-[10px] font-bold text-forest-green/35 uppercase tracking-wider shrink-0">
                  {event.time}
                </span>
              </div>
              {event.description && (
                <p className="text-xs text-forest-green/60 leading-relaxed mt-1">
                  {event.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
