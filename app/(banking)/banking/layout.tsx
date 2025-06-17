// app/(banking)/banking/layout.tsx
import Sidebar from "@/components/Banking/Sidebar";
import Topbar from "@/components/Banking/Topbar";
import React from "react";

export default function BankingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content with Topbar */}
      <div className="flex flex-col flex-1 min-w-0">
        <Topbar />
        <main className="flex flex-1 min-w-0">
          <section className="flex-1 p-4 overflow-y-auto">
            {children}
          </section>
        </main>
      </div>
    </div>
  );
}
