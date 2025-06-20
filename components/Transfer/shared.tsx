'use client'

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import CountryFlag from 'react-country-flag'

export const FX_SYMBOLS = [
  'USD','EUR','GBP','JPY','AUD','CAD','CHF',
  'CNY','ZAR','SGD','INR','KES',
] as const

// ← export the union of those codes
export type FxCode = typeof FX_SYMBOLS[number]

export const BANK_ACCT = '111122223333'
export const calcFee   = (amt: number) => +(1 + amt * 0.006).toFixed(2)

export function CurrencySelect({
  value,
  onChange,
  exclude,
}: {
  value: FxCode
  onChange: (v: FxCode) => void
  exclude?: string
}) {
  return (
    <Select value={value} onValueChange={v => onChange(v as FxCode)}>
      <SelectTrigger className="w-[90px]"><SelectValue/></SelectTrigger>
      <SelectContent>
        {FX_SYMBOLS.filter(c => c !== exclude).map(c => (
          <SelectItem key={c} value={c}>
            <CountryFlag svg countryCode={c.slice(0,2)} style={{ width: 18 }} /> {c}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
