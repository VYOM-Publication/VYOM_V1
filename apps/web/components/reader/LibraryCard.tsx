import Link from 'next/link';
import { Bookmark, Download, History, ArrowRight } from 'lucide-react';

interface LibraryCardProps {
  bookmarksCount: number;
  downloadsCount: number;
  historyCount: number;
}

export function LibraryCard({ bookmarksCount, downloadsCount, historyCount }: LibraryCardProps) {
  const cards = [
    {
      title: 'Bookmarks',
      count: bookmarksCount,
      label: bookmarksCount === 1 ? 'Saved Title' : 'Saved Titles',
      href: '/member/bookmarks',
      icon: Bookmark,
      color: 'bg-amber-50 text-amber-700 hover:border-amber-200 border-sand/40',
      iconBg: 'bg-amber-100 text-amber-700'
    },
    {
      title: 'Downloads',
      count: downloadsCount,
      label: downloadsCount === 1 ? 'Offline File' : 'Offline Files',
      href: '/member/downloads',
      icon: Download,
      color: 'bg-teal-50 text-teal-700 hover:border-teal-200 border-sand/40',
      iconBg: 'bg-teal-100 text-teal-700'
    },
    {
      title: 'Reading History',
      count: historyCount,
      label: historyCount === 1 ? 'Book Logged' : 'Books Logged',
      href: '/member/reading-history',
      icon: History,
      color: 'bg-blue-50 text-blue-700 hover:border-blue-200 border-sand/40',
      iconBg: 'bg-blue-100 text-blue-700'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
      {cards.map(card => {
        const Icon = card.icon;
        return (
          <Link
            key={card.title}
            href={card.href}
            className={`group rounded-2xl border bg-white p-5 flex items-center justify-between hover:shadow-card hover:-translate-y-0.5 transition-all ${card.color}`}
          >
            <div className="flex items-center gap-4">
              <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-forest-green text-sm">
                  {card.title}
                </h3>
                <p className="text-xs text-forest-green/50 mt-0.5">
                  {card.count} {card.label}
                </p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-forest-green/30 group-hover:text-ochre group-hover:translate-x-0.5 transition-all" />
          </Link>
        );
      })}
    </div>
  );
}
