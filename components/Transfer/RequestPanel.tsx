// components/Transfer/RequestPanel.tsx
'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { Card, CardContent } from '@/components/ui/card'
import { Label }             from '@/components/ui/label'
import { Input }             from '@/components/ui/input'
import { Button }            from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

import ConfirmPinDialog                  from './ConfirmPinDialog'
import { CurrencySelect, calcFee, FxCode } from './shared'
import { useFxRates }                     from '@/hooks/useFxRates'

export default function RequestPanel() {
  const [rTo, setRTo]       = useState<FxCode>('USD')
  const [rFrom, setRFrom]   = useState<FxCode>('USD')
  const [rAmt, setRAmt]     = useState('200')
  const [rEmail, setREmail] = useState('')

  // control summary dialog
  const [showConfirm, setShowConfirm] = useState(false)

  // get FX rate (swap parameters for correct direction)
  const { data: fxData } = useFxRates(rTo, rFrom, 'D')
  const rRate = fxData?.[0]?.rate ?? 1

  const rFee  = calcFee(+rAmt || 0)
  const rPays = (+rAmt || 0) * rRate + rFee

  // simple email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  // mutation to call your API
  const reqMut = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/tx/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: rEmail, amount: +rAmt }),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => null)
        throw new Error(json?.error || 'api')
      }
    },
    onSuccess: () => {
      toast.success(
        `Payment request sent to ${rEmail}! The user will receive an email.`,
        { autoClose: 10000, position: 'top-right' }
      )
      // reset inputs
      setRAmt('200')
      setREmail('')
    },
    onError: (err: any) => {
      toast.error('Failed to send request: ' + err.message, { position: 'top-right' })
    },
  })

  // 1️⃣ Step: validate and open summary
  function handlePrepareConfirm() {
    if (!emailRegex.test(rEmail)) {
      toast.error('Please enter a valid email address', { position: 'top-right' })
      return
    }
    setShowConfirm(true)
  }

  // 2️⃣ Step: close summary & send
  function handleConfirmAndSend() {
    setShowConfirm(false)
    reqMut.mutate()
  }

  return (
    <>
      <Card className="bg-[#fafdff] border border-[#e6effa] rounded-2xl">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-xl font-semibold text-center">
            Request money
          </h2>

          <div className="space-y-2">
            <Label>You want to receive</Label>
            <div className="flex gap-2">
              <CurrencySelect value={rTo} onChange={setRTo} />
              <Input
                value={rAmt}
                onChange={e => setRAmt(e.target.value.replace(/[^\d.]/g, ''))}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Sender pays in</Label>
            <CurrencySelect value={rFrom} onChange={setRFrom} />
          </div>

          <div className="space-y-2">
            <Label>Sender e-mail</Label>
            <Input
              value={rEmail}
              onChange={e => setREmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <p className="text-sm text-[#02152b]/70">
            They must send{' '}
            <span className="font-semibold">
              {isFinite(rPays) ? rPays.toFixed(2) : '—'} {rFrom}
            </span>{' '}
            (incl.&nbsp;fee&nbsp;{rFee.toFixed(2)} {rFrom})
          </p>
          <p className="text-sm text-[#02152b]/70">
            Bank fee:{' '}
            <span className="font-medium text-[#e53935]">
              {rFee.toFixed(2)} {rFrom}
            </span>
            <br />
            Spot rate: 1 {rTo} = {rRate.toFixed(5)} {rFrom}
          </p>

          <Button
            className="w-full bg-[#21c87a] hover:bg-[#1eb26c]"
            onClick={handlePrepareConfirm}
            disabled={reqMut.isPending}
          >
            {reqMut.isPending ? 'Sending…' : 'Continue'}
          </Button>
        </CardContent>
      </Card>

      <Dialog
        open={showConfirm}
        onOpenChange={open => setShowConfirm(open)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm payment request</DialogTitle>
          </DialogHeader>

          <div className="space-y-2">
            <p><strong>Recipient:</strong> {rEmail}</p>
            <p><strong>You request:</strong> {rAmt} {rTo}</p>
            <p>
              <strong>Sender pays:</strong>{' '}
              {isFinite(rPays) ? rPays.toFixed(2) : '—'} {rFrom}
            </p>
            <p><strong>Bank fee:</strong> {rFee.toFixed(2)} {rFrom}</p>
            <p>
              <strong>Spot rate:</strong> 1 {rTo} = {rRate.toFixed(5)} {rFrom}
            </p>
          </div>

          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowConfirm(false)}>
              Cancel
            </Button>
            <ConfirmPinDialog>
              <Button
                className="bg-[#21c87a] hover:bg-[#1eb26c]"
                onClick={handleConfirmAndSend}
                disabled={reqMut.isPending}
              >
                {reqMut.isPending ? 'Sending…' : 'Send request'}
              </Button>
            </ConfirmPinDialog>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
