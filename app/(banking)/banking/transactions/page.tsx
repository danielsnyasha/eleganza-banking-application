'use client';

export const dynamic = "force-dynamic";
export const runtime = "edge";

import ExchangeRatesTicker from '@/components/Transfer/ExchangeRatesTicker'
import TransferForm        from '@/components/Transfer/TransferForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

function TransferBanner() {
  return (
    <Card
      className="
        border-0 overflow-hidden text-white
        bg-gradient-to-r from-[#0056B6] to-[#0091FF]
      "
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Transfers&nbsp;&amp;&nbsp;Payments
        </CardTitle>
        <CardDescription className="text-white/85">
          Send, request, deposit or withdraw 👩‍🦳 - All in one place.
        </CardDescription>
      </CardHeader>

      <CardContent className="text-sm leading-relaxed space-y-1">
        <p>
          • <b>Send&nbsp;Money</b> instantly to Eleganza or external banks.<br />
          • <b>Request&nbsp;Funds</b> with a single shareable link.<br />
          • <b>Deposit</b> from cards, mobile money or crypto.<br />
          • <b>Withdraw</b> in-branch, to mobile wallets, or any account worldwide.
        </p>
      </CardContent>
    </Card>
  )
}

export default function TransferPage() {
  return (
    <section className="w-full max-w-[840px] mx-auto flex flex-col gap-6 px-4 py-8">
      <TransferBanner />
      <ExchangeRatesTicker />
      <TransferForm />
    </section>
  )
}
