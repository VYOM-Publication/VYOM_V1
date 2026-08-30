'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, ArrowLeft, BookOpen, PenTool } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';

function RegisterForm({ role = 'author' }: { role?: string }) {
  const { register } = useAuth();
  const isAuthor = role === 'author';

  const [name, setName]                 = useState('');
  const [email, setEmail]               = useState('');
  const [specialization, setSpecialization] = useState('');
  const [designation, setDesignation]   = useState('');
  const [affiliation, setAffiliation]   = useState('');
  const [orcid, setOrcid]               = useState('');
  const [phone, setPhone]               = useState('');
  const [country, setCountry]           = useState('');
  const [password, setPassword]         = useState('');
  const [confirm, setConfirm]           = useState('');
  const [showPw, setShowPw]             = useState(false);
  const [showCf, setShowCf]             = useState(false);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters, include a number, and a special character.');
      return;
    }

    if (isAuthor && (!specialization || !designation)) {
      setError('Please provide your academic specialization and designation.');
      return;
    }

    setLoading(true);
    try {
      await register({
        fullName: name,
        email,
        password,
        confirmPassword: confirm,
        role: isAuthor ? 'author' : 'member',
        specialization,
        designation,
        affiliation,
        orcid,
        phone,
        country,
      });
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message
        ?? 'Registration failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-forest-green">
          {isAuthor ? 'Create Author Account' : 'Join as Reader'}
        </h2>
        <p className="text-sm text-forest-green/50 mt-1">
          {isAuthor
            ? 'Create your academic publishing profile to submit abstracts, track peer reviews, and publish.'
            : 'Create a free reader account to access published books, research papers, and downloads.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="reg-fullname" className="text-xs font-bold uppercase tracking-widest text-forest-green">Full Name *</label>
          <input
            id="reg-fullname"
            name="fullName"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            autoComplete="name"
            placeholder="Dr. Jane Doe"
            className="w-full rounded-lg border border-sand/60 bg-ivory/50 px-4 py-2.5 text-sm text-forest-green placeholder:text-forest-green/30 focus:outline-none focus:border-ochre transition-colors"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="reg-email" className="text-xs font-bold uppercase tracking-widest text-forest-green">
            {isAuthor ? 'Institutional / Official Email *' : 'Email Address *'}
          </label>
          <input
            id="reg-email"
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder={isAuthor ? 'you@university.edu' : 'you@example.com'}
            className="w-full rounded-lg border border-sand/60 bg-ivory/50 px-4 py-2.5 text-sm text-forest-green placeholder:text-forest-green/30 focus:outline-none focus:border-ochre transition-colors"
          />
        </div>

        {/* Author-specific fields */}
        {isAuthor && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Technical Specialization / Domain */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="reg-specialization" className="text-xs font-bold uppercase tracking-widest text-forest-green">Technical Specialization *</label>
                <select
                  id="reg-specialization"
                  name="specialization"
                  value={specialization}
                  onChange={e => setSpecialization(e.target.value)}
                  required
                  className="w-full rounded-lg border border-sand/60 bg-ivory/50 px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre transition-colors"
                >
                  <option value="">Select Domain</option>
                  <option value="Computer Science & AI">Computer Science & AI</option>
                  <option value="Biotechnology & Life Sciences">Biotechnology & Life Sciences</option>
                  <option value="Mechanical & Industrial Engineering">Mechanical & Industrial Engineering</option>
                  <option value="Physics & Mathematics">Physics & Mathematics</option>
                  <option value="Literature & Cultural Studies">Literature & Cultural Studies</option>
                  <option value="Medical & Health Sciences">Medical & Health Sciences</option>
                  <option value="Environmental & Chemical Sciences">Environmental & Chemical Sciences</option>
                  <option value="Business & Applied Economics">Business & Applied Economics</option>
                  <option value="Other Interdisciplinary Fields">Other Interdisciplinary Fields</option>
                </select>
              </div>

              {/* Academic Designation */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="reg-designation" className="text-xs font-bold uppercase tracking-widest text-forest-green">Academic Rank / Role *</label>
                <select
                  id="reg-designation"
                  name="designation"
                  value={designation}
                  onChange={e => setDesignation(e.target.value)}
                  required
                  className="w-full rounded-lg border border-sand/60 bg-ivory/50 px-4 py-2.5 text-sm text-forest-green focus:outline-none focus:border-ochre transition-colors"
                >
                  <option value="">Select Rank</option>
                  <option value="Professor">Professor</option>
                  <option value="Associate Professor">Associate Professor</option>
                  <option value="Assistant Professor">Assistant Professor</option>
                  <option value="Research Scholar / PhD Candidate">Research Scholar / PhD Candidate</option>
                  <option value="Postdoctoral Researcher">Postdoctoral Researcher</option>
                  <option value="Independent Researcher / Author">Independent Researcher / Author</option>
                </select>
              </div>
            </div>

            {/* Institutional Affiliation */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="reg-affiliation" className="text-xs font-bold uppercase tracking-widest text-forest-green">Institutional Affiliation (Optional)</label>
              <input
                id="reg-affiliation"
                name="affiliation"
                type="text"
                value={affiliation}
                onChange={e => setAffiliation(e.target.value)}
                placeholder="Department of AI, Oxford University (Optional)"
                className="w-full rounded-lg border border-sand/60 bg-ivory/50 px-4 py-2.5 text-sm text-forest-green placeholder:text-forest-green/30 focus:outline-none focus:border-ochre transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* ORCID iD */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="reg-orcid" className="text-xs font-bold uppercase tracking-widest text-forest-green">ORCID iD (Optional)</label>
                <input
                  id="reg-orcid"
                  name="orcid"
                  type="text"
                  value={orcid}
                  onChange={e => setOrcid(e.target.value)}
                  placeholder="0000-0002-1825-0097"
                  className="w-full rounded-lg border border-sand/60 bg-ivory/50 px-4 py-2.5 text-sm text-forest-green placeholder:text-forest-green/30 focus:outline-none focus:border-ochre transition-colors"
                />
              </div>

              {/* Country */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="reg-country" className="text-xs font-bold uppercase tracking-widest text-forest-green">Country</label>
                <input
                  id="reg-country"
                  name="country"
                  type="text"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  placeholder="e.g. India, USA, UK"
                  className="w-full rounded-lg border border-sand/60 bg-ivory/50 px-4 py-2.5 text-sm text-forest-green placeholder:text-forest-green/30 focus:outline-none focus:border-ochre transition-colors"
                />
              </div>
            </div>
          </>
        )}

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="reg-password" className="text-xs font-bold uppercase tracking-widest text-forest-green">Password *</label>
          <div className="relative">
            <input
              id="reg-password"
              name="password"
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              placeholder="Min 8 characters (1 uppercase, 1 special)"
              className="w-full rounded-lg border border-sand/60 bg-ivory/50 px-4 py-2.5 pr-10 text-sm text-forest-green placeholder:text-forest-green/30 focus:outline-none focus:border-ochre transition-colors"
            />
            <button type="button" onClick={() => setShowPw(v => !v)} aria-label="Toggle password visibility"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-green/40 hover:text-forest-green transition-colors">
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="reg-confirm" className="text-xs font-bold uppercase tracking-widest text-forest-green">Confirm Password *</label>
          <div className="relative">
            <input
              id="reg-confirm"
              name="confirmPassword"
              type={showCf ? 'text' : 'password'}
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              autoComplete="new-password"
              placeholder="Repeat password"
              className="w-full rounded-lg border border-sand/60 bg-ivory/50 px-4 py-2.5 pr-10 text-sm text-forest-green placeholder:text-forest-green/30 focus:outline-none focus:border-ochre transition-colors"
            />
            <button type="button" onClick={() => setShowCf(v => !v)} aria-label="Toggle confirm password visibility"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-green/40 hover:text-forest-green transition-colors">
              {showCf ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 border border-red-200 px-4 py-2.5 text-xs text-red-600 font-medium">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-ochre py-3.5 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 transition-colors disabled:opacity-60 mt-2 shadow-sm"
        >
          {loading
            ? 'Creating account…'
            : isAuthor
            ? 'Register Author Account →'
            : 'Register Reader Account →'}
        </button>
      </form>

      <p className="mt-5 text-center text-xs text-forest-green/50">
        Already have an account?{' '}
        <Link href={`/login/${isAuthor ? 'author' : 'member'}`} className="text-ochre hover:underline font-semibold">
          Sign in as {isAuthor ? 'Author' : 'Reader'}
        </Link>
      </p>
    </>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ivory flex items-center justify-center text-sm text-forest-green/50">Loading registration workspace…</div>}>
      <RegisterContent />
    </Suspense>
  );
}

function RegisterContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const roleParam = searchParams.get('role') ?? 'author';
  const isAuthor = roleParam === 'author';

  const authorBullets = [
    'Double-blind peer review by domain experts',
    'Publication decision within 21 days',
    'Article Processing Charge: ₹8,500 (payable only on acceptance)',
    'DOI assigned for all published articles',
    'Open access — freely available to all readers',
  ];

  const readerBullets = [
    'Unlimited free access to open-access journals & books',
    'Personalized library for bookmarks & reading history',
    'Offline PDF downloads for saved publications',
    'Instant email notifications for new volume releases',
    'Comprehensive search across all academic categories',
  ];

  return (
    <div className="min-h-[90vh] bg-ivory py-10 sm:py-14 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-forest-green/60 hover:text-forest-green transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to sign-in options
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column: Role-Tailored Hero */}
          <div className="flex flex-col gap-6 lg:pt-2">
            <div className="flex items-center gap-3">
              <span className="block h-px w-8 bg-ochre" />
              <span className="text-xs font-bold uppercase tracking-widest text-ochre">
                {isAuthor ? 'Publish With Us' : 'Reader Membership'}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-bold text-forest-green leading-tight">
              {isAuthor ? 'Join Our Academic Community' : 'Explore Global Research & Books'}
            </h1>

            <p className="text-forest-green/65 text-base leading-relaxed max-w-lg">
              {isAuthor
                ? 'VYOM Publication is dedicated to fostering rigorous research and providing an exacting home for authors. Our guided process takes you from abstract submission to global DOI indexation.'
                : 'Join thousands of researchers, academics, and readers exploring open-access monographs, peer-reviewed journals, and contemporary literature.'}
            </p>

            <div className="flex flex-col gap-3.5 my-2">
              {(isAuthor ? authorBullets : readerBullets).map(item => (
                <div key={item} className="flex items-center gap-3 text-sm text-forest-green/75 font-medium">
                  <span className="h-5 w-5 rounded-full bg-ochre/15 text-ochre flex items-center justify-center shrink-0 text-xs font-bold">
                    ✓
                  </span>
                  {item}
                </div>
              ))}
            </div>

            {isAuthor && (
              <div className="flex items-center gap-4 mt-2">
                <Link
                  href="/guidelines"
                  className="inline-flex items-center gap-2 rounded-full border border-forest-green/40 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-forest-green hover:bg-forest-green hover:text-ivory transition-colors"
                >
                  Author Guidelines & Policies →
                </Link>
              </div>
            )}
          </div>

          {/* Right Column: Account Card with Role Toggle Header */}
          <div className="w-full bg-white rounded-3xl border border-sand/40 shadow-card p-8 sm:p-10 border-l-4 border-l-ochre">
            {/* Role Switcher Pill Tabs */}
            <div className="flex items-center rounded-2xl bg-ivory/80 p-1.5 border border-sand/40 mb-8">
              <button
                type="button"
                onClick={() => router.push('/register?role=member')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  !isAuthor
                    ? 'bg-ochre text-ivory shadow-sm'
                    : 'text-forest-green/60 hover:text-forest-green'
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" /> Join as Reader
              </button>
              <button
                type="button"
                onClick={() => router.push('/register?role=author')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  isAuthor
                    ? 'bg-ochre text-ivory shadow-sm'
                    : 'text-forest-green/60 hover:text-forest-green'
                }`}
              >
                <PenTool className="h-3.5 w-3.5" /> Join as Author
              </button>
            </div>

            <RegisterForm role={isAuthor ? 'author' : 'member'} />
          </div>
        </div>
      </div>
    </div>
  );
}
