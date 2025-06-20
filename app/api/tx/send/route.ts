// app/api/tx/send/route.ts
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { prisma }                   from '@/lib/prisma';
import { auth }                     from '@clerk/nextjs/server';
import { convert }                  from '@/lib/fx';
import {
  findAccountOrThrow,
  bankAccountId,
} from '../_helpers';
import * as z                       from 'zod';

/* -------------------- request body schema -------------------- */
const Body = z.object({
  to           : z.string(),
  amount       : z.number().positive(),
  fromCurrency : z.string().length(3),
  toCurrency   : z.string().length(3),
});

/* -------------------- helper: fee in cents ------------------- */
/** 0.6% + 1 unit, in cents: 100 + amtCents * 6 / 1000 */
function calcFeeCents(amountCents: bigint): bigint {
  return BigInt(100) + (amountCents * BigInt(6)) / BigInt(1000);
}

export async function POST(req: NextRequest) {
  /* 1️⃣ authenticate */
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
  }

  /* 2️⃣ validate + parse */
  const { to, amount, fromCurrency, toCurrency } = Body.parse(
    await req.json()
  );

  /* 3️⃣ load sender + their primary account */
  const user = await prisma.user.findUnique({
    where:  { clerkId },
    include:{ accounts: true },
  });
  if (!user) {
    return NextResponse.json({ error: 'profile_not_found' }, { status: 400 });
  }
  const srcAcct = user.accounts[0];
  if (!srcAcct) {
    return NextResponse.json({ error: 'no_source_account' }, { status: 400 });
  }

  /* 4️⃣ no self‐transfer */
  if (srcAcct.accountNumber === to) {
    return NextResponse.json({ error: 'cannot_send_to_self' }, { status: 400 });
  }

  /* 5️⃣ lookup destination account */
  let dstAcct;
  try {
    dstAcct = await findAccountOrThrow(to);
  } catch (err: any) {
    if (err.message === 'account_not_found') {
      return NextResponse.json({ error: 'recipient_not_found' }, { status: 404 });
    }
    throw err;
  }

  /* 6️⃣ convert units → cents */
  const amountCents = BigInt(Math.round(amount * 100));
  const feeCents    = calcFeeCents(amountCents);
  const totalCents  = amountCents + feeCents;

  /* 7️⃣ check balance */
  if (totalCents > srcAcct.balanceCents) {
    return NextResponse.json(
      { error: 'insufficient_funds', available: Number(srcAcct.balanceCents) / 100 },
      { status: 400 }
    );
  }

  /* 8️⃣ do FX conversion */
  let convertedUnits: number;
  try {
    convertedUnits = await convert(fromCurrency, toCurrency, amount);
  } catch (err: any) {
    return NextResponse.json(
      { error: 'fx_error', message: err.message },
      { status: 502 }
    );
  }
  const convertedCents = BigInt(Math.round(convertedUnits * 100));

  /* 9️⃣ perform all three updates atomically */
  const bankSinkId = await bankAccountId();
  await prisma.$transaction([
    prisma.bankAccount.update({
      where: { id: srcAcct.id },
      data: { balanceCents: { decrement: totalCents } },
    }),
    prisma.bankAccount.update({
      where: { id: dstAcct.id },
      data: { balanceCents: { increment: convertedCents } },
    }),
    prisma.bankAccount.update({
      where: { id: bankSinkId },
      data: { balanceCents: { increment: feeCents } },
    }),
  ]);

  /* ✅ done */
  return NextResponse.json({ ok: true });
}
