/* app/api/admin-portal/investments/applications/route.ts
   GET  → list all investment applications (+ product info)                */
// app/api/admin-portal/investments/applications/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/* ---------- GET  /api/admin-portal/investments/applications ---------- */
export async function GET(_req: NextRequest) {
  const apps = await prisma.investmentApplication.findMany({
    orderBy: { submittedAt: 'desc' },

    /* Only join what really exists: product. */
    include: {
      product: {
        select: { name: true, annualRatePct: true, minimumAmount: true },
      },
    },
  });
  return NextResponse.json(apps);
}

/* ---------- PATCH /api/admin-portal/investments/applications/[id] ---------- */
export async function PATCH(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const body   = await _req.json() as { status: 'approved' | 'cancelled' };
  const status = body.status;

  const updated = await prisma.investmentApplication.update({
    where:  { id: params.id },
    data:   { status },
    select: {
      id: true,
      status: true,
      submittedAt: true,
      amount: true,
      currency: true,
      name: true,
      surname: true,
      email: true,
      product: { select: { name: true } },
    },
  });

  return NextResponse.json(updated);
}
