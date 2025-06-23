export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { calcFee, bankAccountId } from '../_helpers';
import * as z from 'zod';

const Body = z.object({
  amount: z.number().positive(),
  currency: z.string().length(3),
  withdrawType: z.enum(['Cash', 'Cheque']),
  reference: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId)
    return NextResponse.json({ error: 'unauth' }, { status: 401 });

  const { amount, currency, withdrawType, reference } = Body.parse(
    await req.json()
  );
  const fee = calcFee(amount);

  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: { accounts: true },
  });
  const acct = user?.accounts[0];
  if (!acct)
    return NextResponse.json({ error: 'no_account' }, { status: 400 });

  // balanceCents is BigInt
  const totalCents = BigInt(Math.round((amount + fee) * 100));
  if (totalCents > acct.balanceCents) {
    return NextResponse.json({ error: 'insufficient' }, { status: 400 });
  }

  await prisma.$transaction([
    // Deduct amount + fees
    prisma.bankAccount.update({
      where: { id: acct.id },
      data: {
        balanceCents: { decrement: totalCents },
      },
    }),
    // Credit fee to bank
    prisma.bankAccount.update({
      where: { id: await bankAccountId() },
      data: {
        balanceCents: { increment: BigInt(Math.round(fee * 100)) },
      },
    }),
    // Optional: create transaction record
    prisma.transaction.create({
      data: {
        reference: `W-${Date.now()}`,
        type: 'WITHDRAWAL',
        status: 'POSTED',
        amount,
        currency,
        note: `${withdrawType} withdrawal${reference ? ` (${reference})` : ''}`,
        user: { connect: { clerkId } },
        fromAccount: { connect: { id: acct.id } },
      },
    }),
  ]);

  return NextResponse.json({ ok: true });
}
