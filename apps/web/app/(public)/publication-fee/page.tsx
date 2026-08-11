'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

// TODO: Replace form submission with POST /api/v1/auth/register?role=author once backend credentials are available.

function RegisterCard() {
  const [form, setForm] = useState({ fullName: '', affiliation: '', email: '', discipline: '', password: '' });

  const disciplines = [
    'Arts & Humanities', 'Science & Technology', 'Social Sciences',
    'Medicine & Health', 'Law & Policy', 'Education', 'Business & Economics', 'Other',
  ];

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    window.location.href = '/register?role=author';
  }

  return (
    <div className="bg-white rounded-2xl shadow-card border border-sand/30 px-8 py-10 w-full max-w-md">
      <h2 className="font-display text-2xl font-bold text-forest-green mb-8 text-center">Create Author Account</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {[
          { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Dr. Jane Doe' },
          { name: 'affiliation', label: 'Academic Affiliation', type: 'text', placeholder: 'University / Institution' },
          { name: 'email', label: 'Professional Email', type: 'email', placeholder: 'jane.doe@university.edu' },
          { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
        ].map(({ name, label, type, placeholder }) => (
          <div key={name} className="flex flex-col gap-1.5">
            <label htmlFor={name} className="text-xs font-bold uppercase tracking-widest text-forest-green">{label}</label>
            <input id={name} type={type} name={name} value={form[name as keyof typeof form]}
              onChange={handleChange} placeholder={placeholder} required={type !== 'text' || name === 'fullName'}
              className="w-full rounded-lg border border-sand/60 bg-ivory/50 px-4 py-2.5 text-sm text-forest-green placeholder:text-forest-green/30 focus:outline-none focus:border-ochre transition-colors" />
          </div>
        ))}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="discipline" className="text-xs font-bold uppercase tracking-widest text-forest-green">Primary Discipline</label>
          <select id="discipline" name="discipline" value={form.discipline} onChange={handleChange}
            className="w-full rounded-lg border border-sand/60 bg-ivory/50 px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre transition-colors">
            <option value="">Select Discipline</option>
            {disciplines.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>

        <button type="submit"
          className="mt-2 w-full rounded-full bg-ochre py-3 text-sm font-bold text-ivory hover:bg-ochre/90 transition-colors flex items-center justify-center gap-2">
          Create Account <ArrowRight className="h-4 w-4" />
        </button>
      </form>
      <p className="mt-5 text-xs text-center text-forest-green/50">
        Already have an account?{' '}
        <Link href="/login/author" className="text-ochre font-semibold hover:underline">Sign in</Link>
      </p>
    </div>
  );
}

export default function PublishWithUsPage() {
  return (
    <>
      {/* ── MAIN: two-column hero + form ──────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="block h-px w-8 bg-ochre" />
            <span className="text-xs font-bold uppercase tracking-widest text-ochre">Publish With Us</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-forest-green leading-tight">
            Join Our Academic Community
          </h1>
          <p className="text-forest-green/60 text-base leading-relaxed max-w-md">
            VYOM Publication is dedicated to fostering rigorous research and providing
            an exacting home for authors. Our guided process takes you from abstract submission
            to publication.
          </p>
          <div className="flex flex-col gap-3">
            {[
              'Double-blind peer review by domain experts',
              'Publication decision within 21 days',
              'Article Processing Charge: ₹8,500 (payable only on acceptance)',
              'DOI assigned for all published articles',
              'Open access — freely available to all readers',
            ].map(item => (
              <div key={item} className="flex items-center gap-3 text-sm text-forest-green/70">
                <CheckCircle className="h-4 w-4 text-ochre shrink-0" />
                {item}
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-2">
            <Link href="/guidelines"
              className="inline-flex items-center gap-2 rounded-full border border-forest-green/40 px-6 py-2.5 text-sm font-semibold text-forest-green hover:border-forest-green transition-colors">
              Author Guidelines <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <RegisterCard />
        </div>
      </section>

      {/* ── Process steps ─────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-sand/10 border-t border-sand/30">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl font-bold text-forest-green text-center mb-10">The Publication Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { step: '01', label: 'Register', desc: 'Create your free author account.' },
              { step: '02', label: 'Submit Abstract', desc: 'Complete the 4-step abstract form.' },
              { step: '03', label: 'Editorial Review', desc: 'Abstract reviewed within 3–5 days.' },
              { step: '04', label: 'Upload Manuscript', desc: 'Submit full paper for peer review.' },
              { step: '05', label: 'Publication', desc: 'Accepted work published with DOI.' },
            ].map(({ step, label, desc }) => (
              <div key={step} className="rounded-2xl border border-sand/40 bg-white px-5 py-5 flex flex-col gap-2">
                <span className="text-xs font-bold text-forest-green/30">{step}</span>
                <h3 className="font-display text-base font-bold text-forest-green">{label}</h3>
                <p className="text-xs text-forest-green/50 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
