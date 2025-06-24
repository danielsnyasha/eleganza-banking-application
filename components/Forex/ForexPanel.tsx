'use client';

import { useState } from 'react';
import { FX_SYMBOLS, useFxRates } from '@/hooks/useFxRates';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ConfirmPinDialog from '@/components/Transfer/ConfirmPinDialog';
import { toast } from 'react-toastify';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type FxPoint = { date: string; value: number };

export default function ForexPanel() {
  const [from, setFrom] = useState<typeof FX_SYMBOLS[number]>('USD');
  const [to, setTo] = useState<typeof FX_SYMBOLS[number]>('EUR');
  const [window, setWindow] = useState<'D'|'W'|'M'>('W');
  const [side, setSide] = useState<'buy'|'sell'>('buy');
  const [amt, setAmt] = useState('100');

  const { data, isLoading, error } = useFxRates(from, to, window);
  const history: FxPoint[] = data?.[0]?.history.map(p => ({ date: p.date, value: p.value })) || [];
  const rate = data?.[0]?.rate ?? 1;
  const fee = +(1 + +amt * 0.006).toFixed(4);
  const total = side === 'buy'
    ? (+amt + fee)
    : (+amt * rate - fee);

  const qc = useQueryClient();
  const mut = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/transfers/forex', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: +amt,
          fromCurrency: from,
          toCurrency: to,
          side,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => null);
        throw new Error(j?.error || 'Trade failed');
      }
    },
    onSuccess: () => {
      toast.success('Forex trade executed', { position: 'top-right' });
      qc.invalidateQueries({ queryKey: ['me'] });

    },
    onError: (err: any) => {
      toast.error('Trade failed: ' + err.message, { position: 'top-right' });
    },
  });

  if (isLoading) return <div>Loading…</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Card className="p-4 space-y-6 bg-[#fafdff] border border-[#e6effa] rounded-2xl">
      <h2 className="text-lg font-semibold text-center">Forex Trade</h2>

      {/* History Chart */}
      <div style={{ width: '100%', height: 200 }}>
        <ResponsiveContainer>
          <LineChart data={history}>
            <CartesianGrid stroke="#eee" />
            <XAxis dataKey="date" />
            <YAxis domain={['auto','auto']} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#21c87a"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Controls */}
      <div className="flex gap-2 justify-center">
        <Select value={from} onValueChange={v => setFrom(v as typeof FX_SYMBOLS[number])}>
          <SelectTrigger className="w-[100px]"><SelectValue/></SelectTrigger>
          <SelectContent>
            {FX_SYMBOLS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={to} onValueChange={v => setTo(v as typeof FX_SYMBOLS[number])}>
          <SelectTrigger className="w-[100px]"><SelectValue/></SelectTrigger>
          <SelectContent>
            {FX_SYMBOLS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={window} onValueChange={v => setWindow(v as 'D'|'W'|'M')}>
          <SelectTrigger className="w-[60px]"><SelectValue/></SelectTrigger>
          <SelectContent>
            <SelectItem value="D">1D</SelectItem>
            <SelectItem value="W">1W</SelectItem>
            <SelectItem value="M">1M</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2 justify-center">
        <Button onClick={() => setSide('buy')} variant={side==='buy'?'default':'outline'}>Buy</Button>
        <Button onClick={() => setSide('sell')} variant={side==='sell'?'default':'outline'}>Sell</Button>
      </div>

      <div className="flex gap-2 justify-center">
        <Input
          className="w-[100px]"
          value={amt}
          onChange={e => setAmt(e.target.value.replace(/[^\d.]/g,''))}
        />
        <span className="px-2 py-1 bg-[#e6effa] rounded">
          {side==='buy' ? from : to}
        </span>
      </div>

      <p className="text-sm text-center">
        Rate: 1 {from} = {rate.toFixed(4)} {to}, Fee: {fee.toFixed(4)} {from}
      </p>
      <p className="text-center font-semibold">
        {side==='buy'
          ? `Total Cost: ${( +amt + fee ).toFixed(2)} ${from}`
          : `Proceeds: ${( +amt * rate - fee ).toFixed(2)} ${to}`
        }
      </p>

      <ConfirmPinDialog>
        <Button
          className="w-full bg-[#21c87a] hover:bg-[#1eb26c]"
          onClick={() => mut.mutate()}
          disabled={mut.isPending} // FIX
        >
          {mut.isPending ? 'Processing…' : 'Confirm Trade'}
        </Button>
      </ConfirmPinDialog>
    </Card>
  );
}
