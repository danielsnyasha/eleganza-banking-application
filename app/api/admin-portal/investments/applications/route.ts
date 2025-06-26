
//app/api/investments/applications/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const {
    userId,
    slug,
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
  } = await req.json();

  // Basic presence check – expand as needed
  if (!userId || !slug || !amount || !currency) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const app = await prisma.investmentApplication.create({
    data: {
      userId,
      slug,
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
