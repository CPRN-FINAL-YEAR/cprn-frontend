import Link from "next/link";
import { ArrowLeft, KeyRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

export const metadata = {
  title: "Forgot Password | CommUnity",
  description: "Reset your CommUnity password",
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <form>
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
                  <Input id="email" type="email" placeholder="m@example.com" required />
                </Field>
              </FieldGroup>

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Send Reset Link
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
