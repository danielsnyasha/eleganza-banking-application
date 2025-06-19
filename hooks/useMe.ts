/* ------------------------------------------------------------------
   hooks/useMe.ts – share profile state with use-s-react
------------------------------------------------------------------ */
'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useS } from 'use-s-react'

export interface Me {
  [x: string]: any
  id        : string
  firstName : string
  lastName  : string
  email     : string
  phone?    : string | null
  avatarUrl?: string | null
  address1? : string | null
  city?     : string | null
  country?  : string | null
  kycStatus : 'PENDING' | 'VERIFIED' | 'REJECTED'
  account   : {
    number  : string
    type    : string
    balance : number
    currency: string
    isActive: boolean
    openedAt: string
  }
}

const KEY = 'me-cache'

/* -------------- read -------------- */
export function useMe() {
  const isBrowser = typeof window !== 'undefined'
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [cached, setCached] = isBrowser ? useS<Me | null>(KEY, null, true) : [null, () => {}]

  return useQuery<Me>({
    queryKey : ['me'],
    initialData: cached || undefined,
    queryFn: async () => {
      const res = await fetch('/api/me')
      if (!res.ok) throw new Error('profile load failed')
      const data: Me = await res.json()
      if (isBrowser) setCached(data)
      return data
    },
    refetchOnWindowFocus: false,
  })
}

/* -------------- write ------------- */
export function useSaveMe() {
  const qc = useQueryClient()
  const isBrowser = typeof window !== 'undefined'
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [, setCached] = isBrowser ? useS<Me | null>(KEY, null, true) : [null, () => {}]

  return useMutation({
    mutationFn: async (payload: Partial<Me>) => {
      const res = await fetch('/api/me', {
        method : 'PATCH',
        headers: { 'Content-Type':'application/json' },
        body   : JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('save failed')
      return res.json() as Promise<{ ok: true; updated: Me }>
    },
    onSuccess: ({ updated }) => {
      if (isBrowser) setCached(updated)
      qc.setQueryData(['me'], updated)
    },
  })
}
