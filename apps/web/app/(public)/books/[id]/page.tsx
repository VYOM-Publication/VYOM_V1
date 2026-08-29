'use client';

// TODO: Replace demo data with GET /api/v1/books/:id once backend credentials are available.

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { BookCard } from '@/components/common/BookCard';
import { CATALOGUE } from '@/lib/books-data';
import { useAuthStore } from '@/lib/stores/auth.store';
import {
  BookOpen, User, Calendar, Tag, Star,
  CheckCircle, ArrowLeft, Download, Eye,
  Share2, Lock, ArrowRight, X, Check,
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
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const bookFound = CATALOGUE.find((b) => b.id === params.id);
  if (!bookFound) notFound();
  const book = bookFound!;

  const related = CATALOGUE
    .filter((b) => b.category === book.category && b.id !== book.id)
    .slice(0, 4);

  const [previewOpen, setPreviewOpen]         = useState(false);
  const [paymentConfirm, setPaymentConfirm]   = useState(false);
  const [authModalOpen, setAuthModalOpen]     = useState(false);
  const [shareToast, setShareToast]           = useState(false);
  const [downloadToast, setDownloadToast]     = useState(false);

  // Check if this book has been purchased (stored in localStorage in demo)
  const purchaseKey = `vyom-book-purchased-${book.id}`;
  const [isPurchased, setIsPurchased] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem(purchaseKey);
  });

  function handleShare() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2500);
    });
  }

  function handleDownload() {
    if (book.free || isPurchased) {
      // Demo — no real file, just show a toast
      setDownloadToast(true);
      setTimeout(() => setDownloadToast(false), 3000);
    } else if (!isAuthenticated) {
      // Prompt user to login first before payment
      setAuthModalOpen(true);
    } else {
      // Show payment confirmation modal
      setPaymentConfirm(true);
    }
  }

  function handlePaymentProceed() {
    setPaymentConfirm(false);
    if (!isAuthenticated) {
      router.push(`/login?from=/books/${book.id}/payment`);
      return;
    }
    router.push(`/books/${book.id}/payment`);
  }

  return (
    <>
      {/* Toast notifications */}
      {shareToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-forest-green text-ivory px-5 py-3 text-sm font-semibold shadow-card-hover animate-fade-in">
          <Check className="h-4 w-4 text-ochre" /> Link copied to clipboard
        </div>
      )}
      {downloadToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-forest-green text-ivory px-5 py-3 text-sm font-semibold shadow-card-hover animate-fade-in">
          <Download className="h-4 w-4 text-ochre" /> Download started — demo mode
        </div>
      )}

      {/* Auth required modal */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6"
          role="dialog" aria-modal="true" aria-label="Login required">
          <div className="bg-white rounded-2xl border border-sand/40 shadow-card-hover p-8 max-w-sm w-full flex flex-col gap-5">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ochre/10">
                <Lock className="h-6 w-6 text-ochre" />
              </div>
              <button onClick={() => setAuthModalOpen(false)}
                className="text-forest-green/30 hover:text-forest-green transition-colors"
                aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-forest-green">Login Required</h2>
              <p className="mt-2 text-sm text-forest-green/60 leading-relaxed">
                You haven&apos;t logged in yet. You need to log in first to make a payment and download <strong className="text-forest-green">&quot;{book.title}&quot;</strong>.
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setAuthModalOpen(false)}
                className="flex-1 rounded-full border border-sand/50 py-2.5 text-sm font-semibold text-forest-green/60 hover:border-forest-green hover:text-forest-green transition-colors">
                Cancel
              </button>
              <button onClick={() => { setAuthModalOpen(false); router.push(`/login?from=/books/${book.id}/payment`); }}
                className="flex-1 rounded-full bg-ochre py-2.5 text-sm font-semibold text-ivory hover:bg-ochre/90 transition-colors">
                Log In Now →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment confirmation modal */}
      {paymentConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6"
          role="dialog" aria-modal="true" aria-label="Purchase confirmation">
          <div className="bg-white rounded-2xl border border-sand/40 shadow-card-hover p-8 max-w-sm w-full flex flex-col gap-5">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ochre/10">
                <Lock className="h-6 w-6 text-ochre" />
              </div>
              <button onClick={() => setPaymentConfirm(false)}
                className="text-forest-green/30 hover:text-forest-green transition-colors"
                aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-forest-green">Purchase Required</h2>
              <p className="mt-2 text-sm text-forest-green/60 leading-relaxed">
                <strong className="text-forest-green">&quot;{book.title}&quot;</strong> requires a one-time payment of{' '}
                <strong className="text-ochre">₹{book.price}</strong> to download.
                Would you like to continue to the payment page?
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setPaymentConfirm(false)}
                className="flex-1 rounded-full border border-sand/50 py-2.5 text-sm font-semibold text-forest-green/60 hover:border-forest-green hover:text-forest-green transition-colors">
                Cancel
              </button>
              <button onClick={handlePaymentProceed}
                className="flex-1 rounded-full bg-ochre py-2.5 text-sm font-semibold text-ivory hover:bg-ochre/90 transition-colors">
                Yes, Proceed →
              </button>
            </div>
          </div>
        </div>
      )}

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
      <section className="py-16 px-6 bg-ivory">
        <div className="mx-auto max-w-7xl">
          <Link href="/books" className="inline-flex items-center gap-2 text-sm text-forest-green/60 hover:text-forest-green transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Books
          </Link>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left: Cover + actions */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              {/* Cover */}
              <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-forest-green/10 to-forest-green/25 aspect-[3/4] flex items-center justify-center">
                <div className="text-center px-8">
                  <BookOpen className="h-20 w-20 text-forest-green/25 mx-auto mb-4" aria-hidden />
                  <p className="font-display text-lg text-forest-green/40">VYOM</p>
                </div>
              </div>

              {/* Action card */}
              <div className="rounded-xl border border-sand/30 bg-white p-6 flex flex-col gap-4">
                {/* Price / Free badge */}
                <div className="flex items-baseline gap-3">
                  {book.free ? (
                    <span className="font-display text-2xl font-bold text-green-600">Free</span>
                  ) : isPurchased ? (
                    <div className="flex items-center gap-2">
                      <span className="font-display text-2xl font-bold text-forest-green">₹{book.price}</span>
                      <span className="rounded-full bg-green-50 border border-green-200 px-2.5 py-0.5 text-xs font-bold text-green-600">Purchased</span>
                    </div>
                  ) : (
                    <>
                      <span className="font-display text-3xl font-bold text-forest-green">₹{book.price}</span>
                      <span className="text-sm text-forest-green/40 line-through">₹{Math.round(book.price * 1.2)}</span>
                      <Badge label="17% off" variant="success" />
                    </>
                  )}
                </div>

                {/* Download button */}
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-forest-green py-3 text-sm font-bold text-ivory hover:bg-forest-green/90 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  {book.free || isPurchased ? 'Download' : `Download — ₹${book.price}`}
                </button>

                {/* Preview button */}
                <button
                  onClick={() => setPreviewOpen(!previewOpen)}
                  className="w-full flex items-center justify-center gap-2 rounded-full border border-ochre/40 py-3 text-sm font-bold text-ochre hover:bg-ochre/5 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  {previewOpen ? 'Close Preview' : 'Preview'}
                </button>

                {/* Share */}
                <div className="relative">
                  <button
                    onClick={handleShare}
                    className="w-full flex items-center justify-center gap-2 text-sm text-forest-green/50 hover:text-forest-green transition-colors py-1"
                  >
                    <Share2 className="h-4 w-4" /> Share this book
                  </button>
                </div>
              </div>

              {/* Book meta */}
              <div className="rounded-xl border border-sand/30 bg-white p-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-forest-green/40 mb-4">Book Details</h3>
                <dl className="flex flex-col gap-3">
                  {[
                    { icon: User,     label: 'Author',   value: book.author },
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
                <div className="flex items-center gap-3 mb-3">
                  <Badge label={book.category} variant="info" />
                  {book.free ? (
                    <span className="rounded-full bg-green-50 border border-green-200 px-3 py-0.5 text-xs font-bold text-green-600">Open Access</span>
                  ) : (
                    <span className="rounded-full bg-ochre/10 border border-ochre/30 px-3 py-0.5 text-xs font-bold text-ochre">Premium</span>
                  )}
                </div>
                <h1 className="font-display text-4xl font-bold text-forest-green leading-tight">{book.title}</h1>
                <p className="mt-2 text-base text-forest-green/60">by {book.author}</p>
                <div className="mt-3 flex items-center gap-4 flex-wrap">
                  <StarRating rating={book.rating} />
                  <span className="text-sm text-forest-green/50">{book.reviews} reviews</span>
                  <span className="text-sm text-forest-green/30">·</span>
                  <span className="text-sm text-forest-green/50">{book.pages} pages</span>
                </div>
              </div>

              {/* Preview panel — shown when preview is open */}
              {previewOpen && (
                <div className="rounded-2xl border border-ochre/30 bg-ochre/5 overflow-hidden">
                  <div className="px-6 py-4 border-b border-ochre/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-ochre" />
                      <span className="text-sm font-bold text-ochre uppercase tracking-widest">Preview — First Pages</span>
                    </div>
                    <button onClick={() => setPreviewOpen(false)} className="text-ochre/50 hover:text-ochre transition-colors" aria-label="Close preview">
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Preview text — 1–2 pages worth */}
                  <div className="px-6 py-6">
                    <p className="text-sm text-forest-green/80 leading-relaxed font-body">
                      {book.previewText}
                    </p>

                    {/* Blurred continuation + gate */}
                    <div className="relative mt-4">
                      <p className="text-sm text-forest-green/60 leading-relaxed select-none blur-sm pointer-events-none" aria-hidden>
                        The analysis continues in subsequent chapters with an examination of primary source materials drawn from archives across four countries. The methodology employed combines close textual reading with quantitative corpus analysis, allowing for both interpretive depth and empirical breadth. Chapter three introduces the theoretical framework that will organise the remainder of the study, drawing on recent scholarship to develop an original analytical model...
                      </p>
                      {/* Overlay gate */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-ochre/5 to-transparent rounded-xl">
                        <div className="text-center px-6 py-4">
                          {book.free ? (
                            <div className="flex flex-col items-center gap-3">
                              <p className="text-sm font-semibold text-forest-green">This book is free to read in full.</p>
                              <button
                                onClick={handleDownload}
                                className="inline-flex items-center gap-2 rounded-full bg-ochre px-6 py-2.5 text-sm font-bold text-ivory hover:bg-ochre/90 transition-colors"
                              >
                                <Download className="h-4 w-4" /> Read More — Download Free
                              </button>
                            </div>
                          ) : isPurchased ? (
                            <div className="flex flex-col items-center gap-3">
                              <p className="text-sm font-semibold text-forest-green">You own this book.</p>
                              <button
                                onClick={handleDownload}
                                className="inline-flex items-center gap-2 rounded-full bg-forest-green px-6 py-2.5 text-sm font-bold text-ivory hover:bg-forest-green/90 transition-colors"
                              >
                                <Download className="h-4 w-4" /> Download Full Book
                              </button>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-3">
                              <Lock className="h-8 w-8 text-ochre mx-auto" />
                              <p className="text-sm font-bold text-forest-green">Full content requires purchase</p>
                              <p className="text-xs text-forest-green/60">Purchase this book for ₹{book.price} to access the complete content.</p>
                              <button
                                onClick={handlePaymentProceed}
                                className="inline-flex items-center gap-2 rounded-full bg-ochre px-6 py-2.5 text-sm font-bold text-ivory hover:bg-ochre/90 transition-colors"
                              >
                                Purchase &amp; Read — ₹{book.price} <ArrowRight className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

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
