'use client';

import Link from 'next/link';
import {
  FileText, ArrowRight, Scale, ClipboardList,
} from 'lucide-react';

export default function GuidelinesPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-ivory py-20 px-6 text-center border-b border-sand/30">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-4 justify-center mb-4">
            <span className="block h-px w-12 bg-ochre" />
            <span className="text-xs font-bold uppercase tracking-widest text-ochre">Submission Standards</span>
            <span className="block h-px w-12 bg-ochre" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-forest-green leading-tight">
            Author Guidelines
          </h1>
          <p className="mt-5 text-base text-forest-green/60 leading-relaxed max-w-2xl mx-auto">
            Manuscripts must be original, ethical, and prepared in accordance with
            international reporting and publication standards.
          </p>
        </div>
      </section>

      {/* ── MANUSCRIPT CATEGORIES ─────────────────────────────────────────── */}
      <section className="py-12 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-sand/40 bg-ivory/80 p-8">
            <span className="text-xs font-bold uppercase tracking-widest text-ochre">Manuscript Categories</span>
            <div className="mt-5 flex flex-col gap-3">
              {[
                { type: 'Original Research',    desc: 'Empirical studies presenting new data and findings.' },
                { type: 'Review Articles',       desc: 'Systematic or narrative reviews of existing literature.' },
                { type: 'Short Communications', desc: 'Brief reports of significant preliminary findings.' },
                { type: 'Book Reviews',          desc: 'Critical reviews of recently published academic works.' },
              ].map(({ type, desc }) => (
                <div key={type}
                  className="flex items-start gap-4 rounded-xl border border-sand/40 bg-ivory px-5 py-4 hover:border-sand transition-colors">
                  <FileText className="h-5 w-5 text-ochre shrink-0 mt-0.5" />
                  <div>
                    <p className="text-base font-semibold text-forest-green">{type}</p>
                    <p className="text-xs text-forest-green/50 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE REQUIREMENTS ─────────────────────────────────────────────── */}
      <section className="py-4 px-6 pb-10">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-sand/40 bg-ivory/80 p-8">
            <span className="text-xs font-bold uppercase tracking-widest text-ochre">Core Requirements</span>
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              {[
                'Clear English — UK or US spelling used consistently throughout',
                'IMRAD structure for original research manuscripts',
                'Structured abstract: 200–300 words with 4–8 keywords',
                'References in APA 7th, Vancouver, or ICMJE style',
                'Ethical clearance and conflict-of-interest declaration required',
                'Unpublished work not under simultaneous review elsewhere',
              ].map((req) => (
                <div key={req}
                  className="rounded-xl border border-sand/40 bg-ivory px-5 py-4 text-sm text-forest-green/80 leading-relaxed flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-ochre shrink-0 mt-2" />
                  {req}
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Link href="/register?role=author"
                className="inline-flex items-center gap-2 rounded-full bg-ochre px-8 py-3 text-sm font-bold text-ivory hover:bg-ochre/90 transition-colors">
                Start Submission <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FORMATTING SNAPSHOT ───────────────────────────────────────────── */}
      <section className="py-4 px-6 pb-10">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-ochre">Formatting Snapshot</span>
              <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-forest-green">
                Prepare your file before upload
              </h2>
            </div>
            <ClipboardList className="h-10 w-10 text-ochre shrink-0 mt-1" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { label: 'FONT',             value: 'Times New Roman, 12 pt' },
              { label: 'SPACING',          value: '1.5 line spacing throughout' },
              { label: 'MARGINS',          value: '2.5 cm on all sides' },
              { label: 'TABLES & FIGURES', value: 'Include legends and source notes' },
              { label: 'ACCEPTED FILES',   value: 'DOCX or PDF, max 20 MB' },
            ].map(({ label, value }) => (
              <div key={label}
                className="rounded-2xl border border-sand/40 bg-ivory px-4 pt-5 pb-6 flex flex-col gap-3">
                <span className="text-xs font-bold uppercase tracking-widest text-forest-green/40">{label}</span>
                <p className="font-display text-sm font-semibold text-forest-green leading-snug">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL AUTHOR DECLARATION ──────────────────────────────────────── */}
      <section className="py-4 px-6 pb-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-sand/40 bg-ivory/80 p-8 grid md:grid-cols-4 gap-8 items-start">
            <div className="flex flex-col gap-4 md:col-span-1">
              <Scale className="h-8 w-8 text-ochre" aria-hidden="true" />
              <h2 className="font-display text-2xl font-bold text-forest-green leading-snug">
                Final Author Declaration
              </h2>
            </div>
            <div className="md:col-span-3 grid sm:grid-cols-3 gap-6">
              {[
                { title: 'Originality', desc: 'Work is unpublished and not under review elsewhere.' },
                { title: 'Ethics',      desc: 'Approvals, consent, conflicts, and funding are fully disclosed.' },
                { title: 'Completeness',desc: 'Text, figures, tables, legends, and supplementary files are complete.' },
              ].map(({ title, desc }) => (
                <div key={title} className="flex flex-col gap-2">
                  <h3 className="font-semibold text-forest-green text-base">{title}</h3>
                  <p className="text-sm text-forest-green/60 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SUBMISSION CTA ────────────────────────────────────────────────── */}
      <section className="py-12 px-6 bg-sand/10 border-t border-sand/30">
        <div className="mx-auto max-w-3xl text-center flex flex-col items-center gap-5">
          <h2 className="font-display text-3xl font-bold text-forest-green">Ready to Submit?</h2>
          <p className="text-forest-green/60 text-base max-w-md leading-relaxed">
            Create your author account and begin the abstract submission process. Our editorial team will respond within 3–5 business days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/register?role=author"
              className="inline-flex items-center gap-2 rounded-full bg-ochre px-7 py-3 text-sm font-bold text-ivory hover:bg-ochre/90 transition-colors">
              Register &amp; Submit <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-forest-green/40 px-7 py-3 text-sm font-bold text-forest-green hover:border-forest-green transition-colors">
              Contact Editorial Office
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
