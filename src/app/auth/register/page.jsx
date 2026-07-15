import { RegisterForm } from "@/components/register-form"

export const metadata = {
  title: "Register | SolveHub",
  description: "Create a new SolveHub account",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <RegisterForm />
      </div>
    </div>
  );
}
