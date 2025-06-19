/* ------------------------------------------------------------
   Eleganza • helper to allocate a unique 12-digit account #
   ------------------------------------------------------------ */
// lib/account.ts
import { prisma } from '@/lib/prisma'
import type { User } from '@prisma/client'
import { randomInt } from 'crypto'

/** Generate a 12-digit account number that’s unique in BankAccount */
export async function generateAccountNumber(): Promise<string> {
  while (true) {
    const num = String(randomInt(10 ** 11, 10 ** 12 - 1)) // 12 digits
    const exists = await prisma.bankAccount.findFirst({ where: { accountNumber: num } })
    if (!exists) return num
  }
}

/** Ensure the user has one primary USD CURRENT account with $500 opening */
export async function ensurePrimaryAccount(user: User) {
  const existing = await prisma.bankAccount.findFirst({
    where: { ownerId: user.id, currency: 'USD', type: 'CURRENT' },
  })
  if (existing) return existing

  return prisma.bankAccount.create({
    data: {
      accountNumber: await generateAccountNumber(),
      type: 'CURRENT',
      currency: 'USD',
      balance: 500,                // opening balance
      ownerId: user.id,
    },
  })
}


export const allocateAccountNumber = generateAccountNumber