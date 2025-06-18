"use client";
import StatCards        from "./StatCards";
import RevenueChart     from "./RevenueChart";
import EfficiencyPie    from "./EfficiencyPie";
import TransactionTable from "./TransactionTable";
import FiltersBar       from "./FiltersBar";

import MyWalletCard     from "./MyWalletCard";
import QuickTransfer    from "./QuickTransfer";
import CalendarCard     from "./CalendarCard";
import TeamChat         from "./TeamChat";
import MostLocationsCard from "./MostLocationsCard";   // map

export default function MainContent() {
  return (
    <section className="w-full max-w-[1800px] mx-auto flex flex-col gap-6 px-2 sm:px-4">
      {/* 2-column on xl / single-column below */}
      <div className="grid xl:grid-cols-[1fr_360px] gap-6">
        {/* ────────── LEFT COLUMN ────────── */}
        <div className="flex flex-col gap-6 min-w-0">
          <StatCards />

          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_320px]">
            <RevenueChart />
            <EfficiencyPie />
          </div>

          <FiltersBar />
          <TransactionTable />

          {/* Map card – only on ≥ xl so it fills the white strip */}
          <div className="hidden xl:block">
            <MostLocationsCard />
          </div>
        </div>

        {/* ────────── RIGHT SIDEBAR ───────── */}
<aside className="flex flex-col gap-6">
  <MyWalletCard />
  <QuickTransfer />

  {/* calendar + chat: 50-50 side-by-side on md-lg, stacked on xl */}
  <div className="flex flex-col md:flex-row xl:flex-col gap-6 w-full">
    <div className="flex-1 min-w-0">
      <CalendarCard />
    </div>
    <div className="flex-1 min-w-0">
      <TeamChat />
    </div>
  </div>
</aside>

      </div>
    </section>
  );
}
