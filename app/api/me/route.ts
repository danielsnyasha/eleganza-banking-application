// app/api/me/route.ts
export const runtime = 'nodejs';

import { NextResponse }            from 'next/server';
import { auth }                    from '@clerk/nextjs/server';
import { prisma }                  from '@/lib/prisma';
import { generateAccountNumber }   from '@/lib/account';
import * as z                      from 'zod';

async function clerkToUser() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;
  return prisma.user.findUnique({ where: { clerkId } });
}

/** Ensure the user has exactly one USD account. */
async function ensurePrimaryAccount(userId: string) {
  const first = await prisma.bankAccount.findFirst({ where: { ownerId: userId } });
  if (first) return first;

  return prisma.bankAccount.create({
    data: {
      accountNumber: await generateAccountNumber(),
      currency:      'USD',
      // initial balance: 500 (in cents, since your schema uses BigInt)
      balanceCents:  BigInt(500),
      ownerId:       userId,
    },
  });
}

/* ---------------------------- GET ---------------------------- */
export async function GET() {
  try {
    const u = await clerkToUser();
    if (!u) {
      return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
    }

    const acct = await ensurePrimaryAccount(u.id);

    return NextResponse.json({
      id:        u.id,
      firstName: u.firstName,
      lastName:  u.lastName,
      email:     u.email,
      phone:     u.phone,
      avatarUrl: u.notes ?? null,
      address1:  u.address1,
      city:      u.city,
      country:   u.country,
      kycStatus: u.kycStatus,
      account: {
        number:   acct.accountNumber,
        // convert BigInt -> number so JSON.stringify will work
        balance:  Number(acct.balanceCents),
        currency: acct.currency,
        isActive: acct.isActive,
        openedAt: acct.openedAt.toISOString(),
      },
    });
  } catch (err) {
    console.error('/api/me GET error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
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
});

export async function PATCH(req: Request) {
  const u = await clerkToUser();
  if (!u) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  }

  const data = Body.parse(await req.json());
  const updated = await prisma.user.update({
    where: { id: u.id },
    data:  {
      ...data,
      notes: data.avatarUrl ?? u.notes,
    },
  });

  return NextResponse.json({ ok: true, updated });
}
