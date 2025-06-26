/* app/api/admin-portal/investments/products/[id]/route.ts */
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.investmentProduct.delete({
    where: { id: params.id },
  });
  return NextResponse.json({ ok: true });
}
