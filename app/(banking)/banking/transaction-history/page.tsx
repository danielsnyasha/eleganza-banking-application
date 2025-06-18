// app/(banking)/banking/transactions/page.tsx
'use client';

import TransactionFiltersBar from "@/components/Transactions/TransactionFiltersBar";
import TransactionTable from "@/components/Transactions/TransactionTable";


/**
 * Centre-column only – right-sidebar (Wallet / Quick-transfer /
 * Calendar / Chat) is injected by the banking layout, so we
 * just render our filters + table here.
 */
export default function TransactionsPage() {
  return (
    <section className="w-full max-w-[1800px] mx-auto flex flex-col gap-6 px-2 sm:px-4">
      <TransactionFiltersBar />
      <TransactionTable   />
    </section>
  );
}
