"use client";
import { useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/types/member";
import { SORTS } from "@/lib/members";
import { inputStyles } from "@/components/ui/primitives";
export function FilterBar() {
  const params = useSearchParams(); const router = useRouter(); const pathname = usePathname();
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  function update(name: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(name, value); else next.delete(name);
    next.delete("page"); // reset halaman saat filter berubah
    router.push(`${pathname}?${next.toString()}`);
  }
  return (
    <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_auto_auto]" role="search">
      <label className="text-sm font-semibold">Cari keahlian
        <input type="search" defaultValue={params.get("q") ?? ""} placeholder="Nama atau keahlian…" className={inputStyles}
          onChange={(e) => { clearTimeout(timer.current); const v = e.target.value; timer.current = setTimeout(() => update("q", v), 300); }} /></label>
      <label className="text-sm font-semibold">Kategori
        <select defaultValue={params.get("category") ?? ""} onChange={(e) => update("category", e.target.value)} className={inputStyles}>
          <option value="">Semua</option>{CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}</select></label>
      <label className="text-sm font-semibold">Urutkan
        <select defaultValue={params.get("sort") ?? "rating"} onChange={(e) => update("sort", e.target.value)} className={inputStyles}>
          {SORTS.map((s) => <option key={s} value={s}>{s}</option>)}</select></label>
    </div>
  );
}
