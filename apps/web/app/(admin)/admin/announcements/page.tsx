'use client';

// TODO: Replace demo data with GET /api/v1/admin/announcements and POST /api/v1/admin/announcements once backend credentials are available.

import { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DEMO_ANNOUNCEMENTS } from '@/lib/demo-data';
import { Megaphone, Pin, Plus, X } from 'lucide-react';

export default function AdminAnnouncementsPage() {
  const [items, setItems] = useState(DEMO_ANNOUNCEMENTS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', category: 'General' });

  const handleAdd = () => {
    if (!form.title || !form.content) return;
    setItems(prev => [{
      id: `AN-${Date.now()}`,
      ...form,
      publishDate: new Date().toISOString().slice(0, 10),
      status: 'published',
      author: 'Demo Admin',
      pinned: false,
    }, ...prev]);
    setForm({ title: '', content: '', category: 'General' });
    setShowForm(false);
  };

  return (
    <>
      <PageHeader title="Announcements" subtitle="Platform Notices & Calls" role="admin" />

      <main className="flex-1 px-8 py-6 flex flex-col gap-4">
        <div className="flex justify-end">
          <button onClick={() => setShowForm(v => !v)}
            className="flex items-center gap-2 rounded-full bg-ochre px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90">
            <Plus className="h-3.5 w-3.5" /> New Announcement
          </button>
        </div>

        {/* New announcement form */}
        {showForm && (
          <div className="rounded-2xl border border-ochre/30 bg-ochre/5 p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-forest-green">New Announcement</h2>
              <button onClick={() => setShowForm(false)} className="text-forest-green/30 hover:text-forest-green">
                <X className="h-4 w-4" />
              </button>
            </div>
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="Announcement title"
              className="rounded-xl border border-sand/40 bg-white px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre" />
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              className="rounded-xl border border-sand/40 bg-white px-4 py-2.5 text-sm text-forest-green/60 focus:outline-none">
              {['General', 'Call for Papers', 'System Notice', 'New Journal', 'Fee Update'].map(c => <option key={c}>{c}</option>)}
            </select>
            <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              rows={4} placeholder="Announcement content..."
              className="rounded-xl border border-sand/40 bg-white px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre resize-none" />
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowForm(false)}
                className="rounded-full border border-sand/50 px-5 py-2 text-xs font-bold text-forest-green/60 hover:border-forest-green">
                Cancel
              </button>
              <button onClick={handleAdd}
                className="rounded-full bg-ochre px-5 py-2 text-xs font-bold text-ivory hover:bg-ochre/90">
                Publish
              </button>
            </div>
          </div>
        )}

        {/* List */}
        <div className="flex flex-col gap-3">
          {items.map(a => (
            <div key={a.id} className="rounded-2xl border border-sand/40 bg-white px-6 py-5 flex items-start gap-4">
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-forest-green/40 border border-sand/40 rounded-full px-2.5 py-0.5">{a.category}</span>
                  {a.pinned && <span className="flex items-center gap-1 text-xs font-bold text-ochre"><Pin className="h-3 w-3" /> Pinned</span>}
                  <span className="text-xs text-forest-green/30">{a.publishDate}</span>
                </div>
                <h3 className="font-display text-base font-bold text-forest-green mt-1">{a.title}</h3>
                <p className="text-sm text-forest-green/60 line-clamp-2">{a.content}</p>
                <p className="text-xs text-forest-green/30 mt-1">By {a.author}</p>
              </div>
              <div className="flex flex-col gap-2 items-end shrink-0">
                <button className="text-xs font-bold text-ochre hover:underline">Edit</button>
                <button onClick={() => setItems(i => i.filter(x => x.id !== a.id))}
                  className="text-xs text-red-400 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-20 text-forest-green/30">
            <Megaphone className="h-10 w-10" />
            <p className="text-sm">No announcements yet.</p>
          </div>
        )}
      </main>
    </>
  );
}
