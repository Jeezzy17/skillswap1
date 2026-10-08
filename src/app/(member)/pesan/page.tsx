import { ChatPanel } from "@/components/members/chat-panel";
import { EmptyState } from "@/components/ui/primitives";
import { chats, members } from "@/lib/data";
export default function Pesan() {
  const threads = Object.entries(chats).flatMap(([id, msgs]) => { const m = members.find((x) => x.id === id); return m ? [{ id, name: m.name, msgs }] : []; });
  return (<><h1 className="mb-4 text-2xl font-bold">Pesan</h1>{threads.length ? <ChatPanel threads={threads} /> : <EmptyState title="Belum ada percakapan" text="Mulai dengan mengajukan pertukaran." href="/cari" cta="Cari anggota" />}</>);
}
