import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { isActive } = await req.json();
  await prisma.investmentProduct.update({
    where: { id: params.id },
    data: { isActive: Boolean(isActive) },
  });
  return NextResponse.json({ ok: true });
}
