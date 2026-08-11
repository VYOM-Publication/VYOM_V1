'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DEMO_AUTHOR_PROFILE, DEMO_SUBMISSIONS } from '@/lib/demo-data';
import { 
  CheckCircle, User, Award, BookOpen, GraduationCap, 
  MapPin, Globe, Mail, Phone, BookMarked, MessageSquare 
} from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';

export default function AuthorProfilePage() {
  const [form, setForm] = useState(DEMO_AUTHOR_PROFILE);
  const [saved, setSaved] = useState(false);
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const published = DEMO_SUBMISSIONS.filter(s => s.status === 'PUBLISHED');

  return (
    <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
      {/* Page Header */}
      <div className="border-b border-sand/30 pb-6 mb-8">
        <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">Academic CV</span>
        <h1 className="font-display text-3xl font-bold text-forest-green mt-1">Academic Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: Academic Bio Overview Card */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm flex flex-col items-center text-center">
            {/* Initials Avatar */}
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

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-4 border-t border-b border-sand/20 py-4 my-5 w-full">
              <div className="text-center">
                <p className="font-display text-xl font-bold text-forest-green">{form.submissionCount}</p>
                <p className="text-[8px] font-extrabold uppercase tracking-widest text-forest-green/45 mt-0.5">Submissions</p>
              </div>
              <div className="text-center">
                <p className="font-display text-xl font-bold text-forest-green">{form.publishedCount}</p>
                <p className="text-[8px] font-extrabold uppercase tracking-widest text-forest-green/45 mt-0.5">Published</p>
              </div>
            </div>

            {/* Contact Specs */}
            <div className="w-full space-y-2.5 text-left text-xs">
              <div className="flex items-center gap-2.5 text-forest-green/70">
                <Mail className="h-3.5 w-3.5 text-forest-green/30" />
                <span className="truncate">{form.email}</span>
              </div>
              <div className="flex items-center gap-2.5 text-forest-green/70">
                <Phone className="h-3.5 w-3.5 text-forest-green/30" />
                <span>{form.phone || '+91 98765 43210'}</span>
              </div>
              {form.orcidId && (
                <div className="flex items-center gap-2.5 text-forest-green/70">
                  <Award className="h-3.5 w-3.5 text-forest-green/30" />
                  <span className="font-semibold text-ochre truncate">ORCID: {form.orcidId}</span>
                </div>
              )}
              {form.websiteUrl && (
                <a 
                  href={form.websiteUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2.5 text-ochre hover:underline"
                >
                  <Globe className="h-3.5 w-3.5 text-forest-green/30" />
                  <span className="truncate">{form.websiteUrl}</span>
                </a>
              )}
            </div>
          </div>

          {/* Academic Highlights Summary */}
          <div className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm">
            <h3 className="font-display text-sm font-bold text-forest-green mb-4">Academic Achievements</h3>
            <ul className="space-y-3.5 text-xs text-forest-green/70">
              <li className="flex gap-2">
                <Award className="h-4 w-4 text-ochre shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Editorial Board Member</p>
                  <p className="text-[10px] text-forest-green/45">Vyom Journal of Language Studies</p>
                </div>
              </li>
              <li className="flex gap-2">
                <MessageSquare className="h-4 w-4 text-ochre shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">5 Peer Review Contributions</p>
                  <p className="text-[10px] text-forest-green/45">Reviewed articles in cognitive speech studies</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side: Profile Forms + CV Fields */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Form */}
          <div className="rounded-3xl border border-sand/40 bg-white p-6 sm:p-8 shadow-sm flex flex-col gap-6">
            <h2 className="font-display text-lg font-bold text-forest-green">Curriculum Vitae Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: 'fullName', label: 'Full Name' },
                { key: 'email', label: 'Email Address' },
                { key: 'phone', label: 'Phone Number' },
                { key: 'orcidId', label: 'ORCID iD (Academic ID)' },
                { key: 'institution', label: 'Institution / Affiliation' },
                { key: 'department', label: 'Department' },
                { key: 'country', label: 'Country' },
                { key: 'websiteUrl', label: 'Academic Website URL' },
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
              <span className="text-[10px] font-bold uppercase tracking-widest text-forest-green/40">Research Biography</span>
              <textarea 
                value={form.biography} 
                onChange={e => set('biography', e.target.value)}
                rows={5} 
                className="rounded-xl border border-sand/40 bg-white px-4 py-2.5 text-xs text-forest-green focus:outline-none focus:border-ochre focus:ring-1 focus:ring-ochre/20 transition-all resize-none font-medium leading-relaxed" 
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-forest-green/40">Core Research Fields (comma-separated)</span>
              <input 
                type="text"
                value={form.researchAreas.join(', ')}
                onChange={e => setForm(f => ({ ...f, researchAreas: e.target.value.split(',').map(x => x.trim()) }))}
                className="rounded-xl border border-sand/40 bg-white px-4 py-2.5 text-xs text-forest-green focus:outline-none focus:border-ochre focus:ring-1 focus:ring-ochre/20 transition-all font-medium" 
              />
            </label>

            {/* Save Controls */}
            <div className="flex items-center justify-between border-t border-sand/20 pt-6 mt-2">
              {saved && (
                <span className="flex items-center gap-2 text-xs font-semibold text-green-600">
                  <CheckCircle className="h-4 w-4" /> Academic CV profile saved (demo only)
                </span>
              )}
              <button 
                onClick={handleSave}
                className="ml-auto rounded-full bg-ochre px-7 py-3 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 transition-colors shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* Recent Publications Section */}
          <section className="space-y-4">
            <h3 className="font-display text-lg font-bold text-forest-green flex items-center gap-2">
              <BookMarked className="h-5 w-5 text-forest-green/45" /> Research Publications
            </h3>
            {published.length === 0 ? (
              <p className="text-xs text-forest-green/45 bg-white border border-sand/30 rounded-2xl p-5 text-center">No research articles published yet.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {published.map(pub => (
                  <div key={pub.id} className="rounded-2xl border border-sand/40 bg-white p-5 flex justify-between items-center gap-4 hover:shadow-sm transition-shadow">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold text-ochre uppercase">{pub.id}</span>
                        <span className="text-[9px] font-bold text-forest-green/45 uppercase">{pub.journal}</span>
                      </div>
                      <h4 className="font-display font-bold text-forest-green text-xs mt-1 truncate">{pub.title}</h4>
                      <p className="text-[10px] text-forest-green/40 mt-0.5">Published: {pub.publishedDate} · DOI: {pub.doi}</p>
                    </div>
                    <Link 
                      href={`/author/submissions/${pub.id}`}
                      className="text-[10px] font-bold uppercase tracking-widest text-ochre hover:underline shrink-0"
                    >
                      View →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
