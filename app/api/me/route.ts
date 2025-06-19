/* --------------------------------------------------------------
   Eleganza • /api/me   (read / patch profile)
----------------------------------------------------------------*/
export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import { auth }     from '@clerk/nextjs/server'
import { prisma }   from '@/lib/prisma'
import { generateAccountNumber } from '@/lib/account'
import * as z from 'zod'

async function clerkToUser() {
  const { userId: clerkId } = await auth()
  if (!clerkId) return null
  return prisma.user.findUnique({ where: { clerkId } })
}

/* ensure user owns *one* USD account (500 USD opening) */
async function ensurePrimaryAccount(userId: string) {
  const first = await prisma.bankAccount.findFirst({ where: { ownerId: userId } })
  if (first) return first

  return prisma.bankAccount.create({
    data: {
      accountNumber: await generateAccountNumber(),
      type         : 'CURRENT',
      currency     : 'USD',
      balance      : 500,
      ownerId      : userId,
    },
  })
}

/* ---------------------------- GET ---------------------------- */
export async function GET() {
  const u = await clerkToUser()
  if (!u)
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

  const acct = await ensurePrimaryAccount(u.id)

  return NextResponse.json({
    id        : u.id,
    firstName : u.firstName,
    lastName  : u.lastName,
    email     : u.email,
    phone     : u.phone,
    avatarUrl : u.notes ?? null,
    address1  : u.address1,
    city      : u.city,
    country   : u.country,
    kycStatus : u.kycStatus,          // ⭐ NEW
    account   : {
      number   : acct.accountNumber,
      type     : acct.type,
      balance  : acct.balance,
      currency : acct.currency,
      isActive : acct.isActive,
      openedAt : acct.openedAt.toISOString(),
    },
  })
}

/* --------------------------- PATCH --------------------------- */
const Body = z.object({
  firstName : z.string().min(1).optional(),
  lastName  : z.string().min(1).optional(),
  phone     : z.string().optional().nullable(),
  address1  : z.string().optional().nullable(),
  city      : z.string().optional().nullable(),
  country   : z.string().optional().nullable(),
  avatarUrl : z.string().url().optional().nullable(),
})

export async function PATCH(req: NextRequest) {
  const u = await clerkToUser()
  if (!u)
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })

  const data = Body.parse(await req.json())

  const updated = await prisma.user.update({
    where: { id: u.id },
    data : {
      ...data,
      notes: data.avatarUrl ?? u.notes,
    },
  })

  return NextResponse.json({ ok: true, updated })
}
