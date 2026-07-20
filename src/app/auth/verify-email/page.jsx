import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "Verify Your Email | CommUnity",
  description: "Verify your email to continue",
};

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mb-2">
              <CheckCircle className="size-6" />
            </div>
            <h1 className="text-xl font-bold">Verify Your Email</h1>
            <div className="text-center text-sm text-muted-foreground text-balance">
              Please verify your email before accessing your account. We've sent a link to your inbox.
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <Link href="/dashboard" className={cn(buttonVariants({ variant: "default" }), "w-full")}>
              Continue
            </Link>

            <div className="text-center text-sm text-muted-foreground">
              Didn't receive the email?{" "}
              <button className="text-primary font-medium hover:underline underline-offset-4">
                Resend Verification Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
