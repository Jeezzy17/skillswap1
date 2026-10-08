import Link from "next/link";
import { Suspense } from "react";
import { MemberCard } from "@/components/members/member-card";
import { ResponseChart } from "@/components/members/response-chart";
import { buttonStyles } from "@/components/ui/button";
import { Card, Skeleton } from "@/components/ui/primitives";
import { members, responseTrend } from "@/lib/data";
async function Trend() { await new Promise((r) => setTimeout(r, 500)); return <Card><ResponseChart data={responseTrend} /></Card>; }
export default function Eksplorasi() {
  const stats = [["326", "Ahli aktif"], ["18", "Topik"], ["4.8", "Rating"]] as const;
  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-brand p-6 text-background">
        <h1 className="text-2xl font-bold">Komunitas Tukar Keahlian</h1>
        <p className="mb-4 mt-1">Belajar bersama, tumbuh bersama — aman dan setara.</p>
        <Link href="/cari" className={buttonStyles("outline", "md", "border-background text-background hover:bg-background/20")}>Cari mentor / partner</Link>
      </section>
      <section aria-label="Statistik" className="grid grid-cols-3 gap-3">
        {stats.map(([v, l]) => <Card key={l}><b className="text-2xl text-brand">{v}</b><span className="text-sm text-subtle">{l}</span></Card>)}
      </section>
      <Suspense fallback={<Skeleton n={1} />}><Trend /></Suspense>
      <section><h2 className="mb-3 text-lg font-semibold">Anggota populer</h2>
        <div className="grid gap-3 md:grid-cols-2">{members.slice(0, 4).map((m) => <MemberCard key={m.id} m={m} />)}</div></section>
    </div>
  );
}
