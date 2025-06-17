"use client";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const pieData = [
  { name: "Goal", value: 20, color: "#4bc18c" },
  { name: "Spending", value: 35, color: "#ffd166" },
  { name: "Others", value: 45, color: "#e6effa" },
];

export default function EfficiencyPie() {
  return (
    <Card className="p-6 bg-[#fafdff] border border-[#e6effa] rounded-2xl shadow-sm">
      <div className="font-semibold text-lg mb-3 text-[#02152b]">Efficiency</div>
      <div className="flex items-center justify-between">
        <div className="w-32 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={50}
                innerRadius={30}
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="ml-4 space-y-1">
          {pieData.map((d) => (
            <div key={d.name} className="flex items-center gap-2 text-sm">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: d.color }}
              />
              {d.name}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
