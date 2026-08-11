import Link from 'next/link';

interface SectionHeaderProps {
  label?: string;
  title: string;
  linkHref?: string;
  linkLabel?: string;
}

export function SectionHeader({ label, title, linkHref, linkLabel }: SectionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 gap-2">
      <div>
        {label && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">
            {label}
          </span>
        )}
        <h2 className="font-display text-xl font-bold text-forest-green mt-0.5">
          {title}
        </h2>
      </div>
      {linkHref && linkLabel && (
        <Link href={linkHref} className="text-xs font-bold uppercase tracking-widest text-ochre hover:underline shrink-0">
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
