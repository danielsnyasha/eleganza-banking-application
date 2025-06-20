/* components/Transfer/SendPanel.tsx */
'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Card, CardContent } from '@/components/ui/card'
import { Label }             from '@/components/ui/label'
import { Input }             from '@/components/ui/input'
import { Button }            from '@/components/ui/button'

import RecipientSelect, { Recipient } from './RecipientSelect'
import ConfirmPinDialog               from './ConfirmPinDialog'
import { useFxRates }                from '@/hooks/useFxRates'
import { useMe }                     from '@/hooks/useMe'
import {
  CurrencySelect,
  calcFee,
  BANK_ACCT,
  FxCode,
} from './shared' // ensure FxCode is exported from shared.tsx

export default function SendPanel() {
  const { data: me } = useMe()
  const myAcctNo     = me?.account.number ?? ''
  const myBal        = me?.account.balance  ?? 0
  const qc           = useQueryClient()

  // strictly-typed currency codes
  const [sFrom, setSFrom] = useState<FxCode>('USD')
  const [sTo,   setSTo  ] = useState<FxCode>('ZAR')
  const [sAmt,  setSAmt ] = useState<string>('1000')
  const [sRec,  setSRec ] = useState<Recipient|null>(null)

  // FX lookup
  const { data: fxData } = useFxRates(sFrom, sTo, 'D')
  const sRate = fxData?.[0]?.rate ?? 1

  // fee + net receive amount
  const sFee  = calcFee(+sAmt || 0)
  const sGets = (+sAmt || 0) * sRate - sFee

  const sendMut = useMutation({
    mutationFn: async () => {
      if (!sRec) {
        toast.error('Choose recipient')
        throw new Error('no-rec')
      }
      if (sRec.accountNumber === myAcctNo) {
        toast.error("You can't send money to yourself")
        throw new Error('self')
      }
      if (sRec.accountNumber === BANK_ACCT) {
        toast.error("Direct transfer to bank account is blocked")
        throw new Error('bank')
      }
      if (+sAmt + sFee > myBal) {
        toast.error(`Insufficient balance. You have ${myBal.toFixed(2)} ${sFrom}`)
        throw new Error('bal')
      }

      const res = await fetch('/api/tx/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to:           sRec.accountNumber,
          amount:       +sAmt,
          fromCurrency: sFrom,
          toCurrency:   sTo,
        }),
      })

      if (!res.ok) {
        const j = await res.json().catch(() => null)
        toast.error(j?.error || 'Transfer failed')
        throw new Error('api')
      }
    },
    onSuccess: () => {
      toast.success('Transfer queued')
      qc.invalidateQueries({ queryKey: ['me'] })
    },
  })

  return (
    <Card className="bg-[#fafdff] border border-[#e6effa] rounded-2xl">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-xl font-semibold text-center">Send money</h2>

        <div className="space-y-2">
          <Label>You send</Label>
          <div className="flex gap-2">
            <CurrencySelect value={sFrom} onChange={setSFrom} />
            <Input
              value={sAmt}
              onChange={e => setSAmt(e.target.value.replace(/[^\d.]/g, ''))}
              className="flex-1"
            />
          </div>
          <RecipientSelect value={sRec} onChange={setSRec} />
        </div>

        <div className="space-y-2">
          <Label>Recipient gets</Label>
          <div className="grid gap-2 md:grid-cols-[1fr_120px]">
            <Input
              disabled
              value={isFinite(sGets) ? sGets.toFixed(2) : '—'}
            />
            <CurrencySelect value={sTo} onChange={setSTo} exclude={sFrom} />
          </div>
        </div>

        <p className="text-sm text-[#02152b]/70">
          Bank fee:&nbsp;
          <span className="font-medium text-[#e53935]">
            {sFee.toFixed(2)} {sFrom}
          </span><br/>
          Spot&nbsp;rate:&nbsp;1&nbsp;{sFrom}&nbsp;=&nbsp;{sRate.toFixed(5)}&nbsp;{sTo}
        </p>

        <ConfirmPinDialog>
          <Button
            className="w-full bg-[#21c87a] hover:bg-[#1eb26c]"
            onClick={() => sendMut.mutate()}
            disabled={sendMut.isPending}
          >
            {sendMut.isPending ? 'Processing…' : 'Continue'}
          </Button>
        </ConfirmPinDialog>
      </CardContent>
    </Card>
  )
}
