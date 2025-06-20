'use client'

import { Card, CardContent }   from '@/components/ui/card'
import { Label }               from '@/components/ui/label'
import { Input }               from '@/components/ui/input'
import { Button }              from '@/components/ui/button'
import { useState }            from 'react'
import { toast }               from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import ConfirmPinDialog        from './ConfirmPinDialog'
import { CurrencySelect, calcFee } from './shared'
import { useMe } from '@/hooks/useMe'

export default function WithdrawPanel() {
  const { data: me } = useMe()
  const myBal = me?.account.balance ?? 0
  const qc = useQueryClient()

  const [wCcy, setWCcy] = useState<'USD'|'EUR'|'GBP'|'JPY'|'AUD'|'CAD'|'CHF'|'CNY'|'ZAR'|'SGD'|'INR'|'KES'>('USD')
  const [wAmt, setWAmt] = useState('250')
  const wFee = calcFee(+wAmt||0)

  const witMut = useMutation({
    mutationFn: async ()=>{
      if(+wAmt + wFee > myBal){
        toast.error(`Insufficient balance. You have ${myBal.toFixed(2)} ${wCcy}`)
        throw new Error('bal')
      }
      const res = await fetch('/api/tx/withdraw',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({ amount:+wAmt, currency:wCcy })
      })
      if(!res.ok){ toast.error('Withdrawal failed'); throw new Error('api') }
    },
    onSuccess:()=>{ toast.success('Withdrawal queued'); qc.invalidateQueries(['me']) }
  })

  return (
    <Card className="bg-[#fafdff] border border-[#e6effa] rounded-2xl">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-xl font-semibold text-center">Withdraw cash</h2>

        <div className="space-y-2">
          <Label>Currency</Label>
          <CurrencySelect value={wCcy} onChange={setWCcy}/>
        </div>

        <div className="space-y-2">
          <Label>Amount</Label>
          <Input value={wAmt}
                 onChange={e=>setWAmt(e.target.value.replace(/[^\d.]/g,''))}/>
        </div>

        <p className="text-sm text-[#02152b]/70">
          Bank fee: <span className="font-semibold">{wFee.toFixed(2)} {wCcy}</span>
        </p>

        <ConfirmPinDialog>
          <Button className="w-full bg-[#21c87a] hover:bg-[#1eb26c]"
                  onClick={()=>witMut.mutate()}
                  disabled={witMut.isPending}>
            {witMut.isPending ? 'Processing…' : 'Withdraw'}
          </Button>
        </ConfirmPinDialog>
      </CardContent>
    </Card>
  )
}
