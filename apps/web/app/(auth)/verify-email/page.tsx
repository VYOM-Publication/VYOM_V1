'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { authApi } from '@/lib/api/auth.api';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Link from 'next/link';

type Status = 'verifying' | 'success' | 'error';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [status, setStatus] = useState<Status>('verifying');
  const [message, setMessage] = useState('');
  const [resendEmail, setResendEmail] = useState('');
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('This verification link is invalid or has expired.');
      return;
    }
    authApi
      .verifyEmail(token)
      .then(() => setStatus('success'))
      .catch((err: unknown) => {
        const msg =
          (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
          'This verification link is invalid or has expired.';
        setMessage(msg);
        setStatus('error');
      });
  }, [token]);

  async function handleResend() {
    if (!resendEmail) {
      toast.error('Please enter your email address to resend the verification link.');
      return;
    }
    setResending(true);
    try {
      await authApi.resendVerification(resendEmail);
      toast.success('Verification email resent. Please check your inbox.');
    } catch {
      toast.error('Failed to resend. Please try again.');
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="text-center">
      {status === 'verifying' && (
        <p className="text-caption text-text-secondary">Verifying your email…</p>
      )}

      {status === 'success' && (
        <>
          <h2 className="mb-2 font-display text-sub-heading text-success">Email Verified!</h2>
          <p className="mb-6 text-caption text-text-secondary">
            Your email has been verified. You can now sign in.
          </p>
          <Link href="/login">
            <Button variant="primary" size="md">Sign In</Button>
          </Link>
        </>
      )}

      {status === 'error' && (
        <>
          <h2 className="mb-2 font-display text-sub-heading text-error">Verification Failed</h2>
          <p className="mb-4 text-caption text-text-secondary">{message}</p>
          <div className="mt-4 space-y-2">
            <input
              type="email"
              placeholder="Enter your email to resend"
              value={resendEmail}
              onChange={(e) => setResendEmail(e.target.value)}
              className="w-full rounded-md border border-sand px-3 py-2 text-sm text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-1"
            />
            <Button
              type="button"
              variant="secondary"
              size="md"
              loading={resending}
              onClick={handleResend}
              className="w-full"
            >
              Resend verification email
            </Button>
          </div>
          <Link href="/login" className="mt-4 inline-block text-caption text-forest-green hover:underline">
            Back to Sign In
          </Link>
        </>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<p className="text-center text-caption text-text-secondary">Loading…</p>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
