import { describe, expect, it } from "vitest";
import { querySchema, queryMembers, getMember } from "@/lib/members";
const q = (o: object) => querySchema.parse(o);
describe("queryMembers", () => {
  it("memfilter berdasarkan kata kunci keahlian", () => {
    const { rows } = queryMembers(q({ q: "figma" }));
    expect(rows.map((m) => m.name)).toEqual(["Bima Saputra"]);
  });
  it("memfilter berdasarkan kategori", () => {
    expect(queryMembers(q({ category: "kreatif" })).total).toBe(2);
  });
  it("mengurutkan rating tertinggi lebih dulu", () => {
    const { rows } = queryMembers(q({ sort: "rating", perPage: 50 }));
    expect(rows[0]?.rating).toBeGreaterThanOrEqual(rows[1]?.rating ?? 0);
  });
  it("membagi halaman dan menolak parameter tidak valid", () => {
    expect(queryMembers(q({ page: 2 })).rows).toHaveLength(2);
    expect(querySchema.safeParse({ page: 0 }).success).toBe(false);
    expect(getMember("999")).toBeUndefined();
  });
});
