/* app/api/loans/my-applications/route.ts
   — returns ALL loan apps with proper product & projections            */

   import { NextResponse } from 'next/server';
   import { prisma }       from '@/lib/prisma';
   
   /* ── amortisation schedule (outstanding principal) ─────────────────── */
   function buildSchedule(P: number, rAnnual: number, n: number) {
     const r    = rAnnual / 100 / 12;                    // monthly nominal -
     const pmt  = r === 0 ? P / n                       // annuity formula
                 : P * (r * (1 + r) ** n) / ((1 + r) ** n - 1);
   
     return Array.from({ length: n + 1 }).map((_, m) => {
       /* remaining balance after m payments                                    */
       const bal = r === 0
         ? P - pmt * m
         : P * ((1 + r) ** n - (1 + r) ** m) / ((1 + r) ** n - 1);
   
       return {
         label: new Date(Date.now() + m * 30 * 86_400_000).toISOString(),
         value: +bal.toFixed(2),                       // OUTSTANDING principal
       };
     });
   }
   
   /* ─────────────────────────────────────────────────────────────────────── */
   export async function GET() {
    const raw = await prisma.loanApplication.findMany({
      orderBy: { submittedAt: 'desc' },
      include: {
        /* FULL product shape – every field your LoanProductDTO expects   */
        product: {
          select: {
            id: true, slug: true, name: true,
            shortDescription: true, purpose: true,
            currency: true, maxAmount: true, minAmount: true,
            annualRatePct: true, termMonths: true, feePct: true,
            images: true, isActive: true,
            createdAt: true, updatedAt: true,
          },
        },
      },
    });
  
    const enriched = await Promise.all(
      raw.map(async (a) => {
        let product = a.product;
  
        if (!product) {
          product = await prisma.loanProduct.findFirst({
            where: { slug: a.slug },
            /* same full select                                        */
            select: {
              id: true, slug: true, name: true,
              shortDescription: true, purpose: true,
              currency: true, maxAmount: true, minAmount: true,
              annualRatePct: true, termMonths: true, feePct: true,
              images: true, isActive: true,
              createdAt: true, updatedAt: true,
            },
          });
        }
  
        const ratePct = product?.annualRatePct ?? 0;
        const months  = product?.termMonths    ?? 12;
  
        const monthPoints = buildSchedule(a.amount, ratePct, months);
        const yearPoints  = monthPoints.filter((_, i) => i % 12 === 0);
  
        return {
          ...a,
          product,           // now matches LoanProductDTO
          ratePct,
          monthPoints,
          yearPoints,
        };
      }),
    );
  
    return NextResponse.json(enriched);
  }