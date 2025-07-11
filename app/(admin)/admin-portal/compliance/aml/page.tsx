"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Flag,
  MoreHorizontal,
  Eye,
  Search,
  User,
  Globe2,
  Zap,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

// Dummy AML alerts
const alerts = [
  {
    id: "AML1001",
    user: "Thabo Maseko",
    avatar: "https://randomuser.me/api/portraits/men/24.jpg",
    nationality: "South African",
    category: "Large Transaction",
    details: "Transfer > $10,000",
    amount: 12000,
    currency: "USD",
    date: "2024-08-12 08:17",
    risk: 91,
    status: "Unresolved",
  },
  {
    id: "AML1002",
    user: "Wei Liu",
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
    nationality: "Chinese",
    category: "High-Risk Country",
    details: "Funds from sanctioned nation",
    amount: 4800,
    currency: "USD",
    date: "2024-08-12 10:31",
    risk: 82,
    status: "Escalated",
  },
  {
    id: "AML1003",
    user: "Ayumi Sato",
    avatar: "https://randomuser.me/api/portraits/women/37.jpg",
    nationality: "Japanese",
    category: "Unusual Pattern",
    details: "Multiple deposits in 24h",
    amount: 3000,
    currency: "USD",
    date: "2024-08-12 09:47",
    risk: 75,
    status: "Unresolved",
  },
  {
    id: "AML1004",
    user: "Charlotte Müller",
    avatar: "https://randomuser.me/api/portraits/women/34.jpg",
    nationality: "German",
    category: "Structuring",
    details: "3x transfers just below threshold",
    amount: 9800,
    currency: "USD",
    date: "2024-08-11 18:02",
    risk: 67,
    status: "False Positive",
  },
  {
    id: "AML1005",
    user: "James Williams",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    nationality: "American",
    category: "Rapid Outflow",
    details: "Funds sent to multiple accounts",
    amount: 5500,
    currency: "USD",
    date: "2024-08-11 13:54",
    risk: 81,
    status: "Resolved",
  },
  {
    id: "AML1006",
    user: "Fatima Al-Farsi",
    avatar: "https://randomuser.me/api/portraits/women/91.jpg",
    nationality: "UAE",
    category: "Large Transaction",
    details: "Deposit > $15,000",
    amount: 15500,
    currency: "USD",
    date: "2024-08-10 16:39",
    risk: 95,
    status: "Escalated",
  },
  {
    id: "AML1007",
    user: "Mthokozisi Dube",
    avatar: "https://randomuser.me/api/portraits/men/60.jpg",
    nationality: "Zimbabwean",
    category: "High-Risk Country",
    details: "Outgoing to restricted region",
    amount: 3200,
    currency: "USD",
    date: "2024-08-10 19:22",
    risk: 73,
    status: "Unresolved",
  },
];

// Status & Risk Helpers
const statusColors: Record<string, string> = {
  Unresolved: "bg-yellow-100 text-yellow-800",
  Resolved: "bg-emerald-100 text-emerald-700",
  Escalated: "bg-blue-100 text-blue-700",
  "False Positive": "bg-gray-100 text-gray-700",
};

const statusIcons: Record<string, JSX.Element> = {
  Unresolved: <AlertTriangle className="w-4 h-4 mr-1 text-yellow-500" />,
  Resolved: <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" />,
  Escalated: <Flag className="w-4 h-4 mr-1 text-blue-500" />,
  "False Positive": <XCircle className="w-4 h-4 mr-1 text-gray-500" />,
};

const statusTabs = ["All", "Unresolved", "Resolved", "Escalated", "False Positive"];

function riskBadge(score: number) {
  let color = "bg-emerald-100 text-emerald-700";
  if (score >= 90) color = "bg-red-100 text-red-700 font-bold animate-pulse";
  else if (score >= 80) color = "bg-orange-100 text-orange-700 font-semibold";
  else if (score >= 70) color = "bg-yellow-100 text-yellow-700";
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${color}`}>
      <ShieldAlert className="w-4 h-4" /> {score}
    </span>
  );
}

export default function AmlAlertsPage() {
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");

  // Filter logic
  const filtered = alerts.filter(
    (a) =>
      (tab === "All" || a.status === tab) &&
      (a.user.toLowerCase().includes(search.toLowerCase()) ||
        a.nationality.toLowerCase().includes(search.toLowerCase()) ||
        a.id.includes(search) ||
        a.category.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 w-full min-h-screen relative">
      {/* Banner */}
      <motion.section
        className="bg-gradient-to-r from-red-600 via-yellow-500 to-blue-700 rounded-2xl px-8 py-7 flex flex-col md:flex-row items-center gap-8 mb-10 shadow-xl"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex-1">
          <h1 className="text-2xl md:text-4xl font-black text-white mb-2 tracking-tight">
            AML Alerts & Monitoring
          </h1>
          <p className="text-white/90 mb-2 max-w-2xl">
            Detect, review, and resolve potential anti-money laundering (AML) cases. 
            All flagged alerts require investigation, escalation, or resolution for compliance and audit.
          </p>
        </div>
        <Zap className="w-24 h-24 text-white/30 hidden md:block" />
      </motion.section>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-7">
        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl shadow border px-2 py-1 w-full md:w-auto overflow-x-auto">
          {statusTabs.map((s) => (
            <Button
              key={s}
              variant={tab === s ? "secondary" : "ghost"}
              className={`rounded-lg text-sm px-3 ${tab === s ? "text-red-900 bg-red-100 font-bold" : "text-gray-500"}`}
              onClick={() => setTab(s)}
            >
              {s}
            </Button>
          ))}
        </div>
        {/* Search */}
        <div className="flex-1">
          <Input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search user, alert, category…"
            className="max-w-md"
            startIcon={<Search className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* List/Table */}
      <section className="overflow-x-auto bg-white rounded-2xl shadow border">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-red-900 font-semibold border-b">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">User</th>
              <th className="py-3 px-4 text-left">Nationality</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Details</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Risk Score</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a, i) => (
              <motion.tr
                key={a.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="hover:bg-yellow-50 border-b"
              >
                <td className="py-2 px-4 font-mono text-xs text-blue-700">{a.id}</td>
                <td className="py-2 px-4 flex items-center gap-2">
                  <img src={a.avatar} className="w-10 h-10 rounded-full border object-cover" alt={a.user} />
                  <span>
                    <div className="font-semibold text-red-800">{a.user}</div>
                  </span>
                </td>
                <td className="py-2 px-4">{a.nationality}</td>
                <td className="py-2 px-4">{a.category}</td>
                <td className="py-2 px-4">{a.details}</td>
                <td className="py-2 px-4 font-mono text-blue-700">${a.amount.toLocaleString()} <span className="text-xs text-gray-400">{a.currency}</span></td>
                <td className="py-2 px-4">{riskBadge(a.risk)}</td>
                <td className="py-2 px-4">{a.date}</td>
                <td className="py-2 px-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded font-semibold text-xs ${statusColors[a.status]}`}>
                    {statusIcons[a.status]}
                    {a.status}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <MoreHorizontal className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" /> Review
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-700" /> Resolve
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Flag className="w-4 h-4 mr-2 text-blue-700" /> Escalate
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <XCircle className="w-4 h-4 mr-2 text-gray-700" /> Mark as False Positive
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </motion.tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={10} className="py-8 text-center text-gray-400">
                  No AML alerts found for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Floating AML Tips */}
      <aside className="hidden lg:block fixed bottom-8 right-8 bg-gradient-to-br from-red-400 to-blue-400 shadow-2xl text-white rounded-2xl px-6 py-5 w-[340px] z-20 border-2 border-red-200/60">
        <div className="font-bold text-lg mb-1">AML Alert Guidelines</div>
        <ul className="text-xs leading-relaxed list-disc pl-4">
          <li>Investigate all high-risk alerts thoroughly.</li>
          <li>Escalate suspicious transactions to the compliance team.</li>
          <li>Document all actions and resolutions for audit.</li>
          <li>Keep abreast of the latest AML regulations.</li>
        </ul>
      </aside>
    </main>
  );
}
