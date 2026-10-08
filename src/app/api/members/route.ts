import { NextResponse } from "next/server";
import { querySchema, queryMembers } from "@/lib/members";
export async function GET(request: Request) {
  const parsed = querySchema.safeParse(Object.fromEntries(new URL(request.url).searchParams));
  if (!parsed.success) return NextResponse.json({ error: "Parameter tidak valid", issues: parsed.error.flatten() }, { status: 400 });
  const { rows, total } = queryMembers(parsed.data);
  return NextResponse.json({ data: rows, total, page: parsed.data.page });
}
