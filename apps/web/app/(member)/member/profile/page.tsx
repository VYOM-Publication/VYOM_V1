'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { useAuthStore } from '@/lib/stores/auth.store';
import { CheckCircle, MapPin, Bookmark, Download, History, Calendar, Heart } from 'lucide-react';
import Link from 'next/link';

export default function MemberProfilePage() {
  const { user, setUser } = useAuthStore();
  const [form, setForm] = useState({
    fullName: user?.fullName ?? 'Reader Member',
    email: user?.email ?? 'member@vyompublication.com',
    phone: '+91 98765 43210',
    country: 'India',
    bio: 'Avid reader interested in linguistics, academic research, and contemporary Indian literature.',
    interests: 'Linguistics, Literature, Social Sciences, Artificial Intelligence',
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatarUrl ?? null);
  const [saved, setSaved] = useState(false);
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      setAvatarPreview(url);
      if (user) {
        setUser({ ...user, avatarUrl: url }, typeof window !== 'undefined' ? (window.__VYOM_ACCESS_TOKEN__ ?? '') : '');
      }
    };
    reader.readAsDataURL(file);
  }

  const handleSave = () => {
    if (user && avatarPreview) {
      setUser({ ...user, avatarUrl: avatarPreview }, typeof window !== 'undefined' ? (window.__VYOM_ACCESS_TOKEN__ ?? '') : '');
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <>
      <PageHeader
        title="My Profile"
        subtitle="Account Settings & Preferences"
        role="member"
      />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Reader Overview & Quick Stats */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-sand/40 bg-gradient-to-br from-white via-white to-ivory/50 p-6 shadow-card flex flex-col items-center text-center">
              {/* Avatar Profile Picture Uploader */}
              <div className="relative group cursor-pointer">
                {avatarPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatarPreview}
                    alt={form.fullName}
                    className="h-24 w-24 rounded-2xl object-cover border-2 border-ochre/60 shadow-md transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-2xl bg-ochre/15 text-ochre flex items-center justify-center font-display font-bold text-2xl shadow-sm border border-sand/30 transition-transform group-hover:scale-105">
                    {form.fullName.substring(0, 2).toUpperCase()}
                  </div>
                )}
                <label className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-forest-green/80 text-ivory text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer p-1">
                  <span>Upload Photo</span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-[10px] text-ochre font-semibold mt-2">Click photo to update avatar</p>

              <h2 className="font-display text-xl font-bold text-forest-green mt-3">{form.fullName}</h2>
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-ochre bg-ochre/10 border border-sand/20 px-3 py-1 rounded-full mt-1.5">
                Verified Reader Account
              </span>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-forest-green/50 mt-3">
                <MapPin className="h-3.5 w-3.5 text-ochre" /> {form.country || 'India'}
                <span className="text-sand">·</span>
                <Calendar className="h-3.5 w-3.5 text-ochre" /> Member since 2025
              </div>

              {/* Reader Quick Metrics */}
              <div className="grid grid-cols-3 gap-2 border-t border-b border-sand/20 py-4 my-5 w-full">
                <Link href="/member/bookmarks" className="text-center group">
                  <p className="font-display text-lg font-bold text-forest-green group-hover:text-ochre transition-colors">5</p>
                  <p className="text-[8px] font-extrabold uppercase tracking-widest text-forest-green/45 flex items-center justify-center gap-1 mt-0.5">
                    <Bookmark className="h-2.5 w-2.5 text-ochre" /> Saved
                  </p>
                </Link>
                <Link href="/member/downloads" className="text-center group border-x border-sand/20">
                  <p className="font-display text-lg font-bold text-forest-green group-hover:text-ochre transition-colors">3</p>
                  <p className="text-[8px] font-extrabold uppercase tracking-widest text-forest-green/45 flex items-center justify-center gap-1 mt-0.5">
                    <Download className="h-2.5 w-2.5 text-ochre" /> Offline
                  </p>
                </Link>
                <Link href="/member/reading-history" className="text-center group">
                  <p className="font-display text-lg font-bold text-forest-green group-hover:text-ochre transition-colors">12</p>
                  <p className="text-[8px] font-extrabold uppercase tracking-widest text-forest-green/45 flex items-center justify-center gap-1 mt-0.5">
                    <History className="h-2.5 w-2.5 text-ochre" /> Read
                  </p>
                </Link>
              </div>

              <div className="w-full text-left text-xs space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-forest-green/40">Email Address</p>
                <p className="font-semibold text-forest-green truncate">{form.email}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Personal Info & Reading Preferences Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl border border-sand/40 bg-white p-8 shadow-card border-l-4 border-l-ochre">
              <h2 className="font-display text-xl font-bold text-forest-green mb-6">Personal Information</h2>
              
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-widest text-forest-green">Full Name</span>
                    <input
                      value={form.fullName}
                      onChange={e => set('fullName', e.target.value)}
                      className="rounded-xl border border-sand/60 bg-ivory/40 px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre transition-colors"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-widest text-forest-green">Email Address</span>
                    <input
                      value={form.email}
                      onChange={e => set('email', e.target.value)}
                      className="rounded-xl border border-sand/60 bg-ivory/40 px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre transition-colors"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-widest text-forest-green">Phone Number</span>
                    <input
                      value={form.phone}
                      onChange={e => set('phone', e.target.value)}
                      placeholder="+91 98765 43210"
                      className="rounded-xl border border-sand/60 bg-ivory/40 px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre transition-colors"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-widest text-forest-green">Country</span>
                    <input
                      value={form.country}
                      onChange={e => set('country', e.target.value)}
                      className="rounded-xl border border-sand/60 bg-ivory/40 px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre transition-colors"
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold uppercase tracking-widest text-forest-green flex items-center gap-1">
                    <Heart className="h-3.5 w-3.5 text-ochre" /> Reading Interests & Categories
                  </span>
                  <input
                    value={form.interests}
                    onChange={e => set('interests', e.target.value)}
                    placeholder="Linguistics, Literature, AI, Social Sciences"
                    className="rounded-xl border border-sand/60 bg-ivory/40 px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre transition-colors"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold uppercase tracking-widest text-forest-green">Reader Bio</span>
                  <textarea
                    value={form.bio}
                    onChange={e => set('bio', e.target.value)}
                    rows={3}
                    placeholder="Tell us a little about your research and reading interests…"
                    className="rounded-xl border border-sand/60 bg-ivory/40 px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre resize-none transition-colors"
                  />
                </label>

                <div className="flex items-center justify-between pt-4 border-t border-sand/20 mt-2">
                  {saved ? (
                    <span className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                      <CheckCircle className="h-4 w-4" /> Profile updated successfully!
                    </span>
                  ) : (
                    <span />
                  )}
                  <button
                    onClick={handleSave}
                    className="rounded-full bg-ochre px-8 py-3 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 shadow-sm transition-colors"
                  >
                    Save Profile Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
