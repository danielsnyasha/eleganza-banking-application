// hooks/useFullUser.ts

'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';

export interface FullUser {
  id: string;
  clerkId?: string | null;
  email: string;
  phone?: string | null;
  passwordHash: string;
  firstName: string;
  lastName: string;
  imageUrl?: string | null;
  idType?: string | null;
  idNumber?: string | null;
  profession?: string | null;
  dob?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  province?: string | null;
  postalCode?: string | null;
  country?: string | null;
  notes?: string | null;
  kycStatus?: string;
  verified?: boolean;
  createdAt: string;
  updatedAt: string;
  // ...other fields
}

export function useFullUser(): UseQueryResult<FullUser, Error> {
  return useQuery<FullUser, Error>({
    queryKey: ['full-user'],
    queryFn: async () => {
      const res = await fetch('/api/full-user');  // ← Fix: fetch from the right endpoint
      if (!res.ok) throw new Error('Failed to fetch full user');
      const data = await res.json();
      // LOG the result for debugging
      console.log('[Verification] /api/full-user response:', data);
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
}
