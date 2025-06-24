// app/api/wallet/route.ts
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { auth }        from '@clerk/nextjs/server';
import { prisma }      from '@/lib/prisma';

export async function GET() {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: {
      accounts: true,
      investments: {
        where: { product: { category: 'CRYPTO' } },
        include: { product: true },
      },
      forexTrades: {
        orderBy: { createdAt: 'desc' },
        take: 20,
      },
      transactions: {
        orderBy: { createdAt: 'desc' },
        take: 20,
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'user_not_found' }, { status: 404 });
  }

  // Format balances
  const accounts = user.accounts.map((a) => ({
    id:       a.id,
    currency: a.currency,
    balance:  Number(a.balanceCents) / 100,
    isActive: a.isActive,
  }));

  const cryptos = user.investments.map((inv) => ({
    id:          inv.id,
    symbol:      inv.product.name,
    amount:      inv.amount,
    currency:    inv.currency,
    status:      inv.status,
    acquiredAt:  inv.createdAt.toISOString(),
  }));

  const forexTrades = user.forexTrades.map((f) => ({
    id:           f.id,
    fromCurrency: f.fromCurrency,
    toCurrency:   f.toCurrency,
    amountFrom:   f.amountFrom,
    amountTo:     f.amountTo,
    rate:         f.rate,
    fee:          f.fee,
    executedAt:   f.createdAt.toISOString(),
  }));

  const transactions = user.transactions.map((t) => ({
    id:        t.id,
    type:      t.type,
    amount:    t.amount,
    currency:  t.currency,
    note:      t.note,
    happenedAt:t.createdAt.toISOString(),
  }));

  return NextResponse.json({ accounts, cryptos, forexTrades, transactions });
}
