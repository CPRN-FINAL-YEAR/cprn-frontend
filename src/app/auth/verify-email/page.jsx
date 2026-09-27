'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchApi } from '@/lib/api';
import { useAuth } from '@/contexts/auth-context';
import { Loader2, CheckCircle, XCircle, MailCheck } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

function VerifyEmailContent() {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { loginWithToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) return;

    const verifyEmailToken = async () => {
      setStatus('loading');
      try {
        // Backend creates the user HERE and returns a JWT — so we auto-login immediately
        const response = await fetchApi('/api/auth/verify-email', {
          method: 'POST',
          body: JSON.stringify({ token }),
        });

        setStatus('success');
        setMessage('Your email has been verified! Redirecting you to the app...');

        // Auto-login: store the returned JWT and update context
        const accessToken = response.access_token;
        if (accessToken) {
          setTimeout(() => {
            loginWithToken(accessToken);
          }, 1500);
        }
      } catch (err) {
        setStatus('error');
        setMessage(err.message || 'Verification failed. The link may be invalid or expired.');
      }
    };

    verifyEmailToken();
  }, [token]);

  // ── Idle: shown right after registration, before the user clicks their email link ──
  if (status === 'idle') {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6 items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MailCheck className="size-8" />
          </div>
          <h1 className="text-2xl font-bold">Check your email</h1>
          <p className="text-muted-foreground text-balance">
            We've sent a verification link to your email address. Click the link to activate your account.
          </p>
          <p className="text-sm text-muted-foreground">
            Didn't receive it? Check your spam folder.
          </p>
          <Link href="/auth/login" className={cn(buttonVariants({ variant: "outline" }), "w-full mt-2")}>
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6 items-center text-center">

        {status === 'loading' && (
          <>
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <h2 className="text-2xl font-bold">Verifying your email...</h2>
            <p className="text-muted-foreground">Please wait while we activate your account.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600">
              <CheckCircle className="size-9" />
            </div>
            <h2 className="text-2xl font-bold">Email Verified!</h2>
            <p className="text-muted-foreground">{message}</p>
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </>
        )}

        {status === 'error' && (
          <>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <XCircle className="size-9" />
            </div>
            <h2 className="text-2xl font-bold">Verification Failed</h2>
            <p className="text-muted-foreground">{message}</p>
            <div className="flex flex-col gap-3 w-full mt-2">
              <Button asChild className="w-full">
                <Link href="/auth/register">Register Again</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/auth/login">Back to Login</Link>
              </Button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-svh items-center justify-center">
        <Loader2 className="animate-spin text-primary" />
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
