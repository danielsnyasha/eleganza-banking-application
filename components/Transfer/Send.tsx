'use client'

import { useState }           from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, CardContent }  from '@/components/ui/card'
import { Label }              from '@/components/ui/label'
import { Input }              from '@/components/ui/input'
import { Button }             from '@/components/ui/button'
import RecipientSelect        from './RecipientSelect'
import ConfirmPinDialog       from './ConfirmPinDialog'
import { useMe }              from '@/hooks/useMe'
import {
  FX_SYMBOLS,
  FxCode,
  BANK_ACCT,
  calcFee,
  useSpot,
  CurrencySelect,
  Summary,
  useTransferTab,
} from './TransferForm'

export default function Send() {
  const { data: me } = useMe()
  const myAcctNo = me?.account.number ?? ''
  const myBal    = me?.account.balance ?? 0
  const qc       = useQueryClient()

  const [sFrom, setSFrom] = useState<FxCode>('USD')
  const [sTo  , setSTo  ] = useState<FxCode>('ZAR')
  const [sAmt , setSAmt ] = useState('1000')
  const [sRec , setSRec ] = useState<null|{accountNumber:string}>(null)

  const sRate = useSpot(sFrom, sTo)
  const sFee  = calcFee(+sAmt||0)
  const sGets = (+sAmt||0)*sRate - sFee

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
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          to:            sRec.accountNumber,
          amount:        +sAmt,
          fromCurrency:  sFrom,
          toCurrency:    sTo,
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
      qc.invalidateQueries(['me'])
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
            <Input disabled value={isFinite(sGets) ? sGets.toFixed(2) : '—'} />
            <CurrencySelect value={sTo} onChange={setSTo} exclude={sFrom} />
          </div>
        </div>

        <Summary fee={sFee} rate={sRate} from={sFrom} to={sTo} />

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
