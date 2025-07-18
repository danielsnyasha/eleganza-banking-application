'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ConfirmPinDialog from '@/components/Transfer/ConfirmPinDialog';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

const COINS = [
  'bitcoin','ethereum','ripple','litecoin','cardano','polkadot',
  'chainlink','dogecoin','stellar','uniswap','solana','bitcoin-cash',
] as const;
type CoinType = typeof COINS[number];

type HistPoint = { date: string; value: number };

function formatHistory(prices: [number, number][]) {
  return prices.map(([ts, price]) => ({
    date: new Date(ts).toISOString().slice(0, 10),
    value: price
  }));
}

function useCryptoHistory(coin: string, vs: string) {
  return useQuery<HistPoint[]>({
    queryKey: ['cryptoHistory', coin, vs],
    queryFn: async () => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${vs}&days=7&interval=daily`
      );
      if (!res.ok) throw new Error('Unable to fetch price history');
      const data = await res.json();
      return formatHistory(data.prices ?? []);
    },
    staleTime: 60_000,
    refetchOnWindowFocus: false
  });
}

function useCryptoPrice(coin: string, vs: string) {
  return useQuery<number>({
    queryKey: ['cryptoPrice', coin, vs],
    queryFn: async () => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=${vs}`
      );
      if (!res.ok) throw new Error('Price fetch failed');
      const data = await res.json();
      return data[coin]?.[vs] ?? 0;
    },
    staleTime: 60_000,
    refetchOnWindowFocus: false
  });
}

export default function CryptoPanel() {
  const [tab, setTab] = useState<'fiat' | 'crypto'>('fiat');
  const [coin, setCoin] = useState<CoinType>('bitcoin');
  const [toCoin, setToCoin] = useState<CoinType>('ethereum');
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [amt, setAmt] = useState('100');

  // Dialog state
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPin, setShowPin] = useState(false);

  // current price
  const { data: price, isPending, error } = useCryptoPrice(coin, 'usd');

  // history for chart
  const { data: histCoin } = useCryptoHistory(coin, tab === 'crypto' ? toCoin : 'usd');
  const { data: histToCoin } = useCryptoHistory(toCoin, 'usd');

  // for crypto-crypto, plot the ratio
  const histCrypto = useMemo(() => {
    if (tab !== 'crypto' || !histCoin || !histToCoin) return [];
    return histCoin.map((point, idx) => {
      const ref = histToCoin[idx];
      return {
        date: point.date,
        value: ref && point.value ? (ref.value / point.value) : 0
      };
    });
  }, [tab, histCoin, histToCoin]);

  const fee = +(1 + +amt * 0.006).toFixed(4);

  const total = side === 'buy'
    ? +amt + fee
    : +amt - fee;

  const qc = useQueryClient();
  const mut = useMutation({
    mutationFn: () => fetch('/api/transfer/crypto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cryptoId: coin,
        side,
        amountFiat: +amt
      })
    }).then(r => {
      if (!r.ok) return r.json().then(e => Promise.reject(e.error));
    }),
    onSuccess: () => {
      toast.success('Crypto trade executed');
      qc.invalidateQueries({ queryKey: ['me'] });
      setShowPin(false); // Close PIN dialog
    },
    onError: (e: any) => {
      toast.error('Trade failed: ' + (e?.message ?? e));
    }
  });

  if (isPending) return <div>Loading…</div>;
  if (error) return <div>Error: {error.message}</div>;

  const chartData = tab === 'crypto' ? histCrypto : histCoin ?? [];

  return (
    <Card className="p-4 space-y-4 bg-[#fafdff] border-[#e6effa] max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold text-center mb-2">Crypto Trading</h2>
      <div className="flex gap-2 justify-center mb-3">
        <Button
          variant={tab === 'fiat' ? 'default' : 'outline'}
          onClick={() => setTab('fiat')}
        >
          USD &lt;&gt; Crypto
        </Button>
        <Button
          variant={tab === 'crypto' ? 'default' : 'outline'}
          onClick={() => setTab('crypto')}
        >
          Crypto &lt;&gt; Crypto
        </Button>
      </div>

      {/* --- GRAPH --- */}
      <div className="bg-white p-3 rounded-lg border shadow mb-3">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart
            data={chartData}
            margin={{ top: 12, right: 18, left: 0, bottom: 8 }}
          >
            <XAxis dataKey="date" fontSize={10} />
            <YAxis fontSize={12} domain={['auto', 'auto']} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#008fff"
              dot={false}
              strokeWidth={2}
              name={tab === 'crypto'
                ? `${toCoin.toUpperCase()} / ${coin.toUpperCase()}`
                : `${coin.toUpperCase()} / USD`
              }
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* --- FORM --- */}
      <div className="flex gap-2 justify-center mb-1">
        <Select value={coin} onValueChange={val => setCoin(val as CoinType)}>
          <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            {COINS.map(c => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {tab === 'crypto' && (
          <Select value={toCoin} onValueChange={val => setToCoin(val as CoinType)}>
            <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              {COINS.filter(c => c !== coin).map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="flex gap-2 justify-center mb-2">
        <Button onClick={() => setSide('buy')} variant={side === 'buy' ? 'default' : 'outline'}>Buy</Button>
        <Button onClick={() => setSide('sell')} variant={side === 'sell' ? 'default' : 'outline'}>Sell</Button>
      </div>

      <div className="flex gap-2 justify-center">
        <Input
          className="w-[100px]"
          value={amt}
          onChange={e => setAmt(e.target.value.replace(/[^\d.]/g, ''))}
        />
        <span className="px-2 py-1 bg-[#e6effa] rounded">
          {tab === 'crypto'
            ? (side === 'buy' ? coin.toUpperCase() : toCoin.toUpperCase())
            : (side === 'buy' ? 'USD' : coin.toUpperCase())
          }
        </span>
      </div>

      <p className="text-center text-sm">
        {tab === 'crypto'
          ? `Price: 1 ${toCoin.toUpperCase()} = ${
              chartData.length ? chartData[chartData.length - 1].value.toFixed(6) : '...'
            } ${coin.toUpperCase()}`
          : `Price: $${price?.toFixed(2)} USD, Fee: ${fee.toFixed(4)} USD`
        }
      </p>
      <p className="text-center font-semibold">
        {side === 'buy'
          ? tab === 'crypto'
            ? `Cost: ~${(+amt * (chartData.length ? chartData[chartData.length - 1].value : 1)).toFixed(6)} ${toCoin.toUpperCase()}`
            : `Cost: $${(+amt + fee).toFixed(2)}`
          : tab === 'crypto'
            ? `You receive: ~${(+amt / (chartData.length ? chartData[chartData.length - 1].value : 1)).toFixed(6)} ${coin.toUpperCase()}`
            : `You receive: ${( +amt * (price ?? 1) - fee ).toFixed(4)} USD`
        }
      </p>

      {/* --- ARE YOU SURE DIALOG --- */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogTrigger asChild>
          <Button
            className="w-full bg-[#21c87a] hover:bg-[#1eb26c]"
            onClick={() => setShowConfirm(true)}
            disabled={mut.isPending}
          >
            {mut.isPending ? 'Processing…' : 'Confirm Trade'}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <div>
            You are about to {side} {amt} {tab === 'crypto' ? (side === 'buy' ? coin : toCoin) : coin} for {tab === 'crypto'
              ? (side === 'buy'
                ? `~${(+amt * (chartData.length ? chartData[chartData.length - 1].value : 1)).toFixed(6)} ${toCoin.toUpperCase()}`
                : `~${(+amt / (chartData.length ? chartData[chartData.length - 1].value : 1)).toFixed(6)} ${coin.toUpperCase()}`
              )
              : `$${(+amt + fee).toFixed(2)}`
            }.
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirm(false)}>Cancel</Button>
            <Button
              onClick={() => {
                setShowConfirm(false);
                setShowPin(true); // Show PIN dialog
              }}
              disabled={mut.isPending}
            >
              {mut.isPending ? 'Processing…' : 'Yes, Confirm'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* PIN dialog - shown after confirmation */}
      {showPin && (
        <ConfirmPinDialog>
          {/* You may need to pass a callback/handler as a prop or use context, 
              depending on your ConfirmPinDialog implementation */}
          <div>
            <Button
              className="w-full mt-3"
              disabled={mut.isPending}
              onClick={() => {
                mut.mutate();
                // It will close on success via onSuccess in useMutation
              }}
            >
              {mut.isPending ? 'Processing…' : 'Confirm PIN & Execute Trade'}
            </Button>
            <Button
              variant="outline"
              className="w-full mt-2"
              onClick={() => setShowPin(false)}
            >
              Cancel
            </Button>
          </div>
        </ConfirmPinDialog>
      )}
    </Card>
  );
}
