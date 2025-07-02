//app/api/admin-portal/loans/applications/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/* GET  → list all loan‑applications (newest first) */
export async function GET(_req: NextRequest) {
  const apps = await prisma.loanApplication.findMany({
    orderBy: { submittedAt: 'desc' },
    include: {
      product: {
        select: {
          name         : true,
          annualRatePct: true,
          termMonths   : true,
          minAmount    : true,
          maxAmount    : true,
        },
      },
    },
  });
  return NextResponse.json(apps);
}
