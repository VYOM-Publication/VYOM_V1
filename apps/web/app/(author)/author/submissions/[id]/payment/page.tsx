'use client';

// TODO: Replace demo data with GET /api/v1/submissions/:id and POST /api/v1/payments/initiate once backend credentials are available.

import { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/common/PageHeader';
import { DEMO_SUBMISSIONS } from '@/lib/demo-data';
import { ArrowLeft, CheckCircle, CreditCard, Smartphone, Building2, ShieldCheck } from 'lucide-react';

const PAYMENT_METHODS = [
  { id: 'upi',     label: 'UPI',         icon: Smartphone,  desc: 'Pay via any UPI app (GPay, PhonePe, Paytm)' },
  { id: 'card',    label: 'Card',        icon: CreditCard,  desc: 'Credit or debit card (Visa, Mastercard, RuPay)' },
  { id: 'netbank', label: 'Net Banking', icon: Building2,   desc: 'Internet banking via your preferred bank' },
];

export default function PaymentPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const submission = DEMO_SUBMISSIONS.find(s => s.id === id) ?? DEMO_SUBMISSIONS[2]; // default to ACCEPTED one

  const [method, setMethod]   = useState('upi');
  const [upiId, setUpiId]     = useState('');
  const [paid, setPaid]       = useState(false);
  const [loading, setLoading] = useState(false);

  const APC = 8500;

  function handlePay() {
    if (!upiId && method === 'upi') return;
    setLoading(true);
    // Simulate payment gateway delay
    setTimeout(() => {
      setLoading(false);
      setPaid(true);
    }, 1800);
  }

  if (paid) {
    return (
      <>
        <PageHeader title="Payment Complete" role="author" />
        <main className="flex-1 flex flex-col items-center justify-center gap-6 px-8 py-16 text-center">
          <div className="rounded-full bg-green-50 p-5">
            <CheckCircle className="h-14 w-14 text-green-600" />
          </div>
          <h2 className="font-display text-2xl font-bold text-forest-green">Payment Successful!</h2>
          <p className="text-sm text-forest-green/60 max-w-sm leading-relaxed">
            Your publication fee of <strong className="text-forest-green">₹{APC.toLocaleString('en-IN')}</strong> for{' '}
            <strong className="text-forest-green">{submission.id}</strong> has been received.
            Your article will be scheduled for publication in the next available issue.
          </p>
          <div className="rounded-2xl border border-sand/40 bg-white px-8 py-5 flex flex-col gap-2 text-sm w-full max-w-sm">
            <div className="flex justify-between">
              <span className="text-forest-green/40">Invoice No.</span>
              <span className="font-bold text-forest-green">INV-{new Date().getFullYear()}-{Math.floor(Math.random() * 9000 + 1000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-forest-green/40">Amount Paid</span>
              <span className="font-bold text-forest-green">₹{APC.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-forest-green/40">Method</span>
              <span className="text-forest-green">{PAYMENT_METHODS.find(m => m.id === method)?.label}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-forest-green/40">Transaction ID</span>
              <span className="font-mono text-xs text-forest-green/60">VYOM{Date.now().toString().slice(-10)}</span>
            </div>
          </div>
          <p className="text-xs text-forest-green/30 max-w-sm">
            A confirmation email has been sent to {submission.authorEmail}.
            (Demo mode — no real email sent.)
          </p>
          <div className="flex gap-3">
            <Link href="/author/publications"
              className="rounded-full bg-ochre px-6 py-3 text-sm font-bold text-ivory hover:bg-ochre/90 transition-colors">
              View My Publications
            </Link>
            <Link href="/author/submissions"
              className="rounded-full border border-sand/50 px-6 py-3 text-sm font-bold text-forest-green hover:border-forest-green transition-colors">
              Back to Submissions
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Publication Fee Payment"
        subtitle={submission.id}
        role="author"
        backLink={`/author/submissions/${id}`}
      />

      <main className="flex-1 px-8 py-6 max-w-2xl mx-auto w-full flex flex-col gap-5">
        {/* Invoice summary */}
        <div className="rounded-2xl border border-sand/40 bg-white p-6 flex flex-col gap-4">
          <h2 className="font-display text-lg font-bold text-forest-green">Invoice Summary</h2>
          <div className="flex flex-col gap-3 text-sm border-b border-sand/20 pb-4">
            <div className="flex justify-between">
              <span className="text-forest-green/60">Manuscript</span>
              <span className="font-medium text-forest-green text-right max-w-[60%] leading-snug">{submission.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-forest-green/60">Journal</span>
              <span className="text-forest-green">{submission.journal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-forest-green/60">Article Processing Charge (APC)</span>
              <span className="text-forest-green">₹{APC.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-forest-green/60">GST (Exempt)</span>
              <span className="text-forest-green">₹0</span>
            </div>
          </div>
          <div className="flex justify-between text-base font-bold text-forest-green">
            <span>Total Due</span>
            <span className="text-ochre text-xl font-display">₹{APC.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Payment method selection */}
        <div className="rounded-2xl border border-sand/40 bg-white p-6 flex flex-col gap-4">
          <h2 className="font-display text-lg font-bold text-forest-green">Payment Method</h2>
          <div className="flex flex-col gap-3">
            {PAYMENT_METHODS.map(({ id: mId, label, icon: Icon, desc }) => (
              <button key={mId} onClick={() => setMethod(mId)}
                className={`flex items-center gap-4 rounded-xl border px-5 py-4 text-left transition-colors ${
                  method === mId ? 'border-ochre bg-ochre/5' : 'border-sand/40 hover:border-sand'
                }`}>
                <Icon className={`h-5 w-5 shrink-0 ${method === mId ? 'text-ochre' : 'text-forest-green/40'}`} />
                <div>
                  <p className={`text-sm font-bold ${method === mId ? 'text-ochre' : 'text-forest-green'}`}>{label}</p>
                  <p className="text-xs text-forest-green/50 mt-0.5">{desc}</p>
                </div>
                <div className={`ml-auto h-4 w-4 rounded-full border-2 shrink-0 ${
                  method === mId ? 'border-ochre bg-ochre' : 'border-sand/50'
                }`} />
              </button>
            ))}
          </div>

          {/* UPI input */}
          {method === 'upi' && (
            <div className="flex flex-col gap-1.5 mt-2">
              <label className="text-xs font-bold uppercase tracking-widest text-forest-green/40">UPI ID *</label>
              <input value={upiId} onChange={e => setUpiId(e.target.value)}
                placeholder="e.g. yourname@upi or 9XXXXXXXXX@paytm"
                className="rounded-xl border border-sand/40 px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre" />
              <p className="text-xs text-forest-green/30">Demo — no real payment processed</p>
            </div>
          )}

          {method === 'card' && (
            <div className="flex flex-col gap-3 mt-2">
              {[
                { key: 'cardNumber', label: 'Card Number', placeholder: '4111 1111 1111 1111' },
                { key: 'cardName',   label: 'Cardholder Name', placeholder: 'As on card' },
              ].map(({ key, label, placeholder }) => (
                <label key={key} className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold uppercase tracking-widest text-forest-green/40">{label}</span>
                  <input placeholder={placeholder}
                    className="rounded-xl border border-sand/40 px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre" />
                </label>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold uppercase tracking-widest text-forest-green/40">Expiry</span>
                  <input placeholder="MM / YY"
                    className="rounded-xl border border-sand/40 px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre" />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold uppercase tracking-widest text-forest-green/40">CVV</span>
                  <input placeholder="•••"
                    className="rounded-xl border border-sand/40 px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre" />
                </label>
              </div>
              <p className="text-xs text-forest-green/30">Demo — no real card details stored</p>
            </div>
          )}

          {method === 'netbank' && (
            <div className="flex flex-col gap-1.5 mt-2">
              <label className="text-xs font-bold uppercase tracking-widest text-forest-green/40">Select Bank</label>
              <select className="rounded-xl border border-sand/40 px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre">
                <option>State Bank of India</option>
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
                <option>Axis Bank</option>
                <option>Kotak Mahindra Bank</option>
                <option>Bank of Baroda</option>
              </select>
              <p className="text-xs text-forest-green/30">Demo — no real bank redirect</p>
            </div>
          )}
        </div>

        {/* Security note */}
        <div className="flex items-center gap-3 text-xs text-forest-green/40">
          <ShieldCheck className="h-4 w-4 shrink-0 text-green-500" />
          <span>Demo mode — all payment data is simulated. No real transaction will be processed.</span>
        </div>

        {/* Pay button */}
        <button onClick={handlePay} disabled={loading || (method === 'upi' && !upiId)}
          className="rounded-full bg-ochre px-7 py-3.5 text-sm font-bold text-ivory hover:bg-ochre/90 disabled:opacity-40 transition-colors flex items-center justify-center gap-2">
          {loading ? (
            <><span className="animate-spin h-4 w-4 border-2 border-ivory border-t-transparent rounded-full" /> Processing…</>
          ) : (
            <>Pay ₹{APC.toLocaleString('en-IN')}</>
          )}
        </button>
      </main>
    </>
  );
}
