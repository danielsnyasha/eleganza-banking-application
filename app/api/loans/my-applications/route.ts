/* app/api/loans/my-applications/route.ts
   – returns ALL loan apps, enriched with amortisation points            */
   import { NextResponse } from 'next/server';
   import { prisma }       from '@/lib/prisma';
   import { loanAppInclude } from '@/prisma/loanApp.query';
   
   /* ------------------------------------------------ amortisation helper */
   function amortise(P: number, rAnnual: number, n: number) {
     const r    = (rAnnual / 100) / 12;                        // monthly rate
     const pmt  = r === 0 ? P / n
                           : P * (r * (1 + r) ** n) / ((1 + r) ** n - 1);
   
     let bal = P;
     const points = Array.from({ length: n + 1 }).map((_, m) => {
       // interest this month then principal
       if (m > 0) bal = bal * (1 + r) - pmt;
       return {
         label : new Date(Date.now() + m * 30 * 86_400_000).toISOString(),
         value : +(P - bal).toFixed(2),        // principal repaid so far
       };
     });
     return points;
   }
   
   /* -------------------------------------------------------------------- */
   export async function GET() {
     /* Pull **all** applications – no auth filter for demo */
     const apps = await prisma.loanApplication.findMany({
       orderBy: { submittedAt: 'desc' },
       include: loanAppInclude,
     });
   
     const enriched = apps.map(app => {
       const months     = app.product?.termMonths    ?? 12;
       const annualRate = app.product?.annualRatePct ?? 0;
   
       const monthPts = amortise(app.amount, annualRate, months);
       const yearPts  = monthPts.filter((_, i) => i % 12 === 0);
   
       return {
         ...app,
         ratePct     : annualRate,
         monthPoints : monthPts,
         yearPoints  : yearPts,
       };
     });
   
     return NextResponse.json(enriched);              // ← 200
   }
   