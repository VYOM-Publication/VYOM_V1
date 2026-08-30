'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, BookOpen, PenTool, ArrowRight, Shield } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';

function LoginForm({ role = 'author' }: { role?: string }) {
  const { login } = useAuth();
  const isAuthor = role === 'author';

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email, password }, role);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message
        ?? 'Invalid email or password.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-forest-green">
          {isAuthor ? 'Author Sign In' : 'Reader Sign In'}
        </h2>
        <p className="text-sm text-forest-green/50 mt-1">
          {isAuthor
            ? 'Access your manuscript publishing console and track peer reviews.'
            : 'Access your saved reading history, bookmarks, and downloads.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="login-email" className="text-xs font-bold uppercase tracking-widest text-forest-green">
            {isAuthor ? 'Institutional / Official Email' : 'Email Address'}
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder={isAuthor ? 'author@vyompublication.com' : 'member@vyompublication.com'}
            className="w-full rounded-lg border border-sand/60 bg-ivory/50 px-4 py-2.5 text-sm text-forest-green placeholder:text-forest-green/30 focus:outline-none focus:border-ochre transition-colors"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="login-password" className="text-xs font-bold uppercase tracking-widest text-forest-green">Password</label>
            <Link href="/forgot-password" className="text-xs text-forest-green/50 hover:text-ochre transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="login-password"
              name="password"
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="Your password"
              className="w-full rounded-lg border border-sand/60 bg-ivory/50 px-4 py-2.5 pr-10 text-sm text-forest-green placeholder:text-forest-green/30 focus:outline-none focus:border-ochre transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPw(v => !v)}
              aria-label={showPw ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-green/40 hover:text-forest-green transition-colors"
            >
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 border border-red-200 px-4 py-2.5 text-xs text-red-600 font-medium">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-ochre py-3.5 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 transition-colors disabled:opacity-60 mt-2 shadow-sm flex items-center justify-center gap-2"
        >
          {loading ? 'Signing in…' : `Sign In as ${isAuthor ? 'Author' : 'Reader'} →`}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-forest-green/50">
        Don&apos;t have an account?{' '}
        <Link href={`/register?role=${isAuthor ? 'author' : 'member'}`} className="text-ochre hover:underline font-semibold">
          Create {isAuthor ? 'Author' : 'Reader'} Account
        </Link>
      </p>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ivory flex items-center justify-center text-sm text-forest-green/50">Loading sign-in workspace…</div>}>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const roleParam = searchParams.get('role') ?? 'author';
  const isAuthor = roleParam === 'author';

  const authorBullets = [
    'Track active manuscript peer-review pipeline',
    'Respond to editor & reviewer comments',
    'Submit new abstracts and revised manuscripts',
    'View publication impact & citation metrics',
    'Manage co-author and DOI metadata',
  ];

  const readerBullets = [
    'Resume reading your saved monographs & papers',
    'Access your bookmarked reading history',
    'Download saved publications for offline reading',
    'Receive notifications for new volume releases',
    'Personalized reading dashboard & preferences',
  ];

  return (
    <div className="min-h-[90vh] bg-ivory py-12 sm:py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column: Role-Tailored Hero */}
          <div className="flex flex-col gap-6 lg:pt-4">
            <div className="flex items-center gap-3">
              <span className="block h-px w-8 bg-ochre" />
              <span className="text-xs font-bold uppercase tracking-widest text-ochre">
                {isAuthor ? 'Author Console' : 'Reader Library'}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-bold text-forest-green leading-tight">
              {isAuthor ? 'Welcome Back, Author' : 'Welcome Back, Reader'}
            </h1>

            <p className="text-forest-green/65 text-base leading-relaxed max-w-lg">
              {isAuthor
                ? 'Sign in to continue your publishing journey with VYOM. Manage peer reviews, editor communications, and manuscript revisions.'
                : 'Sign in to access your personal reading workspace, continue saved publications, and manage offline PDF downloads.'}
            </p>

            <div className="flex flex-col gap-3.5 my-2">
              {(isAuthor ? authorBullets : readerBullets).map(item => (
                <div key={item} className="flex items-center gap-3 text-sm text-forest-green/75 font-medium">
                  <span className="h-5 w-5 rounded-full bg-ochre/15 text-ochre flex items-center justify-center shrink-0 text-xs font-bold">
                    ✓
                  </span>
                  {item}
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-sand/30 mt-2">
              <p className="text-xs font-bold uppercase tracking-widest text-forest-green/60 mb-2.5">
                Editorial Board & Platform Staff Portals
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/login/editor"
                  className="inline-flex items-center gap-2 rounded-full bg-forest-green px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-forest-green/90 shadow-md transition-all"
                >
                  <Shield className="h-4 w-4 text-ochre" /> Editorial Console →
                </Link>
                <Link
                  href="/login/admin"
                  className="inline-flex items-center gap-2 rounded-full bg-ochre/15 border border-ochre/40 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-ochre hover:bg-ochre hover:text-ivory shadow-xs transition-all"
                >
                  <Shield className="h-4 w-4 text-ochre" /> Admin Portal →
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Account Card with Role Toggle Header */}
          <div className="w-full bg-white rounded-3xl border border-sand/40 shadow-card p-8 sm:p-10 border-l-4 border-l-ochre">
            {/* Role Switcher Pill Tabs (Reader & Author ONLY) */}
            <div className="flex items-center rounded-2xl bg-ivory/80 p-1.5 border border-sand/40 mb-8">
              <button
                type="button"
                onClick={() => router.push('/login?role=member')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  !isAuthor
                    ? 'bg-ochre text-ivory shadow-sm'
                    : 'text-forest-green/60 hover:text-forest-green'
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" /> Reader Sign In
              </button>
              <button
                type="button"
                onClick={() => router.push('/login?role=author')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  isAuthor
                    ? 'bg-ochre text-ivory shadow-sm'
                    : 'text-forest-green/60 hover:text-forest-green'
                }`}
              >
                <PenTool className="h-3.5 w-3.5" /> Author Sign In
              </button>
            </div>

            <LoginForm role={isAuthor ? 'author' : 'member'} />
          </div>
        </div>
      </div>
    </div>
  );
}
