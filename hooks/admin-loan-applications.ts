'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

/* ——— DTO ——— */
export interface LoanAppDTO {
  id        : string;
  productId : string | null;
  slug      : string;
  userId    : string;
  amount    : number;
  currency  : string;
  purpose   : string;
  status    : 'pending' | 'approved' | 'cancelled';
  name      : string;
  surname   : string;
  email     : string;
  phone     : string;
  submittedAt: string;
  product   : {
    name         : string;
    annualRatePct: number;
    termMonths   : number;
    minAmount    : number;
    maxAmount    : number;
  } | null;
}

/* List */
export function useAdminLoanApps() {
  return useQuery<LoanAppDTO[]>({
    queryKey : ['loanApps'],
    queryFn  : async () => {
      const r = await fetch('/api/admin-portal/loans/applications');
      if (!r.ok) throw new Error('Failed to load');
      return r.json();
    },
    staleTime: 30_000,
  });
}

/* Mutate status */
export function useUpdateLoanApp() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { id: string; status: string }) => {
      const r = await fetch(
        `/api/admin-portal/loans/applications/${payload.id}`,
        {
          method : 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body   : JSON.stringify({ status: payload.status }),
        },
      );
      if (!r.ok) throw new Error('Update failed');
      return r.json();
    },
    onSuccess: () => {
      toast.success('Status updated');
      qc.invalidateQueries({ queryKey: ['loanApps'] });
    },
    onError  : () => toast.error('Cannot update'),
  });
}
