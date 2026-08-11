import Link from 'next/link';
import { BookOpen, Compass, Award, FileText, Atom } from 'lucide-react';

const CATEGORY_ITEMS = [
  {
    name: 'Academic',
    slug: 'ACADEMIC',
    icon: BookOpen,
    desc: 'Scholarly papers and research methods',
    gradient: 'from-blue-50 to-blue-100/50 text-blue-700 border-blue-100',
    iconBg: 'bg-blue-600/10 text-blue-600'
  },
  {
    name: 'Fiction',
    slug: 'FICTION',
    icon: Compass,
    desc: 'Novels and storytelling works',
    gradient: 'from-amber-50 to-amber-100/50 text-amber-700 border-amber-100',
    iconBg: 'bg-amber-600/10 text-amber-600'
  },
  {
    name: 'Literature',
    slug: 'LITERATURE',
    icon: Award,
    desc: 'Classical and contemporary reviews',
    gradient: 'from-emerald-50 to-emerald-100/50 text-emerald-700 border-emerald-100',
    iconBg: 'bg-emerald-600/10 text-emerald-600'
  },
  {
    name: 'Non-Fiction',
    slug: 'NON-FICTION',
    icon: FileText,
    desc: 'Economic analysis and philosophies',
    gradient: 'from-rose-50 to-rose-100/50 text-rose-700 border-rose-100',
    iconBg: 'bg-rose-600/10 text-rose-600'
  },
  {
    name: 'Science & Tech',
    slug: 'SCIENCE & TECHNOLOGY',
    icon: Atom,
    desc: 'Quantum computing and applied sciences',
    gradient: 'from-indigo-50 to-indigo-100/50 text-indigo-700 border-indigo-100',
    iconBg: 'bg-indigo-600/10 text-indigo-600'
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
            className={`group rounded-2xl border p-5 flex flex-col gap-3 hover:shadow-card hover:-translate-y-0.5 transition-all bg-white`}
          >
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${cat.iconBg} group-hover:bg-ochre group-hover:text-ivory`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-forest-green text-sm group-hover:text-ochre transition-colors">
                {cat.name}
              </h3>
              <p className="text-[10px] text-forest-green/40 leading-normal mt-0.5">
                {cat.desc}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
