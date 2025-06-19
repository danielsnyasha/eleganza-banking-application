/* --------------------------------------------------------------------------
   Edit (or quick-view) modal – opened from the ✏️ icon
---------------------------------------------------------------------------*/
'use client'

import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog'
import { Input }      from '@/components/ui/input'
import { Label }      from '@/components/ui/label'
import { Button }     from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue,
         SelectContent, SelectItem } from '@/components/ui/select'
import { useState }       from 'react'
import { useMutation }    from '@tanstack/react-query'
import * as z             from 'zod'
import type { Recipient } from './RecipientSelect'

/* ------------------------------------------------------------------ */
/* Validation & helpers                                               */
/* ------------------------------------------------------------------ */
export const currencyList = [
  'USD','EUR','GBP','ZAR','ZWL','CAD','AUD','CHF','CNY','JPY',
  'NGN','GHS','INR','KES',
] as const

const schema = z.object({
  alias        : z.string().min(2),
  accountName  : z.string().min(2),
  accountNumber: z.string().min(3),
  currency     : z.enum(currencyList),
})

/* Form state = validated schema + id */
type FormState = z.infer<typeof schema> & { id: string }

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */
export default function EditRecipientModal({
  open, setOpen, data, onSaved,
}: {
  open   : boolean
  setOpen: (b: boolean) => void
  data   : Recipient          // <-- now accept the full Recipient
  onSaved: (r: Recipient) => void
}) {
  /* ------- initialise form with incoming data, coercing currency ---- */
  const initCurrency = currencyList.includes(data.currency as any)
    ? (data.currency as typeof currencyList[number])
    : 'USD'

  const [form, setForm] = useState<FormState>({
    id           : data.id,
    alias        : data.alias,
    accountName  : data.accountName,
    accountNumber: data.accountNumber,
    currency     : initCurrency,
  })
  const [err , setErr ]  = useState('')

  /* ------------------ PATCH mutation ------------------------------- */
  const mut = useMutation({
    mutationFn: async (payload: FormState) => {
      const res = await fetch(`/api/recipients?id=${payload.id}`, {
        method : 'PATCH',
        headers: { 'Content-Type':'application/json' },
        body   : JSON.stringify(schema.parse(payload)),  // validate
      })
      if (!res.ok) throw new Error('Update failed')
      return res.json() as Promise<Recipient>
    },
    onSuccess: (rec) => { onSaved(rec); setOpen(false) },
    onError  : (e:any)=> setErr(e.message ?? 'Error'),
  })

  /* ---------------------------- UI --------------------------------- */
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader><DialogTitle>Edit recipient</DialogTitle></DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label>Alias</Label>
            <Input value={form.alias}
                   onChange={e=>setForm({ ...form, alias: e.target.value })}/>
          </div>

          <div className="grid gap-2">
            <Label>Account name</Label>
            <Input value={form.accountName}
                   onChange={e=>setForm({ ...form, accountName: e.target.value })}/>
          </div>

          <div className="grid gap-2">
            <Label>Account number</Label>
            <Input value={form.accountNumber}
                   onChange={e=>setForm({ ...form, accountNumber: e.target.value })}/>
          </div>

          <div className="grid gap-2">
            <Label>Currency</Label>
            <Select
              value={form.currency}
              onValueChange={v=>setForm({ ...form, currency: v as any })}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {currencyList.map(c=>(
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {err && <p className="text-sm text-red-600">{err}</p>}
        </div>

        <DialogFooter>
          <Button onClick={()=>mut.mutate(form)} disabled={mut.isPending}>
            {mut.isPending ? 'Saving…' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
