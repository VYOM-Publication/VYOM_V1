'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    
    // Redirect to public books/catalogue page with query parameters
    // TODO Phase 8: Integrate backend API search endpoint GET /api/v1/search?q=query
    router.push(`/books?query=${encodeURIComponent(query.trim())}`);
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center max-w-[140px] xl:max-w-[160px]">
      <div className="absolute left-2.5 pointer-events-none">
        <Search className="h-3 w-3 text-forest-green/40" />
      </div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        aria-label="Search books"
        className="w-full text-xs pl-7 pr-2.5 py-1.5 rounded-full border border-sand/50 bg-white/80 placeholder:text-forest-green/30 text-forest-green focus:outline-none focus:border-ochre/60 focus:ring-1 focus:ring-ochre/15 transition-all"
      />
    </form>
  );
}
