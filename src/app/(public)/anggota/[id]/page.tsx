import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonStyles } from "@/components/ui/button";
import { Avatar, Card, Chip } from "@/components/ui/primitives";
import { getMember } from "@/lib/members";
type Props = { params: Promise<{ id: string }> };
export async function generateMetadata({ params }: Props) {
  const { id } = await params; const m = getMember(id);
  return { title: m ? `${m.name} · SkillSwap` : "Anggota tidak ditemukan", description: m?.bio ?? "" };
}
export default async function Profil({ params }: Props) {
  const { id } = await params; const m = getMember(id);
  if (!m) notFound();
  return (
    <div className="space-y-3">
      <Link href="/cari" className="text-sm text-subtle">← Kembali ke pencarian</Link>
      <Card className="gap-3">
        <div className="flex items-center gap-3"><Avatar name={m.name} /><div><h1 className="text-xl font-bold">{m.name}</h1><p className="text-sm text-subtle">{m.role} · ★ {m.rating} · {m.sessions} sesi</p></div></div>
        <p>{m.bio}</p>
        <h2 className="font-semibold">Bisa mengajar</h2><div className="flex flex-wrap gap-1">{m.skills.map((s) => <Chip key={s}>{s}</Chip>)}</div>
        <h2 className="font-semibold">Ingin belajar</h2><div><Chip>{m.wants}</Chip></div>
        <Link href={`/permintaan?to=${m.id}`} className={buttonStyles()}>Ajukan pertukaran</Link>
      </Card>
    </div>
  );
}
