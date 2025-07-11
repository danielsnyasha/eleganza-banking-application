"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Phone,
  AlertCircle,
  UserCircle2,
  ShieldCheck,
  Ticket,
  CircleDot,
  Hourglass,
  CheckCircle2,
  ArrowUpCircle,
  Search,
  User2,
} from "lucide-react";

// Dummy ticket data
const tickets = [
  {
    id: "TCK-1001",
    subject: "Unable to login",
    user: "Charlotte Müller",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    email: "charlotte.mueller@email.com",
    channel: "Email",
    date: "2024-08-07 11:02",
    status: "Open",
    priority: "High",
    category: "Account Access",
    assigned: "John Smith",
  },
  {
    id: "TCK-1002",
    subject: "Bank card not received",
    user: "Lin Wei",
    avatar: "https://randomuser.me/api/portraits/men/92.jpg",
    email: "lin.wei@email.com",
    channel: "Phone",
    date: "2024-08-07 10:18",
    status: "In Progress",
    priority: "Medium",
    category: "Cards",
    assigned: "—",
  },
  {
    id: "TCK-1003",
    subject: "Suspicious account activity",
    user: "Ayumi Tanaka",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    email: "ayumi.tanaka@email.com",
    channel: "Email",
    date: "2024-08-07 09:42",
    status: "Escalated",
    priority: "Urgent",
    category: "Fraud & Security",
    assigned: "David Ncube",
  },
  {
    id: "TCK-1004",
    subject: "App crash on payments",
    user: "Jabulani Dube",
    avatar: "https://randomuser.me/api/portraits/men/23.jpg",
    email: "jabulani.dube@email.com",
    channel: "In-App",
    date: "2024-08-07 09:27",
    status: "Open",
    priority: "Medium",
    category: "Mobile App",
    assigned: "—",
  },
  {
    id: "TCK-1005",
    subject: "Incorrect balance displayed",
    user: "Mike Olsen",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    email: "mike.olsen@email.com",
    channel: "Email",
    date: "2024-08-07 08:50",
    status: "Closed",
    priority: "Low",
    category: "Accounts",
    assigned: "Sarah Park",
  },
  {
    id: "TCK-1006",
    subject: "International payment delay",
    user: "Tendai Ncube",
    avatar: "https://randomuser.me/api/portraits/men/31.jpg",
    email: "tendai.ncube@email.com",
    channel: "Email",
    date: "2024-08-07 08:12",
    status: "In Progress",
    priority: "High",
    category: "Payments",
    assigned: "John Smith",
  },
  {
    id: "TCK-1007",
    subject: "Unable to update contact details",
    user: "Elena Petrova",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
    email: "elena.petrova@email.com",
    channel: "Phone",
    date: "2024-08-07 08:00",
    status: "Open",
    priority: "Low",
    category: "Profile & Settings",
    assigned: "—",
  },
  {
    id: "TCK-1008",
    subject: "Mobile deposit not reflecting",
    user: "Wei Zhang",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    email: "wei.zhang@email.com",
    channel: "In-App",
    date: "2024-08-07 07:45",
    status: "Escalated",
    priority: "Urgent",
    category: "Deposits",
    assigned: "David Ncube",
  },
];

// Status summary data
const statusSummary = [
  {
    label: "Open",
    count: tickets.filter((t) => t.status === "Open").length,
    color: "bg-emerald-200 text-emerald-800",
    icon: <CircleDot className="w-6 h-6 text-emerald-600" />,
  },
  {
    label: "In Progress",
    count: tickets.filter((t) => t.status === "In Progress").length,
    color: "bg-blue-200 text-blue-800",
    icon: <Hourglass className="w-6 h-6 text-blue-500" />,
  },
  {
    label: "Closed",
    count: tickets.filter((t) => t.status === "Closed").length,
    color: "bg-gray-200 text-gray-800",
    icon: <CheckCircle2 className="w-6 h-6 text-gray-500" />,
  },
  {
    label: "Escalated",
    count: tickets.filter((t) => t.status === "Escalated").length,
    color: "bg-yellow-200 text-yellow-900",
    icon: <ArrowUpCircle className="w-6 h-6 text-yellow-600" />,
  },
];

function statusBadge(status: string) {
  if (status === "Open")
    return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-medium"><CircleDot className="w-4 h-4" /> {status}</span>;
  if (status === "In Progress")
    return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-medium"><Hourglass className="w-4 h-4 animate-pulse" /> {status}</span>;
  if (status === "Escalated")
    return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 text-xs font-medium"><ArrowUpCircle className="w-4 h-4 animate-bounce" /> {status}</span>;
  return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gray-100 text-gray-800 text-xs font-medium"><CheckCircle2 className="w-4 h-4" /> {status}</span>;
}

function priorityBadge(priority: string) {
  if (priority === "Urgent")
    return <span className="px-2 py-0.5 bg-red-200 text-red-800 rounded text-xs font-semibold">Urgent</span>;
  if (priority === "High")
    return <span className="px-2 py-0.5 bg-yellow-200 text-yellow-800 rounded text-xs font-semibold">High</span>;
  if (priority === "Medium")
    return <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-semibold">Medium</span>;
  return <span className="px-2 py-0.5 bg-gray-200 text-gray-800 rounded text-xs font-semibold">Low</span>;
}

export default function SupportTicketsPage() {
  const [search, setSearch] = useState("");

  // Filter by user or subject or id
  const filtered = tickets.filter(
    (t) =>
      t.user.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 w-full relative min-h-screen">
      {/* Header Banner */}
      <motion.section
        className="bg-gradient-to-r from-emerald-600 via-blue-500 to-yellow-400 rounded-2xl px-8 py-7 flex flex-col md:flex-row items-center gap-8 mb-10 shadow-xl"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
            Support Tickets & Issue Tracking
          </h1>
          <p className="text-white/90 mb-2 max-w-2xl">
            View and manage all customer and internal support tickets for Eleganza Bank. Assign, escalate, or close issues—ensure timely, effective resolution and compliance with service standards.
          </p>
        </div>
        <Ticket className="w-24 h-24 text-white/30 hidden md:block" />
      </motion.section>

      {/* Status Cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
        {statusSummary.map((s, i) => (
          <motion.div
            key={s.label}
            className={`rounded-xl shadow flex flex-col items-center px-5 py-6 border ${s.color} font-semibold`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
          >
            {s.icon}
            <div className="text-lg mt-2">{s.label}</div>
            <div className="text-3xl font-black">{s.count}</div>
          </motion.div>
        ))}
      </section>

      {/* Search & filter */}
      <section className="mb-6 flex items-center gap-4">
        <Input
          placeholder="Search by name, subject or ticket ID"
          className="w-full max-w-sm bg-white border border-blue-100"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button size="sm" className="bg-emerald-600 text-white hover:bg-emerald-700 flex items-center gap-1">
          <Search className="w-4 h-4" /> Search
        </Button>
      </section>

      {/* Tickets Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow border">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="py-2 px-3 text-left">Ticket</th>
              <th className="py-2 px-3 text-left">User</th>
              <th className="py-2 px-3 text-left">Subject</th>
              <th className="py-2 px-3 text-left">Priority</th>
              <th className="py-2 px-3 text-left">Status</th>
              <th className="py-2 px-3 text-left">Channel</th>
              <th className="py-2 px-3 text-left">Assigned</th>
              <th className="py-2 px-3 text-left">Date</th>
              <th className="py-2 px-3 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="hover:bg-emerald-50 transition">
                <td className="py-2 px-3 font-mono text-blue-700">{t.id}</td>
                <td className="py-2 px-3 flex items-center gap-2">
                  <img src={t.avatar} className="w-8 h-8 rounded-full border-2 border-blue-200 object-cover" alt={t.user} />
                  <span>{t.user}</span>
                </td>
                <td className="py-2 px-3">{t.subject}</td>
                <td className="py-2 px-3">{priorityBadge(t.priority)}</td>
                <td className="py-2 px-3">{statusBadge(t.status)}</td>
                <td className="py-2 px-3">{t.channel}</td>
                <td className="py-2 px-3">
                  {t.assigned === "—" ? (
                    <span className="text-xs text-gray-400">Unassigned</span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <User2 className="w-4 h-4 text-blue-400" />
                      {t.assigned}
                    </span>
                  )}
                </td>
                <td className="py-2 px-3">{t.date}</td>
                <td className="py-2 px-3 flex gap-1">
                  <Button size="sm" className="bg-blue-100 text-blue-700 font-semibold px-2 py-1 rounded" variant="ghost">
                    Assign
                  </Button>
                  <Button size="sm" className="bg-emerald-100 text-emerald-700 font-semibold px-2 py-1 rounded" variant="ghost">
                    Close
                  </Button>
                  <Button size="sm" className="bg-yellow-100 text-yellow-700 font-semibold px-2 py-1 rounded" variant="ghost">
                    Escalate
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Floating Info Box */}
      <aside className="fixed bottom-8 right-8 bg-gradient-to-br from-emerald-400 to-blue-400 shadow-2xl text-white rounded-2xl px-6 py-5 w-[340px] z-20 border-2 border-emerald-200/60 hidden lg:block">
        <div className="font-bold text-lg mb-1">Support Best Practices</div>
        <ul className="text-xs leading-relaxed list-disc pl-4">
          <li>Respond to urgent/escalated tickets within 1 hour.</li>
          <li>Document all interactions in the ticket log.</li>
          <li>Assign unresolved tickets before shift end.</li>
          <li>Use templates for common issues to improve speed & quality.</li>
          <li>Escalate fraud, KYC or security tickets immediately.</li>
        </ul>
      </aside>
    </main>
  );
}
