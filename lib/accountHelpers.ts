// lib/accountHelpers.ts
import { prisma } from './prisma';
import { generateAccountNumber } from './account';
import type { CurrencyCode } from '@prisma/client';

/** 
 * Find or create a BankAccount for this user & currency.
 * Returns the account with correct balanceCents.
 */
export async function ensureAccount(
  userId: string,
  currency: CurrencyCode
) {
  let acct = await prisma.bankAccount.findFirst({
    where: { ownerId: userId, currency }
  });
  if (!acct) {
    acct = await prisma.bankAccount.create({
      data: {
        ownerId: userId,
        accountNumber: await generateAccountNumber(),
        currency,
        balanceCents: BigInt(0),
      },
    });
  }
  return acct;
}

/** 
 * Your “bank sink” account (fees go here).
 * e.g. the one you created at onboarding.
 */
export async function getBankSinkAccountId() {
  // e.g. hardcode or lookup by code
  const sink = await prisma.bankAccount.findFirst({
    where: { accountNumber: '111122223333' }
  });
  if (!sink) throw new Error('Bank sink acct missing');
  return sink.id;
}
