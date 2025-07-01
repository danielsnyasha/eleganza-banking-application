import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/* ---------- GET: list --------------------------------------------- */
export async function GET() {
  const loans = await prisma.loanProduct.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(loans);
}

/* ---------- POST: create ------------------------------------------ */
export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    name,
    shortDescription,
    purpose,
    currency,
    maxAmount,
    minAmount,
    annualRatePct,
    termMonths,
    feePct,
    images,
  } = body;

  if (!name || !currency) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 },
    );
  }

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const loan = await prisma.loanProduct.create({
    data: {
      slug,
      name,
      shortDescription,
      purpose,
      currency,
      maxAmount: Number(maxAmount),
      minAmount: Number(minAmount),
      annualRatePct: Number(annualRatePct),
      termMonths: Number(termMonths),
      feePct: feePct ? Number(feePct) : null,
      images,
    },
  });

  return NextResponse.json(loan, { status: 201 });
}
