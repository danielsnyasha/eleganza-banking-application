"use client";
import StatCards       from "./StatCards";
import RevenueChart    from "./RevenueChart";
import EfficiencyPie   from "./EfficiencyPie";
import TransactionTable from "./TransactionTable";
import FiltersBar       from "./FiltersBar";

import QuickTransfer  from "./QuickTransfer";
import TeamChat       from "./TeamChat";
import CalendarCard   from "./CalendarCard";
import MyWalletCard   from "./MyWalletCard";

export default function MainContent() {
  return (
    <section className="w-full max-w-[1800px] mx-auto flex flex-col gap-6">
      {/* MAIN WRAPPER: 2-column on ≥ xl, single-column on smaller */}
      <div className="flex flex-col xl:flex-row gap-6 w-full">
        {/* ─────────── LEFT COLUMN ─────────── */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          {/* Top stats (Total Earnings / Spending / Goal) */}
          <StatCards />

          {/* Revenue + Efficiency side-by-side on ≥ md */}
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="flex-1 min-w-0">
              <RevenueChart />
            </div>
            <div className="w-full md:w-[340px] min-w-[260px] flex-shrink-0">
              <EfficiencyPie />
            </div>
          </div>

          {/* Filters bar + transaction table */}
          <FiltersBar />
          <TransactionTable />
        </div>

        {/* ─────────── RIGHT SIDEBAR ─────────── */}
        <aside className="w-full xl:w-[360px] flex-shrink-0 flex flex-col gap-6">
          <MyWalletCard />
          <QuickTransfer />
          <CalendarCard />
          <TeamChat />
        </aside>
      </div>
    </section>
  );
}
