'use client';

// TODO Phase 8:
// Backend Integration Endpoint:
// - GET /api/v1/reviews/:id -> Returns review assignment detail
// - POST /api/v1/reviews/:id/submit -> Submits review scorecard
// Request Payload: { scores: Record<string, number>, recommendation: string, comments: string, confidential?: string }

import { useState } from 'react';
import Link from 'next/link';
import { 
  DEMO_REVIEW_ASSIGNMENTS, 
  DEMO_REVIEW_CRITERIA, 
  DEMO_REVIEW_RECOMMENDATIONS 
} from '@/lib/demo-data';
import { 
  ArrowLeft, CheckCircle, Download, FileText, 
  Star, MessageSquare, ShieldAlert, Save, Send, HelpCircle 
} from 'lucide-react';
import { ReviewPipeline } from '@/components/reviewer/ReviewPipeline';

export default function AssignmentDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const a = DEMO_REVIEW_ASSIGNMENTS.find(x => x.id === id) ?? DEMO_REVIEW_ASSIGNMENTS[0];

  const [scores, setScores] = useState<Record<string, number>>({});
  const [recommendation, setRecommendation] = useState('');
  const [comments, setComments] = useState('');
  const [confidential, setConfidential] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [savedDraft, setSavedDraft] = useState(false);

  const avgScore = Object.values(scores).length
    ? (Object.values(scores).reduce((x, y) => x + y, 0) / Object.values(scores).length).toFixed(1)
    : '—';

  const handleSaveDraft = () => {
    setSavedDraft(true);
    setTimeout(() => setSavedDraft(false), 3000);
  };

  if (submitted) {
    return (
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-16 flex flex-col items-center justify-center text-center">
        <div className="rounded-full bg-emerald-50 border border-emerald-100 p-6 mb-4 shadow-sm">
          <CheckCircle className="h-14 w-14 text-emerald-600" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">Evaluation Complete</span>
        <h1 className="font-display text-3xl font-bold text-forest-green mt-2">Peer Review Submitted Successfully</h1>
        <p className="text-xs text-forest-green/60 max-w-md mt-2 leading-relaxed">
          Thank you for completing your evaluation of <strong>"{a.title}"</strong>. Your report has been dispatched to the Managing Editor.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Link 
            href="/reviewer/assignments" 
            className="rounded-full border border-sand px-6 py-3 text-xs font-bold uppercase tracking-widest text-forest-green hover:border-forest-green transition-colors"
          >
            Back to Active Assignments
          </Link>
          <Link 
            href="/reviewer/history" 
            className="rounded-full bg-ochre px-6 py-3 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 transition-colors shadow-sm"
          >
            View Review History
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
      {/* Back link */}
      <Link 
        href="/reviewer/assignments" 
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-forest-green/55 hover:text-forest-green mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Assignments
      </Link>

      {/* Header Card */}
      <div className="rounded-3xl border border-sand/40 bg-white p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-sand/20 pb-6 mb-6">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-xs font-bold text-ochre">{a.submissionId}</span>
              <span className="text-[10px] font-bold text-forest-green/45 uppercase tracking-wider">{a.journal}</span>
              <span className="rounded-full bg-ochre/10 px-2.5 py-0.5 text-[9px] font-bold text-ochre uppercase tracking-widest">{a.status}</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-forest-green leading-snug mt-2">
              {a.title}
            </h1>
            <p className="text-xs text-forest-green/50 mt-1">
              Author: {a.author} · Review Due Date: <span className="font-bold text-forest-green">{a.deadline}</span>
            </p>
          </div>

          {/* TODO: Replace href="#" with GET /api/v1/submissions/:id/file */}
          <a
            href="#"
            className="rounded-full bg-forest-green px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-forest-green/90 transition-colors inline-flex items-center gap-1.5 shrink-0 shadow-sm self-start"
          >
            <Download className="h-4 w-4" /> Download Manuscript PDF
          </a>
        </div>

        {/* Workflow Stage */}
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-forest-green/35 mb-2">
            Reviewer Progress
          </p>
          <ReviewPipeline status={a.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Abstract & Review Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Manuscript Summary & Abstract */}
          <section className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm flex flex-col gap-4">
            <h2 className="font-display text-lg font-bold text-forest-green flex items-center gap-2">
              <FileText className="h-5 w-5 text-forest-green/45" /> Manuscript Summary
            </h2>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-forest-green/35 mb-1">Abstract Proposal</p>
              <p className="text-xs text-forest-green/70 leading-relaxed italic">
                "{a.abstract}"
              </p>
            </div>

            {a.keywords && a.keywords.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-forest-green/35 mb-2">Keywords</p>
                <div className="flex flex-wrap gap-1.5">
                  {a.keywords.map(kw => (
                    <span key={kw} className="rounded-full bg-sand/30 border border-sand/20 px-3 py-1 text-[10px] font-bold text-forest-green/60 uppercase tracking-wider">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Evaluation Criteria Scoring */}
          <section className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-sand/20 pb-4">
              <div>
                <h2 className="font-display text-lg font-bold text-forest-green flex items-center gap-2">
                  <Star className="h-5 w-5 text-ochre" /> Evaluation Criteria
                </h2>
                <p className="text-xs text-forest-green/45 mt-0.5">Rate each criterion from 1 (poor) to 10 (excellent)</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-extrabold uppercase tracking-widest text-forest-green/40">Average Score</p>
                <p className="font-display text-2xl font-bold text-ochre mt-0.5">{avgScore} <span className="text-xs text-forest-green/30 font-normal">/ 10</span></p>
              </div>
            </div>

            <div className="space-y-5">
              {DEMO_REVIEW_CRITERIA.map(c => (
                <div key={c.key} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-forest-green">{c.label}</span>
                    <span className="text-xs font-bold text-ochre">{scores[c.key] ? `${scores[c.key]} / 10` : 'Not Rated'}</span>
                  </div>
                  <div className="grid grid-cols-10 gap-1">
                    {[...Array(10)].map((_, i) => {
                      const num = i + 1;
                      const isSelected = scores[c.key] === num;
                      return (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setScores(s => ({ ...s, [c.key]: num }))}
                          className={`h-8 rounded-lg text-xs font-bold transition-all ${
                            isSelected 
                              ? 'bg-ochre text-white shadow-sm scale-105' 
                              : 'bg-sand/20 text-forest-green/60 hover:bg-sand/45'
                          }`}
                        >
                          {num}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recommendation Selection */}
          <section className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm flex flex-col gap-4">
            <h2 className="font-display text-lg font-bold text-forest-green flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-forest-green/45" /> Editorial Recommendation
            </h2>
            <p className="text-xs text-forest-green/50">Select your final recommendation for the Managing Editor</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DEMO_REVIEW_RECOMMENDATIONS.map(r => {
                const isSelected = recommendation === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRecommendation(r)}
                    className={`rounded-2xl border p-4 text-xs font-bold text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-ochre bg-ochre/10 text-forest-green ring-2 ring-ochre/20 shadow-sm'
                        : 'border-sand/40 text-forest-green/70 hover:border-sand hover:bg-sand/10'
                    }`}
                  >
                    <span>{r}</span>
                    <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-ochre bg-ochre' : 'border-sand/50'
                    }`}>
                      {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Review Comments */}
          <section className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm flex flex-col gap-5">
            <h2 className="font-display text-lg font-bold text-forest-green flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-forest-green/45" /> Written Review Comments
            </h2>

            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-forest-green/45">Constructive Comments to Author *</span>
              <textarea 
                value={comments} 
                onChange={e => setComments(e.target.value)}
                rows={6} 
                placeholder="Provide specific feedback regarding methodology, strengths, clarity, and suggested revisions..."
                className="rounded-2xl border border-sand/40 bg-white px-4 py-3 text-xs text-forest-green focus:outline-none focus:border-ochre focus:ring-1 focus:ring-ochre/20 transition-all resize-none leading-relaxed font-medium" 
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-forest-green/45">Confidential Notes to Editor (Optional)</span>
              <textarea 
                value={confidential} 
                onChange={e => setConfidential(e.target.value)}
                rows={3} 
                placeholder="Private remarks for the managing editor regarding manuscript suitability or ethical compliance..."
                className="rounded-2xl border border-sand/40 bg-white px-4 py-3 text-xs text-forest-green focus:outline-none focus:border-ochre focus:ring-1 focus:ring-ochre/20 transition-all resize-none leading-relaxed font-medium" 
              />
            </label>
          </section>

          {/* Submission Controls */}
          <div className="flex items-center justify-between border-t border-sand/20 pt-6">
            {savedDraft ? (
              <span className="flex items-center gap-2 text-xs font-semibold text-green-600">
                <CheckCircle className="h-4 w-4" /> Draft saved locally
              </span>
            ) : (
              <span className="text-[10px] text-forest-green/35 italic">All progress saved in active state</span>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="rounded-full border border-sand px-5 py-3 text-xs font-bold uppercase tracking-widest text-forest-green/60 hover:border-forest-green hover:text-forest-green transition-colors inline-flex items-center gap-1.5"
              >
                <Save className="h-4 w-4" /> Save Draft
              </button>

              <button
                type="button"
                onClick={() => setSubmitted(true)}
                disabled={!recommendation || !comments.trim()}
                className="rounded-full bg-ochre px-7 py-3 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 disabled:opacity-40 transition-colors inline-flex items-center gap-1.5 shadow-sm"
              >
                <Send className="h-4 w-4" /> Submit Final Review
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Reviewer Instructions & Rubric Sidebar */}
        <div className="space-y-6">
          <section className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm flex flex-col gap-4">
            <h3 className="font-display text-base font-bold text-forest-green flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-forest-green/45" /> Reviewer Checklist
            </h3>
            <ul className="space-y-2.5 text-xs text-forest-green/70">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-ochre shrink-0 mt-0.5" />
                <span>Verify scientific rigor and methodological validity.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-ochre shrink-0 mt-0.5" />
                <span>Ensure proper references and citation formatting.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-ochre shrink-0 mt-0.5" />
                <span>Maintain respectful, constructive comments for the author.</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
