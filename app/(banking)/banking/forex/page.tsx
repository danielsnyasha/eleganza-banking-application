// app/(banking)/finance/page.tsx
'use client'

import FinanceDashboard from '@/components/Forex/FinanceDashboard'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

/* ─────────────────────────────────────────────────────────── */
/* Blue gradient banner (same palette as Transfer / Analytics) */
function FinanceBanner() {
  return (
    <Card
      className="
        border-0 overflow-hidden text-white
        bg-gradient-to-r from-[#0056B6] to-[#0091FF]
      "
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Markets&nbsp;&amp;&nbsp;Finance Center
        </CardTitle>
        <CardDescription className="text-white/85">
          Real-time FX, crypto and commodities at a glance.
        </CardDescription>
      </CardHeader>

      <CardContent className="text-sm leading-relaxed space-y-1">
        <p>
          • <b>Forex Rates:</b> 170+ currency pairs with live spreads&nbsp;
          <span className="text-green-300">▲</span>&nbsp;
          &nbsp;/&nbsp;<span className="text-red-200">▼</span><br />
          • <b>Crypto Prices:</b> BTC, ETH &amp; altcoins with daily % change<br />
          • <b>Commodities:</b> Gold, oil, coffee and more — see intraday moves<br />
          • <b>Insights:</b> Quick spark-line charts &amp; sentiment indicators
        </p>
      </CardContent>
    </Card>
  )
}

/* ─────────────────────────────────────────────────────────── */
/* Main page                                                  */
export default function FinancePage() {
  return (
    <section className="w-full max-w-6xl mx-auto flex flex-col gap-6 px-4 py-8">
      <FinanceBanner />

      {/* Interactive dashboard (prices, charts, filters, etc.) */}
      <FinanceDashboard />
    </section>
  )
}
