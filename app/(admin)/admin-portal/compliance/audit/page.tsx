"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  FileEdit,
  User,
  Trash2,
  Eye,
  ShieldCheck,
  LogIn,
  LogOut,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

// Dummy audit data
const actions = [
  { label: "User Login", icon: <LogIn className="w-4 h-4 text-emerald-500" />, status: "Success" },
  { label: "User Logout", icon: <LogOut className="w-4 h-4 text-blue-500" />, status: "Success" },
  { label: "KYC Update", icon: <FileEdit className="w-4 h-4 text-yellow-500" />, status: "Success" },
  { label: "Password Change", icon: <ShieldCheck className="w-4 h-4 text-blue-700" />, status: "Success" },
  { label: "Delete User", icon: <Trash2 className="w-4 h-4 text-red-500" />, status: "Alert" },
  { label: "Edit Permissions", icon: <User className="w-4 h-4 text-indigo-500" />, status: "Success" },
  { label: "Approve Loan", icon: <CheckCircle2 className="w-4 h-4 text-emerald-700" />, status: "Success" },
  { label: "Reject Transaction", icon: <XCircle className="w-4 h-4 text-red-700" />, status: "Alert" },
  { label: "Database Export", icon: <Database className="w-4 h-4 text-amber-700" />, status: "Success" },
];

// Generate 25 logs
const logs = Array.from({ length: 25 }, (_, i) => {
  const actionIdx = Math.floor(Math.random() * actions.length);
  const userList = [
    { name: "Nyasha Daniels", avatar: "https://randomuser.me/api/portraits/men/19.jpg" },
    { name: "Wei Liu", avatar: "https://randomuser.me/api/portraits/men/75.jpg" },
    { name: "Anna Schmidt", avatar: "https://randomuser.me/api/portraits/women/64.jpg" },
    { name: "Lebo Mokoena", avatar: "https://randomuser.me/api/portraits/men/24.jpg" },
    { name: "Ayumi Tanaka", avatar: "https://randomuser.me/api/portraits/women/62.jpg" },
    { name: "David Smith", avatar: "https://randomuser.me/api/portraits/men/51.jpg" },
    { name: "Charlotte Müller", avatar: "https://randomuser.me/api/portraits/women/72.jpg" },
    { name: "James Williams", avatar: "https://randomuser.me/api/portraits/men/81.jpg" },
    { name: "Fatima Al-Farsi", avatar: "https://randomuser.me/api/portraits/women/91.jpg" },
    { name: "Mthokozisi Dube", avatar: "https://randomuser.me/api/portraits/men/33.jpg" },
  ];
  const user = userList[Math.floor(Math.random() * userList.length)];
  const action = actions[actionIdx];
  const status =
    action.status === "Alert"
      ? Math.random() > 0.3
        ? "Alert"
        : "Success"
      : action.status;
  const date = new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 72)
    .toISOString()
    .replace("T", " ")
    .slice(0, 16);
  return {
    id: "ALOG" + String(i + 1101).padStart(4, "0"),
    user: user.name,
    avatar: user.avatar,
    action: action.label,
    icon: action.icon,
    status,
    details: status === "Alert" ? "Requires review" : "Action completed",
    date,
  };
});

const statusColors: Record<string, string> = {
  Success: "bg-emerald-100 text-emerald-700",
  Alert: "bg-red-100 text-red-700",
};

const statusIcons: Record<string, JSX.Element> = {
  Success: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
  Alert: <XCircle className="w-4 h-4 text-red-600" />,
};

const actionTabs = ["All", "Success", "Alert"];

export default function AuditLogsPage() {
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = logs.filter(
    (log) =>
      (tab === "All" || log.status === tab) &&
      (log.user.toLowerCase().includes(search.toLowerCase()) ||
        log.action.toLowerCase().includes(search.toLowerCase()) ||
        log.id.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 w-full min-h-screen relative">
      {/* Top Banner */}
      <motion.section
        className="bg-gradient-to-r from-emerald-600 via-blue-500 to-yellow-400 rounded-2xl px-8 py-7 flex flex-col md:flex-row items-center gap-8 mb-10 shadow-xl"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex-1">
          <h1 className="text-2xl md:text-4xl font-black text-white mb-2 tracking-tight">
            Audit Logs & Security Events
          </h1>
          <p className="text-white/90 mb-2 max-w-2xl">
            Every action in the system is logged for compliance, transparency, and security.
            Review all critical events, permission changes, data exports, logins, deletions, and more.
            These logs support audits, investigations, and regulatory reporting.
          </p>
        </div>
        <ShieldCheck className="w-24 h-24 text-white/30 hidden md:block" />
      </motion.section>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-7">
        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl shadow border px-2 py-1 w-full md:w-auto overflow-x-auto">
          {actionTabs.map((s) => (
            <Button
              key={s}
              variant={tab === s ? "secondary" : "ghost"}
              className={`rounded-lg text-sm px-3 ${tab === s ? "text-emerald-900 bg-emerald-100 font-bold" : "text-gray-500"}`}
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
            placeholder="Search user, action, ID…"
            className="max-w-md"
            startIcon={<Search className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Table/List */}
      <section className="overflow-x-auto bg-white rounded-2xl shadow border">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-emerald-900 font-semibold border-b">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">User</th>
              <th className="py-3 px-4 text-left">Action</th>
              <th className="py-3 px-4 text-left">Details</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Options</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((log, i) => (
              <motion.tr
                key={log.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="hover:bg-emerald-50 border-b"
              >
                <td className="py-2 px-4 font-mono text-xs text-blue-700">{log.id}</td>
                <td className="py-2 px-4 flex items-center gap-2">
                  <img src={log.avatar} className="w-9 h-9 rounded-full border object-cover" alt={log.user} />
                  <span>
                    <div className="font-semibold text-emerald-800">{log.user}</div>
                  </span>
                </td>
                <td className="py-2 px-4 flex items-center gap-2">{log.icon} {log.action}</td>
                <td className="py-2 px-4">{log.details}</td>
                <td className="py-2 px-4">{log.date}</td>
                <td className="py-2 px-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded font-semibold text-xs ${statusColors[log.status]}`}>
                    {statusIcons[log.status]}
                    {log.status}
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
                        <Eye className="w-4 h-4 mr-2" /> View Log
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-700" /> Mark as Reviewed
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <XCircle className="w-4 h-4 mr-2 text-red-700" /> Flag for Audit
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </motion.tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-400">
                  No audit logs found for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Floating Tips */}
      <aside className="hidden lg:block fixed bottom-8 right-8 bg-gradient-to-br from-emerald-400 to-blue-400 shadow-2xl text-white rounded-2xl px-6 py-5 w-[350px] z-20 border-2 border-emerald-200/60">
        <div className="font-bold text-lg mb-1">Audit Log Guidelines</div>
        <ul className="text-xs leading-relaxed list-disc pl-4">
          <li>Review all alerts and flagged actions regularly.</li>
          <li>Export logs monthly for offsite backup and compliance.</li>
          <li>Follow up on any abnormal or suspicious activity immediately.</li>
          <li>Maintain logs for a minimum of 5 years.</li>
          <li>Never edit logs outside of system-approved workflows.</li>
        </ul>
      </aside>
    </main>
  );
}
