import Link from 'next/link';

interface ReaderHeroProps {
  name: string;
  avatarUrl?: string;
}

export function ReaderHero({ name, avatarUrl }: ReaderHeroProps) {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#18362F] via-[#142C26] to-[#0E1F1B] text-ivory border border-sand/20 p-8 sm:p-10 mb-8 shadow-card">
      {/* Gold Arch Geometry Line Art Background */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none hidden md:block">
        <svg viewBox="0 0 400 400" className="w-full h-full fill-none stroke-ochre stroke-[1.5]">
          <ellipse cx="200" cy="400" rx="180" ry="320" />
          <ellipse cx="200" cy="400" rx="140" ry="260" />
          <ellipse cx="200" cy="400" rx="100" ry="200" />
        </svg>
      </div>

      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 z-10">
        <div className="flex items-start gap-5 max-w-xl">
          {/* Avatar Profile Picture */}
          <div className="relative shrink-0">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt={name}
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover border-2 border-ochre/60 shadow-md"
              />
            ) : (
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-ochre/20 text-ochre border-2 border-ochre/40 flex items-center justify-center font-display font-bold text-xl sm:text-2xl shadow-md">
                {name.substring(0, 2).toUpperCase()}
              </div>
            )}
            <Link
              href="/member/profile"
              className="absolute -bottom-1 -right-1 rounded-full bg-ochre p-1 text-ivory hover:scale-110 transition-transform"
              title="Edit Profile Picture"
            >
              <span className="sr-only">Edit Profile</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </Link>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">
              Reader Workspace & Library
            </span>
            <h1 className="font-display text-2xl sm:text-4xl font-bold text-ivory leading-tight">
              Welcome back, <span className="text-ochre">{name}</span>
            </h1>
            <p className="text-xs sm:text-sm text-sand/80 leading-relaxed mt-1">
              Explore open-access monographs, peer-reviewed articles, and contemporary literature.
            </p>
          </div>
        </div>

        <div className="flex gap-3 shrink-0">
          <Link
            href="/books"
            className="rounded-full bg-ochre px-6 py-3 text-xs font-bold uppercase tracking-widest text-ivory hover:bg-ochre/90 transition-colors shadow-sm"
          >
            Browse Books →
          </Link>
        </div>
      </div>
    </div>
  );
}
