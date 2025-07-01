/* app/api/loan-products/route.ts */
import { NextResponse } from 'next/server'
import { prisma }       from '@/lib/prisma'

export async function GET () {
  const products = await prisma.loanProduct.findMany({
    where  : { isActive: true },
    orderBy: { createdAt: 'desc' },
    select : {
      id: true, slug: true, name: true, shortDescription: true, purpose: true,
      currency: true, minAmount: true, maxAmount: true,
      annualRatePct: true, termMonths: true, feePct: true,
      images: true
    }
  })
  return NextResponse.json(products)
}
