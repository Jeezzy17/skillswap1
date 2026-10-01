# SkillSwap — Next.js 15 · TypeScript strict · Tailwind v4
```
npm install && npm run dev      # http://localhost:3000
npm run typecheck && npm test -- --run
```
Peta modul: 1 setup/struktur · 2 `src/types` · 3 grup rute `(public)`/`(member)`, loading/error/not-found · 4 token di `globals.css` + mode gelap ·
5 `components/ui` · 6 server vs client (`"use client"` hanya filter, form, chat, chart, nav) · 7 Suspense/streaming di `/` dan `/cari` ·
8 `/api/members` (Zod, 400 bila salah) · 9 Server Action `permintaan` & `jadwal` · 10 filter/sort/pagination via URL di `/cari` ·
11 grafik + tabel `sr-only` · 12 `middleware.ts` (login = nama apa saja) · 14 Vitest + `.github/workflows/ci.yml`.
Data dummy: `src/lib/data.ts` → ganti dengan fetch API saat integrasi backend.
