'use client';

// TODO Phase 8:
// Backend Integration Endpoint:
// - GET /api/v1/achievements/stats -> Returns general publication KPIs
// - GET /api/v1/achievements/milestones -> Returns company/platform milestone timeline entries
// - GET /api/v1/achievements/awards -> Returns list of awards won by the platform
// Request Payload: None
// Response Shape: ApiResponse<{ stats: StatObject[]; milestones: Milestone[]; awards: Award[] }>
// Loading State: Show skeleton boxes or subtle fade-in transition
// Error State: Log to console or use mock fallback gracefully

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import StatisticsBlock from '@/components/common/StatisticsBlock';
import {
  Trophy, BookOpen, Users, Globe, Building2,
  Star, Award, TrendingUp, ArrowRight, CheckCircle,
} from 'lucide-react';
import {
  DEMO_ACHIEVEMENTS_STATS,
  DEMO_ACHIEVEMENTS_MILESTONES,
  DEMO_ACHIEVEMENTS_AWARDS,
  DEMO_ACHIEVEMENTS_PARTNERS,
  DEMO_ACHIEVEMENTS_GLOBAL_REACH
} from '@/lib/demo-data';

const ICON_MAP: Record<string, any> = {
  BookOpen, Users, Building2, Trophy, Globe, TrendingUp, Star, Award
};

// ── Shared section header ──────────────────────────────────────────────────────
function SectionHeader({ label, title, subtitle, light = false }: {
  label?: string; title: string; subtitle?: string; light?: boolean;
}) {
  return (
    <div className="text-center mb-12">
      {label && (
        <span className="inline-block mb-3 text-metadata font-semibold uppercase tracking-widest text-gold">
          {label}
        </span>
      )}
      <h2 className={`font-display text-section ${light ? 'text-ivory' : 'text-forest-green'}`}>{title}</h2>
      {subtitle && (
        <p className={`mt-3 text-body max-w-2xl mx-auto ${light ? 'text-ivory/60' : 'text-text-secondary'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function AchievementsPage() {
  return (
    <div className="bg-ivory">

      {/* ── PAGE HERO ─────────────────────────────────────────────────────── */}
      <section className="bg-forest-green py-20 px-6">
        <div className="mx-auto max-w-4xl text-center animate-fade-up">
          <span className="inline-block mb-4 text-metadata font-semibold uppercase tracking-widest text-gold">
            Our Impact
          </span>
          <h1 className="font-display text-hero text-ivory leading-tight">
            Achievements & Milestones
          </h1>
          <p className="mt-6 text-body text-ivory/70 max-w-2xl mx-auto leading-relaxed">
            Eight years of scholarly publishing excellence — measured not just in numbers,
            but in the knowledge we have helped bring to the world.
          </p>
        </div>
      </section>

      {/* ── ANIMATED STATISTICS ───────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-ivory">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="By the Numbers"
            title="VYOM in Numbers"
            subtitle="A snapshot of our growth, reach, and impact across the global academic community."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {DEMO_ACHIEVEMENTS_STATS.map(({ value, suffix, label, icon }) => {
              const Icon = ICON_MAP[icon] || BookOpen;
              return (
                <div
                  key={label}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-sand/30 bg-white p-8 shadow-card hover:shadow-card-hover hover:border-forest-green/20 transition-all"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-green/8 group-hover:bg-forest-green transition-colors">
                    <Icon className="h-6 w-6 text-forest-green group-hover:text-ivory transition-colors" />
                  </div>
                  <StatisticsBlock value={value} suffix={suffix} label={label} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MILESTONE TIMELINE ────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            label="Our Journey"
            title="Key Milestones"
            subtitle="From a founding vision to a globally recognised platform — every step of our journey."
          />

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-forest-green/15" />

            <div className="flex flex-col gap-8">
              {DEMO_ACHIEVEMENTS_MILESTONES.map(({ year, title, desc }, i) => (
                <div key={year} className="relative flex items-start gap-6 pl-16">
                  {/* Dot */}
                  <div className="absolute left-4 top-4 h-5 w-5 rounded-full bg-forest-green border-4 border-white shadow z-10" />

                  {/* Card */}
                  <div className={`flex-1 rounded-xl border p-5 shadow-card transition-all hover:shadow-card-hover ${
                    i % 2 === 0
                      ? 'bg-ivory border-forest-green/10'
                      : 'bg-white border-sand/30'
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-block rounded-full bg-gold/15 px-3 py-0.5 font-display text-metadata font-bold text-gold">
                        {year}
                      </span>
                      <h3 className="font-display text-caption font-semibold text-text-primary">{title}</h3>
                    </div>
                    <p className="text-caption text-text-secondary leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AWARDS & RECOGNITION ──────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-forest-green">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Recognition"
            title="Awards & Honours"
            subtitle="Industry recognition for our commitment to quality, transparency, and innovation in academic publishing."
            light
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DEMO_ACHIEVEMENTS_AWARDS.map(({ title, body, year }) => (
              <div
                key={title}
                className="flex flex-col items-center text-center gap-4 rounded-2xl bg-deep-green border border-gold/15 p-8 hover:border-gold/35 transition-colors"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15">
                  <Trophy className="h-7 w-7 text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-caption font-semibold text-ivory leading-snug">{title}</h3>
                  <p className="mt-2 text-metadata text-ivory/50">{body}</p>
                  <span className="mt-2 inline-block rounded-full bg-gold/15 px-3 py-0.5 text-metadata font-bold text-gold">
                    {year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACADEMIC PARTNERS ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-ivory">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Partnerships"
            title="Academic Partners"
            subtitle="We collaborate with India's leading universities and research institutions to advance scholarly publishing."
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {DEMO_ACHIEVEMENTS_PARTNERS.map((name) => (
              <div
                key={name}
                className="flex items-center justify-center gap-2 rounded-xl border border-sand/30 bg-white px-4 py-5 shadow-card hover:border-forest-green/30 hover:shadow-card-hover transition-all"
              >
                <Building2 className="h-4 w-4 text-forest-green/40 shrink-0" />
                <span className="text-caption font-semibold text-text-primary text-center">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GLOBAL REACH ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Global Presence"
            title="Our Worldwide Readership"
            subtitle="VYOM publications are read, cited, and referenced across six continents."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEMO_ACHIEVEMENTS_GLOBAL_REACH.map(({ region, countries, readers }) => (
              <div
                key={region}
                className="rounded-xl border border-sand/30 bg-ivory p-6 hover:border-forest-green/25 hover:shadow-card transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest-green/10">
                    <Globe className="h-5 w-5 text-forest-green" />
                  </div>
                  <h3 className="font-display text-caption font-semibold text-text-primary">{region}</h3>
                </div>
                <div className="flex gap-6">
                  <div>
                    <p className="font-display text-sub-heading text-forest-green">{countries}</p>
                    <p className="text-metadata text-text-secondary">Countries</p>
                  </div>
                  <div>
                    <p className="font-display text-sub-heading text-gold">{readers}</p>
                    <p className="text-metadata text-text-secondary">Readers</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUALITY COMMITMENTS ───────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-deep-green">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-metadata font-semibold uppercase tracking-widest text-gold">Our Promise</span>
          <h2 className="mt-3 font-display text-section text-ivory">Our Quality Commitments</h2>
          <p className="mt-4 text-body text-ivory/60 max-w-xl mx-auto">
            Every number behind our achievements is backed by a commitment to quality that we never compromise on.
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {[
              'Every manuscript undergoes double-blind peer review',
              'Average review turnaround: under 21 days',
              'Zero tolerance for plagiarism — all submissions screened',
              'Author feedback provided at every stage of review',
              'Published works indexed in international databases',
              'Open access options available for all accepted manuscripts',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl bg-forest-green/40 border border-gold/10 p-4">
                <CheckCircle className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                <span className="text-caption text-ivory/80 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-ivory text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-section text-forest-green">
            Be Part of Our Next Chapter
          </h2>
          <p className="mt-4 text-body text-text-secondary leading-relaxed">
            Join a growing community of scholars who trust VYOM Publication to share their work with the world.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register?role=author">
              <Button variant="primary" size="lg" className="gap-2">
                Publish With Us <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="secondary" size="lg">Learn About Us</Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}