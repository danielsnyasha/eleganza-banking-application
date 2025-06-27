/* app/admin-portal/investments/applications/page.tsx */
'use client';

import { useAdminApps } from '@/hooks/admin-investment-applications';
import ApplicationRow from '@/components/AdminPortal/Investments/ApplicationRow';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function InvestmentApplicationsAdmin() {
  const { data = [], isLoading, isError } = useAdminApps();
  const [search, setSearch] = useState('');

  const q = search.toLowerCase();
  const filtered = data.filter((a) => {
    const productName = a.product?.name ?? a.slug;
    return (
      productName.toLowerCase().includes(q) ||
      a.userId.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Investment Applications</h1>

      <Input
        placeholder="Search by product or user ID…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      {isLoading && <p>Loading…</p>}
      {isError   && <p className="text-red-500">Failed to fetch data.</p>}

      {!isLoading && !isError && (
        <div className="overflow-x-auto border rounded-xl">
          <table className="min-w-full text-sm">
            <thead className="bg-neutral-50 text-left">
              <tr>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <ApplicationRow key={app.id} app={app} />
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-neutral-500">
                    No applications match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
