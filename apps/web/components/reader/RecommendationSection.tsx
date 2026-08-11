import { BookCard } from '@/components/common/BookCard';
import { CATALOGUE } from '@/lib/books-data';

interface RecommendationSectionProps {
  limit?: number;
}

export function RecommendationSection({ limit = 3 }: RecommendationSectionProps) {
  // Grab high rated books for personalized recommendations
  const recommended = CATALOGUE.filter(b => b.rating >= 4.7).slice(0, limit);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recommended.map(book => (
        <BookCard
          key={book.id}
          id={book.id}
          title={book.title}
          author={book.author}
          category={book.category}
          year={book.year}
          price={book.price}
          description={book.description}
        />
      ))}
    </div>
  );
}
