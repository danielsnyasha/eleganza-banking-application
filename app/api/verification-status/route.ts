// app/api/verification-status/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { currentUserId } from '@/lib/auth';

export async function GET() {
  const clerkId = await currentUserId();

  const user = await prisma.user.findFirst({
    where: { clerkId },               // no TS2353 error
    select: { kycStatus: true },
  });

  return NextResponse.json({ verified: user?.kycStatus === 'VERIFIED' });
}
