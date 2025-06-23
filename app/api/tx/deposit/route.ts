// app/api/tx/deposit/route.ts
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { prisma }       from '@/lib/prisma';
import { auth }         from '@clerk/nextjs/server';
import { calcFee, bankAccountId } from '../_helpers';
import * as z from 'zod';

const Body = z.object({
  amount  : z.number().positive(),
  currency: z.string().length(3),
});

export async function POST(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: 'unauth' }, { status: 401 });

  const { amount, currency } = Body.parse(await req.json());
  const fee = calcFee(amount);

  // convert to cents for storing as BigInt
  const cents = Math.round(amount * 100);
  const feeCents = Math.round(fee * 100);

  // Find the user's account in this currency
  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: { accounts: true },
  });
  const acct = user?.accounts.find(a => a.currency === currency);
  if (!acct) return NextResponse.json({ error: 'no_account' }, { status: 400 });

  // update balances atomically
  await prisma.$transaction([
    prisma.bankAccount.update({
      where: { id: acct.id },
      data: { balanceCents: { increment: BigInt(cents - feeCents) } },
    }),
    prisma.bankAccount.update({
      where: { id: await bankAccountId() },
      data: { balanceCents: { increment: BigInt(feeCents) } },
    }),
  ]);
  return NextResponse.json({ ok: true });
}
