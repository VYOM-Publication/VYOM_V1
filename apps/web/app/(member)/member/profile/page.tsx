'use client';

// TODO: Replace demo data with GET /api/v1/profile and PATCH /api/v1/profile once backend credentials are available.

import { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { useDemoAuth } from '@/lib/demo-auth';
import { CheckCircle, User } from 'lucide-react';

export default function MemberProfilePage() {
  const { session } = useDemoAuth();
  const [form, setForm] = useState({
    fullName: session?.name ?? 'Demo Reader',
    email: session?.email ?? 'reader@demo.com',
    phone: '',
    country: 'India',
    bio: '',
    interests: 'Linguistics, Literature, Social Sciences',
  });
  const [saved, setSaved] = useState(false);
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  return (
    <>
      <PageHeader
        title="My Profile"
        subtitle="Account Settings"
        role="member"
      />

      <main className="flex-1 px-8 py-6 max-w-xl mx-auto w-full flex flex-col gap-6">
        <div className="rounded-2xl border border-sand/40 bg-white p-6 flex items-center gap-4">
          <div className="rounded-full bg-ochre/10 p-5">
            <User className="h-8 w-8 text-ochre" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-forest-green">{form.fullName}</h2>
            <p className="text-sm text-forest-green/50">{form.email} · Member</p>
          </div>
        </div>

        <div className="rounded-2xl border border-sand/40 bg-white p-6 flex flex-col gap-4">
          <h2 className="font-display text-lg font-bold text-forest-green">Personal Information</h2>
          {[
            { key: 'fullName', label: 'Full Name' },
            { key: 'email', label: 'Email Address' },
            { key: 'phone', label: 'Phone Number' },
            { key: 'country', label: 'Country' },
            { key: 'interests', label: 'Reading Interests (comma-separated)' },
          ].map(({ key, label }) => (
            <label key={key} className="flex flex-col gap-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-forest-green/40">{label}</span>
              <input value={form[key as keyof typeof form]}
                onChange={e => set(key, e.target.value)}
                className="rounded-xl border border-sand/40 px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre" />
            </label>
          ))}
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase tracking-widest text-forest-green/40">Bio (optional)</span>
            <textarea value={form.bio} onChange={e => set('bio', e.target.value)}
              rows={3} className="rounded-xl border border-sand/40 px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre resize-none" />
          </label>
        </div>

        <div className="flex items-center justify-between">
          {saved && (
            <span className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle className="h-4 w-4" /> Saved (demo only)
            </span>
          )}
          <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 3000); }}
            className="ml-auto rounded-full bg-ochre px-7 py-3 text-sm font-bold text-ivory hover:bg-ochre/90">
            Save Changes
          </button>
        </div>
      </main>
    </>
  );
}
