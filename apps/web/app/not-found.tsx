import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ivory text-center p-8">
      <h1 className="font-display text-display text-forest-green">404</h1>
      <p className="mt-3 font-display text-sub-heading text-text-primary">Page not found</p>
      <p className="mt-1 text-caption text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="mt-6">
        <Button variant="primary" size="md">Go Home</Button>
      </Link>
    </div>
  );
}
