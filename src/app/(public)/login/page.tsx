import type { Metadata } from "next";
import { LoginForm } from "@/components/forms/login-form";
 
export const metadata: Metadata = { title: "Masuk · SkillSwap" };
 
export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next = "/" } = await searchParams;
  const safe = next.startsWith("/") && !next.startsWith("//") ? next : "/";
  return (
    <div className="grid min-h-[70vh] place-items-center">
      <LoginForm next={safe} />
    </div>
  );
}