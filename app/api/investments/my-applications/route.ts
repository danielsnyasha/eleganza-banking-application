/* app/api/investments/my-applications/route.ts
   – simple, no auth, no cookies – Eleganza-style                        */

   import { NextRequest, NextResponse } from 'next/server';
   import { prisma } from '@/lib/prisma';
   
   /* risk delta by profile */
   const riskAdjust = { Low: -1, Moderate: 0, High: 2 } as const;
   
   export async function GET(_req: NextRequest) {
     // === 👇🏽 Remove all auth/cookie nonsense! Just fetch all for now
     const apps = await prisma.investmentApplication.findMany({
       orderBy: { submittedAt: 'desc' },
       include: {
         product: {
           select: {
             name: true,
             annualRatePct: true,
             minimumAmount: true,
             termDays: true,
             currency: true,
           },
         },
       },
     });
   
     // Compute projections (monthly, linear-interest)
     const data = apps.map((a) => {
       const ratePct =
         (a.product?.annualRatePct ?? 0) +
         ((riskAdjust as Record<string, number>)[a.risk] ?? 0);
   
       const termDays = a.product?.termDays ?? 365;
       const months = Math.max(1, Math.round(termDays / 30));
       const dailyRate = ratePct / 100 / 365;
   
       const points = Array.from({ length: months + 1 }, (_, m) => {
         const days = m * 30;
         const value = a.amount * (1 + dailyRate * Math.min(days, termDays));
         return {
           label: new Date(Date.now() + days * 86_400_000).toISOString(),
           value: +value.toFixed(2),
         };
       });
   
       return { ...a, ratePct, termDays, points };
     });
   
     return NextResponse.json(data);
   }
   