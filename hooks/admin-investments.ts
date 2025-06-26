import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { InvestmentProductDTO } from '@/types/investment';

export function useAdminProducts() {
  return useQuery<InvestmentProductDTO[]>({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const r = await fetch('/api/admin-portal/investments/products');
      if (!r.ok) throw new Error('Failed');
      return r.json();
    },
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) => {
      const r = await fetch('/api/admin-portal/investments/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!r.ok) throw new Error('Create failed');
      return r.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-products'] }),
  });
}


export function useDeleteProduct() {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: async (id: string) => {
        const r = await fetch(
          `/api/admin-portal/investments/products/${id}`,
          { method: 'DELETE' }
        );
        if (!r.ok) throw new Error('Delete failed');
      },
      onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-products'] }),
    });
  }

  /* toggle active / inactive */
export function useToggleActive() {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: async (payload: { id: string; isActive: boolean }) => {
        await fetch(
          `/api/admin-portal/investments/products/${payload.id}/status`,
          {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isActive: payload.isActive }),
          }
        );
      },
      onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-products'] }),
    });
  }
  