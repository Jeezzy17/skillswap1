"use client";
import { useActionState } from "react";
import { requestAction, type Field, type RequestState } from "@/app/(member)/permintaan/actions";
import { Button } from "@/components/ui/button";
import { Card, Field as Box, inputStyles } from "@/components/ui/primitives";
const initial: RequestState = { ok: false, message: "", errors: {}, values: {} };
export function RequestForm({ members, defaultTo }: { members: { id: string; name: string }[]; defaultTo: string }) {
  const [s, action, pending] = useActionState(requestAction, initial);
  const a = (k: Field) => ({ id: k, name: k, "aria-invalid": !!s.errors[k], "aria-describedby": s.errors[k] ? `${k}-err` : undefined, className: inputStyles });
  return (
    <form action={action} noValidate className="max-w-xl"><Card className="gap-4">
      {s.message && <p role="status" className={s.ok ? "text-success" : "text-danger"}>{s.message}</p>}
      <Box id="to" label="Kirim ke" error={s.errors.to}><select {...a("to")} defaultValue={s.values.to ?? defaultTo}><option value="">— Pilih anggota —</option>{members.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}</select></Box>
      <Box id="offer" label="Keahlian yang ditawarkan" error={s.errors.offer}><input {...a("offer")} defaultValue={s.values.offer} /></Box>
      <Box id="want" label="Keahlian yang ingin dipelajari" error={s.errors.want}><input {...a("want")} defaultValue={s.values.want} /></Box>
      <Box id="msg" label="Pesan" error={s.errors.msg}><textarea {...a("msg")} rows={4} defaultValue={s.values.msg} className={`${inputStyles} h-auto py-2`} /></Box>
      <Button type="submit" disabled={pending}>{pending ? "Mengirim..." : "Kirim permintaan"}</Button>
    </Card></form>
  );
}
