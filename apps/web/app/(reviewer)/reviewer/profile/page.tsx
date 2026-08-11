'use client';

// TODO: Replace demo data with GET /api/v1/profile and PATCH /api/v1/profile once backend credentials are available.

import { useState } from 'react';
import { DEMO_REVIEWER_PROFILE } from '@/lib/demo-data';
import { 
  CheckCircle, User, Award, GraduationCap, MapPin, 
  Mail, Clock, Star, ToggleLeft, ToggleRight 
} from 'lucide-react';

export default function ReviewerProfilePage() {
  const [form, setForm] = useState(DEMO_REVIEWER_PROFILE);
  const [saved, setSaved] = useState(false);
  
  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
      {/* Header */}
      <div className="border-b border-sand/30 pb-6 mb-8">
        <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">Peer Reviewer Bio</span>
        <h1 className="font-display text-3xl font-bold text-forest-green mt-1">Reviewer Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Academic Overview */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm flex flex-col items-center text-center">
            {/* Initials Badge */}
            <div className="h-20 w-20 rounded-full bg-ochre/15 text-ochre flex items-center justify-center font-bold text-2xl shadow-sm border border-sand/30">
              {form.fullName.substring(0, 2).toUpperCase()}
            </div>

            <h2 className="font-display text-xl font-bold text-forest-green mt-4">{form.fullName}</h2>
            <p className="text-xs text-forest-green/55 mt-1 font-semibold flex items-center gap-1">
              <GraduationCap className="h-3.5 w-3.5" /> {form.department}
            </p>
            <p className="text-xs text-forest-green/45 font-medium">{form.institution}</p>

            <div className="flex items-center gap-1 text-[10px] font-bold text-forest-green/40 mt-3 uppercase tracking-wider">
              <MapPin className="h-3 w-3" /> {form.country || 'India'}
            </div>

            {/* Performance metrics grid */}
            <div className="grid grid-cols-3 gap-2 border-t border-b border-sand/20 py-4 my-5 w-full text-center">
              <div>
                <p className="font-display text-xl font-bold text-forest-green">{form.totalReviews}</p>
                <p className="text-[8px] font-extrabold uppercase tracking-widest text-forest-green/45 mt-0.5">Reviews</p>
              </div>
              <div>
                <p className="font-display text-xl font-bold text-forest-green">{form.hIndex}</p>
                <p className="text-[8px] font-extrabold uppercase tracking-widest text-forest-green/45 mt-0.5">h-Index</p>
              </div>
              <div>
                <p className="font-display text-xl font-bold text-forest-green">{form.performanceScore}</p>
                <p className="text-[8px] font-extrabold uppercase tracking-widest text-forest-green/45 mt-0.5">Rating</p>
              </div>
            </div>

            <div className="w-full text-left text-xs space-y-2">
              <div className="flex items-center gap-2 text-forest-green/70">
                <Mail className="h-3.5 w-3.5 text-forest-green/30" />
                <span className="truncate">{form.email}</span>
              </div>
              <div className="flex items-center gap-2 text-forest-green/70">
                <Clock className="h-3.5 w-3.5 text-forest-green/30" />
                <span>Avg Turnaround: {form.avgTurnaround} days</span>
              </div>
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-forest-green">Available for Requests</p>
              <p className="text-[10px] text-forest-green/40 mt-0.5">Toggle off to pause incoming review invitations</p>
            </div>
            <button 
              type="button"
              onClick={() => set('isAvailable', !form.isAvailable)}
              className={`relative w-12 h-6 rounded-full transition-colors ${form.isAvailable ? 'bg-ochre' : 'bg-sand/40'}`}
            >
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.isAvailable ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>

        {/* Right Column: Editable CV Information */}
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-3xl border border-sand/40 bg-white p-6 sm:p-8 shadow-sm flex flex-col gap-6">
            <h2 className="font-display text-lg font-bold text-forest-green">Academic Reviewer Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: 'fullName', label: 'Full Name' },
                { key: 'email', label: 'Email Address' },
                { key: 'institution', label: 'Institution / University' },
                { key: 'department', label: 'Department / Faculty' },
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

            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-forest-green/40">Expertise Domains (Comma-separated)</span>
              <input 
                type="text"
                value={form.expertiseDomains.join(', ')}
                onChange={e => setForm(f => ({ ...f, expertiseDomains: e.target.value.split(',').map(x => x.trim()) }))}
                className="rounded-xl border border-sand/40 bg-white px-4 py-2.5 text-xs text-forest-green focus:outline-none focus:border-ochre focus:ring-1 focus:ring-ochre/20 transition-all font-medium" 
              />
            </label>

            {/* Display Active Tags */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-forest-green/40 block mb-2">Active Specialization Tags</span>
              <div className="flex flex-wrap gap-2">
                {form.expertiseDomains.map(dom => (
                  <span key={dom} className="rounded-full bg-sand/30 border border-sand/20 px-3 py-1 text-[10px] font-bold text-forest-green/70 uppercase tracking-wider">
                    {dom}
                  </span>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between border-t border-sand/20 pt-6 mt-2">
              {saved && (
                <span className="flex items-center gap-2 text-xs font-semibold text-green-600">
                  <CheckCircle className="h-4 w-4" /> Reviewer profile updated (demo mode)
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
