"use client";
import { Button } from "@/components/ui/button";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (<div role="alert" className="space-y-3 rounded-xl border border-danger p-6 text-center"><h1 className="text-xl font-bold">Jaringan bermasalah</h1><p>Data gagal dimuat. Periksa koneksi lalu coba lagi.</p><Button onClick={reset}>Coba lagi</Button></div>);
}
