import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET  ➟ /api/investment-products
export async function GET() {
  const products = await prisma.investmentProduct.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(products);
}

// POST ➟ /api/investment-products
export async function POST(req: Request) {
  const body = await req.json();

  // basic safety – beef up in real life
  const {
    name,
    shortDescription,
    category,
    currency,
    minimumAmount,
    annualRatePct,
    termDays,
    images,
  } = body;

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
      minimumAmount,
      annualRatePct,
      termDays,
      images,
    },
  });

  return NextResponse.json(product, { status: 201 });
}
