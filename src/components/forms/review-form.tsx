"use client";
import { useActionState } from "react";
import { reviewAction, type ReviewState } from "@/app/(member)/jadwal/actions";
import { Button } from "@/components/ui/button";
import { inputStyles } from "@/components/ui/primitives";
const initial: ReviewState = { ok: false, message: "" };
export function ReviewForm({ id }: { id: string }) {
  const [s, action, pending] = useActionState(reviewAction, initial);
  return (
    <form action={action} className="space-y-2">
      <fieldset><legend className="text-sm font-semibold">Beri ulasan</legend>
        <div className="flex gap-1">{[1, 2, 3, 4, 5].map((n) => <label key={n} className="grid size-11 cursor-pointer place-items-center rounded-lg border border-border has-[:checked]:bg-brand has-[:checked]:text-background has-[:focus-visible]:outline-2"><input type="radio" name="rating" value={n} className="sr-only" /><span aria-hidden>★</span><span className="sr-only">{n} bintang</span></label>)}</div></fieldset>
      <label htmlFor={`c-${id}`} className="sr-only">Komentar</label><input id={`c-${id}`} name="comment" placeholder="Komentar (opsional)" className={inputStyles} />
      <Button type="submit" disabled={pending}>{pending ? "Menyimpan..." : "Kirim ulasan"}</Button>
      {s.message && <p role="status" className={s.ok ? "text-success" : "text-danger"}>{s.message}</p>}
    </form>
  );
}
