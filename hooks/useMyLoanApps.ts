'use client';
import { useQuery } from '@tanstack/react-query';

/* ------------ DTO from /api/loans/my‑applications ---------------- */
export interface ProjectionPoint { label: string; value: number }

export interface LoanApp {
  id:            string;
  status:        'pending' | 'approved' | 'cancelled';
  currency:      string;
  amount:        number;
  ratePct:       number;
  termMonths:    number;
  submittedAt:   string;
  product: {
    name:  string;
    images:string[];
  } | null;
  /* chart‑ready data */
  monthPoints: ProjectionPoint[];
  yearPoints : ProjectionPoint[];
}

export function useMyLoanApps() {
  return useQuery<LoanApp[]>({
    queryKey : ['myLoans'],
    queryFn  : async () => {
      const res = await fetch('/api/loans/my-applications');
      if (!res.ok) throw new Error('Failed to load loans');
      return res.json();
    },
    staleTime: 60_000,
  });
}
