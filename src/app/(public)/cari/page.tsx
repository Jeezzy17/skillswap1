import { Suspense } from "react";
import Link from "next/link";
import { FilterBar } from "@/components/members/filter-bar";
import { MemberCard } from "@/components/members/member-card";
import { buttonStyles } from "@/components/ui/button";
import { EmptyState, Skeleton } from "@/components/ui/primitives";
import { querySchema, queryMembers, type MemberQuery } from "@/lib/members";
type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };
async function Results({ query }: { query: MemberQuery }) {
  await new Promise((r) => setTimeout(r, 400)); // simulasi latensi API
  const { rows, total } = queryMembers(query);
  if (rows.length === 0) return <EmptyState title="Belum ada hasil" text="Coba kata kunci lain atau atur ulang filter." href="/cari" cta="Atur ulang filter" />;
  const pages = Math.ceil(total / query.perPage);
  const link = (p: number) => { const u = new URLSearchParams(); if (query.q) u.set("q", query.q); if (query.category) u.set("category", query.category); u.set("sort", query.sort); u.set("page", String(p)); return `/cari?${u}`; };
  return (<>
    <p className="mb-2 text-sm text-subtle" role="status">{total} anggota ditemukan</p>
    <div className="grid gap-3 md:grid-cols-2">{rows.map((m) => <MemberCard key={m.id} m={m} />)}</div>
    <nav aria-label="Halaman" className="mt-4 flex items-center justify-between">
      {query.page > 1 ? <Link href={link(query.page - 1)} className={buttonStyles("outline")}>← Sebelumnya</Link> : <span />}
      <span className="text-sm">Halaman {query.page} / {pages}</span>
      {query.page < pages ? <Link href={link(query.page + 1)} className={buttonStyles("outline")}>Berikutnya →</Link> : <span />}
    </nav></>);
}
export default async function CariPage({ searchParams }: Props) {
  const sp = await searchParams;
  const parsed = querySchema.safeParse(sp);
  const query = parsed.success ? parsed.data : querySchema.parse({});
  return (<><h1 className="mb-4 text-2xl font-bold">Pencarian</h1><FilterBar />
    <Suspense key={JSON.stringify(query)} fallback={<Skeleton n={2} />}><Results query={query} /></Suspense></>);
}
