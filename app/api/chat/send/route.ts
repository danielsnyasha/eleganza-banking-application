// app/api/chat/send/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { pusher }  from "@/lib/pusherServer";

const Body = z.object({
  room:       z.string().default("default"),
  senderId:   z.string(),
  senderName: z.string(),
  senderAvatar: z.string().nullable(),
  text:       z.string().nullable(),
  file:       z.string().nullable(),
});

export async function POST(req: NextRequest) {
  const data = Body.parse(await req.json());
  const msg = await prisma.chatMessage.create({
    data: {
      room: data.room,
      senderId: data.senderId,
      senderName: data.senderName,
      senderAvatar: data.senderAvatar,
      text: data.text,
      file: data.file,
    },
  });

  // broadcast
  await pusher.trigger("chat", "new-message", msg);
  return NextResponse.json({ ok: true });
}
