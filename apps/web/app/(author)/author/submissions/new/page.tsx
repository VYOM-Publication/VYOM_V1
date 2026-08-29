'use client';

// TODO Phase 8:
// Backend Integration Endpoint: POST /api/v1/submissions
// Request Payload: { title: string, journal: string, articleType: string, abstract: string, keywords: string[], affiliation: string, coAuthors?: string, fundingInfo?: string, conflictOfInterest: boolean, ethicsApproval: boolean, originalWork: boolean }
// Response Shape: ApiResponse<{ submission: Submission }>
// Loading State: Add local state isSubmitting and disable buttons
// Error State: Display form error message alert or handle validation issues

import { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/common/PageHeader';
import { CheckCircle, ChevronRight, UploadCloud, X } from 'lucide-react';
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
  const [manuscriptFile, setManuscriptFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [coverError, setCoverError] = useState('');

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setFileError('');
    if (!file) { setManuscriptFile(null); return; }
    const allowed = [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!allowed.includes(file.type)) {
      setFileError('Only .doc and .docx files are accepted.');
      setManuscriptFile(null);
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setFileError('File size must not exceed 20 MB.');
      setManuscriptFile(null);
      return;
    }
    setManuscriptFile(file);
  }

  function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setCoverError('');
    if (!file) { setCoverFile(null); setCoverPreview(null); return; }
    const allowed = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowed.includes(file.type)) {
      setCoverError('Only .png and .jpg / .jpeg images are accepted.');
      setCoverFile(null); setCoverPreview(null);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setCoverError('Cover image must not exceed 5 MB.');
      setCoverFile(null); setCoverPreview(null);
      return;
    }
    setCoverFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setCoverPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function removeCover() {
    setCoverFile(null);
    setCoverPreview(null);
    setCoverError('');
  }

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
          <Link href="/author/submissions" className="rounded-full bg-ochre px-7 py-3 text-sm font-bold text-ivory hover:bg-ochre/90">
            View My Submissions
          </Link>
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
                <span className="text-xs font-bold uppercase tracking-widest text-forest-green/50">Abstract * (up to 1000 words)</span>
                <textarea value={form.abstract} onChange={e => set('abstract', e.target.value)}
                  rows={10} placeholder="Paste your abstract here..."
                  className="rounded-xl border border-sand/40 px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre resize-none" />
                <span className={`text-xs text-right font-medium transition-colors ${
                  form.abstract.split(/\s+/).filter(Boolean).length > 1000
                    ? 'text-red-500'
                    : 'text-forest-green/30'
                }`}>
                  {form.abstract.split(/\s+/).filter(Boolean).length} / 1000 words
                </span>
              </label>

              {/* MS Word file upload */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-widest text-forest-green/50">
                  Manuscript File (optional) — .doc / .docx, max 20 MB
                </span>
                {!manuscriptFile ? (
                  <label className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-sand/60 bg-sand/10 px-6 py-8 cursor-pointer hover:border-ochre/50 hover:bg-ochre/5 transition-all">
                    <UploadCloud className="h-8 w-8 text-forest-green/30" />
                    <div className="text-center">
                      <p className="text-sm font-semibold text-forest-green/60">Click to upload your manuscript</p>
                      <p className="text-xs text-forest-green/30 mt-0.5">Accepted formats: .doc, .docx</p>
                    </div>
                    <input
                      type="file"
                      accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <UploadCloud className="h-5 w-5 text-green-600 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-forest-green">{manuscriptFile.name}</p>
                        <p className="text-xs text-forest-green/50">{(manuscriptFile.size / 1024).toFixed(0)} KB</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setManuscriptFile(null)}
                      className="text-forest-green/30 hover:text-red-500 transition-colors"
                      aria-label="Remove file"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                {fileError && <p className="text-xs text-red-500 font-medium">{fileError}</p>}
              </div>

              {/* Book Cover Image upload */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-widest text-forest-green/50">
                  Book Cover Image (optional) — .png / .jpg, max 5 MB
                </span>
                <p className="text-xs text-forest-green/30 -mt-0.5">
                  This image will be displayed when your book is published and visible to readers.
                </p>

                {!coverFile ? (
                  <label className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-sand/60 bg-sand/10 px-6 py-8 cursor-pointer hover:border-ochre/50 hover:bg-ochre/5 transition-all">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-sand/30 text-forest-green/30">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 21h18M3 3h18M3 9h18" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-forest-green/60">Click to upload book cover</p>
                      <p className="text-xs text-forest-green/30 mt-0.5">Accepted formats: .png, .jpg, .jpeg</p>
                      <p className="text-xs text-forest-green/30">Recommended: 800 × 1200 px (portrait)</p>
                    </div>
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg,image/png,image/jpeg"
                      onChange={handleCoverChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="flex items-start gap-4 rounded-xl border border-ochre/20 bg-ochre/5 p-4">
                    {/* Preview thumbnail */}
                    {coverPreview && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={coverPreview}
                        alt="Cover preview"
                        className="h-28 w-20 rounded-lg object-cover border border-sand/40 shadow-sm shrink-0"
                      />
                    )}
                    <div className="flex flex-col justify-between flex-1 gap-3">
                      <div>
                        <p className="text-sm font-semibold text-forest-green">{coverFile.name}</p>
                        <p className="text-xs text-forest-green/50 mt-0.5">{(coverFile.size / 1024).toFixed(0)} KB</p>
                      </div>
                      <button
                        type="button"
                        onClick={removeCover}
                        className="self-start inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-700 transition-colors"
                        aria-label="Remove cover image"
                      >
                        <X className="h-3.5 w-3.5" /> Remove cover
                      </button>
                    </div>
                  </div>
                )}
                {coverError && <p className="text-xs text-red-500 font-medium">{coverError}</p>}
              </div>
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
                  ['Manuscript File', manuscriptFile ? manuscriptFile.name : 'Not uploaded'],
                  ['Cover Image', coverFile ? coverFile.name : 'Not uploaded'],
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
              {coverPreview && (
                <div className="flex items-center gap-4 mt-2 pt-3 border-t border-sand/20">
                  <span className="text-xs font-bold uppercase tracking-widest text-forest-green/40 w-28 shrink-0">Cover Preview</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={coverPreview} alt="Cover" className="h-24 w-16 rounded-lg object-cover border border-sand/40 shadow-sm" />
                </div>
              )}
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
