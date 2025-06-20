/* --------------------------------------------------------------
   Eleganza • /api/me      – profile read / update
----------------------------------------------------------------*/
export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import { auth }               from '@clerk/nextjs/server'
import { prisma }             from '@/lib/prisma'
import { generateAccountNumber } from '@/lib/account'
import * as z from 'zod'

/* Clerk-id ➜ Mongo user row (or null) */
async function clerkUser() {
  const { userId: clerkId } = await auth()
  if (!clerkId) return null
  return prisma.user.findUnique({ where: { clerkId } })
}

async function primaryAccount(userId: string) {
  const existing = await prisma.bankAccount.findFirst({ where: { ownerId: userId } })
  if (existing) return existing

  return prisma.bankAccount.create({
    data: {
      accountNumber: await generateAccountNumber(),
      currency     : 'USD',
      type         : 'SAVINGS',
      balance      : 500,              // ⭐ opening bonus
      ownerId      : userId,
    },
  })
}

/* ---------------- GET ---------------- */
export async function GET() {
  const user = await clerkUser()
  if (!user)
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

  const acct = await primaryAccount(user.id)

  return NextResponse.json({
    user: {
      id        : user.id,
      email     : user.email,
      firstName : user.firstName,
      lastName  : user.lastName,
      phone     : user.phone,
      address1  : user.address1,
      city      : user.city,
      country   : user.country,
      avatarUrl : user.notes ?? null,
    },
    account: {
      number  : acct.accountNumber,
      balance : acct.balanceCents,
      currency: acct.currency,
    },
  })
}

/* ---------------- PATCH ---------------- */
const Payload = z.object({
  firstName : z.string().min(1),
  lastName  : z.string().min(1),
  phone     : z.string().optional().nullable(),
  address1  : z.string().optional().nullable(),
  city      : z.string().optional().nullable(),
  country   : z.string().optional().nullable(),
  avatarUrl : z.string().url().optional().nullable(),
})

export async function PATCH(req: NextRequest) {
  const user = await clerkUser()
  if (!user)
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

  const data = Payload.parse(await req.json())

  const updated = await prisma.user.update({
    where: { id: user.id },
    data : {
      firstName: data.firstName,
      lastName : data.lastName,
      phone    : data.phone ?? undefined,
      address1 : data.address1 ?? undefined,
      city     : data.city ?? undefined,
      country  : data.country ?? undefined,
      notes    : data.avatarUrl ?? undefined,
      updatedAt: new Date(),
    },
  })

  return NextResponse.json({ ok: true, updated })
}
