import { FileText, ShieldAlert, Scale, CheckSquare, BookOpen } from 'lucide-react';

const RESOURCES = [
  {
    title: 'Review Guidelines',
    desc: 'Criteria for evaluating novelty, structure, and methodologies.',
    icon: FileText,
    actionLabel: 'Read Guidelines',
    link: '/guidelines'
  },
  {
    title: 'Ethics & Integrity Policy',
    desc: 'COPE-aligned peer review principles and plagiarism checks.',
    icon: Scale,
    actionLabel: 'View Policy',
    link: '/guidelines'
  },
  {
    title: 'Conflict of Interest',
    desc: 'Disclosure protocols and impartiality standards.',
    icon: ShieldAlert,
    actionLabel: 'COI Standards',
    link: '/guidelines'
  },
  {
    title: 'Evaluation Criteria',
    desc: 'Standardized 1-10 scoring scales and recommendation rubrics.',
    icon: CheckSquare,
    actionLabel: 'Scoring Rubric',
    link: '/guidelines'
  },
  {
    title: 'Reviewer Handbook',
    desc: 'Comprehensive manual for reviewers and board members.',
    icon: BookOpen,
    actionLabel: 'Download Handbook',
    link: '#'
  }
];

export function ReviewerResources() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {RESOURCES.map((resource) => {
        const Icon = resource.icon;
        return (
          <div 
            key={resource.title} 
            className="rounded-2xl border border-sand/40 bg-white p-5 flex flex-col justify-between hover:border-sand hover:shadow-card transition-all"
          >
            <div>
              <div className="h-9 w-9 rounded-xl bg-sand/35 text-forest-green/60 flex items-center justify-center mb-3">
                <Icon className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-forest-green text-xs">{resource.title}</h3>
              <p className="text-[11px] text-forest-green/50 mt-1 leading-normal">{resource.desc}</p>
            </div>
            
            <a 
              href={resource.link} 
              className="text-[10px] font-bold uppercase tracking-widest text-ochre hover:underline mt-4 block self-start"
            >
              {resource.actionLabel} →
            </a>
          </div>
        );
      })}
    </div>
  );
}
