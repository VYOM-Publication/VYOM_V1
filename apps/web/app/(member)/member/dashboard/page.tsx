'use client';

import { useDemoAuth } from '@/lib/demo-auth';
import { BookOpen, Bookmark, Download, Clock } from 'lucide-react';
import { DEMO_READING_HISTORY, DEMO_BOOKMARKS, DEMO_DOWNLOADS } from '@/lib/demo-data';
import { SectionHeader } from '@/components/reader/SectionHeader';
import { ReaderHero } from '@/components/reader/ReaderHero';
import { ContinueReadingSection } from '@/components/reader/ContinueReadingSection';
import { LibraryCard } from '@/components/reader/LibraryCard';
import { RecommendationSection } from '@/components/reader/RecommendationSection';
import { CategorySection } from '@/components/reader/CategorySection';
import { ReadingProgressCard } from '@/components/reader/ReadingProgressCard';
import { CompactStatCard } from '@/components/reader/CompactStatCard';

export default function MemberDashboardPage() {
  const { session } = useDemoAuth();

  const inProgress = DEMO_READING_HISTORY.filter(r => r.progress < 100);
  const primaryBook = inProgress[0];
  const otherInProgress = inProgress.slice(1);

  const booksReadCount = DEMO_READING_HISTORY.filter(r => r.progress === 100).length;

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
      {/* 1. Welcome Header */}
      <ReaderHero name={session?.name ?? 'Reader'} />

      {/* 2. Primary Hero Continue Reading */}
      <ContinueReadingSection book={primaryBook} />

      {/* 3. My Library Links */}
      <LibraryCard 
        bookmarksCount={DEMO_BOOKMARKS.length}
        downloadsCount={DEMO_DOWNLOADS.length}
        historyCount={DEMO_READING_HISTORY.length}
      />

      {/* 4. Recommendation Section */}
      <section className="mb-12" aria-label="Book Recommendations">
        <SectionHeader 
          label="Tailored Selection"
          title="Recommended For You" 
          linkHref="/books"
          linkLabel="Explore All"
        />
        <RecommendationSection limit={3} />
      </section>

      {/* 5. Browse by Category */}
      <section className="mb-12" aria-label="Categories">
        <SectionHeader 
          label="Discover"
          title="Browse by Category" 
        />
        <CategorySection />
      </section>

      {/* 6. Other In-Progress Books */}
      {otherInProgress.length > 0 && (
        <section className="mb-12" aria-label="In-progress Reading List">
          <SectionHeader 
            label="In Progress"
            title="Continue Reading" 
            linkHref="/member/reading-history"
            linkLabel="View History"
          />
          <div className="flex flex-col gap-3">
            {otherInProgress.map(book => (
              <ReadingProgressCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      )}

      {/* 7. Reading Insights Stats */}
      <section className="border-t border-sand/30 pt-10" aria-label="Reading Analytics">
        <SectionHeader 
          label="Your Insights"
          title="Reading Activity" 
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <CompactStatCard label="Books Completed" value={booksReadCount} icon={BookOpen} />
          <CompactStatCard label="Hours Spent Reading" value="24.5h" icon={Clock} />
          <CompactStatCard label="Active Bookmarks" value={DEMO_BOOKMARKS.length} icon={Bookmark} />
          <CompactStatCard label="Total Downloads" value={DEMO_DOWNLOADS.length} icon={Download} />
        </div>
      </section>
    </main>
  );
}
