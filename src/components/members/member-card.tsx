import Link from "next/link";
import type { Member } from "@/types/member";
import { buttonStyles } from "@/components/ui/button";
import { Avatar, Card, Chip } from "@/components/ui/primitives";
export function MemberCard({ m }: { m: Member }) {
  return (
    <Card>
      <div className="flex items-center gap-3"><Avatar name={m.name} /><div className="min-w-0"><h3 className="font-semibold">{m.name}</h3><p className="text-sm text-subtle">{m.role} · ★ {m.rating}</p></div></div>
      <div className="flex flex-wrap gap-1">{m.skills.map((s) => <Chip key={s}>{s}</Chip>)}</div>
      <p className="text-sm text-subtle">Ingin belajar: {m.wants}</p>
      <Link href={`/anggota/${m.id}`} className={buttonStyles("outline")}>Lihat profil</Link>
    </Card>
  );
}
