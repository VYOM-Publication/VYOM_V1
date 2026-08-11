import { DemoSessionBar } from '@/components/common/DemoSessionBar';
import { type DemoRole } from '@/lib/demo-auth';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface Props {
  title: string;
  subtitle?: string;
  role: DemoRole;
  backLink?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, subtitle, role, backLink, children }: Props) {
  return (
    <header className="flex items-center justify-between px-8 py-5 border-b border-sand/30 shrink-0">
      <div className="flex items-center gap-3">
        {backLink && (
          <Link href={backLink} className="text-forest-green/40 hover:text-forest-green">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        )}
        <div>
          <h1 className="font-display text-2xl font-bold text-forest-green">{title}</h1>
          {subtitle && (
            <p className="text-xs uppercase tracking-widest text-forest-green/40 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {children}
        <DemoSessionBar requiredRole={role} />
      </div>
    </header>
  );
}

