"use server";
import { z } from "zod";
const schema = z.object({ rating: z.coerce.number().int().min(1, "Pilih rating 1–5.").max(5), comment: z.string().max(280, "Maksimal 280 karakter.").optional() });
export type ReviewState = { ok: boolean; message: string };
export async function reviewAction(_p: ReviewState, fd: FormData): Promise<ReviewState> {
  const r = schema.safeParse(Object.fromEntries(fd));
  if (!r.success) return { ok: false, message: r.error.issues[0]?.message ?? "Data tidak valid" };
  return { ok: true, message: `Ulasan ★${r.data.rating} tersimpan. Terima kasih!` };
}
