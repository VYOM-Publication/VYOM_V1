'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function VerifyEmailSentContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? 'your inbox';

  return (
    <div className="text-center">
      <h2 className="mb-3 font-display text-sub-heading text-text-primary">Check your email</h2>
      <p className="text-caption text-text-secondary">
        A verification link has been sent to <strong>{email}</strong>. Please check your inbox and
        click the link to activate your account.
      </p>
      <p className="mt-3 text-caption text-text-secondary">
        Didn&apos;t receive it? Check your spam folder or{' '}
        <Link href="/login" className="text-forest-green hover:underline">
          sign in
        </Link>{' '}
        to request a new link.
      </p>
      <Link href="/login" className="mt-6 inline-block">
        <Button variant="primary" size="md">Back to Sign In</Button>
      </Link>
    </div>
  );
}

export default function VerifyEmailSentPage() {
  return (
    <Suspense fallback={<p className="text-center text-caption text-text-secondary">Loading…</p>}>
      <VerifyEmailSentContent />
    </Suspense>
  );
}
