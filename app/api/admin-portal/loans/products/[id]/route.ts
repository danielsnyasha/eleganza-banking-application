import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const body   = await _req.json();
  const updated = await prisma.loanProduct.update({
    where:  { id: params.id },
    data:   body,
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  await prisma.loanProduct.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
