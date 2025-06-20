'use client';

import { useState, useEffect } from 'react';
import { useS } from 'use-s-react';
import { useFxRates } from '@/hooks/useFxRates';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { JSX } from 'react/jsx-runtime';

export const FX_SYMBOLS = [
  'USD','EUR','GBP','JPY','AUD','CAD','CHF',
  'CNY','ZAR','SGD','INR','KES',
] as const;
export type FxCode = typeof FX_SYMBOLS[number];

export const BANK_ACCT = '111122223333';
export const calcFee = (amt: number): number =>
  +(1 + amt * 0.006).toFixed(2);

/** Client-only tab hook for send/request/deposit/withdraw */
export function useTransferTab(): readonly [
  'send' | 'request' | 'deposit' | 'withdraw',
  (v: 'send' | 'request' | 'deposit' | 'withdraw') => void
] {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const tab = useS<'send'|'request'|'deposit'|'withdraw'>(
    'transfer-tab','send',true
  );
  return mounted ? tab : ['send', () => {}];
}

/** FX spot rate hook */
export function useSpot(from: FxCode, to: FxCode): number {
  const { data } = useFxRates(from, to, 'D');
  return data?.[0]?.rate ?? 1;
}

/** Currency selector dropdown */
export function CurrencySelect({
  value,
  onChange,
  exclude,
}: {
  value: FxCode;
  onChange: (v: FxCode) => void;
  exclude?: FxCode;
}): JSX.Element {
  return (
    <Select value={value} onValueChange={v => onChange(v as FxCode)}>
      <SelectTrigger className="w-[90px]"><SelectValue/></SelectTrigger>
      <SelectContent>
        {FX_SYMBOLS.filter(c => c !== exclude).map(c => (
          <SelectItem key={c} value={c}>
            {c}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/** Fee + spot summary UI */
export function Summary({
  fee,
  rate,
  from,
  to,
}: {
  fee: number;
  rate: number;
  from: FxCode;
  to: FxCode;
}): JSX.Element {
  return (
    <p className="text-sm text-[#02152b]/70">
      Bank fee:&nbsp;
      <span className="font-medium text-[#e53935]">
        {fee.toFixed(2)} {from}
      </span><br/>
      Spot&nbsp;rate:&nbsp;1&nbsp;{from}&nbsp;=&nbsp;{rate.toFixed(5)}&nbsp;{to}
    </p>
  );
}
