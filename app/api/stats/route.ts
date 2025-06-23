// app/api/stats/route.ts
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { auth }                     from '@clerk/nextjs/server';
import { prisma }                   from '@/lib/prisma';

export async function GET(req: NextRequest) {
  // 1️⃣ Authenticate
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
  }

  // 2️⃣ Load user + their primary account
  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: { accounts: true },
  });
  if (!user) {
    return NextResponse.json({ error: 'user_not_found' }, { status: 404 });
  }
  const acct = user.accounts[0];
  if (!acct) {
    return NextResponse.json({ error: 'no_account' }, { status: 404 });
  }

  // 3️⃣ Compute numbers
  const balance        = Number(acct.balanceCents) / 100;
  const currency       = acct.currency;
  const depositsAgg    = await prisma.transaction.aggregate({
    where: { userId: user.id, type: 'DEPOSIT', status: 'POSTED' },
    _sum: { amount: true },
  });
  const withdrawalsAgg = await prisma.transaction.aggregate({
    where: { userId: user.id, type: 'WITHDRAWAL', status: 'POSTED' },
    _sum: { amount: true },
  });
  const totalEarnings  = depositsAgg._sum.amount ?? 0;
  const totalSpending  = withdrawalsAgg._sum.amount ?? 0;

  // 4️⃣ Return JSON
  return NextResponse.json({
    balance,
    currency,
    totalEarnings,
    totalSpending,
  });
}
