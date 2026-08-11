'use client';

// TODO Phase 8:
// Backend Integration Endpoint: POST /api/v1/submissions
// Request Payload: { title: string, journal: string, articleType: string, abstract: string, keywords: string[], affiliation: string, coAuthors?: string, fundingInfo?: string, conflictOfInterest: boolean, ethicsApproval: boolean, originalWork: boolean }
// Response Shape: ApiResponse<{ submission: Submission }>
// Loading State: Add local state isSubmitting and disable buttons
// Error State: Display form error message alert or handle validation issues

import { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { CheckCircle, ChevronRight } from 'lucide-react';
import { DEMO_JOURNALS, DEMO_ARTICLE_TYPES } from '@/lib/demo-data';

const STEPS = ['Abstract Details', 'Keywords & Metadata', 'Declaration', 'Submit'];

export default function NewSubmissionPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: '', journal: '', articleType: '', abstract: '',
    keywords: '', affiliation: '', coAuthors: '', fundingInfo: '',
    conflictOfInterest: false, ethicsApproval: false, originalWork: false,
  });

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  if (submitted) {
    return (
      <>
        <PageHeader title="New Submission" role="author" />
        <main className="flex-1 flex flex-col items-center justify-center gap-6 px-8 py-16">
          <div className="rounded-full bg-green-50 p-5">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="font-display text-2xl font-bold text-forest-green">Abstract Submitted!</h2>
          <p className="text-sm text-forest-green/60 text-center max-w-md">
            Your abstract has been received. The editorial team will review it within 3–5 business days.
            You will be notified by email once a decision is made.
          </p>
          <div className="rounded-2xl border border-sand/40 bg-white px-8 py-5 text-center">
            <p className="text-xs text-forest-green/40 uppercase tracking-widest mb-1">Submission ID</p>
            <p className="font-display text-xl font-bold text-ochre">MS-2025-{String(Date.now()).slice(-3)}</p>
          </div>
          <a href="/author/submissions" className="rounded-full bg-ochre px-7 py-3 text-sm font-bold text-ivory hover:bg-ochre/90">
            View My Submissions
          </a>
        </main>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="New Submission"
        subtitle="Abstract Submission Form"
        role="author"
      />

      <main className="flex-1 px-8 py-6 max-w-2xl mx-auto w-full flex flex-col gap-6">
        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex items-center justify-center rounded-full w-7 h-7 text-xs font-bold transition-colors
                ${i < step ? 'bg-green-500 text-white' : i === step ? 'bg-ochre text-ivory' : 'bg-sand/40 text-forest-green/40'}`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`text-xs font-bold uppercase tracking-widest hidden sm:block
                ${i === step ? 'text-forest-green' : 'text-forest-green/30'}`}>{s}</span>
              {i < STEPS.length - 1 && <ChevronRight className="h-3.5 w-3.5 text-forest-green/20" />}
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-sand/40 bg-white p-6 flex flex-col gap-5">
          {step === 0 && (
            <>
              <h2 className="font-display text-lg font-bold text-forest-green">Abstract Details</h2>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-widest text-forest-green/50">Manuscript Title *</span>
                <input value={form.title} onChange={e => set('title', e.target.value)}
                  placeholder="Full title of your manuscript"
                  className="rounded-xl border border-sand/40 px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-widest text-forest-green/50">Target Journal *</span>
                <select value={form.journal} onChange={e => set('journal', e.target.value)}
                  className="rounded-xl border border-sand/40 px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre">
                  <option value="">Select a journal</option>
                  {DEMO_JOURNALS.map(j => <option key={j}>{j}</option>)}
                </select>
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-widest text-forest-green/50">Article Type *</span>
                <select value={form.articleType} onChange={e => set('articleType', e.target.value)}
                  className="rounded-xl border border-sand/40 px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre">
                  <option value="">Select type</option>
                  {DEMO_ARTICLE_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-widest text-forest-green/50">Abstract * (150–300 words)</span>
                <textarea value={form.abstract} onChange={e => set('abstract', e.target.value)}
                  rows={6} placeholder="Paste your abstract here..."
                  className="rounded-xl border border-sand/40 px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre resize-none" />
                <span className="text-xs text-forest-green/30 text-right">{form.abstract.split(/\s+/).filter(Boolean).length} words</span>
              </label>
            </>
          )}

          {step === 1 && (
            <>
              <h2 className="font-display text-lg font-bold text-forest-green">Keywords & Metadata</h2>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-widest text-forest-green/50">Keywords * (comma-separated, 4–8)</span>
                <input value={form.keywords} onChange={e => set('keywords', e.target.value)}
                  placeholder="e.g. bilingualism, language acquisition, phonology"
                  className="rounded-xl border border-sand/40 px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-widest text-forest-green/50">Institutional Affiliation *</span>
                <input value={form.affiliation} onChange={e => set('affiliation', e.target.value)}
                  placeholder="University / Institute name and department"
                  className="rounded-xl border border-sand/40 px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-widest text-forest-green/50">Co-Authors (optional)</span>
                <input value={form.coAuthors} onChange={e => set('coAuthors', e.target.value)}
                  placeholder="Name (Affiliation); Name (Affiliation)"
                  className="rounded-xl border border-sand/40 px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-widest text-forest-green/50">Funding Information (optional)</span>
                <input value={form.fundingInfo} onChange={e => set('fundingInfo', e.target.value)}
                  placeholder="Grant number, funding body"
                  className="rounded-xl border border-sand/40 px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre" />
              </label>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="font-display text-lg font-bold text-forest-green">Author Declaration</h2>
              <p className="text-xs text-forest-green/50">Please confirm all declarations before submitting.</p>
              {[
                { key: 'originalWork', label: 'This manuscript is original work and has not been published or submitted elsewhere.' },
                { key: 'conflictOfInterest', label: 'I declare no conflict of interest, or have disclosed all relevant conflicts in the manuscript.' },
                { key: 'ethicsApproval', label: 'All research involving human or animal subjects has received appropriate ethics approval.' },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={form[key as keyof typeof form] as boolean}
                    onChange={e => set(key, e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-ochre" />
                  <span className="text-sm text-forest-green/70">{label}</span>
                </label>
              ))}
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="font-display text-lg font-bold text-forest-green">Review & Submit</h2>
              <div className="flex flex-col gap-3 text-sm">
                {[
                  ['Title', form.title],
                  ['Journal', form.journal],
                  ['Article Type', form.articleType],
                  ['Keywords', form.keywords],
                  ['Affiliation', form.affiliation],
                ].map(([label, value]) => (
                  <div key={label} className="flex gap-3 border-b border-sand/20 pb-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-forest-green/40 w-28 shrink-0">{label}</span>
                    <span className="text-forest-green/80">{value || '—'}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-forest-green/40 mt-2">
                A publication fee of ₹8,500 will be due only after your manuscript is accepted.
              </p>
            </>
          )}
        </div>

        <div className="flex justify-between">
          <button onClick={() => setStep(s => s - 1)} disabled={step === 0}
            className="rounded-full border border-sand/50 px-6 py-2.5 text-xs font-bold uppercase text-forest-green/60 hover:border-forest-green hover:text-forest-green disabled:opacity-30 transition-colors">
            ← Back
          </button>
          {step < STEPS.length - 1 ? (
            <button onClick={() => setStep(s => s + 1)}
              className="rounded-full bg-ochre px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90">
              Continue →
            </button>
          ) : (
            <button onClick={() => setSubmitted(true)}
              className="rounded-full bg-forest-green px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-forest-green/90">
              Submit Abstract
            </button>
          )}
        </div>
      </main>
    </>
  );
}
