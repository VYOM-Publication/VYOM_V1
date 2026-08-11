'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, PenLine, Shield, ArrowRight } from 'lucide-react';

const CARDS = [
  {
    icon: BookOpen,
    title: 'Reader / Member',
    description: 'Continue reading books and articles. Access your bookmarks, downloads, and reading history.',
    href: '/login/member',
    accent: 'ochre' as const,
  },
  {
    icon: PenLine,
    title: 'Author',
    description: 'Manage manuscript submissions, track review status, and access your full publication workflow.',
    href: '/login/author',
    accent: 'ochre' as const,
  },
  {
    icon: Shield,
    title: 'Editorial Console',
    description: 'Secure institutional access for Editors, Reviewers, Editors-in-Chief, and Administrators.',
    href: '/login/editor',
    accent: 'forest' as const,
  },
];

export default function LoginPage() {
  return (
    <main className="flex-1 px-6 py-20 bg-ivory">
      <div className="mx-auto max-w-4xl flex flex-col items-center gap-4 text-center mb-16">
        <div className="flex items-center gap-4">
          <span className="block h-px w-12 bg-ochre" />
          <span className="text-xs font-bold uppercase tracking-widest text-ochre">Sign In</span>
          <span className="block h-px w-12 bg-ochre" />
        </div>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-forest-green leading-tight">
          Welcome Back
        </h1>
        <p className="text-base text-forest-green/60 max-w-lg leading-relaxed">
          Select your workspace to continue. Each role has a dedicated environment tailored to your publication needs.
        </p>
      </div>

      {/* Role cards */}
      <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {CARDS.map(({ icon: Icon, title, description, href, accent }) => (
          <div key={title}
            className="group flex flex-col gap-5 rounded-2xl border border-sand/40 bg-white p-8 hover:border-ochre/40 hover:shadow-card transition-all cursor-pointer"
            onClick={() => { window.location.href = href; }}
            role="button"
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') window.location.href = href; }}
            aria-label={`Sign in as ${title}`}>
            <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
              accent === 'forest' ? 'bg-forest-green/10 group-hover:bg-forest-green/20' : 'bg-ochre/10 group-hover:bg-ochre/20'
            }`}>
              <Icon className={`h-6 w-6 ${accent === 'forest' ? 'text-forest-green' : 'text-ochre'}`} />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <h2 className="font-display text-xl font-bold text-forest-green">{title}</h2>
              <p className="text-sm text-forest-green/60 leading-relaxed">{description}</p>
            </div>
            <Link href={href}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors w-fit ${
                accent === 'forest'
                  ? 'bg-forest-green text-ivory hover:bg-forest-green/90'
                  : 'bg-ochre text-ivory hover:bg-ochre/90'
              }`}
              onClick={e => e.stopPropagation()}>
              Continue <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-forest-green/40 mt-10">
        Don&apos;t have an account?{' '}
        <Link href="/join" className="text-ochre hover:underline font-semibold">Join VYOM</Link>
      </p>
    </main>
  );
}
