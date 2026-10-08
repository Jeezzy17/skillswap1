"use client";
import { useState } from "react";
import type { ChatMsg } from "@/types/member";
import { Button } from "@/components/ui/button";
import { Card, inputStyles } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";
type Thread = { id: string; name: string; msgs: ChatMsg[] };
export function ChatPanel({ threads }: { threads: Thread[] }) {
  const [all, setAll] = useState(threads); const [sel, setSel] = useState(threads[0]?.id ?? ""); const [text, setText] = useState("");
  const cur = all.find((t) => t.id === sel);
  if (!cur) return null;
  const send = (e: React.FormEvent) => { e.preventDefault(); if (!text.trim()) return; setAll(all.map((t) => (t.id === sel ? { ...t, msgs: [...t.msgs, { from: "me", text: text.trim() }] } : t))); setText(""); };
  return (
    <div className="grid gap-3 md:grid-cols-[220px_1fr]">
      <Card>{all.map((t) => <Button key={t.id} variant={t.id === sel ? "primary" : "outline"} onClick={() => setSel(t.id)} aria-pressed={t.id === sel}>{t.name}</Button>)}</Card>
      <Card aria-label={`Chat dengan ${cur.name}`}>
        <h2 className="font-semibold">{cur.name}</h2>
        <div className="flex flex-col gap-2" aria-live="polite">{cur.msgs.map((m, i) => <p key={i} className={cn("max-w-[80%] rounded-xl bg-muted px-3 py-2", m.from === "me" && "self-end bg-brand text-background")}>{m.text}</p>)}</div>
        <form onSubmit={send} className="flex gap-2"><label htmlFor="msg" className="sr-only">Tulis pesan</label><input id="msg" value={text} onChange={(e) => setText(e.target.value)} placeholder="Tulis pesan…" className={inputStyles} /><Button type="submit">Kirim</Button></form>
      </Card>
    </div>
  );
}
