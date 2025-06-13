// hooks/useVerification.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useVerificationStatus = () =>
  useQuery({
    queryKey: ['kyc-status'],
    queryFn: async () => {
      const res = await fetch('/api/verification-status')
      if (!res.ok) throw new Error(await res.text())
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
        credentials: 'include', // <-- add this!
      })

      if (!res.ok) {
        // try to surface the exact server-side reason
        let msg = 'Submission failed'
        try {
          const body = await res.json()
          msg = body?.error ?? JSON.stringify(body)
        } catch {
          msg = res.statusText
        }
        throw new Error(msg)
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['kyc-status'] }),
  })
}
