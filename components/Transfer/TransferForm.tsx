/* ------------------------------------------------------------------
   components/Transfer/TransferForm.tsx
   (c) Eleganza Bank – full feature form for Send / Request / Deposit / Withdraw
------------------------------------------------------------------*/
/* prettier-ignore */
'use client'

import {
  Tabs, TabsList, TabsTrigger, TabsContent,
}                             from '@/components/ui/tabs'
import { Card, CardContent }  from '@/components/ui/card'
import { Label }              from '@/components/ui/label'
import { Input }              from '@/components/ui/input'
import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem,
}                             from '@/components/ui/select'
import { Button }             from '@/components/ui/button'
import CountryFlag            from 'react-country-flag'
import { useState, useEffect }from 'react'
import { toast }              from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useS }               from 'use-s-react'

import RecipientSelect        from './RecipientSelect'
import ConfirmPinDialog       from './ConfirmPinDialog'
import { useFxRates }         from '@/hooks/useFxRates'
import { useMe }              from '@/hooks/useMe'

/* ────────────────────────────  QUICK FIX ──────────────────────────── */
function useTransferTab() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  const tab = useS<'send'|'request'|'deposit'|'withdraw'>(
    'transfer-tab',
    'send',
    true
  )
  return mounted ? tab : ['send', () => {}]
}

/* ─────────────────────────  CONSTANTS  ───────────────────────── */
export const FX_SYMBOLS = [
  'USD','EUR','GBP','JPY','AUD','CAD','CHF',
  'CNY','ZAR','SGD','INR','KES',
] as const
type FxCode = typeof FX_SYMBOLS[number]

const BANK_ACCT = '111122223333'
const calcFee   = (amt:number)=> +(1 + amt * 0.006).toFixed(2)   // 0.6 % + 1

/* ─────────────────────────  HELPERS  ─────────────────────────── */
function useSpot(from:FxCode,to:FxCode){
  const { data } = useFxRates(from,to,'D')
  return data?.[0]?.rate ?? 1
}

/* flag-dropdown with ISO-2 heuristic */
function CurrencySelect(
  { value,onChange,exclude }:{
    value:FxCode; onChange:(v:FxCode)=>void; exclude?:string
  }
){
  return (
    <Select value={value} onValueChange={v=>onChange(v as FxCode)}>
      <SelectTrigger className="w-[90px]"><SelectValue/></SelectTrigger>
      <SelectContent>
        {FX_SYMBOLS.filter(c=>c!==exclude).map(c=>(
          <SelectItem key={c} value={c}>
            <CountryFlag svg countryCode={c.slice(0,2)}
                         style={{width:18}}/> {c}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

/* small summary (fee + fx rate) */
function Summary(
  { fee, rate, from, to }:{
    fee:number; rate:number; from:FxCode; to:FxCode
  }
){
  return (
    <p className="text-sm text-[#02152b]/70">
      Bank fee:&nbsp;
      <span className="font-medium text-[#e53935]">
        {fee.toFixed(2)} {from}
      </span><br/>
      Spot&nbsp;rate:&nbsp;1&nbsp;{from}&nbsp;=&nbsp;{rate.toFixed(5)}&nbsp;{to}
    </p>
  )
}

/* ─────────────────────────  MAIN  ────────────────────────────── */
export default function TransferForm() {
  /* profile / balance ---------------------------------------------------------------- */
  const { data: me }   = useMe()
  const myAcctNo       = me?.account.number ?? ''
  const myBal          = me?.account.balance ?? 0
  const qc             = useQueryClient()

  /* share active tab across components ---------------------------------- */
  const [tab,setTab] = useTransferTab()

  /* ---------------- state (Send) ---------------- */
  const [sFrom,setSFrom] = useState<FxCode>('USD')
  const [sTo  ,setSTo  ] = useState<FxCode>('ZAR')
  const [sAmt ,setSAmt ] = useState('1000')
  const [sRec ,setSRec ] = useState<null|{accountNumber:string}>(null)

  const sRate = useSpot(sFrom,sTo)
  const sFee  = calcFee(+sAmt||0)
  const sGets = (+sAmt||0)*sRate - sFee

  /* ---------------- state (Request) ------------- */
  const [rTo  ,setRTo  ] = useState<FxCode>('USD')
  const [rFrom,setRFrom] = useState<FxCode>('USD')
  const [rAmt ,setRAmt ] = useState('200')
  const [rEmail,setREmail]=useState('')

  const rRate = useSpot(rFrom,rTo)
  const rFee  = calcFee(+rAmt||0)
  const rPays = (+rAmt||0)*rRate + rFee

  /* ---------------- state (Deposit) ------------- */
  const [dCcy,setDCcy]=useState<FxCode>('USD')
  const [dAmt,setDAmt]=useState('500')
  const dFee = calcFee(+dAmt||0)

  /* ---------------- state (Withdraw) ------------ */
  const [wCcy,setWCcy]=useState<FxCode>('USD')
  const [wAmt,setWAmt]=useState('250')
  const wFee = calcFee(+wAmt||0)

  /* ─────────────── mutations ──────────────────── */
  const sendMut = useMutation({
    mutationFn: async () => {
      if(!sRec){ toast.error('Choose recipient'); throw new Error('no-rec') }
      if(sRec.accountNumber===myAcctNo){
        toast.error("You can't send money to yourself"); throw new Error('self') }
      if(sRec.accountNumber===BANK_ACCT){
        toast.error("Direct transfer to bank account is blocked"); throw new Error('bank')}
      if(+sAmt + sFee > myBal){
        toast.error(`Insufficient balance. You have ${myBal.toFixed(2)} ${sFrom}`)
        throw new Error('bal')
      }
      const res = await fetch('/api/tx/send',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          to            : sRec.accountNumber,
          amount        : +sAmt,
          fromCurrency  : sFrom,
          toCurrency    : sTo,
        })
      })
      if(!res.ok){
        const j = await res.json().catch(()=>null)
        toast.error(j?.error || 'Transfer failed'); throw new Error('api')
      }
    },
    onSuccess:()=>{ toast.success('Transfer queued'); qc.invalidateQueries(['me']) }
  })

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

  /* ───────────────────  RENDER  ─────────────────── */
  return (
    <Tabs value={tab} onValueChange={v=>setTab(v as any)} defaultValue="send">
      <TabsList className="mb-4 w-full">
        <TabsTrigger value="send"     className="flex-1">Send</TabsTrigger>
        <TabsTrigger value="request"  className="flex-1">Request</TabsTrigger>
        <TabsTrigger value="deposit"  className="flex-1">Deposit</TabsTrigger>
        <TabsTrigger value="withdraw" className="flex-1">Withdraw</TabsTrigger>
      </TabsList>

      {/* ░░░░░░░░░░░░░░  SEND  ░░░░░░░░░░░░░░ */}
      <TabsContent value="send">
        <Card className="bg-[#fafdff] border border-[#e6effa] rounded-2xl">
          <CardContent className="p-6 space-y-6">
            <h2 className="text-xl font-semibold text-center">Send money</h2>

            {/* you send */}
            <div className="space-y-2">
              <Label>You send</Label>
              <div className="flex gap-2">
                <CurrencySelect value={sFrom} onChange={setSFrom}/>
                <Input value={sAmt}
                       onChange={e=>setSAmt(e.target.value.replace(/[^\d.]/g,''))}
                       className="flex-1"/>
              </div>
              <RecipientSelect value={sRec} onChange={setSRec}/>
            </div>

            {/* recipient */}
            <div className="space-y-2">
              <Label>Recipient gets</Label>
              <div className="grid gap-2 md:grid-cols-[1fr_120px]">
                <Input disabled value={isFinite(sGets)?sGets.toFixed(2):'—'} />
                <CurrencySelect value={sTo} onChange={setSTo} exclude={sFrom}/>
              </div>
            </div>

            <Summary fee={sFee} rate={sRate} from={sFrom} to={sTo}/>

            <ConfirmPinDialog>
              <Button className="w-full bg-[#21c87a] hover:bg-[#1eb26c]"
                      onClick={()=>sendMut.mutate()}
                      disabled={sendMut.isPending}>
                {sendMut.isPending ? 'Processing…' : 'Continue'}
              </Button>
            </ConfirmPinDialog>
          </CardContent>
        </Card>
      </TabsContent>

      {/* ░░░░░░░░░░░░░  REQUEST  ░░░░░░░░░░░░ */}
      <TabsContent value="request">
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

            <Summary fee={rFee} rate={rRate} from={rFrom} to={rTo}/>

            <ConfirmPinDialog>
              <Button className="w-full bg-[#21c87a] hover:bg-[#1eb26c]"
                      onClick={()=>reqMut.mutate()}
                      disabled={reqMut.isPending}>
                {reqMut.isPending ? 'Sending…' : 'Share request'}
              </Button>
            </ConfirmPinDialog>
          </CardContent>
        </Card>
      </TabsContent>

      {/* ░░░░░░░░░░░░░  DEPOSIT  ░░░░░░░░░░░░ */}
      <TabsContent value="deposit">
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
      </TabsContent>

      {/* ░░░░░░░░░░░░░ WITHDRAW ░░░░░░░░░░░░░ */}
      <TabsContent value="withdraw">
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
      </TabsContent>
    </Tabs>
  )
}
