'use client'

import { Card, CardContent }   from '@/components/ui/card'
import { Label }               from '@/components/ui/label'
import { Input }               from '@/components/ui/input'
import { Button }              from '@/components/ui/button'
import { useState }            from 'react'
import { toast }               from 'react-toastify'
import { useMutation }         from '@tanstack/react-query'

import ConfirmPinDialog        from './ConfirmPinDialog'
import { CurrencySelect, calcFee } from './shared'
import { useFxRates }          from '@/hooks/useFxRates'

export default function RequestPanel() {
  const [rTo, setRTo]     = useState<'USD'|'EUR'|'GBP'|'JPY'|'AUD'|'CAD'|'CHF'|'CNY'|'ZAR'|'SGD'|'INR'|'KES'>('USD')
  const [rFrom, setRFrom] = useState<typeof rTo>('USD')
  const [rAmt, setRAmt]   = useState('200')
  const [rEmail,setREmail]= useState('')

  const { data: fxData } = useFxRates(rFrom, rTo, 'D')
  const rRate = fxData?.[0]?.rate ?? 1
  const rFee  = calcFee(+rAmt||0)
  const rPays = (+rAmt||0)*rRate + rFee

  const reqMut = useMutation({
    mutationFn: async ()=>{
      const res = await fetch('/api/tx/request',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({ email:rEmail, amount:+rAmt })
      })
      if(!res.ok){ toast.error('Request failed'); throw new Error('api') }
    },
    onSuccess:()=>toast.success('Request sent')
  })

  return (
    <Card className="bg-[#fafdff] border border-[#e6effa] rounded-2xl">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-xl font-semibold text-center">Request money</h2>

        <div className="space-y-2">
          <Label>You want to receive</Label>
          <div className="flex gap-2">
            <CurrencySelect value={rTo} onChange={setRTo}/>
            <Input value={rAmt}
                   onChange={e=>setRAmt(e.target.value.replace(/[^\d.]/g,''))}
                   className="flex-1"/>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Sender pays in</Label>
          <CurrencySelect value={rFrom} onChange={setRFrom} exclude={rTo}/>
        </div>

        <div className="space-y-2">
          <Label>Sender e-mail</Label>
          <Input value={rEmail} onChange={e=>setREmail(e.target.value)}/>
        </div>

        <p className="text-sm text-[#02152b]/70">
          They must send&nbsp;
          <span className="font-semibold">
            {isFinite(rPays)?rPays.toFixed(2):'—'} {rFrom}
          </span>&nbsp;(incl.&nbsp;fee&nbsp;{rFee.toFixed(2)}&nbsp;{rFrom})
        </p>

        <p className="text-sm text-[#02152b]/70">
          Bank fee:&nbsp;
          <span className="font-medium text-[#e53935]">
            {rFee.toFixed(2)} {rFrom}
          </span><br/>
          Spot&nbsp;rate:&nbsp;1&nbsp;{rFrom}&nbsp;=&nbsp;{rRate.toFixed(5)}&nbsp;{rTo}
        </p>

        <ConfirmPinDialog>
          <Button className="w-full bg-[#21c87a] hover:bg-[#1eb26c]"
                  onClick={()=>reqMut.mutate()}
                  disabled={reqMut.isPending}>
            {reqMut.isPending ? 'Sending…' : 'Share request'}
          </Button>
        </ConfirmPinDialog>
      </CardContent>
    </Card>
  )
}
