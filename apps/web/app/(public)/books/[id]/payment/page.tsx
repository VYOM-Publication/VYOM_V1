'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import { CATALOGUE } from '@/lib/books-data';
import { useAuthStore } from '@/lib/stores/auth.store';
import { useAuth } from '@/lib/hooks/useAuth';
import {
  ArrowLeft, CreditCard, Smartphone, Building2,
  ShieldCheck, CheckCircle, Download, BookOpen, Lock,
} from 'lucide-react';

const PAYMENT_METHODS = [
  { id: 'upi',     label: 'UPI',         icon: Smartphone,  desc: 'Pay via GPay, PhonePe, Paytm, or any UPI app' },
  { id: 'card',    label: 'Card',        icon: CreditCard,  desc: 'Credit or debit card (Visa, Mastercard, RuPay)' },
  { id: 'netbank', label: 'Net Banking', icon: Building2,   desc: 'Internet banking via your preferred bank' },
];

export default function BookPaymentPage({ params }: { params: { id: string } }) {
  const router   = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const { initAuth } = useAuth();

  const bookFound = CATALOGUE.find((b) => b.id === params.id);
  if (!bookFound || bookFound.free) notFound();
  const book = bookFound!;

  const [method, setMethod]   = useState('upi');
  const [upiId, setUpiId]     = useState('');
  const [loading, setLoading] = useState(false);
  const [paid, setPaid]       = useState(false);

  // Initialise auth on mount — skip if already authenticated in this tab.
  useEffect(() => {
    // Only call initAuth if we don't already have a session.
    // This avoids the spinner flash when navigating from an authenticated page.
    if (!useAuthStore.getState().isAuthenticated) {
      initAuth();
    } else {
      useAuthStore.getState().setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Once auth resolves, redirect unauthenticated visitors to login.
  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.replace(`/login?from=/books/${book.id}/payment`);
    }
  }, [isLoading, isAuthenticated, router, book.id]);

  // Show spinner only while the auth check is actually in-flight.
  // If already authenticated (e.g. navigated from book page while logged in),
  // render the payment form immediately without any delay.
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-forest-green/40 text-sm font-semibold uppercase tracking-widest animate-pulse">
        Checking session…
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <section className="py-24 px-6 bg-ivory">
        <div className="mx-auto max-w-md bg-white rounded-2xl border border-sand/40 p-8 shadow-card flex flex-col items-center gap-5 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ochre/10">
            <Lock className="h-7 w-7 text-ochre" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-forest-green">Login Required</h1>
            <p className="mt-2 text-sm text-forest-green/60 leading-relaxed">
              You haven&apos;t logged in yet. Please log in to your account first to make a payment and download <strong className="text-forest-green">&quot;{book.title}&quot;</strong>.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full mt-2">
            <Link
              href={`/login?from=/books/${book.id}/payment`}
              className="w-full rounded-full bg-ochre py-3 text-sm font-bold text-ivory hover:bg-ochre/90 transition-colors text-center"
            >
              Log In to Continue
            </Link>
            <Link
              href={`/books/${book.id}`}
              className="w-full rounded-full border border-sand/50 py-3 text-sm font-semibold text-forest-green/60 hover:border-forest-green hover:text-forest-green transition-colors text-center"
            >
              Back to Book Details
            </Link>
          </div>
        </div>
      </section>
    );
  }

  function handlePay() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPaid(true);
    }, 2000);
  }

  function handleGoToBook() {
    router.push(`/books/${book.id}`);
  }

  // ── Success state ──────────────────────────────────────────────────────────
  if (paid) {
    return (
      <section className="py-24 px-6 bg-ivory">
        <div className="mx-auto max-w-md flex flex-col items-center gap-6 text-center">
          <div className="rounded-full bg-green-50 p-6">
            <CheckCircle className="h-14 w-14 text-green-600" />
          </div>
          <h1 className="font-display text-3xl font-bold text-forest-green">Payment Successful!</h1>
          <p className="text-forest-green/60 leading-relaxed">
            You now have full access to <strong className="text-forest-green">"{book.title}"</strong>.
            You can download it anytime from the book page.
          </p>

          {/* Receipt summary */}
          <div className="w-full rounded-2xl border border-sand/40 bg-white p-6 flex flex-col gap-3 text-sm text-left">
            <div className="flex justify-between">
              <span className="text-forest-green/40">Book</span>
              <span className="font-medium text-forest-green text-right max-w-[60%] leading-snug">{book.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-forest-green/40">Amount Paid</span>
              <span className="font-bold text-forest-green">₹{book.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-forest-green/40">Payment Method</span>
              <span className="text-forest-green">{PAYMENT_METHODS.find(m => m.id === method)?.label}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-forest-green/40">Transaction ID</span>
              <span className="font-mono text-xs text-forest-green/50">VYOM{Date.now().toString().slice(-10)}</span>
            </div>
          </div>

          <p className="text-xs text-forest-green/30">
            Demo mode — no real payment was processed. Your purchase is saved for this session.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button
              onClick={handleGoToBook}
              className="flex-1 flex items-center justify-center gap-2 rounded-full bg-forest-green py-3 text-sm font-bold text-ivory hover:bg-forest-green/90 transition-colors"
            >
              <Download className="h-4 w-4" /> Go Back &amp; Download
            </button>
            <Link href="/books"
              className="flex-1 flex items-center justify-center gap-2 rounded-full border border-sand/50 py-3 text-sm font-bold text-forest-green/60 hover:border-forest-green hover:text-forest-green transition-colors">
              <BookOpen className="h-4 w-4" /> Browse More Books
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // ── Payment form ───────────────────────────────────────────────────────────
  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-sand/20">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center gap-2 text-xs text-forest-green/50">
          <Link href="/" className="hover:text-forest-green transition-colors">Home</Link>
          <span aria-hidden>/</span>
          <Link href="/books" className="hover:text-forest-green transition-colors">Books</Link>
          <span aria-hidden>/</span>
          <Link href={`/books/${book.id}`} className="hover:text-forest-green transition-colors line-clamp-1">{book.title}</Link>
          <span aria-hidden>/</span>
          <span className="text-forest-green">Payment</span>
        </div>
      </nav>

      <section className="py-16 px-6 bg-ivory">
        <div className="mx-auto max-w-xl flex flex-col gap-6">
          <Link href={`/books/${book.id}`}
            className="inline-flex items-center gap-2 text-sm text-forest-green/60 hover:text-forest-green transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Book
          </Link>

          <div>
            <h1 className="font-display text-3xl font-bold text-forest-green">Complete Your Purchase</h1>
            <p className="mt-1 text-sm text-forest-green/50">One-time payment for full download access</p>
          </div>

          {/* Book summary */}
          <div className="rounded-2xl border border-sand/40 bg-white p-5 flex items-center gap-4">
            <div className="h-16 w-12 rounded-lg bg-gradient-to-b from-forest-green/15 to-forest-green/30 flex items-center justify-center shrink-0">
              <BookOpen className="h-6 w-6 text-forest-green/40" aria-hidden />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-display text-base font-bold text-forest-green leading-snug truncate">{book.title}</h2>
              <p className="text-xs text-forest-green/50 mt-0.5">{book.author} · {book.pages} pages</p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-display text-xl font-bold text-ochre">₹{book.price}</p>
              <p className="text-xs text-forest-green/30 line-through">₹{Math.round(book.price * 1.2)}</p>
            </div>
          </div>

          {/* Payment method */}
          <div className="rounded-2xl border border-sand/40 bg-white p-6 flex flex-col gap-4">
            <h3 className="font-display text-lg font-bold text-forest-green">Payment Method</h3>
            <div className="flex flex-col gap-3">
              {PAYMENT_METHODS.map(({ id, label, icon: Icon, desc }) => (
                <button key={id} onClick={() => setMethod(id)}
                  className={`flex items-center gap-4 rounded-xl border px-5 py-4 text-left transition-colors ${
                    method === id ? 'border-ochre bg-ochre/5' : 'border-sand/40 hover:border-sand'
                  }`}>
                  <Icon className={`h-5 w-5 shrink-0 ${method === id ? 'text-ochre' : 'text-forest-green/40'}`} aria-hidden />
                  <div className="flex-1">
                    <p className={`text-sm font-bold ${method === id ? 'text-ochre' : 'text-forest-green'}`}>{label}</p>
                    <p className="text-xs text-forest-green/50 mt-0.5">{desc}</p>
                  </div>
                  <div className={`h-4 w-4 rounded-full border-2 shrink-0 ${method === id ? 'border-ochre bg-ochre' : 'border-sand/50'}`} />
                </button>
              ))}
            </div>

            {/* UPI input */}
            {method === 'upi' && (
              <div className="flex flex-col gap-1.5 mt-1">
                <label htmlFor="upiId" className="text-xs font-bold uppercase tracking-widest text-forest-green/40">UPI ID *</label>
                <input id="upiId" value={upiId} onChange={e => setUpiId(e.target.value)}
                  placeholder="e.g. yourname@upi or 9XXXXXXXXX@paytm"
                  className="rounded-xl border border-sand/40 px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre transition-colors" />
                <p className="text-xs text-forest-green/30">Demo — no real payment processed</p>
              </div>
            )}

            {method === 'card' && (
              <div className="flex flex-col gap-3 mt-1">
                {[
                  { key: 'num',  label: 'Card Number',      placeholder: '4111 1111 1111 1111' },
                  { key: 'name', label: 'Cardholder Name',  placeholder: 'As on card' },
                ].map(({ key, label, placeholder }) => (
                  <label key={key} className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-widest text-forest-green/40">{label}</span>
                    <input placeholder={placeholder}
                      className="rounded-xl border border-sand/40 px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre transition-colors" />
                  </label>
                ))}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Expiry', placeholder: 'MM / YY' },
                    { label: 'CVV',    placeholder: '•••' },
                  ].map(({ label, placeholder }) => (
                    <label key={label} className="flex flex-col gap-1.5">
                      <span className="text-xs font-bold uppercase tracking-widest text-forest-green/40">{label}</span>
                      <input placeholder={placeholder}
                        className="rounded-xl border border-sand/40 px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre transition-colors" />
                    </label>
                  ))}
                </div>
                <p className="text-xs text-forest-green/30">Demo — no real card details stored</p>
              </div>
            )}

            {method === 'netbank' && (
              <div className="flex flex-col gap-1.5 mt-1">
                <label htmlFor="bank" className="text-xs font-bold uppercase tracking-widest text-forest-green/40">Select Bank</label>
                <select id="bank" className="rounded-xl border border-sand/40 px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre transition-colors">
                  {['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank', 'Bank of Baroda'].map(b => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
                <p className="text-xs text-forest-green/30">Demo — no real bank redirect</p>
              </div>
            )}
          </div>

          {/* Security note */}
          <div className="flex items-center gap-3 text-xs text-forest-green/40">
            <ShieldCheck className="h-4 w-4 shrink-0 text-green-500" aria-hidden />
            Demo mode — all payment data is simulated. No real transaction will occur.
          </div>

          {/* Pay button */}
          <button
            onClick={handlePay}
            disabled={loading || (method === 'upi' && !upiId.trim())}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-ochre py-4 text-sm font-bold text-ivory hover:bg-ochre/90 disabled:opacity-40 transition-colors"
          >
            {loading ? (
              <><span className="h-4 w-4 border-2 border-ivory border-t-transparent rounded-full animate-spin" /> Processing…</>
            ) : (
              <>Pay ₹{book.price} &amp; Unlock Download</>
            )}
          </button>
        </div>
      </section>
    </>
  );
}
