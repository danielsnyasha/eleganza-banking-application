'use client';

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from '@tanstack/react-query';
import { useMeStore, Me } from '@/stores/useMeStore';

export function useMe(): UseQueryResult<Me, Error> {
  const me    = useMeStore((s) => s.me);
  const setMe = useMeStore((s) => s.setMe);

  return useQuery<Me, Error>({
    queryKey:    ['me'],
    initialData: me ?? undefined,
    queryFn:     async () => {
      const res = await fetch('/api/me');
      if (!res.ok) throw new Error('Failed to load profile');
      const data: Me = await res.json();
      setMe(data);
      return data;
    },
    refetchOnWindowFocus: false,
  });
}

export function useSaveMe(): UseMutationResult<Me, Error, Partial<Me>> {
  const qc    = useQueryClient();
  const setMe = useMeStore((s) => s.setMe);

  return useMutation<Me, Error, Partial<Me>>({
    mutationFn: async (payload) => {
      const res = await fetch('/api/me', {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Save failed');
      return res.json() as Promise<Me>;
    },
    onSuccess: (data) => {
      setMe(data);
      qc.setQueryData(['me'], data);
    },
  });
}

export type { Me };
