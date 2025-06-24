// app/api/tx/forex/route.ts
export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import { auth }                     from '@clerk/nextjs/server';
import { prisma }                   from '@/lib/prisma';
import { CurrencyCode }             from '@prisma/client'; 
import { convert }                  from '@/lib/fx';
import { ensureAccount, getBankSinkAccountId } from '@/lib/accountHelpers';
import * as z                        from 'zod';

const Body = z.object({
  amount      : z.number().positive(),
  fromCurrency: z.nativeEnum(CurrencyCode),  
  toCurrency  : z.nativeEnum(CurrencyCode),  
  side        : z.enum(['buy','sell']),
});

export async function POST(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });

  const { amount, fromCurrency, toCurrency, side } = Body.parse(await req.json());


  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return NextResponse.json({ error: 'user_not_found' }, { status: 404 });


  const payCurrency     = fromCurrency;
  const receiveCurrency = toCurrency;

  // ensure accounts exist
  const payAcct   = await ensureAccount(user.id, payCurrency);
  const recvAcct  = await ensureAccount(user.id, receiveCurrency);
  const sinkId    = await getBankSinkAccountId();

  // fetch FX rate
  const rate      = await convert(fromCurrency, toCurrency, amount);
  const fee       = +(1 + amount * 0.006).toFixed(6);
  const totalPay  = side === 'buy'
    ? amount + fee
    : (amount * rate) + fee;

  const payCents    = BigInt(Math.round(totalPay * 100));
  const feeCents    = BigInt(Math.round(fee * 100));
  const receiveAmt  = side === 'buy'
    ? amount * rate
    : amount / rate;
  const recvCents   = BigInt(Math.round(receiveAmt * 100));

  if (payAcct.balanceCents < payCents) {
    return NextResponse.json({ error: 'insufficient_funds' }, { status: 400 });
  }

  await prisma.$transaction([
    prisma.bankAccount.update({
      where: { id: payAcct.id },
      data: { balanceCents: { decrement: payCents } },
    }),
    prisma.bankAccount.update({
      where: { id: recvAcct.id },
      data: { balanceCents: { increment: recvCents } },
    }),
    prisma.bankAccount.update({
      where: { id: sinkId },
      data: { balanceCents: { increment: feeCents } },
    }),
    prisma.forexTrade.create({
      data: {
        userId       : user.id,
        fromCurrency,
        toCurrency,
        rate,
        amountFrom  : amount,
        amountTo    : receiveAmt,
        fee,
        status      : 'EXECUTED',
      },
    }),
  ]);

  return NextResponse.json({ ok: true });
}
