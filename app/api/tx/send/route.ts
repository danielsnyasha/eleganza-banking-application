// app/api/tx/send/route.ts
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { prisma }                   from '@/lib/prisma';
import { auth }                     from '@clerk/nextjs/server';
import * as z                       from 'zod';

/* -------------------- request body schema -------------------- */
const Body = z.object({
  to:           z.string(),           // recipient account number
  amount:       z.number().positive(),// amount in USD
  fromCurrency: z.string().length(3), // must be "USD"
  toCurrency:   z.string().length(3), // used by front-end for display only
});

/* -------------------- helper: fee in cents ------------------- */
/** 0.6% + 1 unit, in cents: 100 + amtCents * 6 / 1000 */
function calcFeeCents(amountCents: bigint): bigint {
  return BigInt(100) + (amountCents * BigInt(6)) / BigInt(1000);
}

export async function POST(req: NextRequest) {
  try {
    /* 1️⃣ authenticate */
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
    }

    /* 2️⃣ validate + parse */
    const { to, amount, fromCurrency } = Body.parse(await req.json());

    if (fromCurrency !== 'USD') {
      return NextResponse.json(
        { error: 'invalid_currency', detail: 'Only USD transfers are supported.' },
        { status: 400 }
      );
    }

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
      dstAcct = await prisma.bankAccount.findUniqueOrThrow({
        where: { accountNumber: to },
      });
    } catch {
      return NextResponse.json({ error: 'recipient_not_found' }, { status: 404 });
    }

    /* 6️⃣ convert USD→cents and compute fee */
    const amountCents = BigInt(Math.round(amount * 100));
    const feeCents    = calcFeeCents(amountCents);
    const totalCents  = amountCents + feeCents;

    /* 7️⃣ check balance */
    if (totalCents > srcAcct.balanceCents) {
      return NextResponse.json(
        {
          error:     'insufficient_funds',
          available: Number(srcAcct.balanceCents) / 100,
        },
        { status: 400 }
      );
    }

    /* 8️⃣ perform all updates atomically */
    // bankSinkId is your bank's USD-fee account
    const bankSinkId = await (async () => {
      // find or create your internal bank fees account
      const sink = await prisma.bankAccount.findFirst({
        where: { accountNumber: '111122223333' },
      });
      if (sink) return sink.id;
      // fallback: create it
      const newSink = await prisma.bankAccount.create({
        data: {
          accountNumber: '111122223333',
          currency:      'USD',
          balanceCents:  BigInt(0),
          ownerId:       user.id, // or your bank user’s ID
        },
      });
      return newSink.id;
    })();

    await prisma.$transaction([
      // debit sender (USD)
      prisma.bankAccount.update({
        where: { id: srcAcct.id },
        data:  { balanceCents: { decrement: totalCents } },
      }),
      // credit recipient (USD same amount)
      prisma.bankAccount.update({
        where: { id: dstAcct.id },
        data:  { balanceCents: { increment: amountCents } },
      }),
      // credit bank fees (USD)
      prisma.bankAccount.update({
        where: { id: bankSinkId },
        data:  { balanceCents: { increment: feeCents } },
      }),
    ]);

    /* ✅ done */
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('[/api/tx/send] Error:', err);
    if (err.name === 'ZodError') {
      return NextResponse.json(
        { error: 'validation_failed', issues: err.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: err.message || 'unknown_error' },
      { status: 500 }
    );
  }
}
