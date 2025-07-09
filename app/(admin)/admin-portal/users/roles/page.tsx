"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  UserCog, Users, ShieldCheck, User, Settings2, FileText, ListChecks,
  Plus, Eye, UserCheck, UserCircle2, Edit, MoreHorizontal, UserPlus,
  BadgePercent, Banknote, Shield, CheckCircle2, Lightbulb, AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

// New roles with more variety
const roleData = [
  {
    key: "admin",
    name: "Administrator",
    icon: <ShieldCheck className="text-emerald-600 w-8 h-8" />,
    description: "Full access to all system features, settings, users, and approvals.",
    users: 2,
    accent: "emerald",
    permissions: [
      "Manage users & roles",
      "Modify bank settings",
      "Approve transactions",
      "Assign permissions",
      "View audit logs"
    ]
  },
  {
    key: "compliance",
    name: "Compliance Officer",
    icon: <BadgePercent className="text-blue-600 w-8 h-8" />,
    description: "Ensures all activities comply with regulations, can freeze suspicious accounts.",
    users: 3,
    accent: "blue",
    permissions: [
      "Review flagged accounts",
      "Monitor transactions",
      "Generate compliance reports",
      "Freeze accounts"
    ]
  },
  {
    key: "manager",
    name: "Finance Manager",
    icon: <UserCog className="text-yellow-600 w-8 h-8" />,
    description: "Supervises daily operations, handles large approvals, and monitors team KPIs.",
    users: 7,
    accent: "yellow",
    permissions: [
      "Approve high-value transactions",
      "View financial reports",
      "Monitor team performance",
      "Assign staff tasks"
    ]
  },
  {
    key: "relationship",
    name: "Relationship Manager",
    icon: <UserPlus className="text-pink-600 w-8 h-8" />,
    description: "Manages VIP and business clients, can override some teller restrictions.",
    users: 5,
    accent: "pink",
    permissions: [
      "View VIP portfolios",
      "Assist premium customers",
      "Override transaction limits"
    ]
  },
  {
    key: "teller",
    name: "Teller",
    icon: <User className="text-orange-600 w-8 h-8" />,
    description: "Handles daily customer banking and front desk operations.",
    users: 22,
    accent: "orange",
    permissions: [
      "Process deposits & withdrawals",
      "Issue new cards",
      "Assist at branch",
      "View customer balances"
    ]
  },
  {
    key: "support",
    name: "Tech Support",
    icon: <UserCircle2 className="text-cyan-600 w-8 h-8" />,
    description: "Resolves technical issues, helps staff and customers with digital tools.",
    users: 8,
    accent: "cyan",
    permissions: [
      "Troubleshoot technical problems",
      "Reset digital access",
      "Report bugs"
    ]
  },
  {
    key: "auditor",
    name: "Auditor",
    icon: <FileText className="text-purple-600 w-8 h-8" />,
    description: "Can view all system logs and generate detailed reports for compliance.",
    users: 2,
    accent: "purple",
    permissions: [
      "View system & audit logs",
      "Generate audit reports"
    ]
  },
  {
    key: "risk",
    name: "Risk Analyst",
    icon: <AlertTriangle className="text-red-500 w-8 h-8" />,
    description: "Monitors and analyzes risk exposure and credit activities.",
    users: 3,
    accent: "red",
    permissions: [
      "Monitor risk dashboards",
      "Flag risky transactions",
      "Review credit limits"
    ]
  },
  {
    key: "product",
    name: "Product Owner",
    icon: <Lightbulb className="text-fuchsia-500 w-8 h-8" />,
    description: "Manages digital banking features, oversees new launches and user feedback.",
    users: 2,
    accent: "fuchsia",
    permissions: [
      "Launch new features",
      "Collect user feedback",
      "Prioritize bug fixes"
    ]
  },
  {
    key: "customer",
    name: "Customer",
    icon: <UserCheck className="text-gray-500 w-8 h-8" />,
    description: "Has access to personal/business accounts and digital self-service.",
    users: 2620,
    accent: "gray",
    permissions: [
      "Access accounts",
      "Initiate payments",
      "Request support"
    ]
  },
];

const accentMap = {
  emerald: "border-emerald-500 bg-emerald-50",
  blue: "border-blue-500 bg-blue-50",
  yellow: "border-yellow-500 bg-yellow-50",
  pink: "border-pink-500 bg-pink-50",
  orange: "border-orange-500 bg-orange-50",
  cyan: "border-cyan-500 bg-cyan-50",
  purple: "border-purple-500 bg-purple-50",
  red: "border-red-500 bg-red-50",
  fuchsia: "border-fuchsia-500 bg-fuchsia-50",
  gray: "border-gray-400 bg-gray-50"
};

export default function RolesPermissionsPage() {
  const [search, setSearch] = useState("");

  // Filtering logic
  const filtered = roleData.filter(
    r =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.permissions.some(p =>
        p.toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 w-full min-h-screen relative">
      {/* Banner */}
      <motion.section
        className="bg-gradient-to-r from-emerald-700 via-blue-600 to-yellow-400 rounded-2xl px-8 py-7 flex flex-col md:flex-row items-center gap-8 mb-10 shadow-xl"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex-1">
          <h1 className="text-2xl md:text-4xl font-black text-white mb-2 tracking-tight">
            Roles & Permissions
          </h1>
          <p className="text-white/90 mb-2 max-w-2xl">
            Fine-tune access and responsibilities. Each role unlocks different features for your staff and clients—ensuring <b>compliance, control, and accountability</b>.
          </p>
          <div className="flex gap-4 mt-3">
            <Button variant="outline" className="text-white bg-white/20 border-white/30 hover:bg-emerald-600/30">
              <Plus className="w-4 h-4 mr-2" />
              Add Role
            </Button>
            <Button variant="outline" className="text-white bg-white/20 border-white/30 hover:bg-blue-600/30">
              <ListChecks className="w-4 h-4 mr-2" />
              Audit Permissions
            </Button>
          </div>
        </div>
        <Settings2 className="w-24 h-24 text-white/20 hidden md:block" />
      </motion.section>

      {/* Search Bar */}
      <section className="mb-7">
        <div className="flex gap-2 items-center bg-white rounded-xl border shadow px-5 py-3">
          <Input
            type="search"
            placeholder="Search role or permission…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
            startIcon={<Eye className="w-4 h-4" />}
          />
        </div>
      </section>

      {/* Responsive Grid */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7">
          {filtered.map((role, i) => (
            <motion.div
              key={role.key}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`group rounded-2xl border shadow-lg transition duration-200 flex flex-col px-6 pb-6 pt-7 bg-white hover:scale-[1.03] relative overflow-hidden ${accentMap[role.accent as keyof typeof accentMap]}`}
              style={{ minWidth: 0 }}
            >
              {/* Color Bar */}
              <div className={`absolute left-0 top-0 h-full w-2 rounded-l-2xl bg-gradient-to-b from-${role.accent}-500 to-${role.accent}-200`} />
              {/* Role Icon */}
              <div className="flex items-center gap-2 mb-2">
                {role.icon}
                <span className="ml-2 text-lg font-semibold text-emerald-900">{role.name}</span>
                <span className={`ml-auto text-xs px-3 py-0.5 rounded-full font-medium bg-${role.accent}-100 text-${role.accent}-700`}>
                  {role.users} user{role.users === 1 ? "" : "s"}
                </span>
              </div>
              <div className="text-sm text-gray-600 mb-2">{role.description}</div>
              <ul className="list-disc pl-6 text-sm mb-4">
                {role.permissions.map((perm, j) => (
                  <li key={j} className="mb-0.5 text-gray-800">{perm}</li>
                ))}
              </ul>
              <div className="flex gap-2 mt-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline">
                      <MoreHorizontal className="w-4 h-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Users className="w-4 h-4 mr-2" /> View Users
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings2 className="w-4 h-4 mr-2" /> Permissions
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Info/FAQ card: shown only on large screens, not over cards */}
      <aside
        className="hidden lg:block fixed bottom-7 right-7 bg-gradient-to-br from-emerald-400 to-blue-400 shadow-2xl text-white rounded-2xl px-6 py-5 w-[330px] z-20 border-2 border-emerald-200/60"
        style={{ pointerEvents: "auto" }}
      >
        <div className="font-bold text-lg mb-1">How Roles & Permissions Work</div>
        <ul className="text-xs leading-relaxed list-disc pl-4">
          <li>Roles define what users can see and do.</li>
          <li>Assign roles based on staff duties and compliance requirements.</li>
          <li>Review permissions regularly for least-privilege security.</li>
          <li>Audit logs track all permission changes.</li>
        </ul>
      </aside>
    </main>
  );
}
