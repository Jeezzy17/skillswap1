import Link from "next/link";
import type { HTMLAttributes, ReactNode } from "react";
import type { RequestStatus } from "@/types/member";
import { cn } from "@/lib/utils";
import { buttonStyles } from "./button";
export const inputStyles = "h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm";
export const Card = ({ className, ...p }: HTMLAttributes<HTMLDivElement>) => <div className={cn("flex min-w-0 flex-col gap-2 rounded-xl border border-border bg-surface p-4", className)} {...p} />;
export const Chip = ({ children }: { children: ReactNode }) => <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-brand">{children}</span>;
const STATUS: Record<RequestStatus, string> = { menunggu: "bg-muted text-subtle", diterima: "bg-muted text-brand", dijadwalkan: "bg-muted text-foreground", selesai: "bg-muted text-success" };
export const StatusBadge = ({ status }: { status: RequestStatus }) => <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", STATUS[status])}>● {status}</span>;
export const Avatar = ({ name }: { name: string }) => <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full bg-brand font-bold text-background">{name.split(" ").map((w) => w[0]).join("").slice(0, 2)}</span>;
export const Skeleton = ({ n = 4 }: { n?: number }) => <div aria-busy="true" aria-label="Memuat" className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{Array.from({ length: n }, (_, i) => <div key={i} className="h-36 animate-pulse rounded-xl bg-muted" />)}</div>;
export const EmptyState = ({ title, text, href, cta }: { title: string; text: string; href?: string; cta?: string }) => (
  <Card role="status" className="items-center p-8 text-center"><h3 className="font-semibold">{title}</h3><p className="text-sm text-subtle">{text}</p>{href && <Link href={href} className={buttonStyles("outline")}>{cta}</Link>}</Card>);
export const Field = ({ id, label, error, children }: { id: string; label: string; error?: string | undefined; children: ReactNode }) => (
  <div className="space-y-1"><label htmlFor={id} className="text-sm font-semibold">{label}</label>{children}{error && <p id={`${id}-err`} className="text-sm text-danger">{error}</p>}</div>);
