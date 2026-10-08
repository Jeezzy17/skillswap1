"use server";
import { z } from "zod";
const schema = z.object({
  to: z.string().min(1, "Pilih anggota tujuan."),
  offer: z.string().trim().min(3, "Tulis keahlian yang kamu tawarkan (min. 3 huruf)."),
  want: z.string().trim().min(3, "Tulis keahlian yang ingin kamu pelajari."),
  msg: z.string().trim().min(10, "Pesan minimal 10 karakter.").max(280, "Pesan maksimal 280 karakter."),
});
export type Field = keyof z.infer<typeof schema>;
export type RequestState = { ok: boolean; message: string; errors: Partial<Record<Field, string>>; values: Partial<Record<Field, string>> };
export async function requestAction(_prev: RequestState, formData: FormData): Promise<RequestState> {
  const values = Object.fromEntries(formData) as Partial<Record<Field, string>>;
  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const f = parsed.error.flatten().fieldErrors;
    return { ok: false, message: "Periksa kembali isian formulir.", errors: { to: f.to?.[0], offer: f.offer?.[0], want: f.want?.[0], msg: f.msg?.[0] } as RequestState["errors"], values };
  }
  await new Promise((r) => setTimeout(r, 500)); // ganti dengan panggilan API
  return { ok: true, message: "Permintaan terkirim! Respons akan muncul di menu Pesan.", errors: {}, values: {} };
}
