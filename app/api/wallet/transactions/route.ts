/* create a fee transaction and post it to the linked account ------------ */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
  const {
    accountId,        // target account (String, ObjectId in DB)
    amount,           // positive number – we record the outflow as negative
    currency,         // same currency as account
    note,
    userId,           // may be Mongo _id  ➜ ObjectId, or Clerk id  ➜ clerkId
  } = await req.json();

  /* base payload -------------------------------------------------------- */
  const data: any = {
    reference : `FEE_${Date.now()}`,
    type      : 'FEE',
    status    : 'POSTED',
    amount    : -Math.abs(amount),
    currency,
    note,
    fromAccount: { connect: { id: accountId } },
  };

  /* user relation is REQUIRED by the schema ― always connect ------------- */
  if (userId) {
    data.user = {
      connect: ObjectId.isValid(userId)
        ? { id: userId }           // internal ObjectId
        : { clerkId: userId },     // external Clerk id (unique)
    };
  }

  await prisma.transaction.create({ data });

  return NextResponse.json({ ok: true }, { status: 201 });
}
