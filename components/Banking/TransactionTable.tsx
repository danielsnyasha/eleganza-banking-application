"use client";
import { Card } from "@/components/ui/card";

const rows = [
  {
    name: "Devon Lane",
    email: "devon@mail.com",
    location: "Philadelphia, USA",
    spent: "$101.00",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Bessie Cooper",
    email: "bessie@mail.com",
    location: "Philadelphia, USA",
    spent: "$101.00",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Dianne Russell",
    email: "dianne@mail.com",
    location: "Philadelphia, USA",
    spent: "$101.00",
    avatar: "https://randomuser.me/api/portraits/women/46.jpg",
  },
];

export default function TransactionTable() {
  return (
    <Card className="mt-2 p-4 bg-[#fafdff] border border-[#e6effa] rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-semibold text-[#02152b]">Transactions</span>
        {/* Add filters, date pickers, etc. */}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-xs text-[#7896ad]">
              <th className="px-2 py-2 text-left">Customer</th>
              <th className="px-2 py-2 text-left">Email</th>
              <th className="px-2 py-2 text-left">Location</th>
              <th className="px-2 py-2 text-left">Spent</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="border-t border-[#e6effa]">
                <td className="flex items-center gap-2 py-2 px-2">
                  <img
                    src={row.avatar}
                    alt={row.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  {row.name}
                </td>
                <td className="py-2 px-2">{row.email}</td>
                <td className="py-2 px-2">{row.location}</td>
                <td className="py-2 px-2 font-semibold">{row.spent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
