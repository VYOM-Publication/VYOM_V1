'use client';

/**
 * DEMO AUTH — temporary registration form.
 * Simulates account creation without any real backend or database.
 * Will be replaced by real registration (email verification, DB writes) before production.
 */

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, CheckCircle, Info } from 'lucide-react';
import { useDemoAuth, type DemoRole } from '@/lib/demo-auth';

function RegisterForm() {
  const searchParams = useSearchParams();
  const router       = useRouter();
  const { register: demoRegister } = useDemoAuth();

  const roleParam = searchParams.get('role') ?? 'member';
  const role: DemoRole = (roleParam === 'author' ? 'author' : 'member');

  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [showCf, setShowCf]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [error, setError]       = useState('');

  const dashboard = role === 'author' ? '/author/dashboard' : '/member/dashboard';

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    // Simulate registration delay
    setTimeout(() => {
      demoRegister(name, email, role);
      setSuccess(true);
      setTimeout(() => router.push(dashboard), 1500);
    }, 800);
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
          <CheckCircle className="h-7 w-7 text-green-600" />
        </div>
        <h2 className="font-display text-2xl font-bold text-forest-green">Account Created!</h2>
        <p className="text-sm text-forest-green/60">Welcome to VYOM Publication. Redirecting to your dashboard…</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-forest-green">
          {role === 'author' ? 'Register as Author' : 'Join as Reader'}
        </h2>
        <p className="text-sm text-forest-green/50 mt-1">
          {role === 'author'
            ? 'Create your author account to submit manuscripts and track publications.'
            : 'Create a free reader account to browse books and track your reading.'}
        </p>
      </div>

      {/* Demo hint */}
      <div className="flex items-start gap-2 rounded-xl bg-ochre/8 border border-ochre/20 px-4 py-3 mb-5">
        <Info className="h-4 w-4 text-ochre shrink-0 mt-0.5" />
        <p className="text-xs text-ochre/80 leading-relaxed font-medium">
          Demo mode — any name, email, and password (min 6 chars) will create a session.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-widest text-forest-green">Full Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Dr. Jane Doe"
            className="w-full rounded-lg border border-sand/60 bg-ivory/50 px-4 py-2.5 text-sm text-forest-green placeholder:text-forest-green/30 focus:outline-none focus:border-ochre transition-colors" />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-widest text-forest-green">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com"
            className="w-full rounded-lg border border-sand/60 bg-ivory/50 px-4 py-2.5 text-sm text-forest-green placeholder:text-forest-green/30 focus:outline-none focus:border-ochre transition-colors" />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-widest text-forest-green">Password</label>
          <div className="relative">
            <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="Min 6 characters"
              className="w-full rounded-lg border border-sand/60 bg-ivory/50 px-4 py-2.5 pr-10 text-sm text-forest-green placeholder:text-forest-green/30 focus:outline-none focus:border-ochre transition-colors" />
            <button type="button" onClick={() => setShowPw(v => !v)} aria-label="Toggle password"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-green/40 hover:text-forest-green transition-colors">
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-widest text-forest-green">Confirm Password</label>
          <div className="relative">
            <input type={showCf ? 'text' : 'password'} value={confirm} onChange={e => setConfirm(e.target.value)} required placeholder="Repeat password"
              className="w-full rounded-lg border border-sand/60 bg-ivory/50 px-4 py-2.5 pr-10 text-sm text-forest-green placeholder:text-forest-green/30 focus:outline-none focus:border-ochre transition-colors" />
            <button type="button" onClick={() => setShowCf(v => !v)} aria-label="Toggle confirm password"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-green/40 hover:text-forest-green transition-colors">
              {showCf ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 border border-red-200 px-4 py-2.5 text-xs text-red-600">{error}</p>
        )}

        <button type="submit" disabled={loading}
          className="w-full rounded-full bg-ochre py-3 text-sm font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 transition-colors disabled:opacity-60">
          {loading ? 'Creating account…' : 'Create Account →'}
        </button>
      </form>

      <p className="mt-5 text-center text-xs text-forest-green/50">
        Already have an account?{' '}
        <Link href={`/login/${role}`} className="text-ochre hover:underline font-semibold">Sign in</Link>
      </p>
    </>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-2xl border border-sand/40 shadow-card p-8">
        <Suspense fallback={<p className="text-sm text-forest-green/50">Loading…</p>}>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
}
