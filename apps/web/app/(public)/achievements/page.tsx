'use client';

// TODO: Replace demo data with GET /api/v1/achievements once backend credentials are available.

import Link from 'next/link';
import StatisticsBlock from '@/components/common/StatisticsBlock';
import {
  BookOpen, Users, Building2, Globe,
  Star, Award, TrendingUp, ArrowRight, CheckCircle, Trophy,
} from 'lucide-react';
import {
  DEMO_ACHIEVEMENTS_STATS,
  DEMO_ACHIEVEMENTS_MILESTONES,
  DEMO_ACHIEVEMENTS_GLOBAL_REACH,
} from '@/lib/demo-data';

const ICON_MAP: Record<string, React.ElementType> = {
  BookOpen, Users, Building2, Trophy, Globe, TrendingUp, Star, Award,
};

export default function AchievementsPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-ivory py-20 px-6 text-center border-b border-sand/30">
        <div className="mx-auto max-w-3xl flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="block h-px w-12 bg-ochre" />
            <span className="text-xs font-bold uppercase tracking-widest text-ochre">Our Impact</span>
            <span className="block h-px w-12 bg-ochre" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-forest-green leading-tight">
            Achievements &amp; Milestones
          </h1>
          <p className="text-base text-forest-green/60 leading-relaxed max-w-2xl">
            Eight years of scholarly publishing excellence — measured not just in numbers,
            but in the knowledge we have helped bring to the world.
          </p>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-ivory">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-ochre">By the Numbers</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-forest-green">
              VYOM in Numbers
            </h2>
            <p className="mt-3 text-base text-forest-green/60 max-w-xl mx-auto">
              A snapshot of our growth, reach, and impact across the global academic community.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {DEMO_ACHIEVEMENTS_STATS.map(({ value, suffix, label, icon }) => {
              const Icon = ICON_MAP[icon] ?? BookOpen;
              return (
                <div
                  key={label}
                  className="group flex flex-col items-center gap-4 rounded-2xl border border-sand/40 bg-white p-8 hover:border-sand hover:shadow-card transition-all"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ochre/10 group-hover:bg-ochre/20 transition-colors">
                    <Icon className="h-6 w-6 text-ochre" />
                  </div>
                  <StatisticsBlock value={value} suffix={suffix} label={label} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MILESTONE TIMELINE ────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-sand/10">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-ochre">Our Journey</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-forest-green">
              Key Milestones
            </h2>
            <p className="mt-3 text-base text-forest-green/60 max-w-xl mx-auto">
              From a founding vision to a recognised platform — every step of our journey.
            </p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-ochre/20" />

            <div className="flex flex-col gap-6">
              {DEMO_ACHIEVEMENTS_MILESTONES.map(({ year, title, desc }, i) => (
                <div key={year} className="relative flex items-start gap-6 pl-16">
                  {/* Dot */}
                  <div className="absolute left-[19px] top-4 h-5 w-5 rounded-full bg-ochre/20 border-2 border-ochre shrink-0 z-10" />
                  {/* Card */}
                  <div className={`flex-1 rounded-2xl border p-5 hover:shadow-card transition-all ${
                    i % 2 === 0
                      ? 'bg-ivory border-sand/40'
                      : 'bg-white border-sand/30'
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="rounded-full border border-ochre/40 px-3 py-0.5 text-xs font-bold text-ochre">
                        {year}
                      </span>
                      <h3 className="font-display text-base font-bold text-forest-green">{title}</h3>
                    </div>
                    <p className="text-sm text-forest-green/60 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GLOBAL REACH ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-sand/10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-ochre">Global Presence</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-forest-green">
              Our Worldwide Readership
            </h2>
            <p className="mt-3 text-base text-forest-green/60 max-w-xl mx-auto">
              VYOM publications are read, cited, and referenced across six continents.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEMO_ACHIEVEMENTS_GLOBAL_REACH.map(({ region, countries, readers }) => (
              <div
                key={region}
                className="rounded-2xl border border-sand/40 bg-white p-6 hover:border-sand hover:shadow-card transition-all"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ochre/10">
                    <Globe className="h-5 w-5 text-ochre" />
                  </div>
                  <h3 className="font-display text-base font-bold text-forest-green">{region}</h3>
                </div>
                <div className="flex gap-8">
                  <div>
                    <p className="font-display text-3xl font-bold text-forest-green">{countries}</p>
                    <p className="text-xs text-forest-green/50 mt-0.5 uppercase tracking-widest font-bold">Countries</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl font-bold text-ochre">{readers}</p>
                    <p className="text-xs text-forest-green/50 mt-0.5 uppercase tracking-widest font-bold">Readers</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUALITY COMMITMENTS ───────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-forest-green">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex items-center gap-4 justify-center mb-4">
            <span className="block h-px w-12 bg-ochre/60" />
            <span className="text-xs font-bold uppercase tracking-widest text-ochre">Our Promise</span>
            <span className="block h-px w-12 bg-ochre/60" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ivory mb-3">
            Our Quality Commitments
          </h2>
          <p className="text-base text-ivory/60 max-w-xl mx-auto mb-10">
            Every number behind our achievements is backed by a commitment to quality that we never compromise on.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {[
              'Every manuscript undergoes double-blind peer review',
              'Average review turnaround: under 21 days',
              'Zero tolerance for plagiarism — all submissions screened',
              'Author feedback provided at every stage of review',
              'Published works indexed in international databases',
              'Open access options available for all accepted manuscripts',
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-ochre/20 bg-forest-green/40 px-5 py-4"
              >
                <CheckCircle className="h-5 w-5 text-ochre mt-0.5 shrink-0" />
                <span className="text-sm text-ivory/80 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-ivory">
        <div className="mx-auto max-w-3xl rounded-3xl border border-sand/40 bg-ivory shadow-card px-8 py-16 flex flex-col items-center gap-7 text-center">
          <Trophy className="h-8 w-8 text-ochre" aria-hidden="true" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-forest-green">
            Be Part of Our Next Chapter
          </h2>
          <p className="text-forest-green/60 max-w-md text-base leading-relaxed">
            Join a growing community of scholars who trust VYOM Publication to share their work with the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/register?role=author"
              className="inline-flex items-center gap-2 rounded-full bg-ochre px-7 py-3 text-sm font-semibold text-ivory hover:bg-ochre/90 transition-colors"
            >
              Publish With Us <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-forest-green/40 px-7 py-3 text-sm font-semibold text-forest-green hover:border-forest-green transition-colors"
            >
              Learn About Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
