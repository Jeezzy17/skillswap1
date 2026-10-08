import { RequestForm } from "@/components/forms/request-form";
import { members } from "@/lib/data";
export default async function Permintaan({ searchParams }: { searchParams: Promise<{ to?: string }> }) {
  const { to = "" } = await searchParams;
  return (<><h1 className="mb-4 text-2xl font-bold">Ajukan Pertukaran</h1><RequestForm members={members.map(({ id, name }) => ({ id, name }))} defaultTo={to} /></>);
}
