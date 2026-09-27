'use client';

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, LockKeyhole, Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { PasswordInput } from "@/components/auth/password-input";
import { fetchApi } from "@/lib/api";

function ResetPasswordContent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("No reset token found in URL");
      return;
    }

    setError('');
    const formData = new FormData(e.target);
    const new_password = formData.get('password');
    const confirm_password = formData.get('confirm-password');

    if (new_password !== confirm_password) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await fetchApi('/api/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ token, new_password }),
      });
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-2">
          <CheckCircle className="size-6" />
        </div>
        <h1 className="text-xl font-bold">Password Reset Successful</h1>
        <p className="text-sm text-muted-foreground">Your password has been changed successfully.</p>
        <Link href="/auth/login" className={cn(buttonVariants({ variant: "default" }), "w-full")}>
          Continue to Login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-2">
            <LockKeyhole className="size-6" />
          </div>
          <h1 className="text-xl font-bold">Reset Password</h1>
          <div className="text-center text-sm text-muted-foreground text-balance">
            Enter your new password below.
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="password">New Password</FieldLabel>
              <PasswordInput id="password" name="password" showStrength required disabled={loading} />
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
              <PasswordInput id="confirm-password" name="confirm-password" required disabled={loading} />
            </Field>
          </FieldGroup>

          {error && (
            <div className="text-sm text-destructive font-medium">{error}</div>
          )}

          <div className="flex flex-col gap-3">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {loading ? 'Updating...' : 'Update Password'}
            </Button>
            <Link href="/auth/login" className={cn(buttonVariants({ variant: "ghost" }), "w-full flex items-center justify-center text-muted-foreground")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Suspense fallback={<div className="flex justify-center"><Loader2 className="animate-spin" /></div>}>
          <ResetPasswordContent />
        </Suspense>
      </div>
    </div>
  );
}
