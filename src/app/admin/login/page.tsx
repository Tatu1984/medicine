import type { Metadata } from "next";
import { Logo } from "@/components/site/Logo";
import { Aurora } from "@/components/reactbits/Aurora";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;

  return (
    <div className="relative flex min-h-screen items-center justify-center px-5 py-16">
      <Aurora />
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-xl sm:p-10">
        <Logo />
        <h1 className="mt-7 text-2xl font-semibold">Sign in to publish</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Restricted area for managing research articles and publications.
        </p>
        <div className="mt-8">
          <LoginForm from={from ?? "/admin"} />
        </div>
      </div>
    </div>
  );
}
