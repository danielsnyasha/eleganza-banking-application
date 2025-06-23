'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ConfirmPinDialog from './ConfirmPinDialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { CurrencySelect, calcFee, FxCode } from './shared';
import { useMe } from '@/hooks/useMe';

export default function WithdrawPanel() {
  const { data: me } = useMe();
  const myBal = me?.account.balance ?? 0;
  const qc = useQueryClient();

  const [wCcy, setWCcy] = useState<FxCode>('USD');
  const [wAmt, setWAmt] = useState('250');
  const [withdrawType, setWithdrawType] = useState<'Cash' | 'Cheque'>(
    'Cash'
  );
  const [reference, setReference] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const wFee = calcFee(+wAmt || 0);
  const total = (+wAmt || 0) + wFee;

  const witMut = useMutation({
    mutationFn: async () => {
      if (total > myBal) {
        throw new Error(`Insufficient balance (${myBal.toFixed(2)} ${wCcy})`);
      }
      const res = await fetch('/api/tx/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: +wAmt,
          currency: wCcy,
          withdrawType,
          reference,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => null);
        throw new Error(j?.error || 'Withdrawal failed');
      }
    },
    onSuccess: () => {
      setShowConfirm(false);
      toast.success('✅ Withdrawal queued & deducted.', {
        position: 'top-right',
        autoClose: 5000,
      });
      qc.invalidateQueries({ queryKey: ['me'] });
      setWAmt('0');
      setReference('');
    },
    onError: (err: any) => {
      toast.error(`❌ ${err.message}`, { position: 'top-right' });
    },
  });

  function handleContinue() {
    if (!wAmt || isNaN(+wAmt) || +wAmt <= 0) {
      toast.error('Please enter a valid amount', { position: 'top-right' });
      return;
    }
    setShowConfirm(true);
  }

  function handleConfirmAndWithdraw() {
    witMut.mutate();
  }

  return (
    <>
      <Card className="bg-[#fafdff] border border-[#e6effa] rounded-2xl">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-xl font-semibold text-center">
            Withdraw cash
          </h2>

          <div className="space-y-2">
            <Label>Withdraw type</Label>
            <select
              className="w-full p-2 border rounded"
              value={withdrawType}
              onChange={e =>
                setWithdrawType(e.target.value as 'Cash' | 'Cheque')
              }
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
            <CurrencySelect value={wCcy} onChange={setWCcy} />
          </div>

          <div className="space-y-2">
            <Label>Amount</Label>
            <Input
              value={wAmt}
              onChange={e =>
                setWAmt(e.target.value.replace(/[^\d.]/g, ''))
              }
            />
          </div>

          <p className="text-sm text-[#02152b]/70">
            Bank fee: <span className="font-semibold">{wFee.toFixed(2)} {wCcy}</span>
          </p>

          <Button
            className="w-full bg-[#21c87a] hover:bg-[#1eb26c]"
            onClick={handleContinue}
            disabled={witMut.isPending}
          >
            {witMut.isPending ? 'Processing…' : 'Continue'}
          </Button>
        </CardContent>
      </Card>

      <Dialog open={showConfirm} onOpenChange={open => setShowConfirm(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm withdrawal</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <p><strong>Type:</strong> {withdrawType}</p>
            {reference && <p><strong>Reference:</strong> {reference}</p>}
            <p><strong>Currency:</strong> {wCcy}</p>
            <p><strong>Amount:</strong> {wAmt} {wCcy}</p>
            <p><strong>Bank fee:</strong> {wFee.toFixed(2)} {wCcy}</p>
            <p><strong>Total deducted:</strong> {total.toFixed(2)} {wCcy}</p>
          </div>
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowConfirm(false)}>
              Cancel
            </Button>
            <ConfirmPinDialog>
              <Button
                className="bg-[#21c87a] hover:bg-[#1eb26c]"
                onClick={handleConfirmAndWithdraw}
                disabled={witMut.isPending}
              >
                {witMut.isPending ? 'Processing…' : 'Confirm withdrawal'}
              </Button>
            </ConfirmPinDialog>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
