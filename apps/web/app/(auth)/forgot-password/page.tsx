'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, ForgotPasswordInput } from '@vyom/validations';
import { authApi } from '@/lib/api/auth.api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({ resolver: zodResolver(forgotPasswordSchema) });

  async function onSubmit(data: ForgotPasswordInput) {
    try {
      await authApi.forgotPassword(data);
      setSubmittedEmail(data.email);
      setSubmitted(true);
    } catch {
      // Always show success to prevent email enumeration
      setSubmittedEmail(data.email);
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="text-center">
        <h2 className="mb-2 font-display text-sub-heading text-text-primary">Check your inbox</h2>
        <p className="text-caption text-text-secondary">
          If an account exists for <strong>{submittedEmail}</strong>, a password reset link has been sent.
        </p>
        <Link href="/login" className="mt-6 inline-block text-caption text-forest-green hover:underline">
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-2 font-display text-sub-heading text-text-primary">Forgot your password?</h2>
      <p className="mb-6 text-caption text-text-secondary">
        Enter your email and we&apos;ll send you a reset link.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <Button type="submit" variant="primary" size="md" loading={isSubmitting} className="w-full">
          Send Reset Link
        </Button>
      </form>
      <p className="mt-6 text-center text-caption text-text-secondary">
        <Link href="/login" className="text-forest-green hover:underline">
          Back to Sign In
        </Link>
      </p>
    </>
  );
}
