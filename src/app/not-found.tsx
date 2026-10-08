import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";
export default function NotFound() {
  return (<div className="space-y-3 p-8 text-center"><h1 className="text-xl font-bold">Halaman tidak ditemukan</h1><p className="text-subtle">Anggota atau halaman yang kamu cari tidak ada.</p><Link href="/cari" className={buttonStyles()}>Cari anggota lain</Link></div>);
}
