'use client';

import { useMyInvestments }   from '@/hooks/use-my-investments';
import ApplicationCard        from '@/components/Investments/ApplicationCard';
import { Skeleton }           from '@/components/ui/skeleton';

export default function MyApplications() {
  const { data = [], isLoading } = useMyInvestments();

  return (
    <div className="space-y-10 pb-20">
      {/* banner --------------------------------------------------- */}
      <section className="rounded-xl bg-gradient-to-r from-[#0056B6] to-[#0091FF] text-white p-6">
        <h1 className="text-2xl font-bold">My Investment Applications</h1>
        <p className="text-sm opacity-90 max-w-2xl">
          Track the progress of each request, view projected growth and stay
          informed while an application is pending approval.
        </p>
      </section>

      {/* grid ----------------------------------------------------- */}
      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-[260px] rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((a) => (
            <ApplicationCard key={a.id} app={a} />
          ))}
        </div>
      )}
    </div>
  );
}
