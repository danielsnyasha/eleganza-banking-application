// app/api/tx/crypto/route.ts
export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import { auth }                     from '@clerk/nextjs/server';
import { prisma }                   from '@/lib/prisma';
import { getBankSinkAccountId, ensureAccount } from '@/lib/accountHelpers';
import * as z                        from 'zod';

import { CurrencyCode }             from '@prisma/client'; 

// fetch current price from CoinGecko
async function fetchPrice(id: string): Promise<number> {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
  );
  if (!res.ok) throw new Error('Price fetch failed');
  const data = await res.json();
  return data[id]?.usd;
}

const Body = z.object({
  cryptoId  : z.string(),          // e.g. “bitcoin”
  side      : z.enum(['buy','sell']),
  amountFiat: z.number().positive(), // amount in USD
});

export async function POST(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });

  const { cryptoId, side, amountFiat } = Body.parse(await req.json());

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return NextResponse.json({ error: 'user_not_found' }, { status: 404 });

  // load USD account + a “crypto wallet” in USD for simplicity
  const usdAcct   = await ensureAccount(user.id, 'USD');
  const sinkId    = await getBankSinkAccountId();

  // current price
  const price     = await fetchPrice(cryptoId);
  const fee       = +(1 + amountFiat * 0.006).toFixed(6);
  const totalCost = amountFiat + fee;
  const cryptoAmt = amountFiat / price;

  const costCents = BigInt(Math.round(totalCost * 100));
  const feeCents  = BigInt(Math.round(fee * 100));

  if (usdAcct.balanceCents < costCents) {
    return NextResponse.json({ error: 'insufficient_funds' }, { status: 400 });
  }

  // atomic update + record as an Investment
  await prisma.$transaction([
    // debit USD account
    prisma.bankAccount.update({
      where: { id: usdAcct.id },
      data: { balanceCents: { decrement: costCents } },
    }),
    // fee to bank
    prisma.bankAccount.update({
      where: { id: sinkId },
      data: { balanceCents: { increment: feeCents } },
    }),
    // record purchase as Investment
    prisma.investment.create({
      data: {
        userId       : user.id,
        productId    : cryptoId,      // you may need seeding InvestmentProduct.id=cryptoId 
        amount       : cryptoAmt,
        currency: CurrencyCode.USD,
        startDate    : new Date(),
        status       : 'OPEN',
      },
    }),
  ]);

  return NextResponse.json({ ok: true, price, cryptoAmt });
}
