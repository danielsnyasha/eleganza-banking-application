export const runtime = 'nodejs'   // no Edge; we need the Prisma binary

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import * as z from 'zod'

/* ---------- everything the form sends ---------- */
const Payload = z.object({
  /* Clerk-derived */
  clerkId:   z.string(),                  // user.id from Clerk
  email:     z.string().email(),
  phone:     z.string().min(5).optional().nullable(),

  /* Visible form fields */
  firstName:  z.string().min(2),
  lastName:   z.string().min(2),
  idType:     z.enum(['national-id', 'passport']),
  idNumber:   z.string().min(5),
  profession: z.string().min(2),
  dob:        z.string().min(4),
  address1:   z.string().min(3),
  address2:   z.string().optional().nullable(),
  city:       z.string().min(2),
  province:   z.string().min(2),
  postalCode: z.string().min(3),
  country:    z.string().min(2),
  notes:      z.string().optional().nullable(),
})

export async function POST(req: Request) {
  const body = await req.json()
  const data = Payload.parse(body)

  /* Upsert by email (unique) */
  await prisma.user.upsert({
    where:  { email: data.email },
    update: {
      clerkId    : data.clerkId,
      firstName  : data.firstName,
      lastName   : data.lastName,
      phone      : data.phone ?? undefined,
      idType     : data.idType,
      idNumber   : data.idNumber,
      profession : data.profession,
      dob        : new Date(data.dob),
      address1   : data.address1,
      address2   : data.address2 ?? undefined,
      city       : data.city,
      province   : data.province,
      postalCode : data.postalCode,
      country    : data.country,
      notes      : data.notes ?? undefined,
      kycStatus  : 'PENDING',
    },
    create: {
      clerkId      : data.clerkId,
      email        : data.email,
      phone        : data.phone ?? undefined,
      passwordHash : 'external',             // dummy (auth via Clerk)
      firstName    : data.firstName,
      lastName     : data.lastName,
      idType       : data.idType,
      idNumber     : data.idNumber,
      profession   : data.profession,
      dob          : new Date(data.dob),
      address1     : data.address1,
      address2     : data.address2 ?? undefined,
      city         : data.city,
      province     : data.province,
      postalCode   : data.postalCode,
      country      : data.country,
      notes        : data.notes ?? undefined,
      kycStatus    : 'PENDING',
    },
  })

  return NextResponse.json({ ok: true })
}
