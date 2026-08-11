'use client';

import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ivory text-center p-8">
      <h1 className="font-display text-section text-error">Something went wrong</h1>
      <p className="mt-2 text-caption text-text-secondary">
        {error.message ?? 'An unexpected error occurred.'}
      </p>
      <Button variant="primary" size="md" onClick={reset} className="mt-6">
        Try Again
      </Button>
    </div>
  );
}
