import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { currentUserId } from '@/lib/auth'
import * as z from 'zod'

const Payload = z.object({
  firstName:   z.string().min(2),
  lastName:    z.string().min(2),
  phone:       z.string().min(8),
  email:       z.string().email(),
  idType:      z.enum(['national-id', 'passport']),
  idNumber:    z.string().min(5),
  profession:  z.string().min(2),
  dob:         z.string(),
  address1:    z.string().min(3),
  address2:    z.string().optional(),
  city:        z.string().min(2),
  province:    z.string().min(2),
  postalCode:  z.string().min(3),
  country:     z.string().min(2),
  notes:       z.string().optional(),
})

export async function POST(req: Request) {
  const body = await req.json()
  const data = Payload.parse(body)

  const userId = await currentUserId() // This is the Clerk user ID

  await prisma.$transaction([
    prisma.user.update({
      where: { clerkId: userId },  // <--- change id to clerkId
      data: {
        firstName : data.firstName,
        lastName  : data.lastName,
        phone     : data.phone,
        kycStatus : 'PENDING', // move to manual review
        // optional extended profile record here
      },
    }),
    prisma.securityEvent.create({
      data: {
        userId, // This may need to be looked up if your SecurityEvent expects the Mongo id, not the clerkId!
        eventType: 'TRANSFER_INITIATED',
        location : 'verification form',
      },
    }),
  ])

  return NextResponse.json({ ok: true })
}
