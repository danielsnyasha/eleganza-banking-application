// hooks/useVerification.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useUser } from '@clerk/nextjs'



type FormValues = {
  firstName: string
  lastName: string
  phone: string
  email: string
  idType: 'national-id' | 'passport'
  idNumber: string
  profession: string
  dob: string
  address1: string
  address2?: string
  city: string
  province: string
  postalCode: string
  country: string
  notes?: string
}


export const useVerificationStatus = () => {
  const { user, isLoaded } = useUser()
  return useQuery({
    enabled : isLoaded,
    queryKey: ['kyc-status', user?.id],
    queryFn : async () => {
      const res = await fetch(`/api/verification-status?clerkId=${user!.id}`, {
        credentials: 'include',
      })
      if (!res.ok) throw new Error(await res.text())
      return (await res.json()) as { verified: boolean }
    },
    staleTime: 60_000,
  })
}

export const useOnboard = () => {
  const qc   = useQueryClient()
  const { user } = useUser()

  return useMutation({
    mutationFn: async (payload: FormValues) => {
      const res = await fetch('/api/onboard', {
        method      : 'POST',
        headers     : { 'Content-Type': 'application/json' },
        credentials : 'include',
        body        : JSON.stringify({ ...payload, clerkId: user!.id }),
      })
      if (!res.ok) throw new Error(await res.text())
    },
    onSuccess: () => qc.invalidateQueries(),
  })
}
