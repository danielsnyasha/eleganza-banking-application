"use client";
import { Card } from "@/components/ui/card";
import { TrendingUp, DollarSign } from "lucide-react";

const statData = [
  {
    label: "Total Earnings",
    value: "$7,245.00",
    icon: <TrendingUp className="w-5 h-5 text-green-500" />,
    growth: "+3.5% from last week",
    chart: true, // for mini chart preview (optional)
  },
  {
    label: "Total Spending",
    value: "$7,245.00",
    icon: <DollarSign className="w-5 h-5 text-red-400" />,
    growth: "+3.5% from last week",
    chart: true,
  },
  {
    label: "Spending Goal",
    value: "$7,245.00",
    icon: <DollarSign className="w-5 h-5 text-yellow-500" />,
    growth: "+3.5% from last week",
    chart: true,
  },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {statData.map((item) => (
        <Card
          key={item.label}
          className="flex flex-col bg-[#fafdff] border border-[#e6effa] p-5 rounded-2xl shadow-sm"
        >
          <div className="flex items-center gap-3 mb-1">
            {item.icon}
            <span className="text-sm font-medium text-[#02152b]">{item.label}</span>
          </div>
          <div className="text-2xl font-bold text-[#02152b]">{item.value}</div>
          <span className="text-xs text-[#4bc18c]">{item.growth}</span>
          {/* Optionally, show a sparkline or mini-chart here */}
        </Card>
      ))}
    </div>
  );
}
