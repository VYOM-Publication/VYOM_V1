import Link from 'next/link';
import { BookOpen, Compass, Award, FileText, Atom } from 'lucide-react';

const CATEGORY_ITEMS = [
  {
    name: 'Academic',
    slug: 'ACADEMIC',
    icon: BookOpen,
    desc: 'Scholarly papers and research methods',
  },
  {
    name: 'Fiction',
    slug: 'FICTION',
    icon: Compass,
    desc: 'Novels and storytelling works',
  },
  {
    name: 'Literature',
    slug: 'LITERATURE',
    icon: Award,
    desc: 'Classical and contemporary reviews',
  },
  {
    name: 'Non-Fiction',
    slug: 'NON-FICTION',
    icon: FileText,
    desc: 'Economic analysis and philosophies',
  },
  {
    name: 'Science & Tech',
    slug: 'SCIENCE & TECHNOLOGY',
    icon: Atom,
    desc: 'Quantum computing and applied sciences',
  }
];

export function CategorySection() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {CATEGORY_ITEMS.map(cat => {
        const Icon = cat.icon;
        return (
          <Link
            key={cat.slug}
            href={`/books?category=${encodeURIComponent(cat.slug)}`}
            className="group rounded-3xl border border-sand/30 bg-gradient-to-br from-white via-white to-ivory/50 p-5 flex flex-col gap-3 shadow-card hover:shadow-lg hover:border-ochre/40 hover:-translate-y-0.5 transition-all"
          >
            <div className="h-10 w-10 rounded-2xl bg-ochre/15 text-ochre flex items-center justify-center shrink-0 border border-sand/20 group-hover:bg-ochre group-hover:text-ivory transition-colors">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-forest-green text-sm group-hover:text-ochre transition-colors">
                {cat.name}
              </h3>
              <p className="text-[10px] text-forest-green/45 leading-snug mt-1 font-medium">
                {cat.desc}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
