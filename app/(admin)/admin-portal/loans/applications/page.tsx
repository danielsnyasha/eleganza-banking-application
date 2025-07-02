'use client';
import { useAdminLoanApps } from '@/hooks/admin-loan-applications';
import LoanApplicationRow   from '@/components/AdminPortal/Loans/ApplicationRow';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Loader2 } from 'lucide-react';

export default function LoanApplicationsAdmin() {
  const { data, isLoading, error } = useAdminLoanApps();

  if (isLoading) {
    return (
      <div className="flex justify-center pt-20">
        <Loader2 className="animate-spin h-6 w-6 text-[#0056B6]" />
      </div>
    );
  }
  if (error) {
    return <p className="text-center text-red-500">{error.message}</p>;
  }

  return (
    <div className="space-y-8">
      {/* banner (same style as Investments list) */}
      <section className="rounded-xl bg-gradient-to-r from-[#0056B6] to-[#0091FF] text-white p-6">
        <h1 className="text-2xl font-bold">Loan‑applications</h1>
        <p className="text-sm opacity-90 max-w-3xl">
          View, approve or cancel customer loan requests in real‑time.
        </p>
      </section>

      {/* table */}
      {(!data || data.length === 0) ? (
        <p className="text-center text-muted-foreground">No applications yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="hidden sm:table-cell">Purpose</TableHead>
                <TableHead className="hidden md:table-cell">Submitted</TableHead>
                <TableHead>Applicant</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((app) => (
                <LoanApplicationRow key={app.id} app={app} />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
