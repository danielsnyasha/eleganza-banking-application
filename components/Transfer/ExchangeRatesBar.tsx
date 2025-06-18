'use client';

import { ScrollArea }      from '@/components/ui/scroll-area';
import CountryFlag         from 'react-country-flag';
import { useLiveRates }    from './hooks';

export default function ExchangeRatesBar() {
  const { data, isLoading } = useLiveRates();   // top-12, base USD

  return (
    <div className="h-14 flex items-center bg-[#fafdff] border border-[#e6effa] rounded-2xl px-4 overflow-hidden">
      {isLoading && <span className="text-sm text-muted-foreground">Loading rates…</span>}

      {data && (
        <ScrollArea className="w-full h-full whitespace-nowrap">
          <div className="flex gap-6 text-sm text-[#02152b] items-center">
            {data.map(({ ccy, rate, country }) => (
              <div key={ccy} className="flex items-center gap-2 min-w-max">
                <CountryFlag svg countryCode={country} style={{ width: 18 }} />
                <span className="font-medium">1 USD =</span>
                <span className="font-semibold">{rate.toFixed(4)}</span>
                <span className="opacity-70">{ccy}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
