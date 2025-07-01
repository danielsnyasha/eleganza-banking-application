/* app/api/loans/my-applications/route.ts */
import { NextResponse } from 'next/server'
import { prisma }       from '@/lib/prisma'

export async function GET () {
  // 🔒  plug in real auth here
  const userId = 'demo-user-id'

  const apps = await prisma.loanApplication.findMany({
    where   : { userId },
    orderBy : { submittedAt: 'desc' },
    include : {
      product: {
        select: { name: true, annualRatePct: true, termMonths: true, currency: true }
      }
    }
  })

  return NextResponse.json(apps)
}
