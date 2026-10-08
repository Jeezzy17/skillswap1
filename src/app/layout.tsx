import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Nav } from "@/components/nav";
import "./globals.css";
export const metadata: Metadata = { title: "SkillSwap — Komunitas Tukar Keahlian", description: "Bertukar keahlian secara aman dan setara." };
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.theme==="dark")document.documentElement.classList.add("dark")}catch(e){}` }} /></head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:bg-surface focus:p-2">Lewati ke konten</a>
        <Nav />
        <main id="main" className="mx-auto max-w-5xl p-4 pb-24 md:pb-8 md:pl-56 md:pr-6 md:pt-6">{children}</main>
      </body>
    </html>
  );
}
