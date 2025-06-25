// app/api/chat/history/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const chatId = req.nextUrl.searchParams.get('chatId');
  if (!chatId) {
    return NextResponse.json([], { status: 400 });
  }

  const raw = await prisma.chatMessage.findMany({
    where: { chatId },
    orderBy: { createdAt: 'asc' },
  });

  const msgs = raw.map(m => ({
    id:           m.id,
    chatId:       m.chatId,
    room:         m.room,
    senderId:     m.senderId,
    receiverId:   m.receiverId,
    senderName:   m.senderName,
    senderAvatar: m.senderAvatar,
    text:         m.text,
    file:         m.file,
    createdAt:    m.createdAt.toISOString(),
  }));

  return NextResponse.json(msgs);
}
