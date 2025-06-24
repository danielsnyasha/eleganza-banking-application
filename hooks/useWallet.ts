// hooks/useWallet.ts
import { useQuery } from '@tanstack/react-query';

export interface WalletData {
  accounts: { id: string; currency: string; balance: number; isActive: boolean }[];
  cryptos: { id: string; symbol: string; amount: number; currency: string; status: string; acquiredAt: string }[];
  forexTrades: { id: string; fromCurrency: string; toCurrency: string; amountFrom: number; amountTo: number; rate: number; fee: number; executedAt: string }[];
  transactions: { id: string; type: string; amount: number; currency: string; note: string | null; happenedAt: string }[];
}

export function useWallet() {
  return useQuery<WalletData, Error>({
    queryKey: ['wallet'],
    queryFn: async () => {
      const res = await fetch('/api/wallet');
      if (!res.ok) throw new Error('Failed to load wallet');
      return res.json();
    },
    staleTime: 60_000,
  });
}
