'use client';
import { useQuery } from '@tanstack/react-query';

export interface Point { label: string; value: number; }
export interface MyApp {
  id: string;
  status: 'pending' | 'approved' | 'cancelled';
  currency: string;
  amount: number;
  risk: string;
  submittedAt: string;
  name: string;
  surname: string;
  product: {
    name: string;
    annualRatePct: number;
    minimumAmount: number;
    termDays: number | null;
    currency: string;
  } | null;
  /* computed on backend */
  ratePct: number;
  termDays: number;
  points : Point[];
}

export function useMyInvestments() {
  return useQuery<MyApp[]>({
    queryKey: ['myInvApps'],
    queryFn : async () => {
      const r = await fetch('/api/investments/my-applications');
      if (!r.ok) throw new Error('Failed to load investments');
      return r.json();
    },
    staleTime: 60_000,
  });
}
