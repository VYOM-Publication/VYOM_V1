'use client';

/**
 * DEMO AUTH — temporary login form per role.
 * Will be replaced by real JWT authentication before production.
 */

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Eye, EyeOff, BookOpen, PenLine, Shield, ArrowLeft, ArrowRight, Info } from 'lucide-react';
import { useDemoAuth, DEMO_USERS, DEMO_PASSWORD, type DemoRole } from '@/lib/demo-auth';

const ROLE_CONFIG: Record<string, {
  icon: typeof BookOpen;
  title: string;
  subtitle: string;
  placeholder: string;
  hint: string;
  registerHref: string | null;
  registerLabel: string | null;
  btnClass: string;
  iconColor: string;
  iconBg: string;
}> = {
  member: {
    icon: BookOpen,
    title: 'Reader / Member Sign In',
    subtitle: 'Access your reading history, bookmarks, and downloads.',
    placeholder: 'reader@demo.com',
    hint: 'Demo: reader@demo.com / demo123',
    registerHref: '/register?role=member',
    registerLabel: 'Join as a Reader',
    btnClass: 'bg-ochre text-ivory hover:bg-ochre/90',
    iconColor: 'text-ochre',
    iconBg: 'bg-ochre/10',
  },
  author: {
    icon: PenLine,
    title: 'Author Sign In',
    subtitle: 'Manage manuscript submissions, track review status, and access your publication workflow.',
    placeholder: 'author@demo.com',
    hint: 'Demo: author@demo.com / demo123',
    registerHref: '/register?role=author',
    registerLabel: 'Register as an Author',
    btnClass: 'bg-ochre text-ivory hover:bg-ochre/90',
    iconColor: 'text-ochre',
    iconBg: 'bg-ochre/10',
  },
  editor: {
    icon: Shield,
    title: 'Editorial Console',
    subtitle: 'Restricted to Editors, Reviewers, Associate Editors, Editors-in-Chief, and Administrators. Access is invitation-based.',
    placeholder: 'editor@demo.com',
    hint: 'Demo: editor@demo.com / demo123  ·  admin@demo.com / demo123  ·  reviewer@demo.com / demo123',
    registerHref: null,
    registerLabel: null,
    btnClass: 'bg-forest-green text-ivory hover:bg-forest-green/90',
    iconColor: 'text-forest-green',
    iconBg: 'bg-forest-green/10',
  },
};

export default function RoleLoginPage() {
  const params  = useParams();
  const router  = useRouter();
  const { login, loginAsRole } = useDemoAuth();

  const rawRole = params.role as string;
  const role    = rawRole in ROLE_CONFIG ? rawRole : 'member';
  const cfg     = ROLE_CONFIG[role];
  const Icon    = cfg.icon;

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [keep, setKeep]         = useState(false);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate slight delay for realism
    setTimeout(() => {
      // Accept any email + correct password for demo flexibility
      // but if email matches a known demo user, validate role match
      const knownUser = DEMO_USERS[email.toLowerCase()];

      if (password !== DEMO_PASSWORD) {
        setError(`Incorrect password. Use "${DEMO_PASSWORD}" for all demo accounts.`);
        setLoading(false);
        return;
      }

      if (knownUser) {
        login(email, password);
        router.push(knownUser.dashboard);
      } else {
        // Any email + correct password → login as current role
        loginAsRole(role as DemoRole);
        const dash = role === 'editor' ? '/editor/dashboard' : `/${role}/dashboard`;
        router.push(dash);
      }
    }, 600);
  }

  return (
    <div className="min-h-screen bg-ivory flex flex-col items-center justify-center px-4 py-16">
      {/* Back */}
      <div className="w-full max-w-md mb-6">
        <Link href="/login"
          className="inline-flex items-center gap-2 text-sm text-forest-green/50 hover:text-forest-green transition-colors">
          <ArrowLeft className="h-4 w-4" /> All sign-in options
        </Link>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl border border-sand/40 shadow-card p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${cfg.iconBg}`}>
            <Icon className={`h-5 w-5 ${cfg.iconColor}`} />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-forest-green leading-tight">{cfg.title}</h1>
            <p className="text-xs text-forest-green/50 mt-1 leading-snug">{cfg.subtitle}</p>
          </div>
        </div>

        {/* Demo hint banner */}
        <div className="flex items-start gap-2 rounded-xl bg-ochre/8 border border-ochre/20 px-4 py-3">
          <Info className="h-4 w-4 text-ochre shrink-0 mt-0.5" />
          <p className="text-xs text-ochre/80 leading-relaxed font-medium">{cfg.hint}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-forest-green">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              placeholder={cfg.placeholder}
              className="w-full rounded-lg border border-sand/60 bg-ivory/50 px-4 py-2.5 text-sm text-forest-green placeholder:text-forest-green/30 focus:outline-none focus:border-ochre transition-colors" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-forest-green">Password</label>
            <div className="relative">
              <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                placeholder="demo123"
                className="w-full rounded-lg border border-sand/60 bg-ivory/50 px-4 py-2.5 pr-10 text-sm text-forest-green placeholder:text-forest-green/30 focus:outline-none focus:border-ochre transition-colors" />
              <button type="button" onClick={() => setShowPw(v => !v)}
                aria-label={showPw ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-green/40 hover:text-forest-green transition-colors">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-forest-green/60 cursor-pointer select-none">
              <input type="checkbox" checked={keep} onChange={e => setKeep(e.target.checked)} className="rounded border-sand/60 accent-ochre" />
              Keep me signed in
            </label>
            <span className="text-forest-green/30">Demo mode — no reset needed</span>
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 border border-red-200 px-4 py-2.5 text-xs text-red-600">{error}</p>
          )}

          <button type="submit" disabled={loading}
            className={`w-full rounded-full py-3 text-sm font-bold uppercase tracking-widest transition-colors disabled:opacity-60 ${cfg.btnClass}`}>
            {loading ? 'Signing in…' : <span className="flex items-center justify-center gap-2">Sign In <ArrowRight className="h-4 w-4" /></span>}
          </button>
        </form>

        {/* Footer note */}
        <div className="text-center text-xs text-forest-green/40 border-t border-sand/20 pt-4 space-y-1">
          {role === 'editor' ? (
            <>
              <p>Editorial access is by invitation only.</p>
              <p>Need access? <Link href="/contact" className="text-ochre hover:underline">Contact administration</Link></p>
            </>
          ) : (
            <p>No account? <Link href={cfg.registerHref!} className="text-ochre hover:underline">{cfg.registerLabel}</Link></p>
          )}
        </div>
      </div>

      {/* Logo */}
      <Link href="/" className="mt-8 flex items-center gap-2 opacity-40 hover:opacity-70 transition-opacity">
        <Image src="/vyom-logo.png" alt="VYOM" width={24} height={24} className="object-contain" />
        <span className="font-display text-sm font-bold text-forest-green">VYOM Publication</span>
      </Link>
    </div>
  );
}
