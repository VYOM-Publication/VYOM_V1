import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ivory text-center p-8">
      <h1 className="font-display text-section text-error">Access Denied</h1>
      <p className="mt-3 text-body text-text-secondary">
        You don&apos;t have permission to view this page.
      </p>
      <Link href="/" className="mt-6">
        <Button variant="primary" size="md">Go Home</Button>
      </Link>
    </div>
  );
}
