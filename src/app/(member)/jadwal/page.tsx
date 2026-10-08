import { ReviewForm } from "@/components/forms/review-form";
import { Card, EmptyState, StatusBadge } from "@/components/ui/primitives";
import { members, sessions } from "@/lib/data";
export default function Jadwal() {
  return (
    <><h1 className="mb-4 text-2xl font-bold">Jadwal Sesi</h1>
      {sessions.length === 0 ? <EmptyState title="Belum ada sesi" text="Sepakati jadwal setelah permintaan diterima." /> :
        <div className="grid gap-3 md:grid-cols-2">{sessions.map((s) => (
          <Card key={s.id}><div className="flex items-start justify-between gap-2"><h2 className="font-semibold">{s.topic}</h2><StatusBadge status={s.status} /></div>
            <p className="text-sm text-subtle">Dengan {members.find((m) => m.id === s.withId)?.name} · {s.when}</p>
            {s.status === "selesai" && <ReviewForm id={s.id} />}</Card>))}</div>}</>
  );
}
