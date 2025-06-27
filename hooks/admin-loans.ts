'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export interface LoanProductDTO {
  id: string;
  slug: string;
  name: string;
  shortDescription?: string;
  purpose?: string;
  currency: string;
  maxAmount: number;
  minAmount: number;
  annualRatePct: number;
  termMonths: number;
  feePct?: number | null;
  images: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/* ---------- list -------------------------------------------------- */
export function useAdminLoans() {
  return useQuery<LoanProductDTO[]>({
    queryKey: ['adminLoans'],
    queryFn : async () => {
      const r = await fetch('/api/admin-portal/loans/products');
      if (!r.ok) throw new Error('Failed to load loans');
      return r.json();
    },
  });
}

/* ---------- create ------------------------------------------------ */
export function useCreateLoan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Partial<LoanProductDTO>) => {
      const r = await fetch('/api/admin-portal/loans/products', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(payload),
      });
      if (!r.ok) throw new Error('Create failed');
      return r.json();
    },
    onSuccess: () => {
      toast.success('Loan created');
      qc.invalidateQueries({ queryKey: ['adminLoans'] });
    },
    onError: () => toast.error('Could not create'),
  });
}

/* ---------- update / delete -------------------------------------- */
export function useUpdateLoan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...payload
    }: Partial<LoanProductDTO> & { id: string }) => {
      const r = await fetch(`/api/admin-portal/loans/products/${id}`, {
        method : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(payload),
      });
      if (!r.ok) throw new Error('Update failed');
      return r.json();
    },
    onSuccess: () => {
      toast.success('Loan updated');
      qc.invalidateQueries({ queryKey: ['adminLoans'] });
    },
    onError: () => toast.error('Could not update'),
  });
}

export function useDeleteLoan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const r = await fetch(`/api/admin-portal/loans/products/${id}`, {
        method: 'DELETE',
      });
      if (!r.ok) throw new Error('Delete failed');
      return r.json();
    },
    onSuccess: () => {
      toast.success('Loan deleted');
      qc.invalidateQueries({ queryKey: ['adminLoans'] });
    },
    onError: () => toast.error('Could not delete'),
  });
}
