"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
const ITEMS = [["/", "Eksplorasi", "⌂"], ["/cari", "Pencarian", "⌕"], ["/permintaan", "Permintaan", "＋"], ["/pesan", "Pesan", "✉"], ["/jadwal", "Jadwal", "◷"]] as const;
export function Nav() {
  const path = usePathname();
  const toggle = () => { const d = document.documentElement.classList.toggle("dark"); try { localStorage.theme = d ? "dark" : "light"; } catch {} };
  return (
    <nav aria-label="Navigasi utama" className="fixed inset-x-0 bottom-0 z-10 flex border-t border-border bg-surface md:inset-y-0 md:right-auto md:w-52 md:flex-col md:gap-1 md:border-r md:border-t-0 md:p-3">
      <strong className="hidden px-3 py-3 text-xl text-brand md:block">SkillSwap</strong>
      {ITEMS.map(([href, label, icon]) => {
        const active = href === "/" ? path === "/" : path.startsWith(href);
        return (<Link key={href} href={href} aria-current={active ? "page" : undefined}
          className={cn("flex min-h-14 flex-1 flex-col items-center justify-center text-[11px] text-subtle md:min-h-11 md:flex-none md:flex-row md:justify-start md:gap-3 md:rounded-lg md:px-3 md:text-sm", active && "font-bold text-brand md:bg-muted")}>
          <span aria-hidden className="text-xl md:text-base">{icon}</span>{label}</Link>);
      })}
      <button onClick={toggle} className="hidden min-h-11 rounded-lg px-3 text-left text-sm text-subtle hover:bg-muted md:mt-auto md:block">◐ Mode gelap</button>
    </nav>
  );
}
