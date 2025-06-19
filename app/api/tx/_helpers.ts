/* -----------------------------------------------------------------
   Shared helpers for all TX endpoints
------------------------------------------------------------------*/
import { prisma } from '@/lib/prisma';
import { BANK_ACCT } from '@/lib/constants';

/* ---- fee: 0.6 % + 1 USD flat ---------------------------------- */
export const calcFee = (amt: number) => +(1 + amt * 0.006).toFixed(2);

/* ---- lookup or throw ------------------------------------------ */
export async function findAccountOrThrow(accountNumber: string) {
  const acct = await prisma.bankAccount.findUnique({ where: { accountNumber } });
  if (!acct) throw new Error('account_not_found');
  return acct;
}

/* ---- bank fee account (guaranteed to exist once at bootstrap) -- */
export async function bankAccountId() {
  const bank = await prisma.bankAccount.findUnique({
    where: { accountNumber: BANK_ACCT },
    select: { id: true },
  });
  if (!bank) throw new Error('bank_account_missing');
  return bank.id;
}
