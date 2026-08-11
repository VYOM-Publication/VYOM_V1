import { FileText, Award, Scale, HelpCircle } from 'lucide-react';

const RESOURCES = [
  {
    title: 'Writing Guidelines',
    desc: 'Structure and stylistic criteria for submissions.',
    icon: FileText,
    actionLabel: 'Download PDF',
    link: '/guidelines'
  },
  {
    title: 'Formatting Templates',
    desc: 'Word and LaTeX document style templates.',
    icon: HelpCircle,
    actionLabel: 'Download Zip',
    link: '#'
  },
  {
    title: 'Research Ethics',
    desc: 'Core ethical principles and authorship criteria.',
    icon: Scale,
    actionLabel: 'Read Policy',
    link: '/guidelines'
  },
  {
    title: 'Copyright & Licensing',
    desc: 'Open access licensing terms and permissions.',
    icon: Award,
    actionLabel: 'View License',
    link: '/guidelines'
  }
];

export function AuthorResources() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <h3 className="font-bold text-forest-green text-sm">{resource.title}</h3>
              <p className="text-xs text-forest-green/50 mt-1 leading-normal">{resource.desc}</p>
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
