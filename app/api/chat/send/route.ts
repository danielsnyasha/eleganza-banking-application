'use server'; // or remove if not needed by your setup

import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { pusher } from '@/lib/pusherServer';
import { chatIdFor } from '@/lib/chatIds';
import * as z from 'zod';

const Body = z.object({
  peerId: z.string(),
  text  : z.string().optional(),
  file  : z.string().optional(), // base64 img
});

export async function POST(req: NextRequest) {
  // 1️⃣ Authenticate
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'unauth' }, { status: 401 });
  }

  // 2️⃣ Validate request body
  const { peerId, text, file } = Body.parse(await req.json());
  if (!text && !file) {
    return NextResponse.json({ error: 'empty' }, { status: 400 });
  }

  // 3️⃣ Load sender from Clerk
  const clerk = await clerkClient();             // ← await the function
  const u = await clerk.users.getUser(userId);   // now .users exists
  const senderName   = [u.firstName, u.lastName].filter(Boolean).join(' ') || u.username || 'User';
  const senderAvatar = u.imageUrl ?? '';

  // 4️⃣ Determine canonical chat ID
  const chatId = chatIdFor(userId, peerId);

  // 5️⃣ Persist message
  const msg = await prisma.chatMessage.create({
    data: {
      chatId,
      room       : chatId,
      senderId   : userId,
      receiverId : peerId,
      senderName,
      senderAvatar,
      text,
      file,
    },
  });

  // 6️⃣ Fan out via Pusher
  await Promise.all([
    pusher.trigger(`chat-${chatId}`, 'new', msg),
    pusher.trigger(`user-${peerId}`,  'inbox', msg),
  ]);

  return NextResponse.json({ ok: true });
}
