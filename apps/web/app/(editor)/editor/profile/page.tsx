'use client';

// TODO: Replace demo data with GET /api/v1/profile and PATCH /api/v1/profile once backend credentials are available.

import { useState } from 'react';
import { 
  User, GraduationCap, MapPin, Mail, 
  BookOpen, CheckCircle, Shield, Award, Layers 
} from 'lucide-react';

const DEMO_EDITOR_PROFILE = {
  fullName: 'Dr. Vikramaditya Sen',
  position: 'Senior Managing Editor',
  department: 'Department of Humanities & Social Sciences',
  institution: 'IIT Delhi',
  email: 'v.sen@iitd.ac.in',
  country: 'India',
  managedJournals: ['VYOM Journal of Language Studies (VJLS)', 'VYOM Quarterly Review (VQR)'],
  expertise: ['Computational Linguistics', 'Cognitive Phonology', 'South Asian Syntax', 'Language Contact'],
  stats: {
    submissionsManaged: 142,
    issuesPublished: 18,
    avgDecisionDays: 14,
    acceptanceRate: '28%',
  }
};

export default function EditorProfilePage() {
  const [form, setForm] = useState(DEMO_EDITOR_PROFILE);
  const [saved, setSaved] = useState(false);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
      {/* Header */}
      <div className="border-b border-sand/30 pb-6 mb-8">
        <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">Managing Board</span>
        <h1 className="font-display text-3xl font-bold text-forest-green mt-1">Editor Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Academic Bio Overview */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm flex flex-col items-center text-center">
            <div className="h-20 w-20 rounded-full bg-ochre/15 text-ochre flex items-center justify-center font-bold text-2xl shadow-sm border border-sand/30">
              {form.fullName.substring(0, 2).toUpperCase()}
            </div>

            <h2 className="font-display text-xl font-bold text-forest-green mt-4">{form.fullName}</h2>
            <p className="text-xs font-bold text-ochre mt-0.5">{form.position}</p>
            <p className="text-xs text-forest-green/55 mt-1 font-semibold flex items-center gap-1">
              <GraduationCap className="h-3.5 w-3.5" /> {form.department}
            </p>
            <p className="text-xs text-forest-green/45 font-medium">{form.institution}</p>

            {/* Editorial Stats Grid */}
            <div className="grid grid-cols-2 gap-3 border-t border-b border-sand/20 py-4 my-5 w-full text-center">
              <div>
                <p className="font-display text-xl font-bold text-forest-green">{form.stats.submissionsManaged}</p>
                <p className="text-[8px] font-extrabold uppercase tracking-widest text-forest-green/45 mt-0.5">Submissions</p>
              </div>
              <div>
                <p className="font-display text-xl font-bold text-forest-green">{form.stats.issuesPublished}</p>
                <p className="text-[8px] font-extrabold uppercase tracking-widest text-forest-green/45 mt-0.5">Issues Published</p>
              </div>
              <div>
                <p className="font-display text-xl font-bold text-forest-green">{form.stats.avgDecisionDays}d</p>
                <p className="text-[8px] font-extrabold uppercase tracking-widest text-forest-green/45 mt-0.5">Avg Decision</p>
              </div>
              <div>
                <p className="font-display text-xl font-bold text-forest-green">{form.stats.acceptanceRate}</p>
                <p className="text-[8px] font-extrabold uppercase tracking-widest text-forest-green/45 mt-0.5">Accept Rate</p>
              </div>
            </div>

            <div className="w-full text-left text-xs space-y-2">
              <div className="flex items-center gap-2 text-forest-green/70">
                <Mail className="h-3.5 w-3.5 text-forest-green/30" />
                <span className="truncate">{form.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Editable Information & Managed Journals */}
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-3xl border border-sand/40 bg-white p-6 sm:p-8 shadow-sm flex flex-col gap-6">
            <h2 className="font-display text-lg font-bold text-forest-green">Editorial Profile & Managed Portfolios</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: 'fullName', label: 'Full Name' },
                { key: 'position', label: 'Editorial Position' },
                { key: 'institution', label: 'Institution / University' },
                { key: 'department', label: 'Department / Faculty' },
                { key: 'email', label: 'Email Address' },
                { key: 'country', label: 'Country' },
              ].map(({ key, label }) => (
                <label key={key} className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-forest-green/40">{label}</span>
                  <input
                    type="text"
                    value={form[key as keyof typeof form] as string}
                    onChange={e => set(key, e.target.value)}
                    className="rounded-xl border border-sand/40 bg-white px-4 py-2.5 text-xs text-forest-green focus:outline-none focus:border-ochre focus:ring-1 focus:ring-ochre/20 transition-all font-medium"
                  />
                </label>
              ))}
            </div>

            {/* Managed Journals */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-forest-green/40 block mb-2">Managed Journal Titles</span>
              <div className="flex flex-col gap-2">
                {form.managedJournals.map(j => (
                  <div key={j} className="rounded-xl bg-ivory/50 border border-sand/30 px-4 py-2.5 text-xs font-bold text-forest-green flex items-center gap-2">
                    <Shield className="h-4 w-4 text-ochre" /> {j}
                  </div>
                ))}
              </div>
            </div>

            {/* Expertise Domains */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-forest-green/40 block mb-2">Editorial Expertise Specializations</span>
              <div className="flex flex-wrap gap-2">
                {form.expertise.map(exp => (
                  <span key={exp} className="rounded-full bg-sand/30 border border-sand/20 px-3 py-1 text-[10px] font-bold text-forest-green/70 uppercase tracking-wider">
                    {exp}
                  </span>
                ))}
              </div>
            </div>

            {/* Save Controls */}
            <div className="flex items-center justify-between border-t border-sand/20 pt-6 mt-2">
              {saved && (
                <span className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                  <CheckCircle className="h-4 w-4" /> Editor profile updated (demo mode)
                </span>
              )}
              <button
                type="button"
                onClick={handleSave}
                className="ml-auto rounded-full bg-ochre px-7 py-3 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 transition-colors shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
