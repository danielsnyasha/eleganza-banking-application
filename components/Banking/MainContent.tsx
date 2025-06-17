// app/(banking)/banking/components/MainContent.tsx
"use client";
import StatCards from "./StatCards";
import RevenueChart from "./RevenueChart";
import EfficiencyPie from "./EfficiencyPie";
import TransactionTable from "./TransactionTable";
import FiltersBar from "./FiltersBar";

import QuickTransfer from "./QuickTransfer";
import TeamChat from "./TeamChat";
import CalendarCard from "./CalendarCard";
import MyWalletCard from "./MyWalletCard";
// import MostLocationCard from "./MostLocationCard";
// import TaskSummary from "./TaskSummary";

export default function MainContent() {
  return (
    <section className="flex flex-col gap-6">
      {/* Top stats cards */}
      <StatCards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main chart and efficiency */}
        <div className="col-span-2 flex flex-col gap-6">
          <RevenueChart />
          <FiltersBar />
          <TransactionTable />
        </div>
        {/* Sidebar cards */}
        <div className="flex flex-col gap-6 min-w-[330px]">
          <MyWalletCard />
          <QuickTransfer />
          <CalendarCard />
          <TeamChat />
        </div>
      </div>
    </section>
  );
}
