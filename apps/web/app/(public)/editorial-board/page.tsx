// TODO Phase 8:
// Backend Integration Endpoint:
// - GET /api/v1/editorial-board -> Returns list of journals and their editorial board members
// Request Payload: None
// Response Shape: ApiResponse<{ boards: EditorialBoard[] }>
// Loading State: Add standard page-level loading state or skeletons
// Error State: Show query fail page with connection help text

import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { DEMO_EDITORIAL_BOARDS } from '@/lib/demo-data';

const ROLE_BADGE: Record<string, string> = {
  'Editor-in-Chief':             'bg-forest-green/10 text-forest-green',
  'Associate Editor':            'bg-ochre/10 text-ochre',
  'Reviewing Editor':            'bg-sand/40 text-forest-green/60',
  'Guest Editor (Special Issue)':'bg-teal-50 text-teal-700',
  'International Advisory':      'bg-blue-50 text-blue-700',
};

export default function EditorialBoardPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ivory py-20 px-6 text-center border-b border-sand/30">
        <div className="mx-auto max-w-3xl flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="block h-px w-12 bg-ochre" />
            <span className="text-xs font-bold uppercase tracking-widest text-ochre">Peer Review</span>
            <span className="block h-px w-12 bg-ochre" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-forest-green leading-tight">
            Editorial Board
          </h1>
          <p className="text-base text-forest-green/60 leading-relaxed max-w-2xl">
            VYOM Publication is served by an expert editorial board of academics, researchers,
            and publishing professionals committed to rigorous, fair, and timely peer review.
          </p>
        </div>
      </section>

      {/* Journal boards */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-5xl flex flex-col gap-14">
          {DEMO_EDITORIAL_BOARDS.map(({ journal, issn, frequency, scope, members }) => (
            <div key={journal} className="flex flex-col gap-6">
              {/* Journal header */}
              <div className="rounded-2xl border border-sand/40 bg-white px-7 py-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h2 className="font-display text-xl font-bold text-forest-green leading-snug">{journal}</h2>
                  <p className="text-sm text-forest-green/60 mt-1 leading-relaxed max-w-lg">{scope}</p>
                </div>
                <div className="flex flex-col gap-1 text-xs text-right shrink-0">
                  <span className="font-bold uppercase tracking-widest text-forest-green/40">ISSN</span>
                  <span className="font-mono text-forest-green/70">{issn}</span>
                  <span className="font-bold uppercase tracking-widest text-forest-green/40 mt-1">Frequency</span>
                  <span className="text-forest-green/70">{frequency}</span>
                </div>
              </div>

              {/* Members grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {members.map(({ name, role, institution, country }) => (
                  <div key={name}
                    className="rounded-2xl border border-sand/40 bg-ivory px-5 py-4 flex flex-col gap-2 hover:border-sand hover:shadow-card transition-all">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-sm font-bold text-forest-green leading-snug">{name}</h3>
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-bold ${ROLE_BADGE[role] ?? 'bg-sand/30 text-forest-green/50'}`}>
                        {role}
                      </span>
                    </div>
                    <p className="text-xs text-forest-green/60">{institution}</p>
                    <p className="text-xs text-forest-green/40">{country}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-16 px-6 bg-sand/10">
        <div className="mx-auto max-w-3xl rounded-3xl border border-sand/40 bg-ivory shadow-card px-8 py-14 flex flex-col items-center gap-6 text-center">
          <h2 className="font-display text-3xl font-bold text-forest-green">
            Interested in Joining Our Editorial Board?
          </h2>
          <p className="text-forest-green/60 max-w-md text-base leading-relaxed">
            We welcome applications from established academics with expertise in linguistics,
            humanities, or social sciences. Editorial positions are invitation-based.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-ochre px-7 py-3 text-sm font-semibold text-ivory hover:bg-ochre/90 transition-colors">
              <Mail className="h-4 w-4" /> Contact Editorial Office
            </Link>
            <Link href="/guidelines"
              className="inline-flex items-center gap-2 rounded-full border border-forest-green/40 px-7 py-3 text-sm font-semibold text-forest-green hover:border-forest-green transition-colors">
              Reviewer Guidelines <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
