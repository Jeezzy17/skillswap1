"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
 
const schema = z.object({
  email: z.string().trim().min(1, "Email wajib diisi.").email("Format email tidak valid."),
  password: z.string().min(6, "Password minimal 6 karakter."),
});
 
export type LoginState = {
  message: string;
  errors: { email?: string | undefined; password?: string | undefined };
  values: { email: string };
};
 
const safeNext = (n: string) => (n.startsWith("/") && !n.startsWith("//") ? n : "/");
 
export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const parsed = schema.safeParse({ email, password: formData.get("password") });
  if (!parsed.success) {
    const f = parsed.error.flatten().fieldErrors;
    return { message: "Periksa kembali isian kamu.", errors: { email: f.email?.[0], password: f.password?.[0] }, values: { email } };
  }
  // Prototipe: ganti dengan verifikasi ke backend saat integrasi.
  const jar = await cookies();
  jar.set("ss_session", parsed.data.email.split("@")[0] ?? "member", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
  redirect(safeNext(String(formData.get("next") ?? "/")));
}
 
export async function logoutAction() {
  (await cookies()).delete("ss_session");
  redirect("/login");
}