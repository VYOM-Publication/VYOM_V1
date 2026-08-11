interface ReaderHeroProps {
  name: string;
}

export function ReaderHero({ name }: ReaderHeroProps) {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-sand/15 via-sand/5 to-transparent border border-sand/40 p-8 sm:p-10 mb-8">
      {/* Background soft lighting effect */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-ochre/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-1/3 bottom-0 w-48 h-48 bg-forest-green/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative flex flex-col gap-2 max-w-xl">
        <span className="text-xs font-bold uppercase tracking-widest text-ochre">
          Reader Workspace
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-forest-green leading-tight mt-1">
          Welcome back, {name}
        </h1>
        <p className="text-sm sm:text-base text-forest-green/60 leading-relaxed mt-1">
          Continue exploring peer-reviewed research, academic monographs, and contemporary literature.
        </p>
      </div>
    </div>
  );
}
