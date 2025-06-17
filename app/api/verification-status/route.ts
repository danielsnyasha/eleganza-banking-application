export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import * as z from 'zod'

/* we accept ?clerkId=… sent by the client */
const Params = z.object({ clerkId: z.string() })

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const { clerkId } = Params.parse({ clerkId: searchParams.get('clerkId') })

  const user = await prisma.user.findFirst({
    where : { clerkId },
    select: { kycStatus: true },
  })

  return NextResponse.json({ verified: user?.kycStatus === 'VERIFIED' })
}
