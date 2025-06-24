// app/api/chat/history/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const room = "default";
  const msgs = await prisma.chatMessage.findMany({
    where: { room },
    orderBy: { createdAt: "asc" },
    take: 50,
  });
  return NextResponse.json(msgs);
}
