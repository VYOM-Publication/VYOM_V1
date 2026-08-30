'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DEMO_ANNOUNCEMENTS } from '@/lib/demo-data';
import { Megaphone, Pin, Plus, X, Search, CheckCircle2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminAnnouncementsPage() {
  const [items, setItems] = useState(DEMO_ANNOUNCEMENTS);
  const [showForm, setShowForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [form, setForm] = useState({ title: '', content: '', category: 'General Call' });

  const filtered = items.filter(a => {
    return filterCategory === 'ALL' || a.category === filterCategory;
  });

  const handleAdd = () => {
    if (!form.title.trim() || !form.content.trim()) {
      toast.error('Please fill in title and content.');
      return;
    }

    setItems(prev => [{
      id: `AN-${Date.now()}`,
      title: form.title,
      content: form.content,
      category: form.category,
      publishDate: new Date().toISOString().split('T')[0],
      status: 'published',
      author: 'Administrator',
      pinned: true,
    }, ...prev]);

    toast.success('New platform announcement published live!');
    setForm({ title: '', content: '', category: 'General Call' });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(x => x.id !== id));
    toast.success('Announcement removed.');
  };

  return (
    <>
      <PageHeader title="Platform Announcements & Calls" subtitle="Broadcast Public Notices & Journal Calls for Papers" role="admin" />

      <main className="flex-1 px-8 py-6 flex flex-col gap-6">
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand/30 pb-4">
          <div>
            <h2 className="font-display text-xl font-bold text-forest-green">Public Bulletins & Calls</h2>
            <p className="text-xs text-forest-green/50 mt-0.5">Post call for papers, system updates, and journal notices</p>
          </div>

          <button
            onClick={() => setShowForm(v => !v)}
            className="rounded-full bg-ochre px-6 py-3 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 shadow-sm transition-all inline-flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" /> New Announcement
          </button>
        </div>

        {/* Form Modal / Drawer */}
        {showForm && (
          <div className="rounded-3xl border border-ochre/40 bg-white p-6 shadow-lg flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-sand/20 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">Publish Notice</span>
                <h3 className="font-display text-lg font-bold text-forest-green mt-0.5">Create Announcement</h3>
              </div>
              <button onClick={() => setShowForm(false)} className="text-forest-green/40 hover:text-forest-green">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <label className="sm:col-span-2 flex flex-col gap-1">
                <span className="font-bold uppercase tracking-wider text-forest-green/60 text-[10px]">Announcement Title *</span>
                <input
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. VJLS Autumn 2026 Special Issue Call for Papers"
                  className="rounded-xl border border-sand/40 bg-ivory/30 px-3.5 py-2.5 text-forest-green focus:outline-none focus:border-ochre font-medium"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="font-bold uppercase tracking-wider text-forest-green/60 text-[10px]">Category *</span>
                <select
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="rounded-xl border border-sand/40 bg-ivory/30 px-3.5 py-2.5 text-forest-green focus:outline-none focus:border-ochre font-medium"
                >
                  {['General Call', 'Call for Papers', 'System Notice', 'New Volume Release', 'Policy Update'].map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="flex flex-col gap-1 text-xs">
              <span className="font-bold uppercase tracking-wider text-forest-green/60 text-[10px]">Announcement Details *</span>
              <textarea
                value={form.content}
                onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                rows={4}
                placeholder="Provide details, deadlines, guidelines, and submission instructions..."
                className="rounded-xl border border-sand/40 bg-ivory/30 px-3.5 py-2.5 text-forest-green focus:outline-none focus:border-ochre font-medium resize-none leading-relaxed"
              />
            </label>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowForm(false)}
                className="rounded-full border border-sand px-5 py-2 text-xs font-bold uppercase tracking-widest text-forest-green/60 hover:text-forest-green"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="rounded-full bg-ochre px-6 py-2 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 shadow-sm"
              >
                Publish Live
              </button>
            </div>
          </div>
        )}

        {/* Announcements List */}
        <div className="space-y-4">
          {filtered.map(a => (
            <div
              key={a.id}
              className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm hover:border-sand hover:shadow-card transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="rounded-full bg-ochre/10 border border-ochre/20 px-3 py-0.5 text-[9px] font-bold text-ochre uppercase tracking-widest">
                    {a.category}
                  </span>
                  {a.pinned && (
                    <span className="rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[9px] font-bold text-amber-700 uppercase tracking-widest inline-flex items-center gap-1">
                      <Pin className="h-3 w-3" /> Pinned Bulletin
                    </span>
                  )}
                  <span className="text-[10px] text-forest-green/40 font-semibold">Published {a.publishDate}</span>
                </div>

                <h3 className="font-display text-lg font-bold text-forest-green leading-snug">{a.title}</h3>
                <p className="text-xs text-forest-green/75 leading-relaxed font-medium">{a.content}</p>
                <p className="text-[10px] text-forest-green/40">Authorized by {a.author}</p>
              </div>

              <button
                onClick={() => handleDelete(a.id)}
                className="self-start text-red-400 hover:text-red-600 p-2 rounded-xl hover:bg-red-50 transition-colors shrink-0"
                title="Remove Announcement"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
