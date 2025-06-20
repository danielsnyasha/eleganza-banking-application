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

export default function DepositPanel() {
  const qc = useQueryClient()
  const [dCcy, setDCcy] = useState<'USD'|'EUR'|'GBP'|'JPY'|'AUD'|'CAD'|'CHF'|'CNY'|'ZAR'|'SGD'|'INR'|'KES'>('USD')
  const [dAmt, setDAmt] = useState('500')
  const dFee = calcFee(+dAmt||0)

  const depMut = useMutation({
    mutationFn: async ()=>{
      const res = await fetch('/api/tx/deposit',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({ amount:+dAmt, currency:dCcy })
      })
      if(!res.ok){ toast.error('Deposit failed'); throw new Error('api') }
    },
    onSuccess:()=>{ toast.success('Deposit booked'); qc.invalidateQueries(['me']) }
  })

  return (
    <Card className="bg-[#fafdff] border border-[#e6effa] rounded-2xl">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-xl font-semibold text-center">Cash / cheque deposit</h2>

        <div className="space-y-2">
          <Label>Currency</Label>
          <CurrencySelect value={dCcy} onChange={setDCcy}/>
        </div>

        <div className="space-y-2">
          <Label>Amount</Label>
          <Input value={dAmt}
                 onChange={e=>setDAmt(e.target.value.replace(/[^\d.]/g,''))}/>
        </div>

        <p className="text-sm text-[#02152b]/70">
          Bank fee: <span className="font-semibold">{dFee.toFixed(2)} {dCcy}</span>
        </p>

        <ConfirmPinDialog>
          <Button className="w-full bg-[#21c87a] hover:bg-[#1eb26c]"
                  onClick={()=>depMut.mutate()}
                  disabled={depMut.isPending}>
            {depMut.isPending ? 'Depositing…' : 'Deposit'}
          </Button>
        </ConfirmPinDialog>
      </CardContent>
    </Card>
  )
}
