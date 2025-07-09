"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Eye,
  Search,
  ChevronDown,
  FileText,
  MoreHorizontal,
  User,
  Flag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

// Dummy KYC Requests
const kycList = [
  {
    id: "KYC001",
    name: "Takudzwa Moyo",
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    nationality: "Zimbabwean",
    account: "10029423",
    type: "Individual",
    status: "Pending",
    submitted: "2024-08-11",
    doc: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=160&q=80",
  },
  {
    id: "KYC002",
    name: "Anna Müller",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    nationality: "German",
    account: "10021211",
    type: "Business",
    status: "Approved",
    submitted: "2024-08-08",
    doc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=160&q=80",
  },
  {
    id: "KYC003",
    name: "Lungile Khoza",
    avatar: "https://randomuser.me/api/portraits/women/48.jpg",
    nationality: "South African",
    account: "10039517",
    type: "Individual",
    status: "Escalated",
    submitted: "2024-08-09",
    doc: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=160&q=80",
  },
  {
    id: "KYC004",
    name: "Wei Zhang",
    avatar: "https://randomuser.me/api/portraits/men/62.jpg",
    nationality: "Chinese",
    account: "10021213",
    type: "Individual",
    status: "Rejected",
    submitted: "2024-08-03",
    doc: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=160&q=80",
  },
  {
    id: "KYC005",
    name: "Emeka Okafor",
    avatar: "https://randomuser.me/api/portraits/men/19.jpg",
    nationality: "Nigerian",
    account: "10024097",
    type: "Business",
    status: "Pending",
    submitted: "2024-08-12",
    doc: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=160&q=80",
  },
  {
    id: "KYC006",
    name: "Sakura Tanaka",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    nationality: "Japanese",
    account: "10029999",
    type: "Individual",
    status: "Pending",
    submitted: "2024-08-12",
    doc: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=160&q=80",
  },
];

// Status Color Helper
const statusColors: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Approved: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-red-100 text-red-700",
  Escalated: "bg-blue-100 text-blue-700",
};

const statusIcons: Record<string, JSX.Element> = {
  Pending: <AlertTriangle className="w-4 h-4 mr-1 text-yellow-500" />,
  Approved: <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" />,
  Rejected: <XCircle className="w-4 h-4 mr-1 text-red-600" />,
  Escalated: <Flag className="w-4 h-4 mr-1 text-blue-500" />,
};

const statusTabs = ["All", "Pending", "Approved", "Rejected", "Escalated"];

export default function KycReviewPage() {
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");

  // Filter by tab and search
  const filtered = kycList.filter(
    (k) =>
      (tab === "All" || k.status === tab) &&
      (k.name.toLowerCase().includes(search.toLowerCase()) ||
        k.account.includes(search) ||
        k.nationality.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 w-full min-h-screen relative">
      {/* Banner */}
      <motion.section
        className="bg-gradient-to-r from-blue-800 via-emerald-700 to-yellow-400 rounded-2xl px-8 py-7 flex flex-col md:flex-row items-center gap-8 mb-10 shadow-xl"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex-1">
          <h1 className="text-2xl md:text-4xl font-black text-white mb-2 tracking-tight">
            KYC Review & Compliance
          </h1>
          <p className="text-white/90 mb-2 max-w-2xl">
            Review customer and business KYC submissions for regulatory compliance.
            Approve, escalate, or reject based on document and identity verification. All actions are logged for audit and security.
          </p>
        </div>
        <FileText className="w-24 h-24 text-white/20 hidden md:block" />
      </motion.section>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-7">
        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl shadow border px-2 py-1 w-full md:w-auto overflow-x-auto">
          {statusTabs.map((s) => (
            <Button
              key={s}
              variant={tab === s ? "secondary" : "ghost"}
              className={`rounded-lg text-sm px-3 ${tab === s ? "text-emerald-800 bg-emerald-100 font-bold" : "text-gray-500"}`}
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
            placeholder="Search user, account, or nationality…"
            className="max-w-md"
            startIcon={<Search className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* List/Table */}
      <section className="overflow-x-auto bg-white rounded-2xl shadow border">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-emerald-900 font-semibold border-b">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">User</th>
              <th className="py-3 px-4 text-left">Nationality</th>
              <th className="py-3 px-4 text-left">Account</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Submitted</th>
              <th className="py-3 px-4 text-left">Document</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((k, i) => (
              <motion.tr
                key={k.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="hover:bg-emerald-50 border-b"
              >
                <td className="py-2 px-4 font-mono text-xs text-blue-700">{k.id}</td>
                <td className="py-2 px-4 flex items-center gap-2">
                  <img src={k.avatar} className="w-10 h-10 rounded-full border object-cover" alt={k.name} />
                  <span>
                    <div className="font-semibold text-emerald-800">{k.name}</div>
                    <div className="text-xs text-gray-500">{k.account}</div>
                  </span>
                </td>
                <td className="py-2 px-4">{k.nationality}</td>
                <td className="py-2 px-4">{k.account}</td>
                <td className="py-2 px-4">{k.type}</td>
                <td className="py-2 px-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded font-semibold text-xs ${statusColors[k.status]}`}>
                    {statusIcons[k.status]}
                    {k.status}
                  </span>
                </td>
                <td className="py-2 px-4">{k.submitted}</td>
                <td className="py-2 px-4">
                  <a href={k.doc} target="_blank" rel="noopener noreferrer">
                    <img src={k.doc} alt="KYC Doc" className="w-12 h-12 object-cover rounded-lg border shadow" />
                  </a>
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
                        <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-700" /> Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <XCircle className="w-4 h-4 mr-2 text-red-700" /> Reject
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Flag className="w-4 h-4 mr-2 text-blue-700" /> Escalate
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </motion.tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="py-8 text-center text-gray-400">
                  No records found for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Floating Compliance Tips */}
      <aside className="hidden lg:block fixed bottom-8 right-8 bg-gradient-to-br from-emerald-400 to-blue-400 shadow-2xl text-white rounded-2xl px-6 py-5 w-[340px] z-20 border-2 border-emerald-200/60">
        <div className="font-bold text-lg mb-1">KYC Compliance Tips</div>
        <ul className="text-xs leading-relaxed list-disc pl-4">
          <li>Review documents for authenticity and clarity.</li>
          <li>Confirm all user info matches KYC submission.</li>
          <li>Escalate suspicious or unclear cases.</li>
          <li>Keep audit logs for every KYC action.</li>
        </ul>
      </aside>
    </main>
  );
}
