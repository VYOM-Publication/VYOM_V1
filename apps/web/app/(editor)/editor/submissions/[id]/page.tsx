'use client';

// TODO: Replace demo data with GET /api/v1/submissions/:id and PATCH /api/v1/submissions/:id once backend credentials are available.

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, CheckCircle, Download, FileText, 
  Users, Clock, Send, ShieldAlert, CheckSquare, XCircle, RefreshCw, Calendar
} from 'lucide-react';
import { EditorialPipeline } from '@/components/editor/EditorialPipeline';

const DEMO_DETAIL = {
  'MS-2025-041': {
    id: 'MS-2025-041', title: 'Prosodic Bootstrapping in Early Bilingual Acquisition',
    author: 'Dr. Priya Raghunathan', affiliation: 'JNU, New Delhi', email: 'p.raghunathan@jnu.ac.in',
    journal: 'VJLS', type: 'Original Research Article', status: 'UNDER REVIEW',
    submittedDate: '2025-06-12', daysInPipeline: 19, version: 1,
    abstract: 'This study investigates prosodic bootstrapping mechanisms in early bilingual language acquisition, examining how infants use prosodic cues to segment and categorise words across two languages simultaneously.',
    keywords: ['prosodic bootstrapping', 'bilingual acquisition', 'infant language', 'phonology'],
    reviewers: [
      { name: 'Prof. D. Krishnaswamy', status: 'PENDING', deadline: '2025-07-24' },
      { name: 'Dr. S. Fernandes', status: 'IN PROGRESS', deadline: '2025-07-24' },
    ],
  },
  'MS-2025-038': {
    id: 'MS-2025-038', title: 'Negation Strategies Across Tibeto-Burman Contact Languages',
    author: 'Prof. Arjun Mehta', affiliation: 'EFLU, Hyderabad', email: 'a.mehta@eflu.ac.in',
    journal: 'VQR', type: 'Review Article', status: 'REVISION',
    submittedDate: '2025-05-03', daysInPipeline: 59, version: 2,
    abstract: 'A comparative analysis of negation strategies across Tibeto-Burman languages in contact situations, with implications for typological theory.',
    keywords: ['negation', 'Tibeto-Burman', 'contact linguistics', 'typology'],
    reviewers: [
      { name: 'Prof. A. Bhattacharya', status: 'COMPLETED', deadline: '2025-06-20' },
      { name: 'Dr. R. Nambiar', status: 'COMPLETED', deadline: '2025-06-20' },
    ],
  },
};

const REVIEWER_STATUS_STYLE: Record<string, string> = {
  'PENDING':     'bg-ochre/10 text-ochre border-ochre/20',
  'IN PROGRESS': 'bg-amber-50 text-amber-600 border-amber-100',
  'COMPLETED':   'bg-emerald-50 text-emerald-600 border-emerald-100',
};

export default function EditorSubmissionDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const s = DEMO_DETAIL[id as keyof typeof DEMO_DETAIL] ?? DEMO_DETAIL['MS-2025-041'];
  
  const [decision, setDecision] = useState('');
  const [comments, setComments] = useState('');
  const [decisionSaved, setDecisionSaved] = useState(false);

  const handleDecision = () => {
    if (!decision) return;
    setDecisionSaved(true);
    setTimeout(() => setDecisionSaved(false), 4000);
  };

  return (
    <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
      {/* Back link */}
      <Link
        href="/editor/submissions"
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-forest-green/55 hover:text-forest-green mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Submission Queue
      </Link>

      {/* Header Summary Card */}
      <div className="rounded-3xl border border-sand/40 bg-white p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-sand/20 pb-6 mb-6">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-xs font-bold text-ochre">{s.id}</span>
              <span className="text-[10px] font-bold text-forest-green/45 uppercase tracking-wider">{s.journal} · {s.type}</span>
              <span className="rounded-full bg-ochre/10 px-2.5 py-0.5 text-[9px] font-bold text-ochre uppercase tracking-widest">
                {s.status}
              </span>
            </div>
            
            <h1 className="font-display text-2xl font-bold text-forest-green leading-snug mt-2">
              {s.title}
            </h1>
            
            <p className="text-xs text-forest-green/50 mt-1">
              Submitted by <span className="font-bold text-forest-green">{s.author}</span> ({s.affiliation}) · {s.submittedDate}
            </p>
          </div>

          {/* TODO: Replace href="#" with GET /api/v1/submissions/:id/file */}
          <a
            href="#"
            className="rounded-full bg-forest-green px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-forest-green/90 transition-colors inline-flex items-center gap-1.5 shrink-0 shadow-sm self-start"
          >
            <Download className="h-4 w-4" /> Download Manuscript PDF (v{s.version}.0)
          </a>
        </div>

        {/* Workflow Stage */}
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-forest-green/35 mb-2">
            Editorial Pipeline Progress
          </p>
          <EditorialPipeline status={s.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Abstract & Reviewer Roster */}
        <div className="lg:col-span-2 space-y-8">
          {/* Abstract & Metadata */}
          <section className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm flex flex-col gap-4">
            <h2 className="font-display text-lg font-bold text-forest-green flex items-center gap-2">
              <FileText className="h-5 w-5 text-forest-green/45" /> Manuscript Abstract
            </h2>
            <p className="text-xs text-forest-green/70 leading-relaxed italic">
              "{s.abstract}"
            </p>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-forest-green/35 mb-2">Keywords</p>
              <div className="flex flex-wrap gap-1.5">
                {s.keywords.map(kw => (
                  <span key={kw} className="rounded-full bg-sand/30 border border-sand/20 px-3 py-1 text-[10px] font-bold text-forest-green/60 uppercase tracking-wider">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Reviewer Assignments Roster */}
          <section className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-sand/20 pb-4">
              <div>
                <h2 className="font-display text-lg font-bold text-forest-green flex items-center gap-2">
                  <Users className="h-5 w-5 text-ochre" /> Assigned Peer Reviewers
                </h2>
                <p className="text-xs text-forest-green/45 mt-0.5">Reviewers assigned to evaluate this manuscript</p>
              </div>

              <Link
                href="/editor/reviewers"
                className="rounded-full bg-ochre px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 transition-colors"
              >
                + Assign Reviewer
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {s.reviewers.map((rev, idx) => (
                <div key={idx} className="rounded-2xl border border-sand/30 bg-ivory/30 p-4 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-forest-green text-xs">{rev.name}</h4>
                    <p className="text-[10px] text-forest-green/40 mt-0.5">Review Due: {rev.deadline}</p>
                  </div>

                  <span className={`rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-widest ${REVIEWER_STATUS_STYLE[rev.status] || 'bg-sand/30 text-forest-green/60'}`}>
                    {rev.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Editorial Decision Recording Form */}
          <section className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm flex flex-col gap-5">
            <h2 className="font-display text-lg font-bold text-forest-green flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-forest-green/45" /> Editorial Decision & Actions
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'REVISION', label: 'Request Revision', icon: RefreshCw, style: 'border-amber-300 text-amber-700 bg-amber-50/50' },
                { id: 'ACCEPT',   label: 'Accept Manuscript', icon: CheckCircle, style: 'border-emerald-300 text-emerald-700 bg-emerald-50/50' },
                { id: 'REJECT',   label: 'Reject Manuscript', icon: XCircle, style: 'border-red-300 text-red-700 bg-red-50/50' },
                { id: 'SCHEDULE', label: 'Schedule Issue', icon: Calendar, style: 'border-ochre/40 text-ochre bg-ochre/10' },
              ].map(opt => {
                const isSelected = decision === opt.id;
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setDecision(opt.id)}
                    className={`rounded-2xl border p-3 text-xs font-bold text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                      isSelected 
                        ? `${opt.style} ring-2 ring-ochre/30 shadow-sm scale-105` 
                        : 'border-sand/40 text-forest-green/60 hover:border-sand hover:bg-sand/10'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-[10px] leading-tight">{opt.label}</span>
                  </button>
                );
              })}
            </div>

            <label className="flex flex-col gap-1.5 mt-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-forest-green/45">Editorial Decision Remarks & Rationale</span>
              <textarea
                value={comments}
                onChange={e => setComments(e.target.value)}
                rows={4}
                placeholder="Provide official editorial instructions for author revision or rationale for decision..."
                className="rounded-2xl border border-sand/40 bg-white px-4 py-3 text-xs text-forest-green focus:outline-none focus:border-ochre focus:ring-1 focus:ring-ochre/20 transition-all resize-none leading-relaxed font-medium"
              />
            </label>

            <div className="flex items-center justify-between border-t border-sand/20 pt-4">
              {decisionSaved ? (
                <span className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                  <CheckCircle className="h-4 w-4" /> Editorial decision recorded successfully (demo)
                </span>
              ) : (
                <span className="text-[10px] text-forest-green/35 italic">Select decision and record remarks</span>
              )}

              <button
                type="button"
                onClick={handleDecision}
                disabled={!decision}
                className="rounded-full bg-ochre px-7 py-3 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 disabled:opacity-40 transition-colors inline-flex items-center gap-1.5 shadow-sm"
              >
                <Send className="h-4 w-4" /> Record Decision
              </button>
            </div>
          </section>
        </div>

        {/* Right Column: Author Information & Manuscript File History */}
        <div className="space-y-6">
          <section className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm flex flex-col gap-4">
            <h3 className="font-display text-base font-bold text-forest-green">Author Details</h3>
            <div className="space-y-2 text-xs text-forest-green/70">
              <p><strong className="text-forest-green">Name:</strong> {s.author}</p>
              <p><strong className="text-forest-green">Affiliation:</strong> {s.affiliation}</p>
              <p><strong className="text-forest-green">Email:</strong> {s.email}</p>
            </div>
          </section>

          <section className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm flex flex-col gap-4">
            <h3 className="font-display text-base font-bold text-forest-green">Submission Metadata</h3>
            <div className="space-y-2 text-xs text-forest-green/70">
              <p><strong className="text-forest-green">Journal:</strong> {s.journal}</p>
              <p><strong className="text-forest-green">Manuscript Type:</strong> {s.type}</p>
              <p><strong className="text-forest-green">Submitted Date:</strong> {s.submittedDate}</p>
              <p><strong className="text-forest-green">Days in Pipeline:</strong> {s.daysInPipeline} days</p>
              <p><strong className="text-forest-green">Draft Version:</strong> v{s.version}.0</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
