'use client';

// TODO: Replace demo data with GET /api/v1/issues and POST /api/v1/issues once backend credentials are available.

import { useState } from 'react';
import { DEMO_ARCHIVES_VOLUMES, DEMO_ISSUES_ARTICLES } from '@/lib/demo-data';
import { IssueCard } from '@/components/editor/IssueCard';
import { 
  BookPlus, Calendar, Layers, CheckCircle, 
  ArrowUp, ArrowDown, Download, Eye, Plus 
} from 'lucide-react';

export default function EditorIssuesPage() {
  const [createdMsg, setCreatedMsg] = useState(false);
  const [issuesList, setIssuesList] = useState(DEMO_ARCHIVES_VOLUMES.slice(0, 3));
  const [articlesList, setArticlesList] = useState(DEMO_ISSUES_ARTICLES);

  const handleCreateIssue = () => {
    const nextIssueNum = issuesList.length + 1;
    const newIssue = {
      journal: 'VJLS',
      vol: `Vol. 14, No. ${nextIssueNum}`,
      year: 2026,
      articles: 5,
      editor: 'Prof. Shital R Kalekar',
      indexed: true,
      access: 'Open Access',
      size: '12.4 MB',
    };
    setIssuesList([newIssue, ...issuesList]);
    setCreatedMsg(true);
    setTimeout(() => setCreatedMsg(false), 3000);
  };

  const moveArticle = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === articlesList.length - 1)) return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const next = [...articlesList];
    const temp = next[index];
    next[index] = next[targetIdx];
    next[targetIdx] = temp;
    // update order numbers
    setArticlesList(next.map((art, i) => ({ ...art, num: String(i + 1) })));
  };

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-sand/30 pb-6 mb-8 gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">Publishing Desk</span>
          <h1 className="font-display text-3xl font-bold text-forest-green mt-1">Issues & Volumes Workspace</h1>
        </div>

        <button
          type="button"
          onClick={handleCreateIssue}
          className="rounded-full bg-ochre px-6 py-3 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 transition-colors inline-flex items-center gap-2 self-start sm:self-auto shadow-sm"
        >
          <Plus className="h-4 w-4" /> Create New Issue
        </button>
      </div>

      {createdMsg && (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4 mb-6 flex items-center gap-2 text-xs font-semibold text-emerald-700">
          <CheckCircle className="h-4 w-4" /> New journal volume issue draft generated!
        </div>
      )}

      {/* Volume Issue Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {issuesList.map((issue, idx) => (
          <IssueCard
            key={idx}
            id={`issue-${idx}`}
            volume={14}
            issue={idx + 1}
            year={issue.year}
            title={`${issue.journal} — ${issue.vol}`}
            publishDate={`2026-0${(idx % 9) + 1}-01`}
            articlesCount={issue.articles}
            status={idx === 0 ? 'PUBLISHED' : idx === 1 ? 'SCHEDULED' : 'DRAFT'}
          />
        ))}
      </div>

      {/* Article Order & Compilation Manager */}
      <div className="rounded-3xl border border-sand/40 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-sand/20 pb-4">
          <div>
            <h2 className="font-display text-lg font-bold text-forest-green">Volume 14, Issue 3 — Article Sequencing</h2>
            <p className="text-xs text-forest-green/50 mt-0.5">Reorder accepted manuscripts for publication layout</p>
          </div>
          <span className="text-xs font-bold text-ochre uppercase tracking-wider">{articlesList.length} Accepted Papers</span>
        </div>

        <div className="space-y-3">
          {articlesList.map((art, idx) => (
            <div key={art.num} className="rounded-2xl border border-sand/30 bg-ivory/30 p-4 flex items-center justify-between gap-4 hover:bg-sand/10 transition-colors">
              <div className="flex items-center gap-4">
                <span className="h-7 w-7 rounded-full bg-sand/30 text-forest-green flex items-center justify-center font-bold text-xs shrink-0">
                  {art.num}
                </span>
                <div>
                  <h4 className="font-bold text-forest-green text-xs">{art.title}</h4>
                  <p className="text-[10px] text-forest-green/45 mt-0.5">{art.author} · Pages: {art.pages}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => moveArticle(idx, 'up')}
                  disabled={idx === 0}
                  title="Move Up"
                  className="p-1.5 rounded-lg border border-sand/40 hover:bg-sand/30 text-forest-green disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => moveArticle(idx, 'down')}
                  disabled={idx === articlesList.length - 1}
                  title="Move Down"
                  className="p-1.5 rounded-lg border border-sand/40 hover:bg-sand/30 text-forest-green disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
