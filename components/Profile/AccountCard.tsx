'use client'

import { Clipboard } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Label }  from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast }  from 'react-toastify'
import { Me }     from '@/hooks/useMe'

export default function AccountCard ({ me }: { me: Me }) {
  /* ----------------------------------------------------------------
     Guard — the API guarantees at least one account, but if something
     goes wrong we render a friendly placeholder instead of crashing
  ----------------------------------------------------------------- */
  if (!me.account) {
    return (
      <Card className="bg-[#fafdff] border border-[#e6effa]">
        <CardContent className="p-6 text-sm text-muted-foreground">
          No bank-account found for this user.
        </CardContent>
      </Card>
    )
  }

  const acct = me.account

  function copy () {
    navigator.clipboard.writeText(acct.number)
    toast.success('Account number copied')
  }

  return (
    <Card className="bg-[#fafdff] border border-[#e6effa]">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg">Account details</h3>
          <Button variant="secondary" size="icon" onClick={copy}>
            <Clipboard className="h-4 w-4" />
          </Button>
        </div>

        <Field label="Account number">{acct.number}</Field>
        <Field label="Type">{acct.type}</Field>
        <Field label="Currency">{acct.currency}</Field>
        <Field label="Opened">
          {new Date(acct.openedAt).toLocaleDateString()}
        </Field>
        <Field label="Status">
          {acct.isActive ? 'Active' : 'Blocked'}
        </Field>
        <Field label="Balance">
          {acct.currency}&nbsp;{acct.balance.toFixed(2)}
        </Field>
      </CardContent>
    </Card>
  )
}

/* helper 1-liner --------------------------------------------------- */
function Field (
  { label, children }: { label:string; children:React.ReactNode },
) {
  return (
    <p className="text-sm flex justify-between">
      <Label className="font-normal text-[#02152b]/70">{label}</Label>
      <span className="font-medium">{children}</span>
    </p>
  )
}
