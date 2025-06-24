// app/api/chat/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  // distinct senders from chat history
  const users = await prisma.chatMessage.findMany({
    distinct: ["senderId"],
    select: {
      senderId: true,
      senderName: true,
      senderAvatar: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(users);
}
