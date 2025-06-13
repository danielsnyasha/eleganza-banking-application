// app/api/verification-status/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { currentUserId } from '@/lib/auth'

export async function GET() {
  const userId = await currentUserId()         // ← await here

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { kycStatus: true },
  })

  return NextResponse.json({ verified: user?.kycStatus === 'VERIFIED' })
}
