'use client';

// TODO: Replace demo data with GET /api/v1/books/:id once backend credentials are available.

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookCard } from '@/components/common/BookCard';
import { CATALOGUE } from '@/lib/books-data';
import {
  BookOpen, User, Calendar, Tag, Star,
  CheckCircle, ArrowLeft, ShoppingCart, Share2,
} from 'lucide-react';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`h-4 w-4 ${s <= Math.round(rating) ? 'text-ochre fill-ochre' : 'text-sand'}`} />
      ))}
      <span className="ml-1 text-xs font-semibold text-forest-green">{rating}</span>
    </div>
  );
}

export default function BookDetailPage({ params }: { params: { id: string } }) {
  const book = CATALOGUE.find((b) => b.id === params.id);
  if (!book) notFound();

  const related = CATALOGUE
    .filter((b) => b.category === book.category && b.id !== book.id)
    .slice(0, 4);

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-sand/20">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center gap-2 text-xs text-forest-green/50">
          <Link href="/" className="hover:text-forest-green transition-colors">Home</Link>
          <span aria-hidden>/</span>
          <Link href="/books" className="hover:text-forest-green transition-colors">Books</Link>
          <span aria-hidden>/</span>
          <span className="text-forest-green line-clamp-1">{book.title}</span>
        </div>
      </nav>

      {/* Main */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-7xl">
          <Link href="/books" className="inline-flex items-center gap-2 text-sm text-forest-green/60 hover:text-forest-green transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Books
          </Link>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left: Cover + meta */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-forest-green/10 to-forest-green/25 aspect-[3/4] flex items-center justify-center">
                <div className="text-center px-8">
                  <BookOpen className="h-20 w-20 text-forest-green/25 mx-auto mb-4" aria-hidden />
                  <p className="font-display text-lg text-forest-green/40">VYOM</p>
                </div>
              </div>

              {/* Price + CTA */}
              <div className="rounded-xl border border-sand/30 bg-white p-6 flex flex-col gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold text-forest-green">₹{book.price}</span>
                  <span className="text-sm text-forest-green/40 line-through">₹{Math.round(book.price * 1.2)}</span>
                  <Badge label="17% off" variant="success" />
                </div>
                <Button variant="primary" size="lg" className="w-full gap-2">
                  <ShoppingCart className="h-4 w-4" /> Buy Now
                </Button>
                <Button variant="secondary" size="lg" className="w-full">
                  Add to Wishlist
                </Button>
                <button className="flex items-center justify-center gap-2 text-sm text-forest-green/50 hover:text-forest-green transition-colors">
                  <Share2 className="h-4 w-4" /> Share this book
                </button>
              </div>

              {/* Book meta */}
              <div className="rounded-xl border border-sand/30 bg-white p-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-forest-green/40 mb-4">Book Details</h3>
                <dl className="flex flex-col gap-3">
                  {[
                    { 
                      icon: User,     
                      label: 'Author',   
                      value: (
                        <Link href="/authors/dr-ananya-sharma" className="text-ochre hover:underline font-bold">
                          {book.author}
                        </Link>
                      ) 
                    },
                    { icon: Calendar, label: 'Year',     value: String(book.year) },
                    { icon: Tag,      label: 'Category', value: book.category },
                    { icon: BookOpen, label: 'Pages',    value: String(book.pages) },
                    { icon: BookOpen, label: 'ISBN',     value: book.isbn },
                    { icon: BookOpen, label: 'Language', value: book.language },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <Icon className="h-4 w-4 text-forest-green/40 mt-0.5 shrink-0" aria-hidden />
                      <div>
                        <dt className="text-xs text-forest-green/40">{label}</dt>
                        <dd className="text-sm text-forest-green font-medium">{value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Right: Content */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div>
                <Badge label={book.category} variant="info" className="mb-3" />
                <h1 className="font-display text-4xl font-bold text-forest-green leading-tight">{book.title}</h1>
                <p className="mt-2 text-base text-forest-green/60">by {book.author}</p>
                <div className="mt-3 flex items-center gap-4 flex-wrap">
                  <StarRating rating={book.rating} />
                  <span className="text-sm text-forest-green/50">{book.reviews} reviews</span>
                  <span className="text-sm text-forest-green/30">·</span>
                  <span className="text-sm text-forest-green/50">{book.pages} pages</span>
                </div>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-forest-green mb-3">About This Book</h2>
                <p className="text-base text-forest-green/70 leading-relaxed">{book.description}</p>
              </div>

              <div className="rounded-xl border border-forest-green/15 bg-forest-green/[0.03] p-6">
                <h2 className="font-display text-xl font-bold text-forest-green mb-4">Key Highlights</h2>
                <ul className="flex flex-col gap-3">
                  {book.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" aria-hidden />
                      <span className="text-sm text-forest-green/70">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Author card */}
              <div className="rounded-xl border border-sand/30 bg-white p-6 flex items-start gap-5">
                <div className="h-14 w-14 rounded-full bg-ochre/20 flex items-center justify-center shrink-0">
                  <span className="font-display text-sm font-bold text-ochre">
                    {book.author.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-ochre mb-1">About the Author</p>
                  <h3 className="font-display text-base font-bold text-forest-green">{book.author}</h3>
                  <p className="mt-2 text-sm text-forest-green/60 leading-relaxed">
                    A distinguished scholar and researcher, {book.author} has contributed significantly
                    to the field of {book.category.toLowerCase()}. Their work is widely cited and
                    recognised across academic institutions in India and internationally.
                  </p>
                </div>
              </div>

              {/* Publish CTA */}
              <div className="rounded-xl bg-forest-green p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-base font-bold text-ivory">Are you an author?</h3>
                  <p className="mt-1 text-sm text-ivory/60">Submit your manuscript and join our growing catalogue.</p>
                </div>
                <Link href="/register?role=author" className="shrink-0 rounded-full bg-ochre px-6 py-2.5 text-sm font-bold text-ivory hover:bg-ochre/90 transition-colors whitespace-nowrap">
                  Publish With Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related books */}
      {related.length > 0 && (
        <section className="py-16 px-6 bg-sand/10 border-t border-sand/30">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-display text-2xl font-bold text-forest-green">Related Books</h2>
              <Link href={`/books?category=${encodeURIComponent(book.category)}`}
                className="text-sm text-ochre hover:underline">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((b) => (
                <BookCard key={b.id} {...b} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
