'use client';

import { Card } from "@/components/ui/card";
import { TrendingUp, DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Stats {
  balance: number;
  currency: string;
  totalEarnings: number;
  totalSpending: number;
}

export default function StatCards() {
  const { data, isLoading, isError, error } = useQuery<Stats, Error>({
    queryKey: ['stats'],
    queryFn: async () => {
      const res = await fetch('/api/stats');
      if (!res.ok) throw new Error('Failed to load stats');
      return res.json() as Promise<Stats>;
    }
  });

  if (isLoading) return <p>Loading stats...</p>;
  if (isError) return <p>Error loading stats: {error.message}</p>;
  if (!data) return <p>No stats available</p>;

  const statData = [
    {
      label: "Current Balance",
      value: `${data.currency} ${data.balance.toFixed(2)}`,
      icon: <DollarSign className="w-5 h-5 text-green-500" />,
      growth: "", // you can compute this if you want
      chart: false,
    },
    {
      label: "Total Earnings",
      value: `${data.currency} ${data.totalEarnings.toFixed(2)}`,
      icon: <TrendingUp className="w-5 h-5 text-blue-500" />,
      growth: "",
      chart: false,
    },
    {
      label: "Total Spending",
      value: `${data.currency} ${data.totalSpending.toFixed(2)}`,
      icon: <TrendingUp className="w-5 h-5 text-red-500" />,
      growth: "",
      chart: false,
    },
  ];

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
        </Card>
      ))}
    </div>
  );
}
