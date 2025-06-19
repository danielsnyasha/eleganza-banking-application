/* ---------------------------------------------------------------
   POST /api/tx/send
   Body: { to: string; amount: number; fromCurrency: string; toCurrency: string }
------------------------------------------------------------------*/
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { prisma }   from '@/lib/prisma';
import { auth }     from '@clerk/nextjs/server';
import { convert }  from '@/lib/fx';
import { calcFee, findAccountOrThrow, bankAccountId } from '../_helpers';
import * as z from 'zod';

const Body = z.object({
  to           : z.string(),         // dest account no
  amount       : z.number().positive(),
  fromCurrency : z.string().length(3),
  toCurrency   : z.string().length(3),
});

export async function POST(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: 'unauth' }, { status: 401 });

  /* ---------- validate body ------------------- */
  const { to, amount, fromCurrency, toCurrency } = Body.parse(await req.json());

  /* ---------- fetch sender + first account ---- */
  const sender = await prisma.user.findUnique({
    where: { clerkId },
    include: { accounts: true },
  });
  if (!sender) return NextResponse.json({ error: 'profile_missing' }, { status: 400 });

  const src = sender.accounts[0];
  if (!src) return NextResponse.json({ error: 'no_account' }, { status: 400 });

  if (src.accountNumber === to)
    return NextResponse.json({ error: 'self_transfer' }, { status: 400 });

  const dst = await findAccountOrThrow(to);

  /* live fx ------------------------------------------------------ */
  const sendFee   = calcFee(amount);
  const sendTotal = amount + sendFee;
  if (sendTotal > src.balance)
    return NextResponse.json({ error: 'insufficient' }, { status: 400 });

  const converted = await convert(fromCurrency, toCurrency, amount);

  /* prisma tx ---------------------------------------------------- */
  await prisma.$transaction([
    /* debit sender (amount + fee) */
    prisma.bankAccount.update({
      where: { id: src.id },
      data: { balance: { decrement: sendTotal } },
    }),
    /* credit receiver (converted)   */
    prisma.bankAccount.update({
      where: { id: dst.id },
      data: { balance: { increment: converted } },
    }),
    /* credit bank fee sink          */
    prisma.bankAccount.update({
      where: { id: await bankAccountId() },
      data: { balance: { increment: sendFee } },
    }),
  ]);

  return NextResponse.json({ ok: true });
}
