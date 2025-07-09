"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  UserCheck,
  UserX,
  Clock10,
  CheckCircle2,
  XCircle,
  Loader2,
  Search,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Status = "pending" | "approved" | "declined";

// Demo user approvals data
const initialUsers = [
  {
    id: "UA001",
    name: "Tendai Ncube",
    nationality: "Zimbabwean",
    avatar: "https://randomuser.me/api/portraits/men/31.jpg",
    email: "tendai.ncube@email.com",
    kyc: "Verified",
    date: "2024-07-18",
    status: "pending" as Status,
  },
  {
    id: "UA002",
    name: "Charlotte Müller",
    nationality: "German",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    email: "cmueller@email.com",
    kyc: "Not Verified",
    date: "2024-07-16",
    status: "pending" as Status,
  },
  {
    id: "UA003",
    name: "Li Wei",
    nationality: "Chinese",
    avatar: "https://randomuser.me/api/portraits/men/92.jpg",
    email: "liwei@email.com",
    kyc: "Verified",
    date: "2024-07-10",
    status: "approved" as Status,
  },
  {
    id: "UA004",
    name: "Ayumi Tanaka",
    nationality: "Japanese",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    email: "ayumi.tanaka@email.com",
    kyc: "Pending",
    date: "2024-07-12",
    status: "pending" as Status,
  },
  {
    id: "UA005",
    name: "Mike Olsen",
    nationality: "American",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    email: "mike.olsen@email.com",
    kyc: "Verified",
    date: "2024-07-09",
    status: "declined" as Status,
  },
  {
    id: "UA006",
    name: "Jabulani Dube",
    nationality: "South African",
    avatar: "https://randomuser.me/api/portraits/men/23.jpg",
    email: "jabulani.dube@email.com",
    kyc: "Verified",
    date: "2024-07-07",
    status: "approved" as Status,
  },
  {
    id: "UA007",
    name: "Sophia Rossi",
    nationality: "Italian",
    avatar: "https://randomuser.me/api/portraits/women/48.jpg",
    email: "sophia.rossi@email.com",
    kyc: "Not Verified",
    date: "2024-07-15",
    status: "pending" as Status,
  },
  {
    id: "UA008",
    name: "Kwame Owusu",
    nationality: "Ghanaian",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    email: "kwame.owusu@email.com",
    kyc: "Verified",
    date: "2024-07-12",
    status: "approved" as Status,
  },
  {
    id: "UA009",
    name: "Sven Johansson",
    nationality: "Swedish",
    avatar: "https://randomuser.me/api/portraits/men/29.jpg",
    email: "sven.j@email.com",
    kyc: "Pending",
    date: "2024-07-14",
    status: "pending" as Status,
  },
  {
    id: "UA010",
    name: "Amina Bakari",
    nationality: "Nigerian",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    email: "amina.b@email.com",
    kyc: "Verified",
    date: "2024-07-05",
    status: "declined" as Status,
  },
  {
    id: "UA011",
    name: "Lucas Dubois",
    nationality: "French",
    avatar: "https://randomuser.me/api/portraits/men/21.jpg",
    email: "lucas.dubois@email.com",
    kyc: "Verified",
    date: "2024-07-08",
    status: "pending" as Status,
  },
  {
    id: "UA012",
    name: "Maya Patel",
    nationality: "Indian",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
    email: "maya.patel@email.com",
    kyc: "Pending",
    date: "2024-07-13",
    status: "approved" as Status,
  },
  {
    id: "UA013",
    name: "Noah Kim",
    nationality: "Korean",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    email: "noah.kim@email.com",
    kyc: "Verified",
    date: "2024-07-09",
    status: "pending" as Status,
  },
  {
    id: "UA014",
    name: "Yasmine El-Sayed",
    nationality: "Egyptian",
    avatar: "https://randomuser.me/api/portraits/women/49.jpg",
    email: "yasmine.sayed@email.com",
    kyc: "Verified",
    date: "2024-07-11",
    status: "pending" as Status,
  },
  {
    id: "UA015",
    name: "Lukas Müller",
    nationality: "German",
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
    email: "lukas.mueller@email.com",
    kyc: "Not Verified",
    date: "2024-07-10",
    status: "pending" as Status,
  },
  {
    id: "UA016",
    name: "Fatima Ali",
    nationality: "Moroccan",
    avatar: "https://randomuser.me/api/portraits/women/61.jpg",
    email: "fatima.ali@email.com",
    kyc: "Pending",
    date: "2024-07-13",
    status: "pending" as Status,
  },
  {
    id: "UA017",
    name: "Ethan Jones",
    nationality: "British",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    email: "ethan.jones@email.com",
    kyc: "Verified",
    date: "2024-07-06",
    status: "declined" as Status,
  },
  {
    id: "UA018",
    name: "Sara Nilsson",
    nationality: "Swedish",
    avatar: "https://randomuser.me/api/portraits/women/35.jpg",
    email: "sara.nilsson@email.com",
    kyc: "Not Verified",
    date: "2024-07-13",
    status: "pending" as Status,
  },
  {
    id: "UA019",
    name: "Juan Gómez",
    nationality: "Mexican",
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    email: "juan.gomez@email.com",
    kyc: "Verified",
    date: "2024-07-14",
    status: "pending" as Status,
  },
  {
    id: "UA020",
    name: "Mei Chen",
    nationality: "Chinese",
    avatar: "https://randomuser.me/api/portraits/women/90.jpg",
    email: "mei.chen@email.com",
    kyc: "Verified",
    date: "2024-07-11",
    status: "approved" as Status,
  },
];

// Status badge UI
function statusBadge(status: Status) {
  if (status === "approved")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-medium">
        <CheckCircle2 className="w-4 h-4" /> Approved
      </span>
    );
  if (status === "pending")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 text-xs font-medium">
        <Clock10 className="w-4 h-4 animate-pulse" /> Pending
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-100 text-red-700 text-xs font-medium">
      <XCircle className="w-4 h-4" /> Declined
    </span>
  );
}

export default function UsersApprovalsPage() {
  const [users, setUsers] = useState(initialUsers);
  const [filter, setFilter] = useState<Status | "all">("all");
  const [search, setSearch] = useState("");

  // Batch selection (for demo)
  const [selected, setSelected] = useState<string[]>([]);
  const toggleSelect = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((v) => v !== id) : [...s, id]));

  // Handle status change
  const changeStatus = (id: string, status: Status) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status } : u))
    );
    setSelected((s) => s.filter((v) => v !== id));
  };

  // Batch approve/decline
  const batchUpdate = (status: Status) => {
    setUsers((prev) =>
      prev.map((u) =>
        selected.includes(u.id) ? { ...u, status } : u
      )
    );
    setSelected([]);
  };

  // Filtering logic
  const filtered = users.filter(
    (u) =>
      (filter === "all" || u.status === filter) &&
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.nationality.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 w-full">
      {/* Top Banner */}
      <motion.section
        className="bg-gradient-to-r from-blue-700 via-emerald-600 to-yellow-400 rounded-2xl px-8 py-7 flex flex-col md:flex-row items-center gap-10 mb-10 shadow-xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex-1">
          <h1 className="text-2xl md:text-4xl font-black text-white mb-2 tracking-tight">
            User Onboarding Approvals
          </h1>
          <p className="text-white/90 mb-2 max-w-2xl">
            Review new user applications. Approve, decline, or set pending status for onboarding requests. You can batch process actions or filter by status for efficient management.
          </p>
          <div className="flex items-center gap-6 mt-2">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 font-semibold text-yellow-50 text-lg drop-shadow">
              <Users className="w-6 h-6" />
              {users.filter((u) => u.status === "pending").length} Pending
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 font-semibold text-green-50 text-lg drop-shadow">
              <UserCheck className="w-6 h-6" />
              {users.filter((u) => u.status === "approved").length} Approved
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 font-semibold text-red-50 text-lg drop-shadow">
              <UserX className="w-6 h-6" />
              {users.filter((u) => u.status === "declined").length} Declined
            </span>
          </div>
        </div>
        <User className="w-28 h-28 text-white/30 hidden md:block" />
      </motion.section>

      {/* Sticky Action/Filter Bar */}
      <section className="sticky top-2 z-10 mb-5">
        <div className="flex flex-wrap gap-3 items-center rounded-xl bg-white border shadow px-4 py-3">
          <Input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search user…"
            className="w-56"
            autoComplete="off"
            startIcon={<Search className="w-4 h-4" />}
          />
          <div className="flex gap-1 ml-2">
            {(["all", "pending", "approved", "declined"] as const).map((st) => (
              <Button
                key={st}
                variant={filter === st ? "default" : "outline"}
                className={filter === st ? "bg-emerald-700 text-white" : ""}
                onClick={() => setFilter(st)}
                size="sm"
              >
                {st === "all"
                  ? "All"
                  : st.charAt(0).toUpperCase() + st.slice(1)}
              </Button>
            ))}
          </div>
          {selected.length > 0 && (
            <div className="ml-auto flex gap-2">
              <Button
                variant="emerald"
                size="sm"
                className="bg-emerald-700 text-white"
                onClick={() => batchUpdate("approved")}
              >
                <CheckCircle2 className="w-4 h-4 mr-1" /> Approve Selected
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="bg-red-600 text-white"
                onClick={() => batchUpdate("declined")}
              >
                <XCircle className="w-4 h-4 mr-1" /> Decline Selected
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* User Approval Grid */}
      <section>
        <div className="overflow-x-auto rounded-xl bg-white shadow border">
          <table className="w-full min-w-[920px] text-sm">
            <thead>
              <tr className="text-blue-800 font-bold text-left">
                <th className="px-3 py-2">
                  <input
                    type="checkbox"
                    checked={selected.length === filtered.length && filtered.length > 0}
                    onChange={() => {
                      if (selected.length === filtered.length) setSelected([]);
                      else setSelected(filtered.map((u) => u.id));
                    }}
                  />
                </th>
                <th className="px-3 py-2">User</th>
                <th className="px-3 py-2">Nationality</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">KYC Status</th>
                <th className="px-3 py-2">Applied</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center py-10 text-gray-400">
                      <Loader2 className="w-6 h-6 mx-auto animate-spin mb-2" />
                      No users found for your filter.
                    </td>
                  </tr>
                )}
                {filtered.map((u, i) => (
                  <motion.tr
                    key={u.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ delay: i * 0.03 }}
                    className={`border-b last:border-none transition hover:bg-blue-50/30 ${
                      selected.includes(u.id) ? "bg-emerald-50/50" : ""
                    }`}
                  >
                    <td className="px-3 py-2">
                      <input
                        type="checkbox"
                        checked={selected.includes(u.id)}
                        onChange={() => toggleSelect(u.id)}
                      />
                    </td>
                    <td className="px-3 py-2 flex items-center gap-3">
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-9 h-9 rounded-full border-2 border-blue-200"
                        loading="lazy"
                        onError={e => {
                          (e.target as HTMLImageElement).src =
                            "https://randomuser.me/api/portraits/lego/0.jpg";
                        }}
                      />
                      <span className="font-semibold text-blue-900">{u.name}</span>
                    </td>
                    <td className="px-3 py-2">{u.nationality}</td>
                    <td className="px-3 py-2">{u.email}</td>
                    <td className="px-3 py-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                          ${
                            u.kyc === "Verified"
                              ? "bg-emerald-100 text-emerald-800"
                              : u.kyc === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }
                        `}
                      >
                        {u.kyc}
                      </span>
                    </td>
                    <td className="px-3 py-2">{u.date}</td>
                    <td className="px-3 py-2">{statusBadge(u.status)}</td>
                    <td className="px-3 py-2">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="emerald"
                          className="bg-emerald-700 text-white"
                          onClick={() => changeStatus(u.id, "approved")}
                          disabled={u.status === "approved"}
                        >
                          <UserCheck className="w-4 h-4 mr-1" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="bg-red-600 text-white"
                          onClick={() => changeStatus(u.id, "declined")}
                          disabled={u.status === "declined"}
                        >
                          <UserX className="w-4 h-4 mr-1" /> Decline
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-yellow-600 text-yellow-800"
                          onClick={() => changeStatus(u.id, "pending")}
                          disabled={u.status === "pending"}
                        >
                          <Clock10 className="w-4 h-4 mr-1" /> Pend
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
