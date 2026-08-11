
'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  BookOpen, Star, Quote, Globe, Mail,
  ArrowRight, FlaskConical, FileText, Check,
} from 'lucide-react';

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="bg-ivory text-forest-green">

      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
        <div className="flex flex-col gap-6">
          {/* eyebrow */}
          <div className="flex items-center gap-3">
            <span className="block h-px w-8 bg-ochre" />
            <span className="text-xs font-bold uppercase tracking-widest text-ochre">
              Trusted Academic Publishing
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl font-bold text-forest-green leading-tight">
            Empowering<br />Knowledge Through<br />Quality Publications
          </h1>

          <p className="text-forest-green/60 text-base leading-relaxed max-w-lg">
            A trusted platform for authors, researchers, and readers to publish, explore,
            and access impactful books and academic content.
          </p>

          <div className="flex flex-wrap gap-3 mt-2">
            <Link href="/books"
              className="inline-flex items-center gap-2 rounded-full bg-ochre px-7 py-3 text-sm font-semibold text-ivory hover:bg-ochre/90 transition-colors">
              Browse Books <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/publication-fee"
              className="inline-flex items-center gap-2 rounded-full border border-forest-green/40 bg-transparent px-7 py-3 text-sm font-semibold text-forest-green hover:border-forest-green transition-colors">
              Publish With Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Right — large teal VYOM logo illustration */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <Image
              src="/vyom-logo.png"
              alt="VYOM Publications"
              width={260}
              height={260}
              className="object-contain"
              priority
            />
            <span className="font-display text-3xl font-bold text-forest-green tracking-widest">VYOM</span>
            <span className="text-xs font-bold uppercase tracking-widest text-ochre">Publication</span>
          </div>
        </div>
      </section>

      {/* ── 2. EDITORIAL DESK NOTE (dark arch with books) ───────────────── */}
      <section className="relative overflow-hidden bg-forest-green">
        {/* arch top curve */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-b-full border border-sand/20 pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-6 py-28 flex flex-col items-center gap-6 text-center">
          {/* Stylized Editorial Desk Illustration */}
          <div className="relative w-72 h-36 mb-4 group cursor-pointer" aria-hidden="true">
            <svg viewBox="0 0 200 120" className="w-full h-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.4)]" fill="none" xmlns="http://www.w3.org/2000/svg">
              <style>{`
                @keyframes floatQuill {
                  0% { transform: translate(114px, 48px) rotate(0deg); }
                  50% { transform: translate(117px, 42px) rotate(-6deg); }
                  100% { transform: translate(114px, 48px) rotate(0deg); }
                }
                @keyframes pulseGlow {
                  0% { r: 18px; opacity: 0.4; }
                  50% { r: 26px; opacity: 0.7; }
                  100% { r: 18px; opacity: 0.4; }
                }
                @keyframes shimmerRay {
                  0% { opacity: 0.2; }
                  50% { opacity: 0.5; }
                  100% { opacity: 0.2; }
                }
                .animate-float-quill {
                  animation: floatQuill 4s ease-in-out infinite;
                  transform-origin: bottom left;
                }
                .animate-pulse-glow {
                  animation: pulseGlow 3s ease-in-out infinite;
                }
                .animate-shimmer-ray {
                  animation: shimmerRay 6s ease-in-out infinite;
                }
                .star-twinkle {
                  animation: shimmerRay 3s ease-in-out infinite;
                }
              `}</style>

              {/* Archway background (shadowed, elegant forest green variant) */}
              <path d="M40 115 V75 A60 60 0 0 1 160 75 V115 Z" fill="#0c251c" stroke="#b58a54" strokeWidth="1.5" strokeOpacity="0.4" />
              
              {/* Radial Light Rays */}
              <g className="animate-shimmer-ray" stroke="#b58a54" strokeWidth="0.8" strokeDasharray="2 3" strokeOpacity="0.6">
                <line x1="100" y1="80" x2="50" y2="45" />
                <line x1="100" y1="80" x2="75" y2="30" />
                <line x1="100" y1="80" x2="100" y2="20" />
                <line x1="100" y1="80" x2="125" y2="30" />
                <line x1="100" y1="80" x2="150" y2="45" />
              </g>

              {/* Glowing core */}
              <circle cx="100" cy="80" r="22" fill="#b58a54" fillOpacity="0.15" className="animate-pulse-glow" />

              {/* Open Manuscript Book */}
              <g stroke="#dfd5c6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Left Page (Ivory paper style) */}
                <path d="M100 95 C92 92 78 92 72 95 V78 C78 75 92 75 100 78 Z" fill="#faf6f0" />
                {/* Right Page (Ivory paper style) */}
                <path d="M100 95 C108 92 122 92 128 95 V78 C122 75 108 75 100 78 Z" fill="#faf6f0" />
                {/* Book Spine Details */}
                <path d="M100 78 V95" stroke="#b58a54" strokeWidth="2.5" />
                {/* Minimal text lines representation on pages */}
                <path d="M76 82 H94 M76 86 H90 M76 90 H92" stroke="#13382c" strokeWidth="1" strokeOpacity="0.3" />
                <path d="M106 82 H124 M106 86 H120 M106 90 H122" stroke="#13382c" strokeWidth="1" strokeOpacity="0.3" />
              </g>

              {/* Interactive floating quill */}
              <g className="animate-float-quill group-hover:scale-105 transition-transform duration-500">
                {/* Quill feather silhouette */}
                <path d="M0 0 C-4 8 -12 18 -12 25 C-12 28 -10 30 -7 30 C-2 30 6 20 8 12 C9 8 5 3 0 0 Z" fill="#b58a54" fillOpacity="0.9" />
                {/* Quill shaft lines */}
                <path d="M0 0 L-8 27" stroke="#faf6f0" strokeWidth="0.8" strokeLinecap="round" />
                {/* Quill tip pointing to the book */}
                <path d="M-8 27 L-12 32" stroke="#b58a54" strokeWidth="1.5" strokeLinecap="round" />
              </g>

              {/* Twinkling mini-stars */}
              <g fill="#b58a54">
                {/* Star L */}
                <path d="M52 35 L53.5 38 L56.5 38.5 L54 40.5 L55 43.5 L52 42 L49 43.5 L50 40.5 L47.5 38.5 L50.5 38 Z" className="star-twinkle" />
                {/* Star R */}
                <path d="M148 40 L149.2 42.2 L151.7 42.5 L149.7 44.1 L150.5 46.5 L148 45.3 L145.5 46.5 L146.3 44.1 L144.3 42.5 L146.8 42.2 Z" className="star-twinkle" style={{ animationDelay: '1.5s' }} />
              </g>
            </svg>
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-sand/60">Editorial Desk Note</span>
          <p className="font-display text-xl md:text-2xl text-ivory/90 italic leading-relaxed max-w-lg">
            &ldquo;Manuscripts are reviewed with clarity, fairness, and craft.&rdquo;
          </p>
        </div>
      </section>

      {/* ── 3. ABOUT VYOM ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-col gap-5 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="block h-px w-8 bg-ochre" />
            <span className="text-xs font-bold uppercase tracking-widest text-ochre">
              About VYOM Publication
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-forest-green leading-snug">
            A quiet, exacting home for authors, researchers, and readers.
          </h2>
          <p className="text-forest-green/60 leading-relaxed text-base max-w-xl">
            VYOM Publication is a content-driven publishing platform dedicated to supporting
            authors, researchers, and readers. We provide a seamless process for manuscript
            submission, editorial review, and high-quality publication across diverse genres
            and disciplines.
          </p>
          <Link href="/about"
            className="self-start inline-flex items-center gap-2 rounded-full border border-forest-green/50 px-7 py-3 text-sm font-semibold text-forest-green hover:bg-forest-green hover:text-ivory transition-colors">
            Learn More About Us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── 4. EXPLORE BY CATEGORY ──────────────────────────────────────── */}
      <section className="bg-ivory py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-forest-green">
              Explore by Category
            </h2>
          </div>

          {/* 5 arch cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { num: '01', label: 'Fiction',              icon: BookOpen },
              { num: '02', label: 'Non-\nFiction',        icon: FileText },
              { num: '03', label: 'Science &\nTechnology',icon: FlaskConical },
              { num: '04', label: 'Literature',           icon: FileText },
              { num: '05', label: 'Academic\n& Research', icon: FileText },
            ].map(({ num, label, icon: Icon }) => (
              <Link key={label}
                href={`/books?category=${encodeURIComponent(label.replace('\n', ' '))}`}
                className="group flex flex-col items-center text-center gap-5 bg-white border border-sand/40 hover:border-ochre/30 hover:shadow-card hover:-translate-y-1.5 transition-all duration-300 px-6 pt-10 pb-8 relative overflow-hidden"
                style={{ borderRadius: '120px 120px 24px 24px' }}>
                {/* Number tag */}
                <span className="absolute top-4 right-6 text-xs font-mono font-bold tracking-widest text-forest-green/20 group-hover:text-ochre transition-colors">
                  {num}
                </span>
                
                {/* Icon Container */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ochre/5 group-hover:bg-ochre/15 group-hover:scale-110 transition-all duration-300">
                  <Icon className="h-6 w-6 text-ochre" strokeWidth={1.5} />
                </div>

                {/* Label */}
                <span className="text-base font-semibold text-forest-green leading-snug whitespace-pre-line mt-2 group-hover:text-ochre transition-colors">
                  {label}
                </span>
                
                {/* Accent bottom bar */}
                <span className="absolute bottom-0 inset-x-0 h-1 bg-ochre transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </Link>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link href="/books"
              className="inline-flex items-center gap-2 rounded-full bg-ochre px-8 py-3 text-sm font-semibold text-ivory hover:bg-ochre/90 transition-colors">
              View All Categories <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. LATEST PUBLICATIONS ──────────────────────────────────────── */}
      <section className="py-24 px-6 bg-sand/20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-forest-green">
              Latest Publications
            </h2>
            <p className="mt-3 text-forest-green/60 max-w-xl mx-auto text-base">
              Discover newly published books and featured works from emerging and established authors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { category: 'ACADEMIC',   title: 'Quantum Dynamics 2026',  author: 'Dr. Anika Rao',  id: '5' },
              { category: 'FICTION',    title: 'The Silent Ember',        author: 'Meera Vyas',     id: '8' },
              { category: 'LITERATURE', title: 'Modern Critical Lens',    author: 'Prof. Dev Shah', id: '3' },
            ].map(({ category, title, author, id }) => (
              <div key={title}
                className="group bg-ivory rounded-2xl border border-sand/40 hover:border-sand hover:shadow-card transition-all overflow-hidden flex flex-col">
                {/* Book cover placeholder — tall cream panel */}
                <div className="bg-gradient-to-b from-sand/30 to-sand/10 flex-1 min-h-[260px] flex items-center justify-center">
                  <BookOpen className="h-14 w-14 text-sand" />
                </div>
                <div className="p-6 flex flex-col gap-2 border-t border-sand/30">
                  <span className="text-xs font-bold uppercase tracking-widest text-ochre">{category}</span>
                  <h3 className="font-display text-xl font-bold text-forest-green leading-snug">{title}</h3>
                  <p className="text-sm text-forest-green/50">{author}</p>
                  <Link href={`/books/${id}`}
                    className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-ochre hover:underline">
                    View Details <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. PUBLISH WITH VYOM + STEPS ────────────────────────────────── */}
      <section className="bg-ivory py-24 px-6">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-20 items-start">

          {/* Left — manuscript CTA */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="block h-px w-8 bg-ochre" />
              <span className="text-xs font-bold uppercase tracking-widest text-ochre">Publish With VYOM</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-forest-green leading-snug">
              Turn your manuscript into a lasting publication.
            </h2>
            <p className="text-forest-green/60 leading-relaxed text-base max-w-md">
              Are you an author or researcher? Submit your abstract and manuscript through our
              guided publishing process. Our editorial board ensures quality review, fair
              evaluation, and professional publication.
            </p>
            <Link href="/register?role=author"
              className="self-start inline-flex items-center gap-2 rounded-full bg-ochre px-7 py-3 text-sm font-semibold text-ivory hover:bg-ochre/90 transition-colors">
              Start Submission <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Right — 5 steps */}
          <div className="flex flex-col gap-3">
            {[
              'Register',
              'Submit Abstract',
              'Editorial Review',
              'Manuscript Submission',
              'Publication',
            ].map((step, i) => (
              <div key={step}
                className="flex items-center gap-5 border border-sand/50 rounded-2xl px-5 py-4 bg-ivory hover:border-sand hover:shadow-sm transition-all">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ochre text-ivory font-bold text-sm">
                  {i + 1}
                </div>
                <span className="font-semibold text-forest-green text-base">{step}</span>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ── 7. WHY CHOOSE VYOM ──────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-sand/10">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-forest-green text-center mb-14">
            Why Choose VYOM?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              'Transparent review process',
              'Expert editorial team',
              'Fast and reliable publishing',
              'High-quality design & formatting',
              'Global reader reach',
            ].map((item) => (
              <div key={item}
                className="flex flex-col gap-4 rounded-2xl border border-sand/40 bg-ivory p-6 hover:border-sand hover:shadow-card transition-all">
                <Check className="h-5 w-5 text-ochre" strokeWidth={2.5} />
                <span className="text-sm font-semibold text-forest-green leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. UPCOMING BOOK RELEASES ───────────────────────────────────── */}
      <section className="py-24 px-6 bg-ivory">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-forest-green mb-3">
            Upcoming Book Releases
          </h2>
          <p className="text-forest-green/60 mb-14 max-w-xl text-base">
            Stay updated with upcoming publications, special editions, and featured releases.
          </p>

          {/* Fan of books */}
          <div className="flex items-end justify-center">
            <div className="relative h-56 w-[480px] select-none" aria-hidden="true">
              {/* arch container */}
              <div className="absolute inset-x-0 top-0 h-full border border-sand/30 rounded-t-full overflow-hidden" />
              {/* fanned books */}
              {[-40,-26,-13,0,13,26,40].map((deg, i) => (
                <div key={i}
                  className="absolute bottom-0 left-1/2 origin-bottom transition-all duration-300"
                  style={{
                    transform: `translateX(-50%) rotate(${deg}deg)`,
                    zIndex: i < 3 ? i + 1 : 7 - i,
                  }}>
                  {/* The actual book card */}
                  <div className="w-20 h-36 rounded-r-md shadow-lg border-t border-r border-b border-white/10 relative overflow-hidden transition-all duration-300 hover:-translate-y-6 hover:scale-115 cursor-pointer flex flex-col justify-between py-3 px-2"
                    style={{
                      background: `linear-gradient(135deg, ${[
                        '#7B3F3F', '#B58A54', '#1A4D3E', '#8C6239',
                        '#2A4E5C', '#8C527A', '#5C6C50'
                      ][i]} 0%, ${[
                        '#5C2E2E', '#9C7A4A', '#13382C', '#6F4E2C',
                        '#1F3A45', '#6F3E5F', '#4A5640'
                      ][i]} 100%)`,
                    }}>
                    {/* Spine highlight line */}
                    <div className="absolute top-0 left-0 w-[4px] h-full bg-black/20" />
                    
                    {/* Tiny book layout details */}
                    <div className="flex flex-col gap-1 items-center">
                      <div className="w-6 h-[2px] bg-white/30 rounded-full" />
                      <div className="w-4 h-[1.5px] bg-white/20 rounded-full" />
                    </div>
                    
                    {/* Center gold star logo */}
                    <div className="self-center flex items-center justify-center">
                      <div className="w-3 h-3 rotate-45 border border-[#faf6f0]/40 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-[#faf6f0]/60 rounded-full" />
                      </div>
                    </div>
                    
                    {/* Bottom foil strip */}
                    <div className="flex flex-col gap-0.5 items-center">
                      <div className="w-10 h-[1.5px] bg-[#faf6f0]/30 rounded-full" />
                      <span className="text-[6px] font-bold text-[#faf6f0]/50 tracking-wider font-mono">VYOM</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. WHAT AUTHORS SAY (Testimonial) ───────────────────────────── */}
      <section className="bg-forest-green py-24 px-6">
        <div className="mx-auto max-w-3xl flex flex-col gap-6">
          {/* quote icon */}
          <Quote className="h-8 w-8 text-ochre" />
          <h2 className="font-display text-3xl font-bold text-ivory">What Authors Say</h2>
          <blockquote className="font-display text-xl md:text-2xl text-ivory/85 italic leading-relaxed">
            &ldquo;VYOM Publication provided a smooth and professional publishing experience.
            The editorial guidance was outstanding.&rdquo;
          </blockquote>
          <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} className="h-5 w-5 text-ochre fill-ochre" />
            ))}
          </div>
          <p className="text-ivory/50 text-sm font-medium">Dr. Kavita Menon · Research Author</p>
        </div>
      </section>

      {/* ── 10. HAVE QUESTIONS — CONTACT CTA ────────────────────────────── */}
      <section className="py-24 px-6 bg-ivory">
        <div className="mx-auto max-w-3xl rounded-3xl border border-sand/40 bg-ivory shadow-card px-8 py-16 flex flex-col items-center gap-7 text-center">
          <Globe className="h-8 w-8 text-ochre" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-forest-green">
            Have Questions?<br />Contact Us
          </h2>
          <p className="text-forest-green/60 max-w-md text-base">
            Connect with our editorial office, begin your manuscript submission, or join VYOM as a published author.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 flex-wrap justify-center">
            <Link href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-ochre px-7 py-3 text-sm font-semibold text-ivory hover:bg-ochre/90 transition-colors">
              <Mail className="h-4 w-4" /> Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/register?role=author"
              className="inline-flex items-center gap-2 rounded-full border border-forest-green/40 px-7 py-3 text-sm font-semibold text-forest-green hover:border-forest-green transition-colors">
              Submit a Manuscript <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/register"
              className="inline-flex items-center gap-2 rounded-full border border-sand px-7 py-3 text-sm font-semibold text-forest-green hover:border-forest-green transition-colors">
              Join as an Author <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
