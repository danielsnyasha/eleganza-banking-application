// components/Loans/LoansGrid.tsx
import { prisma } from '@/lib/prisma';
import LoanCard from './LoanCard';
import type { LoanProductDTO } from '@/types/loan';

export default async function LoansGrid() {
  // Direct database call, no HTTP needed
  const data: LoanProductDTO[] = await prisma.loanProduct.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      slug: true,
      name: true,
      shortDescription: true,
      purpose: true,
      currency: true,
      minAmount: true,
      maxAmount: true,
      annualRatePct: true,
      termMonths: true,
      feePct: true,
      images: true,
      createdAt: true, // ← this line was missing, added now
    },
  });

  return (
    <div className="space-y-10">
      {/* banner */}
      <section className="rounded-xl bg-gradient-to-r from-[#0056B6] to-[#0091FF] text-white p-6">
        <h1 className="text-2xl font-bold">Loan Marketplace</h1>
        <p className="text-sm opacity-90 max-w-2xl">
          Explore tailored loan solutions for homes, vehicles, education,
          business expansion, and more. Click a product to view terms or apply.
        </p>
      </section>

      {/* grid */}
      {data.length === 0 ? (
        <p className="text-center text-muted-foreground">No loan products.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((loan) => (
            <LoanCard key={loan.id} loan={loan} />
          ))}
        </div>
      )}
    </div>
  );
}
