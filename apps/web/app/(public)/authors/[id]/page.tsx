import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DEMO_PUBLIC_AUTHORS } from '@/lib/demo-data';
import { BookCard } from '@/components/common/BookCard';
import { 
  GraduationCap, Globe, Mail, ExternalLink, Award, 
  BookOpen, FileText, Calendar, CheckCircle2, Shield 
} from 'lucide-react';

// TODO: Replace demo author data with GET /api/v1/authors/:id once production backend credentials are available.

export default function AuthorProfilePage({ params }: { params: { id: string } }) {
  const author = DEMO_PUBLIC_AUTHORS.find(a => a.id === params.id) ?? DEMO_PUBLIC_AUTHORS[0];

  if (!author) {
    notFound();
  }

  return (
    <main className="flex-1 bg-ivory/30 py-12">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* 1. Header Hero / Academic Identity Banner */}
        <div className="rounded-3xl border border-sand/40 bg-white p-8 sm:p-10 shadow-card flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="h-24 w-24 rounded-full bg-ochre/15 text-ochre flex items-center justify-center font-bold text-3xl shadow-sm border border-sand/30 shrink-0">
              {author.name.substring(0, 2).toUpperCase()}
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">Academic Author Profile</span>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-forest-green">{author.name}</h1>
              
              <p className="text-sm font-bold text-forest-green/75 flex items-center gap-1.5 pt-0.5">
                <GraduationCap className="h-4 w-4 text-ochre shrink-0" />
                {author.designation} · {author.department}
              </p>
              
              <p className="text-xs text-forest-green/55 font-medium flex items-center gap-1">
                <Globe className="h-3.5 w-3.5 text-sand" /> {author.institution}, {author.country}
              </p>
            </div>
          </div>

          {/* Social Links & ORCID Badge */}
          <div className="flex flex-wrap md:flex-col items-start md:items-end gap-3 border-t md:border-t-0 md:border-l border-sand/20 pt-4 md:pt-0 md:pl-8 shrink-0 w-full md:w-auto">
            {author.orcid && (
              <a
                href={author.orcid}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-emerald-50 border border-emerald-200 px-4 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition-colors inline-flex items-center gap-1.5 shadow-sm"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> ORCID Record <ExternalLink className="h-3 w-3" />
              </a>
            )}

            {author.email && (
              <a
                href={`mailto:${author.email}`}
                className="rounded-full bg-sand/20 border border-sand/30 px-4 py-2 text-xs font-bold text-forest-green hover:bg-sand/40 transition-colors inline-flex items-center gap-1.5"
              >
                <Mail className="h-3.5 w-3.5 text-ochre" /> Contact Author
              </a>
            )}
          </div>
        </div>

        {/* 2. Scholarly Metrics Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { label: 'Books Authored', value: author.books.length, icon: BookOpen },
            { label: 'Journal Papers', value: author.publications.length, icon: FileText },
            { label: 'Years Experience', value: `${author.experienceYears}+ Yrs`, icon: Calendar },
            { label: 'Member Since', value: author.joinedDate, icon: Shield },
          ].map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div key={idx} className="rounded-2xl border border-sand/40 bg-white p-5 shadow-sm flex flex-col items-center justify-center">
                <Icon className="h-5 w-5 text-ochre mb-1.5" />
                <p className="font-display text-2xl font-bold text-forest-green">{metric.value}</p>
                <p className="text-[9px] font-extrabold uppercase tracking-widest text-forest-green/45 mt-0.5">{metric.label}</p>
              </div>
            );
          })}
        </div>

        {/* 3. Biography & Academic Profile Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Biography & Awards */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="rounded-3xl border border-sand/40 bg-white p-8 shadow-sm space-y-4">
              <h2 className="font-display text-xl font-bold text-forest-green border-b border-sand/20 pb-3">Biography & Academic Background</h2>
              <p className="text-sm font-semibold text-forest-green/80 leading-relaxed">
                {author.shortBio}
              </p>
              <p className="text-xs text-forest-green/65 leading-relaxed font-normal">
                {author.extendedBio}
              </p>
            </div>

            {/* Honors & Awards */}
            {author.awards && author.awards.length > 0 && (
              <div className="rounded-3xl border border-sand/40 bg-white p-8 shadow-sm space-y-4">
                <h2 className="font-display text-xl font-bold text-forest-green border-b border-sand/20 pb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-ochre" /> Honors & Recognitions
                </h2>
                <div className="space-y-3">
                  {author.awards.map((award, idx) => (
                    <div key={idx} className="rounded-2xl bg-ivory/50 border border-sand/30 p-4 flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-ochre/15 text-ochre flex items-center justify-center shrink-0">
                        <Award className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-bold text-forest-green">{award}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Published Books Section */}
            <div className="space-y-6">
              <div className="border-b border-sand/30 pb-3 flex items-center justify-between">
                <h2 className="font-display text-xl font-bold text-forest-green">Authored Books & Monographs</h2>
                <span className="text-xs font-bold text-ochre uppercase tracking-wider">{author.books.length} Published Titles</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {author.books.map(b => (
                  <BookCard
                    key={b.id}
                    id={b.id}
                    title={b.title}
                    author={author.name}
                    authorId={author.id}
                    category={b.category}
                    year={b.year}
                    price={b.price}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Research Interests & Languages */}
          <div className="space-y-8">
            {/* Research Interests */}
            <div className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm space-y-4">
              <h3 className="font-display text-base font-bold text-forest-green">Research Interests</h3>
              <div className="flex flex-wrap gap-2">
                {author.researchInterests.map(interest => (
                  <span key={interest} className="rounded-full bg-sand/25 border border-sand/30 px-3 py-1 text-xs font-bold text-forest-green/75 uppercase tracking-wider">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Areas of Expertise */}
            <div className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm space-y-4">
              <h3 className="font-display text-base font-bold text-forest-green">Areas of Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {author.expertise.map(exp => (
                  <span key={exp} className="rounded-full bg-ochre/15 border border-ochre/30 px-3 py-1 text-xs font-bold text-ochre uppercase tracking-wider">
                    {exp}
                  </span>
                ))}
              </div>
            </div>

            {/* Journal Articles List */}
            <div className="rounded-3xl border border-sand/40 bg-white p-6 shadow-sm space-y-4">
              <h3 className="font-display text-base font-bold text-forest-green border-b border-sand/20 pb-3">Peer-Reviewed Papers</h3>
              <div className="space-y-3">
                {author.publications.map(pub => (
                  <div key={pub.id} className="rounded-xl border border-sand/30 bg-ivory/30 p-3.5 space-y-1">
                    <span className="text-[9px] font-bold text-ochre uppercase tracking-wider">{pub.journal} · {pub.year}</span>
                    <h4 className="font-bold text-forest-green text-xs leading-snug line-clamp-2">{pub.title}</h4>
                    <span className="text-[10px] text-forest-green/45 block font-mono">DOI: {pub.doi}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
