// hooks/useCryptoHistory.ts
import { useQuery } from '@tanstack/react-query';

export function useCryptoHistory(coin: string, vs: string) {
  return useQuery({
    queryKey: ['cryptoHistory', coin, vs],
    queryFn: async () => {
      const res = await fetch(`/api/crypto/history?coin=${coin}&vs=${vs}`);
      if (!res.ok) throw new Error('History fetch failed');
      const data = await res.json();
      return data.prices;  // or format as you need
    },
  });
}
