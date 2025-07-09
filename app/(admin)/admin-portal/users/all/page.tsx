"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Eye,
  Ban,
  Lock,
  Users,
  UserCheck,
  UserMinus2,
  Search,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Helper: Country flags (emoji)
const flag = (nationality: string) => {
  const flags: Record<string, string> = {
    Zimbabwean: "🇿🇼",
    German: "🇩🇪",
    Chinese: "🇨🇳",
    Japanese: "🇯🇵",
    American: "🇺🇸",
    SouthAfrican: "🇿🇦",
    Italian: "🇮🇹",
    Ghanaian: "🇬🇭",
    Swedish: "🇸🇪",
    Nigerian: "🇳🇬",
    French: "🇫🇷",
    Indian: "🇮🇳",
    Korean: "🇰🇷",
    Egyptian: "🇪🇬",
    Moroccan: "🇲🇦",
    British: "🇬🇧",
    Mexican: "🇲🇽",
  };
  return flags[nationality.replace(/\s/g, "")] || "🌍";
};

// Demo data: Add more users for a full list
const demoUsers = [
  {
    id: "U001",
    name: "Tendai Ncube",
    nationality: "Zimbabwean",
    avatar: "https://randomuser.me/api/portraits/men/31.jpg",
    email: "tendai.ncube@email.com",
    status: "active",
    type: "Personal",
    joined: "2023-11-18",
  },
  {
    id: "U002",
    name: "Charlotte Müller",
    nationality: "German",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    email: "cmueller@email.com",
    status: "active",
    type: "Corporate",
    joined: "2023-12-22",
  },
  {
    id: "U003",
    name: "Li Wei",
    nationality: "Chinese",
    avatar: "https://randomuser.me/api/portraits/men/92.jpg",
    email: "liwei@email.com",
    status: "active",
    type: "Personal",
    joined: "2024-01-05",
  },
  {
    id: "U004",
    name: "Ayumi Tanaka",
    nationality: "Japanese",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    email: "ayumi.tanaka@email.com",
    status: "suspended",
    type: "Personal",
    joined: "2024-03-13",
  },
  {
    id: "U005",
    name: "Mike Olsen",
    nationality: "American",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    email: "mike.olsen@email.com",
    status: "closed",
    type: "Corporate",
    joined: "2023-09-15",
  },
  {
    id: "U006",
    name: "Jabulani Dube",
    nationality: "South African",
    avatar: "https://randomuser.me/api/portraits/men/23.jpg",
    email: "jabulani.dube@email.com",
    status: "active",
    type: "Personal",
    joined: "2023-12-27",
  },
  {
    id: "U007",
    name: "Sophia Rossi",
    nationality: "Italian",
    avatar: "https://randomuser.me/api/portraits/women/48.jpg",
    email: "sophia.rossi@email.com",
    status: "suspended",
    type: "Personal",
    joined: "2024-03-09",
  },
  {
    id: "U008",
    name: "Kwame Owusu",
    nationality: "Ghanaian",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    email: "kwame.owusu@email.com",
    status: "active",
    type: "Personal",
    joined: "2024-04-12",
  },
  {
    id: "U009",
    name: "Sven Johansson",
    nationality: "Swedish",
    avatar: "https://randomuser.me/api/portraits/men/29.jpg",
    email: "sven.j@email.com",
    status: "closed",
    type: "Personal",
    joined: "2024-01-14",
  },
  {
    id: "U010",
    name: "Amina Bakari",
    nationality: "Nigerian",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    email: "amina.b@email.com",
    status: "active",
    type: "Personal",
    joined: "2024-02-19",
  },
  {
    id: "U011",
    name: "Lucas Dubois",
    nationality: "French",
    avatar: "https://randomuser.me/api/portraits/men/21.jpg",
    email: "lucas.dubois@email.com",
    status: "active",
    type: "Corporate",
    joined: "2023-11-08",
  },
  {
    id: "U012",
    name: "Maya Patel",
    nationality: "Indian",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
    email: "maya.patel@email.com",
    status: "active",
    type: "Personal",
    joined: "2024-05-05",
  },
  {
    id: "U013",
    name: "Noah Kim",
    nationality: "Korean",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    email: "noah.kim@email.com",
    status: "suspended",
    type: "Corporate",
    joined: "2024-03-20",
  },
  {
    id: "U014",
    name: "Yasmine El-Sayed",
    nationality: "Egyptian",
    avatar: "https://randomuser.me/api/portraits/women/49.jpg",
    email: "yasmine.sayed@email.com",
    status: "closed",
    type: "Personal",
    joined: "2023-08-28",
  },
  {
    id: "U015",
    name: "Lukas Müller",
    nationality: "German",
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
    email: "lukas.mueller@email.com",
    status: "active",
    type: "Corporate",
    joined: "2024-01-16",
  },
  {
    id: "U016",
    name: "Fatima Ali",
    nationality: "Moroccan",
    avatar: "https://randomuser.me/api/portraits/women/61.jpg",
    email: "fatima.ali@email.com",
    status: "active",
    type: "Personal",
    joined: "2024-04-01",
  },
  {
    id: "U017",
    name: "Ethan Jones",
    nationality: "British",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    email: "ethan.jones@email.com",
    status: "active",
    type: "Personal",
    joined: "2024-02-16",
  },
  {
    id: "U018",
    name: "Sara Nilsson",
    nationality: "Swedish",
    avatar: "https://randomuser.me/api/portraits/women/35.jpg",
    email: "sara.nilsson@email.com",
    status: "active",
    type: "Personal",
    joined: "2024-03-11",
  },
  {
    id: "U019",
    name: "Juan Gómez",
    nationality: "Mexican",
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    email: "juan.gomez@email.com",
    status: "active",
    type: "Personal",
    joined: "2024-03-21",
  },
  {
    id: "U020",
    name: "Mei Chen",
    nationality: "Chinese",
    avatar: "https://randomuser.me/api/portraits/women/90.jpg",
    email: "mei.chen@email.com",
    status: "suspended",
    type: "Corporate",
    joined: "2024-05-17",
  },
];

// Status badge UI
function statusBadge(status: string) {
  if (status === "active")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-medium">
        <UserCheck className="w-4 h-4" /> Active
      </span>
    );
  if (status === "suspended")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 text-xs font-medium">
        <Lock className="w-4 h-4" /> Suspended
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-100 text-red-700 text-xs font-medium">
      <UserMinus2 className="w-4 h-4" /> Closed
    </span>
  );
}

export default function AllUsersPage() {
  const [filter, setFilter] = useState<"all" | "active" | "suspended" | "closed">("all");
  const [search, setSearch] = useState("");

  // Filter logic
  const filtered = demoUsers.filter(
    (u) =>
      (filter === "all" || u.status === filter) &&
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.nationality.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()))
  );

  const totals = {
    all: demoUsers.length,
    active: demoUsers.filter((u) => u.status === "active").length,
    suspended: demoUsers.filter((u) => u.status === "suspended").length,
    closed: demoUsers.filter((u) => u.status === "closed").length,
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 w-full">
      {/* Overview Banner */}
      <motion.section
        className="bg-gradient-to-r from-blue-700 via-emerald-600 to-yellow-400 rounded-2xl px-8 py-7 flex flex-col md:flex-row items-center gap-10 mb-10 shadow-xl"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex-1">
          <h1 className="text-2xl md:text-4xl font-black text-white mb-2 tracking-tight">
            All Bank Users
          </h1>
          <p className="text-white/90 mb-2 max-w-2xl">
            View, filter, and search all users in the system—corporate and individual. Manage status, accounts, and reach user profiles instantly.
          </p>
          <div className="flex flex-wrap gap-5 mt-2">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 font-semibold text-yellow-50 text-lg drop-shadow">
              <Users className="w-6 h-6" />
              {totals.all} Users
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 font-semibold text-green-50 text-lg drop-shadow">
              <UserCheck className="w-6 h-6" />
              {totals.active} Active
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 font-semibold text-yellow-50 text-lg drop-shadow">
              <Lock className="w-6 h-6" />
              {totals.suspended} Suspended
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 font-semibold text-red-50 text-lg drop-shadow">
              <UserMinus2 className="w-6 h-6" />
              {totals.closed} Closed
            </span>
          </div>
        </div>
        <User className="w-28 h-28 text-white/30 hidden md:block" />
      </motion.section>

      {/* Sticky Filter/Search Bar */}
      <section className="sticky top-2 z-10 mb-6">
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
            {(["all", "active", "suspended", "closed"] as const).map((st) => (
              <Button
                key={st}
                variant={filter === st ? "default" : "outline"}
                className={filter === st ? "bg-emerald-700 text-white" : ""}
                onClick={() => setFilter(st)}
                size="sm"
              >
                {st.charAt(0).toUpperCase() + st.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid/List of Users */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.length === 0 && (
            <div className="col-span-full text-gray-400 py-12 text-center text-lg">
              <Mail className="mx-auto mb-2 w-7 h-7" />
              No users found for your filter/search.
            </div>
          )}
          {filtered.map((u, i) => (
            <motion.div
              key={u.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="rounded-2xl bg-white border shadow hover:shadow-lg px-6 py-5 flex flex-col gap-2 items-center transition relative"
            >
              <img
                src={u.avatar}
                alt={u.name}
                className="w-16 h-16 rounded-full border-2 border-blue-200 object-cover mb-1"
                loading="lazy"
                onError={e => {
                  (e.target as HTMLImageElement).src =
                    "https://randomuser.me/api/portraits/lego/3.jpg";
                }}
              />
              <div className="font-semibold text-blue-900 text-base text-center">{u.name}</div>
              <div className="flex items-center gap-1 text-sm text-emerald-700 mb-1">
                <span>{flag(u.nationality)}</span>
                <span>{u.nationality}</span>
              </div>
              {statusBadge(u.status)}
              <div className="text-xs text-gray-500">{u.type} Account</div>
              <div className="text-xs text-gray-400">Joined: {u.joined}</div>
              <div className="text-xs text-gray-700 flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {u.email}
              </div>
              <div className="mt-2 flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-1" /> View
                </Button>
                {u.status === "active" && (
                  <Button variant="destructive" size="sm">
                    <Ban className="w-4 h-4 mr-1" /> Suspend
                  </Button>
                )}
                {u.status === "suspended" && (
                  <Button variant="default" size="sm">
                    <UserCheck className="w-4 h-4 mr-1" /> Activate
                  </Button>
                )}
                {u.status !== "closed" && (
                  <Button variant="outline" size="sm">
                    <UserMinus2 className="w-4 h-4 mr-1" /> Close
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
