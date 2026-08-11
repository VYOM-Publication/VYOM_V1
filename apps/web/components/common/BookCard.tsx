import Link from 'next/link';
import { BookOpen, ArrowRight, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface BookCardProps {
  id: string;
  title: string;
  author: string;
  authorId?: string;
  category: string;
  year: number;
  price?: number;
  description?: string;
}

export function BookCard({ id, title, author, authorId, category, year, price }: BookCardProps) {
  const targetAuthorId = authorId ?? 'dr-ananya-sharma';

  return (
    <div className="group flex flex-col bg-white rounded-xl shadow-card hover:shadow-card-hover hover:scale-[1.02] transition-all duration-200 overflow-hidden border border-sand/30">
      {/* Cover */}
      <div className="h-48 bg-gradient-to-br from-forest-green/10 to-forest-green/20 flex items-center justify-center shrink-0">
        <BookOpen className="h-12 w-12 text-forest-green/25" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-2">
        <Badge label={category} variant="info" className="self-start" />
        <h3 className="font-display text-caption font-semibold text-text-primary leading-snug line-clamp-2 flex-1">
          {title}
        </h3>

        {/* Clickable Author Name */}
        <Link 
          href={`/authors/${targetAuthorId}`} 
          className="text-metadata font-bold text-ochre hover:underline inline-flex items-center gap-1 w-fit"
        >
          <User className="h-3 w-3" /> {author}
        </Link>

        <div className="flex items-center justify-between mt-1">
          <span className="text-metadata text-sand">{year}</span>
          {price !== undefined && (
            <span className="text-caption font-semibold text-forest-green">₹{price}</span>
          )}
        </div>
        <Link href={`/books/${id}`} className="mt-3">
          <Button variant="primary" size="sm" className="w-full gap-1">
            View Details <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
