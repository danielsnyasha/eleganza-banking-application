import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/* PATCH  → update status (approved | cancelled | pending) */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { status } = await req.json();
  if (!['approved', 'cancelled', 'pending'].includes(status)) {
    return NextResponse.json({ error: 'Bad status' }, { status: 400 });
  }

  await prisma.loanApplication.update({
    where: { id: params.id },
    data : { status },
  });

  return NextResponse.json({ ok: true });
}
