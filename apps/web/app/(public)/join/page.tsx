import Link from 'next/link';
import { BookOpen, PenLine, Shield, ArrowRight, Mail } from 'lucide-react';

export default function JoinPage() {
  return (
    <>
      <main className="flex-1 px-6 py-20">
        {/* ── Hero ── */}
        <div className="mx-auto max-w-3xl text-center flex flex-col items-center gap-4 mb-16">
          <div className="flex items-center gap-4">
            <span className="block h-px w-12 bg-ochre" />
            <span className="text-xs font-bold uppercase tracking-widest text-ochre">Create an Account</span>
            <span className="block h-px w-12 bg-ochre" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-forest-green leading-tight">Join VYOM</h1>
          <p className="text-base text-forest-green/60 max-w-lg leading-relaxed">
            Become part of a community dedicated to rigorous research, quality publishing, and accessible knowledge.
          </p>
        </div>

        {/* ── Role cards ── */}
        <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Reader */}
          <div className="group flex flex-col gap-5 rounded-2xl border border-sand/40 bg-white p-8 hover:border-ochre/40 hover:shadow-card transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ochre/10 group-hover:bg-ochre/20 transition-colors">
              <BookOpen className="h-6 w-6 text-ochre" />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <h2 className="font-display text-2xl font-bold text-forest-green">Reader Registration</h2>
              <p className="text-sm text-forest-green/60 leading-relaxed">
                Create a free reader account to access the full catalogue, bookmark publications, track your reading history, and download articles.
              </p>
              <ul className="flex flex-col gap-1.5 mt-2">
                {['Free access to the book catalogue', 'Bookmarks and reading history', 'Download published articles', 'New release notifications'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-xs text-forest-green/60">
                    <span className="h-1 w-1 rounded-full bg-ochre shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/register?role=member"
              className="inline-flex items-center gap-2 rounded-full bg-ochre px-6 py-3 text-sm font-semibold text-ivory hover:bg-ochre/90 transition-colors w-fit">
              Join as Reader <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Author */}
          <div className="group flex flex-col gap-5 rounded-2xl border border-sand/40 bg-white p-8 hover:border-ochre/40 hover:shadow-card transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ochre/10 group-hover:bg-ochre/20 transition-colors">
              <PenLine className="h-6 w-6 text-ochre" />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <h2 className="font-display text-2xl font-bold text-forest-green">Author Registration</h2>
              <p className="text-sm text-forest-green/60 leading-relaxed">
                Register as an author to submit manuscripts, track the peer review process, and manage your publications with VYOM.
              </p>
              <ul className="flex flex-col gap-1.5 mt-2">
                {['Submit abstracts and manuscripts', 'Track review status in real time', 'Communicate with the editorial team', 'Access your full publication history'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-xs text-forest-green/60">
                    <span className="h-1 w-1 rounded-full bg-ochre shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/register?role=author"
              className="inline-flex items-center gap-2 rounded-full bg-ochre px-6 py-3 text-sm font-semibold text-ivory hover:bg-ochre/90 transition-colors w-fit">
              Register as Author <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* ── Editorial note ── */}
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 rounded-2xl border border-sand/40 bg-sand/10 px-7 py-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-green/10">
              <Shield className="h-5 w-5 text-forest-green" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-base font-bold text-forest-green mb-1">Editorial Access</h3>
              <p className="text-sm text-forest-green/60 leading-relaxed">
                Accounts for Editors, Reviewers, Associate Editors, Editors-in-Chief, and Administrators are{' '}
                <span className="font-semibold text-forest-green">invitation-based</span> and managed by the VYOM administration. Self-registration is not available for editorial roles.
              </p>
            </div>
            <Link href="/contact"
              className="shrink-0 inline-flex items-center gap-2 rounded-full border border-forest-green/40 px-5 py-2.5 text-sm font-semibold text-forest-green hover:bg-forest-green hover:text-ivory transition-colors whitespace-nowrap">
              <Mail className="h-4 w-4" /> Contact Administration
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-forest-green/40 mt-10">
          Already have an account?{' '}
          <Link href="/login" className="text-ochre hover:underline font-semibold">Sign in here</Link>
        </p>
      </main>
    </>
  );
}
