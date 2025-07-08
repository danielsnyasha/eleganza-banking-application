// app/api/full-user/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Await the auth call!
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('[API] Returning full user:', user);
    return NextResponse.json(user);

  } catch (err) {
    console.error('[API] Error fetching full user:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
