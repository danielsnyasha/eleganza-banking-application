import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/* Very small, single‑entry “FEE” transaction */
export async function POST(req: NextRequest) {
  const { accountId, amount, currency, note, type } = await req.json();
  // naive negative‑balance check skipped – implement as needed
  await prisma.transaction.create({
    data: {
      reference   : `FEE_${Date.now()}`,
      type        : 'FEE',
      status      : 'POSTED',
      amount      : -Math.abs(amount),
      currency,
      note,
      fromAccount : { connect: { id: accountId } },
      toAccount   : undefined,          // fee -> bank revenue account
      userId      : undefined,          // optional
    },
  });
  return NextResponse.json({ ok: true });
}
