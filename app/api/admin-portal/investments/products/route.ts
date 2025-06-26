import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/*  GET → list all products  */
export async function GET() {
  const products = await prisma.investmentProduct.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(products);
}

/*  POST → create product  */
export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    name,
    shortDescription,
    category,
    currency,
    minimumAmount,
    annualRatePct,
    termDays,
    images,
    maxValue,
  } = body;

  if (!name || !category || !currency) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const product = await prisma.investmentProduct.create({
    data: {
      slug,
      name,
      shortDescription,
      category,
      currency,
      minimumAmount: Number(minimumAmount),
      annualRatePct: Number(annualRatePct),
      termDays: termDays ? Number(termDays) : null,
      images,
      maxValue: maxValue ? Number(maxValue) : 0, // safe default
    },
  });

  return NextResponse.json(product, { status: 201 });
}
