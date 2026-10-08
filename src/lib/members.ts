import { z } from "zod";
import { CATEGORIES, type Member } from "@/types/member";
import { members } from "./data";
export const SORTS = ["rating", "sesi", "nama"] as const;
export const querySchema = z.object({
  q: z.string().trim().max(40).optional(),
  category: z.enum(CATEGORIES).optional(),
  sort: z.enum(SORTS).default("rating"),
  page: z.coerce.number().int().min(1).default(1),
  perPage: z.coerce.number().int().min(1).max(50).default(4),
});
export type MemberQuery = z.infer<typeof querySchema>;
export function queryMembers(query: MemberQuery): { rows: Member[]; total: number } {
  const kw = query.q?.toLowerCase() ?? "";
  const list = members
    .filter((m) => (!query.category || m.category === query.category) && `${m.name} ${m.skills.join(" ")}`.toLowerCase().includes(kw))
    .sort((a, b) => (query.sort === "nama" ? a.name.localeCompare(b.name) : query.sort === "sesi" ? b.sessions - a.sessions : b.rating - a.rating));
  const start = (query.page - 1) * query.perPage;
  return { rows: list.slice(start, start + query.perPage), total: list.length };
}
export const getMember = (id: string): Member | undefined => members.find((m) => m.id === id);
