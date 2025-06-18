'use client';

import ExchangeRatesBar from "@/components/Transfer/ExchangeRatesBar";
import TransferForm from "@/components/Transfer/TransferForm";



export default function TransferPage() {
  return (
    <section className="w-full max-w-[840px] mx-auto flex flex-col gap-6 px-4 py-8">
      <ExchangeRatesBar />
      <TransferForm />
    </section>
  );
}
