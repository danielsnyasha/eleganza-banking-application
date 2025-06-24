// hooks/useCard.ts
'use client';

import { useQuery } from '@tanstack/react-query';

export interface CardInfo {
  id: string;
  cardNumber: string;
  cvv: string;
  expiryDate: string;
  type: 'DEBIT' | 'CREDIT' | 'PREPAID' | 'VIRTUAL';
  network: 'VISA' | 'MASTERCARD' | 'AMEX' | 'DISCOVER' | 'UNIONPAY' | 'OTHER';
  status: 'ACTIVE' | 'BLOCKED' | 'EXPIRED' | 'STOLEN';
  issuedAt: string;
  account: {
    id: string;
    accountNumber: string;
    currency:
      | 'USD' | 'EUR' | 'GBP' | 'ZAR' | 'ZWL'
      | 'CAD' | 'AUD' | 'CHF' | 'CNY' | 'JPY'
      | 'NGN' | 'GHS' | 'INR' | 'KES' | 'BTC' | 'ETH';
    balance: number;
    isActive: boolean;
    openedAt: string;
  };
}

export function useCard() {
  return useQuery<CardInfo, Error>({
    queryKey: ['card'],
    queryFn: async () => {
      const res = await fetch('/api/cards');
      if (!res.ok) throw new Error('Failed to load card');
      return res.json() as Promise<CardInfo>;
    },
    staleTime: 1000 * 60 * 5,
  });
}
