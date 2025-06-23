'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import ConfirmPinDialog from './ConfirmPinDialog'
import { CurrencySelect, calcFee, FxCode } from './shared'

export default function DepositPanel() {
  const qc = useQueryClient()
  const [dCcy, setDCcy] = useState<FxCode>('USD')
  const [dAmt, setDAmt] = useState('500')
  const [depositType, setDepositType] = useState<'Cash' | 'Cheque'>('Cash')
  const [reference, setReference] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)

  const dFee = calcFee(+dAmt || 0)
  const credited = (+dAmt || 0) - dFee

  const depMut = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/tx/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: +dAmt,
          currency: dCcy,
          depositType,
          reference,
        }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => null)
        throw new Error(j?.error || 'Deposit failed')
      }
    },
    onSuccess: () => {
      setShowConfirm(false)
      toast.success('✅ Deposit booked & added to your balance.', {
        position: 'top-right',
        autoClose: 5000,
      })
      qc.invalidateQueries({ queryKey: ['me'] })
      setDAmt('500')
      setReference('')
    },
    onError: (err: any) => {
      toast.error('❌ Deposit failed: ' + err.message, {
        position: 'top-right',
        autoClose: 5000,
      })
    },
  })

  function handlePrepareConfirm() {
    if (!dAmt || isNaN(+dAmt) || +dAmt <= 0) {
      toast.error('Please enter a valid amount', { position: 'top-right' })
      return
    }
    setShowConfirm(true)
  }

  function handleConfirmAndDeposit() {
    depMut.mutate()
  }

  return (
    <>
      <Card className="bg-[#fafdff] border border-[#e6effa] rounded-2xl">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-xl font-semibold text-center">Cash / cheque deposit</h2>

          <div className="space-y-2">
            <Label>Deposit type</Label>
            <select
              className="w-full p-2 border rounded"
              value={depositType}
              onChange={e => setDepositType(e.target.value as any)}
            >
              <option value="Cash">Cash</option>
              <option value="Cheque">Cheque</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label>Reference / Notes</Label>
            <Input
              value={reference}
              onChange={e => setReference(e.target.value)}
              placeholder="E.g. teller name or cheque number"
            />
          </div>

          <div className="space-y-2">
            <Label>Currency</Label>
            <CurrencySelect value={dCcy} onChange={setDCcy} />
          </div>

          <div className="space-y-2">
            <Label>Amount</Label>
            <Input
              value={dAmt}
              onChange={e => setDAmt(e.target.value.replace(/[^\d.]/g, ''))}
            />
          </div>

          <p className="text-sm text-[#02152b]/70">
            Bank fee: <span className="font-semibold">{dFee.toFixed(2)} {dCcy}</span>
          </p>

          <Button
            className="w-full bg-[#21c87a] hover:bg-[#1eb26c]"
            onClick={handlePrepareConfirm}
            disabled={depMut.isPending}
          >
            {depMut.isPending ? 'Depositing…' : 'Continue'}
          </Button>
        </CardContent>
      </Card>

      <Dialog open={showConfirm} onOpenChange={open => setShowConfirm(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm deposit</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <p><strong>Type:</strong> {depositType}</p>
            {reference && <p><strong>Reference:</strong> {reference}</p>}
            <p><strong>Currency:</strong> {dCcy}</p>
            <p><strong>Deposit amount:</strong> {dAmt} {dCcy}</p>
            <p><strong>Bank fee:</strong> {dFee.toFixed(2)} {dCcy}</p>
            <p><strong>Credited to your account:</strong> {isFinite(credited) ? credited.toFixed(2) : '—'} {dCcy}</p>
          </div>
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowConfirm(false)}>
              Cancel
            </Button>
            <ConfirmPinDialog>
              <Button
                className="bg-[#21c87a] hover:bg-[#1eb26c]"
                onClick={handleConfirmAndDeposit}
                disabled={depMut.isPending}
              >
                {depMut.isPending ? 'Depositing…' : 'Confirm deposit'}
              </Button>
            </ConfirmPinDialog>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
