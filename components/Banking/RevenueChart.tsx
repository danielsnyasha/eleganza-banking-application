"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

// Starting data (can be replaced by props/fetch if needed)
const baseData = [
  { name: "Jan", value: 10 },
  { name: "Feb", value: 13 },
  { name: "Mar", value: 15 },
  { name: "Apr", value: 9 },
  { name: "May", value: 7 },
  { name: "Jun", value: 20 },
  { name: "Jul", value: 17 },
  { name: "Aug", value: 14 },
  { name: "Sep", value: 19 },
  { name: "Oct", value: 10 },
  { name: "Nov", value: 8 },
  { name: "Dec", value: 6 },
];

// Optionally, highlight the current or last month
const highlightIndex = new Date().getMonth();

export default function RevenueChart() {
  const [data, setData] = useState(baseData);

  // Animate chart: update values every 2 seconds (simulate live feed)
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) =>
        prev.map((item, idx) => ({
          ...item,
          // Randomly nudge each bar up or down, within a range
          value: Math.max(3, Math.min(25, item.value + Math.floor(Math.random() * 5 - 2))),
        }))
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-6 bg-[#fafdff] border border-[#e6effa] rounded-2xl shadow-sm w-full h-[340px] min-h-[320px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="font-semibold text-xl text-[#02152b]">Revenue Flow</div>
        <div className="flex gap-2 text-xs">
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded bg-[#00aaff]" /> Income
          </span>
          <span className="flex items-center gap-1 text-[#f59e42]">
            <span className="inline-block w-3 h-3 rounded bg-[#f59e42]" /> Highlight
          </span>
        </div>
      </div>
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={30}>
            <XAxis dataKey="name" stroke="#b7c7d6" tick={{ fontSize: 13 }} />
            <YAxis stroke="#b7c7d6" tick={{ fontSize: 13 }} />
            <Tooltip
              cursor={{ fill: "#e6f4ff33" }}
              contentStyle={{
                background: "#fafdff",
                border: "1px solid #e6effa",
                borderRadius: "8px",
                color: "#02152b",
              }}
            />
            <Bar dataKey="value">
              {data.map((entry, idx) => (
                <Cell
                  key={entry.name}
                  fill={
                    idx === highlightIndex
                      ? "#f59e42" // Orange highlight (for current/last month)
                      : "#00aaff"
                  }
                  radius={[10, 10, 0, 0]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
