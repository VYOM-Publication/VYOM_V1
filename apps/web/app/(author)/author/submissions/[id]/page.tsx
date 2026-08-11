'use client';

import { use } from 'react';
import Link from 'next/link';
import { DEMO_SUBMISSIONS } from '@/lib/demo-data';
import { 
  ArrowLeft, FileText, Upload, Calendar, User, 
  BookOpen, CheckCircle, ShieldAlert, DollarSign, MessageSquare, 
  Download, Clock, History 
} from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';
import { SubmissionPipeline } from '@/components/author/SubmissionPipeline';

const TIMELINE: Record<string, { label: string; date?: string; desc?: string; completed: boolean }[]> = {
  'MS-2025-012': [
    { label: 'Abstract Submitted', date: '2025-06-12', desc: 'Author submitted initial manuscript abstract proposal.', completed: true },
    { label: 'Abstract Approved', date: '2025-06-15', desc: 'Editor approved abstract proposal, requesting full manuscript.', completed: true },
    { label: 'Manuscript Uploaded', date: '2025-06-18', desc: 'Author uploaded draft manuscript v1.0.', completed: true },
    { label: 'Under Peer Review', desc: 'Peer reviewers assigned; review reports pending.', completed: false },
  ],
  'MS-2025-008': [
    { label: 'Abstract Submitted', date: '2025-05-03', desc: 'Author submitted initial manuscript abstract proposal.', completed: true },
    { label: 'Abstract Approved', date: '2025-05-07', desc: 'Editor approved abstract proposal.', completed: true },
    { label: 'Manuscript Uploaded', date: '2025-05-10', desc: 'Author uploaded draft manuscript v1.0.', completed: true },
    { label: 'Under Peer Review', date: '2025-05-15', desc: 'Peer reviewers assigned and reports evaluated.', completed: true },
    { label: 'Revision Requested', date: '2025-07-05', desc: 'Editor requested major revisions based on reviewer recommendations.', completed: true },
  ],
  'MS-2025-003': [
    { label: 'Abstract Submitted', date: '2025-03-18', desc: 'Author submitted initial manuscript abstract proposal.', completed: true },
    { label: 'Abstract Approved', date: '2025-03-22', desc: 'Editor approved abstract proposal.', completed: true },
    { label: 'Manuscript Uploaded', date: '2025-03-28', desc: 'Author uploaded draft manuscript v1.0.', completed: true },
    { label: 'Under Peer Review', date: '2025-04-02', desc: 'Peer reviewers assigned and reports evaluated.', completed: true },
    { label: 'Revision Requested', date: '2025-05-10', desc: 'Editor requested minor revisions.', completed: true },
    { label: 'Revision Submitted', date: '2025-05-28', desc: 'Author uploaded revised manuscript v1.1.', completed: true },
    { label: 'Accepted', date: '2025-06-28', desc: 'Manuscript accepted for publication.', completed: true },
  ],
  'MS-2024-089': [
    { label: 'Abstract Submitted', date: '2024-11-05', desc: 'Author submitted initial manuscript abstract proposal.', completed: true },
    { label: 'Abstract Approved', date: '2024-11-09', desc: 'Editor approved abstract proposal.', completed: true },
    { label: 'Manuscript Uploaded', date: '2024-11-15', desc: 'Author uploaded draft manuscript v1.0.', completed: true },
    { label: 'Under Peer Review', date: '2024-11-20', desc: 'Peer reviewers assigned and reports evaluated.', completed: true },
    { label: 'Revision Requested', date: '2025-01-08', desc: 'Editor requested minor revisions.', completed: true },
    { label: 'Revision Submitted', date: '2025-01-25', desc: 'Author uploaded revised manuscript v1.1.', completed: true },
    { label: 'Accepted', date: '2025-02-10', desc: 'Manuscript accepted for publication.', completed: true },
    { label: 'Payment Received', date: '2025-02-15', desc: 'Article Processing Charge processed successfully.', completed: true },
    { label: 'Published', date: '2025-03-01', desc: 'Article published in Vol. 12, Issue 3.', completed: true },
  ],
};

const MOCK_REVIEWS = [
  {
    reviewer: 'Reviewer 1',
    rating: 'Major Revision',
    comments: 'The paper presents interesting insights on bilingual language acquisition. However, the methodology section requires additional details regarding the cohort selection criteria. Visualizing the timeline of interventions would significantly strengthen the results.'
  },
  {
    reviewer: 'Reviewer 2',
    rating: 'Minor Revision',
    comments: 'Good research structure and writing style. The literature review should include citations from recent 2024-2025 papers in bilingual cognitive development. Data visualizations are clear.'
  }
];

export default function SubmissionDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const s = DEMO_SUBMISSIONS.find(x => x.id === id) ?? DEMO_SUBMISSIONS[0];
  const timeline = TIMELINE[s.id] ?? TIMELINE['MS-2025-012'];

  const needsPayment = s.status === 'ACCEPTED' && s.paymentStatus === 'pending';
  const needsRevision = s.status === 'REVISION';

  return (
    <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
      {/* Back Link */}
      <Link 
        href="/author/submissions" 
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-forest-green/55 hover:text-forest-green mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Submissions
      </Link>

      {/* Hero Header Card */}
      <div className="rounded-3xl border border-sand/40 bg-white p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-sand/20 pb-6 mb-6">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-ochre">{s.id}</span>
              <span className="text-xs font-bold text-forest-green/45 uppercase tracking-wider">{s.journal}</span>
              <StatusBadge status={s.status} />
              {needsPayment && <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-bold text-green-700">PAYMENT DUE</span>}
            </div>
            <h1 className="font-display text-2xl font-bold text-forest-green mt-3 leading-snug">
              {s.title}
            </h1>
            <p className="text-xs text-forest-green/50 mt-1.5">
              Manuscript Version: {s.currentVersion} · {s.daysInPipeline} days in publication pipeline
            </p>
          </div>
          
          {needsPayment && (
            <Link
              href={`/author/submissions/${s.id}/payment`}
              className="rounded-full bg-ochre px-6 py-3 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 transition-colors inline-flex items-center gap-2 self-start shadow-sm"
            >
              <DollarSign className="h-4 w-4" /> Pay APC Fee
            </Link>
          )}
        </div>

        {/* Horizontal Pipeline tracker */}
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-forest-green/35 mb-2">
            Publishing Stage
          </p>
          <SubmissionPipeline status={s.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Details, Comments, Files */}
        <div className="lg:col-span-2 space-y-8">
          {/* Action Alerts */}
          {needsRevision && s.revisionComments && (
            <div className="rounded-3xl border border-amber-200 bg-amber-50/40 p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-amber-800">
                <ShieldAlert className="h-5 w-5 shrink-0" />
                <h3 className="font-bold text-sm">Action Required: Revision Requested</h3>
              </div>
              <p className="text-xs text-amber-900/80 leading-relaxed">
                {s.revisionComments}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/50 border border-amber-100 rounded-2xl p-4 mt-2">
                <div className="text-left w-full">
                  <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest">Submission Deadline</span>
                  <p className="text-xs font-bold text-amber-800 mt-0.5">{s.revisionDeadline || '12 August 2025'}</p>
                </div>
                <button className="w-full sm:w-auto rounded-full bg-amber-600 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-amber-700 transition-colors shrink-0">
                  Upload Revision
                </button>
              </div>
            </div>
          )}

          {/* Manuscript Details */}
          <section className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm flex flex-col gap-5">
            <h2 className="font-display text-lg font-bold text-forest-green flex items-center gap-2">
              <FileText className="h-5 w-5 text-forest-green/45" /> Manuscript Details
            </h2>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-forest-green/35">Abstract</p>
              <p className="text-xs text-forest-green/70 leading-relaxed mt-1.5">
                {s.abstract || 'No abstract content was provided.'}
              </p>
            </div>
            
            {s.keywords && s.keywords.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-forest-green/35 mb-2">Keywords</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.keywords.map(kw => (
                    <span key={kw} className="rounded-full bg-sand/30 border border-sand/10 px-3 py-1 text-[10px] font-bold text-forest-green/60 uppercase tracking-wider">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-sand/20 pt-5 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              {[
                { label: 'Author', value: s.author, icon: User },
                { label: 'Institution', value: s.affiliation, icon: BookOpen },
                { label: 'Assigned Editor', value: s.editorName || 'Not Assigned', icon: User },
                { label: 'Peer Reviewers', value: `${s.reviewerCount} assigned`, icon: MessageSquare },
                { label: 'Submitted Date', value: s.submittedDate, icon: Calendar },
                { label: 'Current Version', value: `v${s.currentVersion}`, icon: Clock }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex gap-2">
                    <Icon className="h-4 w-4 text-forest-green/25 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold uppercase tracking-widest text-forest-green/30 text-[9px]">{item.label}</p>
                      <p className="text-forest-green/70 mt-0.5 font-medium leading-normal">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Peer Reviewer Reports */}
          {needsRevision && (
            <section className="space-y-4">
              <h2 className="font-display text-lg font-bold text-forest-green flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-forest-green/45" /> Peer Reviewer Comments
              </h2>
              <div className="flex flex-col gap-4">
                {MOCK_REVIEWS.map((rev, idx) => (
                  <div key={idx} className="rounded-2xl border border-sand/40 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between border-b border-sand/25 pb-3 mb-3">
                      <span className="font-bold text-forest-green text-xs">{rev.reviewer}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${
                        rev.rating.includes('Major') ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {rev.rating}
                      </span>
                    </div>
                    <p className="text-xs text-forest-green/70 leading-relaxed italic">
                      "{rev.comments}"
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Upload Draft Area */}
          {s.status === 'UNDER REVIEW' && (
            <section className="rounded-3xl border border-dashed border-sand/65 bg-sand/5 p-8 flex flex-col items-center justify-center text-center gap-3">
              <Upload className="h-10 w-10 text-forest-green/25" />
              <div>
                <h4 className="font-bold text-forest-green text-sm">Upload Revised Draft</h4>
                <p className="text-xs text-forest-green/45 mt-1">PDF document formatting formats only. Max file limit 20MB.</p>
              </div>
              <button className="rounded-full bg-forest-green px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-forest-green/90 transition-colors shadow-sm mt-2">
                Choose Document File
              </button>
              <p className="text-[10px] text-forest-green/30 italic">Demo view — uploading drafts is locked</p>
            </section>
          )}
        </div>

        {/* Right Column: Timeline Log / Files */}
        <div className="space-y-8">
          {/* Submission Log Timeline */}
          <section className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm flex flex-col gap-5">
            <h2 className="font-display text-lg font-bold text-forest-green flex items-center gap-2">
              <History className="h-5 w-5 text-forest-green/45" /> Pipeline History
            </h2>
            <div className="relative border-l border-sand/30 pl-5 ml-2 space-y-6">
              {timeline.map((item, idx) => (
                <div key={idx} className="relative">
                  <div className={`absolute -left-[27px] top-0.5 h-3.5 w-3.5 rounded-full border border-white flex items-center justify-center ${
                    item.completed ? 'bg-ochre' : 'bg-sand/40'
                  }`} />
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-xs font-bold ${item.completed ? 'text-forest-green' : 'text-forest-green/35'}`}>
                        {item.label}
                      </span>
                      {item.date && (
                        <span className="text-[9px] font-bold text-forest-green/35 uppercase tracking-wider shrink-0">
                          {item.date}
                        </span>
                      )}
                    </div>
                    {item.desc && (
                      <p className="text-[10px] text-forest-green/50 mt-1 leading-normal">{item.desc}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Submissions Files */}
          <section className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm flex flex-col gap-4">
            <h2 className="font-display text-base font-bold text-forest-green flex items-center gap-2">
              <FileText className="h-4 w-4 text-forest-green/45" /> Manuscript Files
            </h2>
            <div className="flex flex-col gap-3">
              {[
                { name: 'Manuscript_v1.0.pdf', size: '2.4 MB', date: s.submittedDate },
                ...(s.status === 'PUBLISHED' ? [{ name: 'Published_Final.pdf', size: '1.8 MB', date: s.publishedDate }] : [])
              ].map((file, idx) => (
                <div key={idx} className="rounded-xl border border-sand/20 bg-ivory/20 p-3 flex items-center justify-between gap-3 hover:bg-sand/10 transition-colors">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-forest-green truncate">{file.name}</p>
                    <p className="text-[9px] text-forest-green/40 mt-0.5">{file.size} · Uploaded {file.date}</p>
                  </div>
                  <button className="h-8 w-8 rounded-full hover:bg-sand/35 text-forest-green/60 hover:text-forest-green flex items-center justify-center shrink-0">
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
