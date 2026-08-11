'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Mail, Phone, MapPin, Clock, CheckCircle,
  AlertCircle, ArrowRight,
} from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────
interface FormState { name: string; email: string; subject: string; message: string; }
interface FormErrors { name?: string; email?: string; subject?: string; message?: string; }
type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

function validate(data: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim() || data.name.trim().length < 2)
    errors.name = 'Full name must be at least 2 characters.';
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = 'Please enter a valid email address.';
  if (!data.subject.trim() || data.subject.trim().length < 3)
    errors.subject = 'Please select a subject.';
  if (!data.message.trim() || data.message.trim().length < 20)
    errors.message = 'Message must be at least 20 characters.';
  return errors;
}

const SUBJECTS = [
  'General Enquiry',
  'Manuscript Submission',
  'Publication Fee & Payments',
  'Peer Review Process',
  'Rights & Permissions',
  'Technical Support',
  'Media & Press',
  'Other',
];

// TODO: Replace form submission with POST /api/v1/contact once backend credentials are available.

export default function ContactPage() {
  const [form, setForm]       = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors]   = useState<FormErrors>({});
  const [status, setStatus]   = useState<SubmitStatus>('idle');
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});

  function handleChange(field: keyof FormState, value: string) {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (touched[field]) {
      const e = validate(updated);
      setErrors((prev) => ({ ...prev, [field]: e[field] }));
    }
  }

  function handleBlur(field: keyof FormState) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const e = validate(form);
    setErrors((prev) => ({ ...prev, [field]: e[field] }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });
    const newErrors = validate(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setStatus('loading');
    try {
      await new Promise((res) => setTimeout(res, 1500));
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTouched({});
      setErrors({});
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-ivory py-16 px-6 text-center border-b border-sand/30">
        <div className="mx-auto max-w-2xl flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="block h-px w-12 bg-ochre" />
            <span className="text-xs font-bold uppercase tracking-widest text-ochre">Get In Touch</span>
            <span className="block h-px w-12 bg-ochre" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-forest-green leading-tight">
            Contact Us
          </h1>
          <p className="text-base text-forest-green/60 leading-relaxed max-w-lg">
            Have a question about publishing, peer review, or our platform? Our editorial
            team is here to help. We respond within 2–3 business days.
          </p>
        </div>
      </section>

      {/* ── CONTACT INFO CARDS ────────────────────────────────────────────── */}
      <section className="py-12 px-6">
        <div className="mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Mail,  label: 'Email Us',     primary: 'ORGANIZATIONVYOM@gmail.com', secondary: 'We reply within 2–3 business days', href: 'mailto:ORGANIZATIONVYOM@gmail.com' },
            { icon: Phone, label: 'Call Us',       primary: '9325349303', secondary: '9021581421', href: 'tel:+919325349303' },
            { icon: MapPin,label: 'Visit Us',      primary: 'Yashwanta Nagar, Talegaon Dabhade', secondary: 'Pune, Maharashtra, India 410506', href: null },
            { icon: Clock, label: 'Office Hours',  primary: 'Monday – Friday', secondary: '10:00 AM – 6:00 PM IST', href: null },
          ].map(({ icon: Icon, label, primary, secondary, href }) => (
            <div key={label}
              className="flex flex-col gap-3 rounded-2xl border border-sand/40 bg-ivory p-6 hover:border-sand hover:shadow-card transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ochre/10">
                <Icon className="h-5 w-5 text-ochre" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-forest-green/40 mb-1">{label}</p>
                {href ? (
                  <a href={href} className="text-sm font-semibold text-forest-green hover:text-ochre transition-colors block break-all">{primary}</a>
                ) : (
                  <p className="text-sm font-semibold text-forest-green">{primary}</p>
                )}
                <p className="text-xs text-forest-green/50 mt-0.5">{secondary}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FORM + SIDEBAR ────────────────────────────────────────────────── */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-4xl flex flex-col lg:flex-row gap-10">

          {/* Contact Form */}
          <div className="flex-1 min-w-0">
            <div className="rounded-2xl border border-sand/40 bg-white p-8 shadow-card">
              <h2 className="font-display text-2xl font-bold text-forest-green mb-1">Send Us a Message</h2>
              <p className="text-sm text-forest-green/50 mb-8">Fill in the form and we will get back to you within 2–3 business days.</p>

              {status === 'success' && (
                <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4" role="alert">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-forest-green text-sm">Message sent!</p>
                    <p className="mt-0.5 text-sm text-forest-green/60">Our team will respond within 2–3 business days.</p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4" role="alert">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-forest-green text-sm">Something went wrong.</p>
                    <p className="mt-0.5 text-sm text-forest-green/60">
                      Please try again or email{' '}
                      <a href="mailto:ORGANIZATIONVYOM@gmail.com" className="text-ochre hover:underline">ORGANIZATIONVYOM@gmail.com</a>
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-forest-green">Full Name</label>
                    <input id="name" type="text" placeholder="Dr. Jane Doe" value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)} onBlur={() => handleBlur('name')}
                      aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-err' : undefined}
                      className={`w-full rounded-lg border px-4 py-2.5 text-sm text-forest-green placeholder:text-forest-green/30 bg-ivory/50 focus:outline-none focus:border-ochre transition-colors ${errors.name ? 'border-red-400' : 'border-sand/60'}`} />
                    {errors.name && <p id="name-err" className="text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-forest-green">Email Address</label>
                    <input id="email" type="email" placeholder="you@institution.edu" value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)} onBlur={() => handleBlur('email')}
                      aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-err' : undefined}
                      className={`w-full rounded-lg border px-4 py-2.5 text-sm text-forest-green placeholder:text-forest-green/30 bg-ivory/50 focus:outline-none focus:border-ochre transition-colors ${errors.email ? 'border-red-400' : 'border-sand/60'}`} />
                    {errors.email && <p id="email-err" className="text-xs text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-forest-green">Subject</label>
                  <select id="subject" value={form.subject}
                    onChange={(e) => handleChange('subject', e.target.value)} onBlur={() => handleBlur('subject')}
                    aria-invalid={!!errors.subject}
                    className={`w-full rounded-lg border px-4 py-2.5 text-sm text-forest-green bg-ivory/50 focus:outline-none focus:border-ochre transition-colors ${errors.subject ? 'border-red-400' : 'border-sand/60'}`}>
                    <option value="">Select a subject…</option>
                    {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.subject && <p className="text-xs text-red-500">{errors.subject}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-forest-green">Message</label>
                  <textarea id="message" rows={6} placeholder="Please describe your query in detail…" value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)} onBlur={() => handleBlur('message')}
                    aria-invalid={!!errors.message}
                    className={`w-full rounded-lg border px-4 py-2.5 text-sm text-forest-green placeholder:text-forest-green/30 bg-ivory/50 resize-none focus:outline-none focus:border-ochre transition-colors ${errors.message ? 'border-red-400' : 'border-sand/60'}`} />
                  {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                </div>

                <button type="submit" disabled={status === 'loading'}
                  className="self-start inline-flex items-center gap-2 rounded-full bg-ochre px-8 py-3 text-sm font-bold text-ivory hover:bg-ochre/90 disabled:opacity-60 transition-colors">
                  {status === 'loading' ? 'Sending…' : <> Send Message <ArrowRight className="h-4 w-4" /> </>}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0 flex flex-col gap-5">
            <div className="rounded-2xl bg-forest-green p-6 flex flex-col gap-4">
              <h3 className="font-display text-base font-bold text-ivory">Editorial Office</h3>
              <div className="flex flex-col gap-3">
                {[
                  { icon: MapPin, text: 'Yashwanta Nagar, Talegaon Dabhade, Pune, Maharashtra 410506', href: null },
                  { icon: Mail,  text: 'ORGANIZATIONVYOM@gmail.com', href: 'mailto:ORGANIZATIONVYOM@gmail.com' },
                  { icon: Phone, text: '9325349303, 9021581421', href: 'tel:+919325349303' },
                  { icon: Clock, text: 'Mon–Fri, 10am–6pm IST', href: null },
                ].map(({ icon: Icon, text, href }) => (
                  <div key={text} className="flex items-start gap-2">
                    <Icon className="h-4 w-4 text-ochre shrink-0 mt-0.5" />
                    {href
                      ? <a href={href} className="text-sm text-ivory/70 hover:text-ochre transition-colors break-all">{text}</a>
                      : <span className="text-sm text-ivory/70 leading-relaxed">{text}</span>
                    }
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-sand/40 bg-ivory p-6 flex flex-col gap-3">
              <h3 className="font-display text-base font-bold text-forest-green">Ready to Publish?</h3>
              <p className="text-sm text-forest-green/60 leading-relaxed">Create your author account and start your submission today.</p>
              <Link href="/publication-fee"
                className="inline-flex items-center gap-2 rounded-full bg-ochre px-6 py-2.5 text-sm font-bold text-ivory hover:bg-ochre/90 transition-colors">
                Publish With Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
