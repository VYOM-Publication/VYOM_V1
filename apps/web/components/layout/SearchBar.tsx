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
    <form onSubmit={handleSubmit} className="relative flex items-center max-w-[180px] xl:max-w-[220px]">
      <div className="absolute left-3 pointer-events-none">
        <Search className="h-3.5 w-3.5 text-forest-green/45" />
      </div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search catalogue..."
        className="w-full text-xs pl-8 pr-3 py-1.5 rounded-full border border-sand/50 bg-white placeholder:text-forest-green/35 text-forest-green focus:outline-none focus:border-ochre/70 focus:ring-1 focus:ring-ochre/20 transition-all"
      />
    </form>
  );
}
