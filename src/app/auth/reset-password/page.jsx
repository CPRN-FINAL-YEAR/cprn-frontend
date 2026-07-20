import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { PasswordInput } from "@/components/auth/password-input";

export const metadata = {
  title: "Reset Password | CommUnity",
  description: "Set a new password for your CommUnity account",
};

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <form>
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
                  <PasswordInput id="password" showStrength required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                  <PasswordInput id="confirm-password" required />
                </Field>
              </FieldGroup>

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Update Password
                </Button>
                <Link href="/auth/login" className={cn(buttonVariants({ variant: "ghost" }), "w-full flex items-center justify-center text-muted-foreground")}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
