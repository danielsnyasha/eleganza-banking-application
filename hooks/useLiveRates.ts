// app/(banking)/hooks/useLiveRates.ts
'use client';
import useSWR from 'swr';

type Rate = { ccy: string; rate: number; country: string };

const ccyList = [
  { ccy: 'EUR', country: 'EU' },
  { ccy: 'GBP', country: 'GB' },
  { ccy: 'ZAR', country: 'ZA' },
  { ccy: 'CAD', country: 'CA' },
  { ccy: 'AUD', country: 'AU' },
  { ccy: 'JPY', country: 'JP' },
  { ccy: 'CHF', country: 'CH' },
  { ccy: 'KES', country: 'KE' },
  { ccy: 'NGN', country: 'NG' },
  { ccy: 'INR', country: 'IN' },
  { ccy: 'CNY', country: 'CN' },
  { ccy: 'BRL', country: 'BR' },
];

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function useLiveRates() {
  const { data, error, isLoading } = useSWR(
    // ask only for the 12 symbols we care about
    'https://api.exchangerate.host/latest?base=USD&symbols=' +
      ccyList.map(c => c.ccy).join(','),
    fetcher,
    { refreshInterval: 60_000 } // live-ish (60 s)
  );

  return {
    data:
      data &&
      ccyList.map(({ ccy, country }) => ({
        ccy,
        country,
        rate: data.rates[ccy],
      })) as Rate[],
    isLoading: !error && !data,
    error,
  };
}
