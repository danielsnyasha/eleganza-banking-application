import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fuzzysort from "fuzzysort";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  if (!q) return NextResponse.json([]);
  // grab max 50 users (avoid huge scans)
  const users = await prisma.user.findMany({
    take: 50,
    select: { id: true, firstName: true, lastName: true, imageUrl: true },
  });
  // fuzzy filter client-side
  const ranked = fuzzysort
    .go(q, users, { key: "firstName" })
    .map((r) => r.obj)
    .slice(0, 10);
  return NextResponse.json(ranked);
}
