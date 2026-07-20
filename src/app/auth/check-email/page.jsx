import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "Check Your Email | CommUnity",
  description: "Check your email for reset instructions",
};

export default function CheckEmailPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-2">
              <Mail className="size-6" />
            </div>
            <h1 className="text-xl font-bold">Check Your Email</h1>
            <div className="text-center text-sm text-muted-foreground text-balance">
              We've sent password reset instructions to your email.
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <a href="mailto:" className={cn(buttonVariants({ variant: "default" }), "w-full")}>
              Open Email App
            </a>
            <Link href="/auth/login" className={cn(buttonVariants({ variant: "ghost" }), "w-full flex items-center justify-center text-muted-foreground")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Link>

            <div className="mt-4 text-center text-sm text-muted-foreground">
              Didn't receive the email?{" "}
              <button className="text-primary font-medium hover:underline underline-offset-4">
                Resend Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
