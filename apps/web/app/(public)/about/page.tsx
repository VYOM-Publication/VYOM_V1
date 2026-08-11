'use client';

import Link from 'next/link';
import {
  PenLine, Shield, Globe, BookOpen, ArrowRight, Mail,
} from 'lucide-react';

// ── Page ───────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      {/* ── 1. HERO — Our Mission ──────────────────────────────────────────── */}
      <section className="bg-ivory py-24 px-6 text-center border-b border-sand/30">
        <div className="mx-auto max-w-3xl flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="block h-px w-12 bg-ochre" />
            <span className="text-xs font-bold uppercase tracking-widest text-ochre">Our Mission</span>
            <span className="block h-px w-12 bg-ochre" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-forest-green leading-tight">
            Our Vision for Academic Excellence
          </h1>
          <p className="text-base text-forest-green/60 leading-relaxed max-w-2xl">
            Empowering global knowledge through meticulous curation, rigorous peer review,
            and a commitment to intellectual permanence. We are the stewards of the written word.
          </p>
        </div>
      </section>

      {/* ── 2. ABOUT VYOM PUBLICATION ─────────────────────────────────────── */}
      <section className="bg-ivory py-20 px-6">
        <div className="mx-auto max-w-3xl text-center flex flex-col gap-6">
          <span className="text-xs font-bold uppercase tracking-widest text-ochre">
            About VYOM Publication
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-forest-green leading-snug">
            A Home for Authors, Researchers, and Readers
          </h2>
          <div className="text-base text-forest-green/65 leading-relaxed space-y-4 text-center">
            <p>
              Founded on the principle that academic publishing should be as rigorous as the
              research it contains, VYOM Publication emerged as a sanctuary for intellectual
              discourse. Based in Talegaon Dabhade, Pune, we have grown into a trusted platform
              for scholarly achievement across disciplines.
            </p>
            <p>
              We believe that every manuscript is a legacy in the making. Our editorial team
              upholds the highest standards of peer review and publication ethics — ensuring that
              &ldquo;intellectual integrity&rdquo; isn&rsquo;t just a phrase, but a daily practice.
            </p>
            <p>
              Today, we continue to bridge the gap between traditional prestige and digital
              accessibility, ensuring that the fruits of academic labour reach those who will
              plant the seeds of tomorrow&rsquo;s breakthroughs.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. EDITORIAL PHILOSOPHY ───────────────────────────────────────── */}
      <section className="bg-ivory py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-ochre">Our Core Values</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-forest-green">
              Editorial Philosophy
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: 'Intellectual Integrity',
                desc: 'A double-blind peer-review process that prioritises truth over trends. We maintain the highest ethical standards in scholarly communication.',
              },
              {
                icon: BookOpen,
                title: 'Quality Craft',
                desc: 'From typography to layout, we treat every publication as an artefact of human knowledge, deserving of meticulous design and editorial attention.',
              },
              {
                icon: Globe,
                title: 'Global Impact',
                desc: 'Bridging borders through open access initiatives and widespread distribution, making research accessible to every corner of the globe.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title}
                className="rounded-2xl border border-sand/40 bg-ivory p-7 flex flex-col gap-4 hover:border-sand hover:shadow-card transition-all">
                <Icon className="h-6 w-6 text-ochre" strokeWidth={1.5} />
                <h3 className="font-display text-lg font-bold text-forest-green">{title}</h3>
                <p className="text-sm text-forest-green/60 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. LEADERSHIP & EDITORIAL BOARD ──────────────────────────────── */}
      <section className="bg-ivory py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-forest-green">
              Leadership &amp; Editorial Board
            </h2>
            <p className="mt-4 text-base text-forest-green/60 max-w-xl mx-auto leading-relaxed">
              Guided by an international collective of scholars, practitioners, and visionary
              publishers dedicated to the pursuit of excellence.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { role: 'EDITOR-IN-CHIEF',      name: 'Dr. Eleanor Vance',     credential: 'D.Phil, Oxford University' },
              { role: 'MANAGING DIRECTOR',    name: 'Julian Thorne',         credential: 'Master of Publishing Studies' },
              { role: 'GLOBAL RESEARCH LEAD', name: 'Dr. Saffron Li',        credential: 'PhD in Theoretical Physics' },
              { role: 'ETHICS COMMISSIONER',  name: 'Marcus Aurelius Singh', credential: 'Professor Emeritus of Jurisprudence' },
            ].map(({ role, name, credential }) => (
              <div key={name} className="flex flex-col gap-3">
                {/* Photo placeholder — replace with real headshots in production */}
                <div className="w-full aspect-[3/4] rounded-2xl bg-sand/30 border border-sand/40 flex items-center justify-center">
                  <PenLine className="h-8 w-8 text-sand" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-ochre">{role}</span>
                  <h3 className="font-display text-base font-bold text-forest-green leading-snug">{name}</h3>
                  <p className="text-xs text-forest-green/50">{credential}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/editorial-board"
              className="inline-flex items-center gap-2 rounded-full border border-forest-green/40 px-7 py-3 text-sm font-semibold text-forest-green hover:bg-forest-green hover:text-ivory transition-colors">
              View Full Editorial Board <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. CONTACT CTA ────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-ivory">
        <div className="mx-auto max-w-3xl rounded-3xl border border-sand/40 bg-ivory shadow-card px-8 py-16 flex flex-col items-center gap-7 text-center">
          <BookOpen className="h-8 w-8 text-ochre" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-forest-green">
            Have Questions?<br />Contact Us
          </h2>
          <p className="text-forest-green/60 max-w-md text-base">
            Connect with our editorial office, begin your manuscript submission, or join VYOM as a published author.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 flex-wrap justify-center">
            <Link href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-ochre px-7 py-3 text-sm font-semibold text-ivory hover:bg-ochre/90 transition-colors">
              <Mail className="h-4 w-4" /> Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/register?role=author"
              className="inline-flex items-center gap-2 rounded-full border border-forest-green/40 px-7 py-3 text-sm font-semibold text-forest-green hover:border-forest-green transition-colors">
              Submit a Manuscript <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
