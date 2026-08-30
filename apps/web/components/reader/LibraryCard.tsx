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
    },
    {
      title: 'Downloads',
      count: downloadsCount,
      label: downloadsCount === 1 ? 'Offline File' : 'Offline Files',
      href: '/member/downloads',
      icon: Download,
    },
    {
      title: 'Reading History',
      count: historyCount,
      label: historyCount === 1 ? 'Book Logged' : 'Books Logged',
      href: '/member/reading-history',
      icon: History,
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
            className="group rounded-3xl border border-sand/30 bg-gradient-to-br from-white via-white to-ivory/60 p-5 flex items-center justify-between shadow-card hover:shadow-lg hover:border-ochre/40 hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 rounded-2xl bg-ochre/15 text-ochre flex items-center justify-center shrink-0 border border-sand/20">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-forest-green text-sm group-hover:text-ochre transition-colors">
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
