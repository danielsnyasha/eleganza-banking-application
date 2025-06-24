// app/api/cards/route.ts
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { auth }                     from '@clerk/nextjs/server';
import { prisma }                   from '@/lib/prisma';

// Helpers to generate a 16-digit card number and 3-digit CVV
function generateCardNumber() {
  let digits = '';
  for (let i = 0; i < 16; i++) {
    digits += Math.floor(Math.random() * 10);
  }
  return digits.match(/.{1,4}/g)!.join(' ');
}

function generateCvv() {
  return String(Math.floor(100 + Math.random() * 900));
}

export async function GET(req: NextRequest) {
  // 1️⃣ Authenticate
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  }

  // 2️⃣ Find our user + their accounts
  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: { accounts: true },
  });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // 3️⃣ Ensure a primary BankAccount exists
  let acct = user.accounts[0];
  if (!acct) {
    acct = await prisma.bankAccount.create({
      data: {
        ownerId: user.id,
        accountNumber: String(
          Math.floor(1_0000_0000 + Math.random() * 9_0000_0000)
        ),
        currency: 'USD',
        balanceCents: BigInt(50000),  // $500.00
      },
    });
  }

  // 4️⃣ Find or create a Card for them
  let card = await prisma.card.findFirst({
    where: { ownerId: user.id },
  });

  let plainCvv: string;
  if (!card) {
    const number = generateCardNumber();
    const cvv    = generateCvv();
    const exp    = new Date();
    exp.setFullYear(exp.getFullYear() + 3);

    card = await prisma.card.create({
      data: {
        ownerId: user.id,
        accountId: acct.id,
        cardNumber: number,
        cvv: cvv,           // field matches your Prisma model
        expiryDate: exp,
        type: 'DEBIT',
        network: 'VISA',
      },
    });
    plainCvv = cvv;
  } else {
    plainCvv = card.cvv;
  }

  // 5️⃣ Return every field straight from the DB
  return NextResponse.json({
    // — CARD —
    id:         card.id,
    cardNumber: card.cardNumber,
    cvv:        plainCvv,
    expiryDate: card.expiryDate.toISOString(),
    type:       card.type,
    network:    card.network,
    status:     card.status,
    issuedAt:   card.issuedAt.toISOString(),

    // — LINKED ACCOUNT —
    account: {
      id:            acct.id,
      accountNumber: acct.accountNumber,
      currency:      acct.currency,
      balance:       Number(acct.balanceCents) / 100,  // back to dollars
      isActive:      acct.isActive,
      openedAt:      acct.openedAt.toISOString(),
    },
  });
}
