'use client';

// TODO: Replace demo data with GET /api/v1/member/downloads once backend credentials are available.

import { PageHeader } from '@/components/common/PageHeader';
import { DEMO_DOWNLOADS } from '@/lib/demo-data';
import { Download, FileText } from 'lucide-react';

export default function DownloadsPage() {
  return (
    <>
      <PageHeader
        title="Downloads"
        subtitle={`${DEMO_DOWNLOADS.length} Files`}
        role="member"
      />

      <main className="flex-1 px-8 py-6 flex flex-col gap-3">
        {DEMO_DOWNLOADS.map(d => (
          <div key={d.id} className="rounded-2xl border border-sand/40 bg-white px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="rounded-xl bg-sand/30 p-3 shrink-0">
                <FileText className="h-5 w-5 text-forest-green/50" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-forest-green">{d.title}</h3>
                <p className="text-xs text-forest-green/50">{d.author}</p>
                <p className="text-xs text-forest-green/30 mt-0.5">{d.fileType} · {d.fileSize} · Downloaded {d.downloadDate}</p>
              </div>
            </div>
            <button className="flex items-center gap-1.5 rounded-full border border-sand/50 px-4 py-1.5 text-xs font-bold text-forest-green/60 hover:border-ochre hover:text-ochre transition-colors shrink-0">
              <Download className="h-3.5 w-3.5" /> Re-download
            </button>
          </div>
        ))}
      </main>
    </>
  );
}
