// app/(banking)/banking/components/MainContent.tsx
"use client";
import { Card } from "@/components/ui/card";

export default function MainContent() {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold"></h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">Total Earnings</Card>
        <Card className="p-4">Total Spending</Card>
        <Card className="p-4">Spending Goal</Card>
      </div>
      <div className="mt-4">
        <Card className="p-6 h-64">[Charts, tables, etc. go here]</Card>
      </div>
    </section>
  );
}
