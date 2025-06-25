import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const product = await prisma.investmentProduct.findUnique({
    where: { slug: params.slug },
  });
  if (!product) return new NextResponse('Not found', { status: 404 });
  return NextResponse.json(product);
}
