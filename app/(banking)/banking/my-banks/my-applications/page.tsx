/* Server Component – fetches nothing, simply mounts the client grid */
import dynamic from 'next/dynamic';

export const revalidate = 60;               // same re‑valid window as investments

/* ⚡  avoids Chart.js being bundled in the initial HTML */
const MyLoanApplications = dynamic(
  () => import('@/components/Loans/MyLoanApplications'),
  { ssr: false },
);

export default function MyLoanAppsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 pb-24 space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">My Loan Applications</h1>
        <p className="text-muted-foreground">
          Track your pending and approved loans, plus year‑by‑year projections.
        </p>
      </header>

      <MyLoanApplications />
    </main>
  );
}
