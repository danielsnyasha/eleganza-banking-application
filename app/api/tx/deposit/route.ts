/* ---------------------------------------------------------------
   POST /api/tx/deposit – cash in
------------------------------------------------------------------*/
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

  const { amount } = Body.parse(await req.json());
  const fee = calcFee(amount);

  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: { accounts: true },
  });
  const acct = user?.accounts[0];
  if (!acct) return NextResponse.json({ error: 'no_account' }, { status: 400 });

  await prisma.$transaction([
    prisma.bankAccount.update({
      where: { id: acct.id },
      data: { balance: { increment: amount - fee } },
    }),
    prisma.bankAccount.update({
      where: { id: await bankAccountId() },
      data: { balance: { increment: fee } },
    }),
  ]);
  return NextResponse.json({ ok: true });
}
