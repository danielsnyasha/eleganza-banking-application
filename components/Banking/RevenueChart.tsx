"use client";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
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

export default function RevenueChart() {
  return (
    <Card className="p-6 bg-[#fafdff] border border-[#e6effa] rounded-2xl shadow-sm">
      <div className="font-semibold text-lg mb-3 text-[#02152b]">Revenue Flow</div>
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#cbd5e1" />
            <YAxis stroke="#cbd5e1" />
            <Tooltip />
            <Bar dataKey="value" fill="#00aaff" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
