import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const payload = await req.json();

  const {
    userId, slug, amount, currency, risk, experience,
    goal, horizon, name, surname, email, phone, notes,
  } = payload;

  if (!userId || !slug || !amount || !currency) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  /* resolve productId from slug (if product exists) */
  const product = await prisma.investmentProduct.findUnique({ where: { slug } });

  const app = await prisma.investmentApplication.create({
    data: {
      userId,
      slug,
      productId: product?.id ?? null,
      amount,
      currency,
      risk,
      experience,
      goal,
      horizon,
      name,
      surname,
      email,
      phone,
      notes,
    },
  });

  return NextResponse.json({ ok: true, id: app.id }, { status: 201 });
}
