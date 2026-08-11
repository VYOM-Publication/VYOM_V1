'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, ResetPasswordInput } from '@vyom/validations';
import { authApi } from '@/lib/api/auth.api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';

  // Redirect to forgot-password if token is absent (per SRS Req 4.11)
  useEffect(() => {
    if (!token) {
      router.replace('/forgot-password');
    }
  }, [token, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token },
  });

  async function onSubmit(data: ResetPasswordInput) {
    try {
      await authApi.resetPassword(data);
      toast.success('Password reset successfully.');
      router.replace('/login');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Reset failed. The link may have expired.';
      toast.error(message);
    }
  }

  if (!token) return null;

  return (
    <>
      <h2 className="mb-6 font-display text-sub-heading text-text-primary">Set a new password</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <input type="hidden" {...register('token')} />
        <Input
          label="New Password"
          type="password"
          autoComplete="new-password"
          hint="Min 8 chars, uppercase, lowercase, number & special character."
          error={errors.password?.message}
          {...register('password')}
        />
        <Input
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
        <Button type="submit" variant="primary" size="md" loading={isSubmitting} className="w-full">
          Reset Password
        </Button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p className="text-center text-caption text-text-secondary">Loading…</p>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
