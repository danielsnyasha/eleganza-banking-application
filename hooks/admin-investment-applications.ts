/* hooks/admin-investment-applications.ts
   – strict, duplicate-free typings                                       */
   'use client';

   import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
   import { toast } from 'react-toastify';
   
   /* ---------- Data shape returned by /api/admin-portal/investments/applications ---------- */
   export interface InvestmentApp {
     /* core */
     id: string;
     userId: string;
   
     /* product / slug */
     slug: string;
     product: {
       name: string;
       annualRatePct: number;
       minimumAmount: number;
     } | null;
   
     /* application details */
     amount: number;
     currency: string;
     status: 'pending' | 'approved' | 'cancelled';
     submittedAt: string;
   
     /* applicant info stored on application */
     name: string;
     surname: string;
     email: string;
     risk: string;
   }
   
   /* ---------- query: list apps ---------- */
   export function useAdminApps() {
     return useQuery<InvestmentApp[]>({
       queryKey: ['invApps'],
       queryFn: async () => {
         const r = await fetch('/api/admin-portal/investments/applications');
         if (!r.ok) throw new Error('Failed to load applications');
         return r.json() as Promise<InvestmentApp[]>;
       },
       staleTime: 30_000,
     });
   }
   
   /* ---------- mutation: approve / cancel ---------- */
   export function useUpdateApp() {
     const qc = useQueryClient();
   
     return useMutation<
       InvestmentApp,             // success data
       Error,                      // error type
       { id: string; status: 'approved' | 'cancelled' } // variables
     >({
       mutationFn: async ({ id, status }) => {
         const r = await fetch(`/api/admin-portal/investments/applications/${id}`, {
           method: 'PATCH',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ status }),
         });
         if (!r.ok) throw new Error('Update failed');
         return r.json() as Promise<InvestmentApp>;
       },
       onSuccess: () => {
         toast.success('Status updated');
         qc.invalidateQueries({ queryKey: ['invApps'] });
       },
       onError: () => toast.error('Could not update'),
     });
   }
   