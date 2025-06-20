// components/Transfer/TransferUtils.tsx
'use client';

import { useState, useEffect } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import CountryFlag from 'react-country-flag';

export const FX_SYMBOLS = [
  'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF',
  'CNY', 'ZAR', 'SGD', 'INR', 'KES',
] as const;
export type FxCode = typeof FX_SYMBOLS[number];

export function useTransferTab(): readonly [string, (v: string) => void] {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const [tab, setTab] = useState<'send' | 'request' | 'deposit' | 'withdraw'>('send');
  return mounted ? [tab, setTab] as const : ['send', () => {}];
}

export function CurrencySelect(
  { value, onChange, exclude }: { value: FxCode; onChange: (v: FxCode) => void; exclude?: string }
): React.JSX.Element {
  return (
    <Select value={value} onValueChange={v => onChange(v as FxCode)}>
      <SelectTrigger className="w-[90px]"><SelectValue /></SelectTrigger>
      <SelectContent>
        {FX_SYMBOLS.filter(c => c !== exclude).map(c => (
          <SelectItem key={c} value={c}>
            <CountryFlag svg countryCode={c.slice(0, 2)} style={{ width: 18 }} /> {c}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function Summary({
  fee, rate, from, to,
}: {
  fee: number; rate: number; from: FxCode; to: FxCode;
}): React.JSX.Element {
  return (
    <p className="text-sm text-[#02152b]/70">
      Bank fee:&nbsp;
      <span className="font-medium text-[#e53935]">
        {fee.toFixed(2)} {from}
      </span><br />
      Spot&nbsp;rate:&nbsp;1&nbsp;{from}&nbsp;=&nbsp;{rate.toFixed(5)}&nbsp;{to}
    </p>
  );
}
