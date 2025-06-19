'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export type Recipient = {
  id: string;
  alias: string;
  accountName: string;
  accountNumber: string;
  currency: string;
  externalBank: { bankName: string; country: string; swiftCode?: string | null };
};

/* ---------- list ---------- */
export const useRecipients = () =>
  useQuery<Recipient[]>({
    queryKey: ['recipients'],
    queryFn: async () => {
      const res = await fetch('/api/recipients');
      if (!res.ok) throw new Error('Failed to load recipients');
      return res.json();
    },
  });

/* ---------- add ---------- */
export const useAddRecipient = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Omit<Recipient, 'id' | 'externalBank'> & {
      bankName: string;
      country: string;
      swiftCode?: string;
    }) => {
      const res = await fetch('/api/recipients', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Create failed');
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['recipients'] }),
  });
};

/* ---------- delete ---------- */
export const useDeleteRecipient = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/recipients?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['recipients'] }),
  });
};
