/* app/api/loans/applications/route.ts */
import { NextRequest, NextResponse } from 'next/server'
import { prisma }                    from '@/lib/prisma'

export async function POST (req: NextRequest) {
  const {
    userId,
    slug,
    productId,        // optional if you only pass slug
    amount,
    currency,
    purpose,
    incomeProof,
    name,
    surname,
    email,
    phone
  } = await req.json()

  if (!userId || !slug || !amount || !currency) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const app = await prisma.loanApplication.create({
    data: {
      userId,
      slug,
      productId,
      amount: Number(amount),
      currency,
      purpose,
      incomeProof,
      name,
      surname,
      email,
      phone
    }
  })

  return NextResponse.json({ ok: true, id: app.id }, { status: 201 })
}
