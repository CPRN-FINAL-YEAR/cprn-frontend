'use client';

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, KeyRound, Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { fetchApi } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    
    try {
      const response = await fetchApi('/api/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      setSuccess(response.message || "Reset link sent!");
    } catch (err) {
      setError(err.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        {success ? (
          <div className="flex flex-col gap-6 items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-2">
              <CheckCircle className="size-6" />
            </div>
            <h1 className="text-xl font-bold">Check your inbox</h1>
            <p className="text-sm text-muted-foreground">{success}</p>
            <Link href="/auth/login" className={cn(buttonVariants({ variant: "default" }), "w-full")}>
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-2">
                  <KeyRound className="size-6" />
                </div>
                <h1 className="text-xl font-bold">Forgot Password</h1>
                <div className="text-center text-sm text-muted-foreground text-balance">
                  Enter your email and we'll send you a password reset link.
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" name="email" type="email" placeholder="m@example.com" required disabled={loading} />
                  </Field>
                </FieldGroup>

                {error && (
                  <div className="text-sm text-destructive font-medium">{error}</div>
                )}

                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </Button>
                  <Link href="/auth/login" className={cn(buttonVariants({ variant: "ghost" }), "w-full flex items-center justify-center text-muted-foreground")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                  </Link>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
