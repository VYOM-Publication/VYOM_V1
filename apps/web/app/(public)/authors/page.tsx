import Link from 'next/link';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { DEMO_PUBLIC_AUTHORS } from '@/lib/demo-data';

export default function AuthorsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ivory py-16 px-6 text-center border-b border-sand/30">
        <div className="mx-auto max-w-3xl flex flex-col items-center gap-5">
          <div className="flex items-center gap-4">
            <span className="block h-px w-12 bg-ochre" />
            <span className="text-xs font-bold uppercase tracking-widest text-ochre">Our Scholars</span>
            <span className="block h-px w-12 bg-ochre" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-forest-green leading-tight">
            Author Directory
          </h1>
          <p className="text-base text-forest-green/60 max-w-xl leading-relaxed">
            Meet the researchers, editors, and scholars who contribute to VYOM Publication.
          </p>
        </div>
      </section>

      {/* Author grid */}
      <main className="flex-1 px-6 py-12">
        <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEMO_PUBLIC_AUTHORS.map(author => (
            <Link
              key={author.id}
              href={`/authors/${author.id}`}
              className="group rounded-2xl border border-sand/40 bg-white p-6 flex flex-col gap-4 hover:border-sand hover:shadow-card transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-ochre/15 text-ochre flex items-center justify-center font-bold text-lg shrink-0 border border-sand/30">
                  {author.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h2 className="font-display text-base font-bold text-forest-green leading-snug group-hover:text-ochre transition-colors truncate">
                    {author.name}
                  </h2>
                  <p className="text-xs text-forest-green/50 mt-0.5">{author.designation}</p>
                </div>
              </div>

              {author.institution && (
                <p className="text-xs text-forest-green/60 flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5 text-ochre shrink-0" />
                  {author.institution}
                </p>
              )}

              <p className="text-xs text-forest-green/60 leading-relaxed line-clamp-2">
                {author.shortBio}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                {author.researchInterests.slice(0, 3).map(interest => (
                  <span key={interest}
                    className="rounded-full bg-sand/30 px-2.5 py-0.5 text-[10px] font-bold text-forest-green/60 uppercase tracking-wider">
                    {interest}
                  </span>
                ))}
              </div>

              <span className="inline-flex items-center gap-1 text-xs font-bold text-ochre mt-1">
                View Profile <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
