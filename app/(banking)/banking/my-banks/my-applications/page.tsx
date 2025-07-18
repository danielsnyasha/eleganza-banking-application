/* app/(banking)/banking/my-banks/my-applications/page.tsx */
'use client';

import MyLoanApplications from '@/components/Loans/MyLoanApplications';

export default function MyLoanAppsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 pb-24 space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">My Loan Applications</h1>
        <p className="text-muted-foreground">
          Track your pending and approved loans, plus year-by-year projections.
        </p>
      </header>

      <MyLoanApplications />
    </main>
  );
}
