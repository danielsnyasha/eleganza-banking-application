// hooks/useCryptoRates.ts
import { useQuery } from '@tanstack/react-query';

export interface CryptoPoint {
  time: number;      // unix timestamp
  price: number;
}
export interface CryptoRow {
  history: any;
  id: string;        // e.g. “bitcoin”
  symbol: string;    // e.g. “btc”
  current_price: number;
  sparkline_in_7d: { price: number[] };
}

export function useCryptoRates(
  ids: string[] = ['bitcoin','ethereum'],
  vs: string      = 'usd'
) {
  return useQuery<CryptoRow[], Error>({
    queryKey: ['crypto', ids, vs],
    queryFn: async () => {
      const url =
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vs}` +
        `&ids=${ids.join(',')}&sparkline=true`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Crypto HTTP error ${res.status}`);
      return (await res.json()) as CryptoRow[];
    },
    staleTime: 60_000,
    retry: 1,
  });
}
