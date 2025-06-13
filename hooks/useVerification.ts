// hooks/useVerification.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useVerificationStatus = () =>
  useQuery({
    queryKey: ['kyc-status'],
    queryFn: async () => {
      const res = await fetch('/api/verification-status')
      if (!res.ok) throw new Error('status check failed')
      return (await res.json()) as { verified: boolean }
    },
    staleTime: 60_000,
  })

export const useOnboard = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (payload: unknown) => {
      const res = await fetch('/api/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('onboard failed')
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['kyc-status'] }),
  })
}
