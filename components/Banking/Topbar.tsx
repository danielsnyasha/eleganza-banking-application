"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Bell,
  SunMoon,
  UserCircle2,
  CalendarDays,
  Mail,
  Settings,
  Shield,
} from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const topbarLabels: Record<string, { label: string; subtitle: string }> = {
  "/banking": {
    label: "Dashboard",
    subtitle: "Let's check your update today...",
  },
  "/banking/forex": {
    label: "Forex",
    subtitle: "Manage all your currency conversions",
  },
  "/banking/investments": {
    label: "Investments",
    subtitle: "View and manage your investment portfolio",
  },
  "/banking/security-center": {
    label: "Security Center",
    subtitle: "Secure your account and manage access",
  },
  "/banking/settings": {
    label: "Settings",
    subtitle: "Update your account settings and preferences",
  },
  "/banking/statistics": {
    label: "Statistics",
    subtitle: "Detailed analytics and usage reports",
  },
  "/banking/team": {
    label: "Team",
    subtitle: "Manage your team and permissions",
  },
  "/banking/transaction-history": {
    label: "Transaction History",
    subtitle: "Review your recent transactions",
  },
  "/banking/transactions": {
    label: "Transactions",
    subtitle: "Send, receive, and manage transactions",
  },
  "/banking/calendar": {
    label: "Calendar",
    subtitle: "See upcoming financial events",
  },
  "/banking/my-banks": {
    label: "Loans",
    subtitle: "Manage your linked bank accounts",
  },
  "/banking/inbox": {
    label: "Inbox",
    subtitle: "See your latest notifications and messages",
  },
  "/admin-portal": {
    label: "Admin Portal",
    subtitle: "Administrative controls",
  },
};

export default function Topbar() {
  const { setTheme, theme } = useTheme();
  const [search, setSearch] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const cleanPath = (pathname?.replace(/\/$/, "") || "/banking").toLowerCase();
  const topbarData = topbarLabels[cleanPath] || topbarLabels["/banking"];

  // Admin Portal Modal State
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleAdminAccess(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      if (adminPassword === "password") {
        setShowAdminModal(false);
        setAdminPassword("");
        setError("");
        router.push("/admin-portal");
      } else {
        setError("Incorrect password. Please try again.");
        setIsSubmitting(false);
      }
    }, 600);
  }

  return (
    <>
      <header className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-[#e6effa] bg-[#fafdff] w-full">
        <div className="flex items-center gap-2 sm:gap-5 flex-1 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-[120px] sm:min-w-[180px]">
            <div className="flex flex-col ml-2 sm:ml-10">
              <span className="hidden sm:inline text-[22px] font-bold text-[#02152b]">
                {topbarData.label}
              </span>
              <p className="text-xs text-yellow-400">{topbarData.subtitle}</p>
            </div>
          </div>
          <form
            className="flex-1 ml-2 sm:ml-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search…"
              className="w-full max-w-md bg-[#f2f8fd] border-none focus:ring-2 focus:ring-[#e2e8f0] rounded-xl shadow-none text-[16px] h-10 px-4"
              autoComplete="off"
            />
          </form>
        </div>
        <div className="flex items-center gap-0.5 sm:gap-2 ml-1 sm:ml-4">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-[#e8f4ff] transition" aria-label="Calendar">
            <CalendarDays className="w-6 h-6 text-[#0056B6]" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-[#e8f4ff] transition" aria-label="Mail">
            <Mail className="w-6 h-6 text-[#0056B6]" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-[#e8f4ff] transition" aria-label="Notifications">
            <Bell className="w-6 h-6 text-[#0056B6]" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-[#e8f4ff] transition" aria-label="Settings">
            <Settings className="w-6 h-6 text-[#0056B6]" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-[#e8f4ff] transition"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <SunMoon className="w-6 h-6 text-[#0056B6]" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-[#e8f4ff] transition" aria-label="Account">
            <UserCircle2 className="w-8 h-8 text-[#0056B6]" />
          </Button>
          
          {/* ADMIN PORTAL - always visible, different style */}
          <div className="flex flex-col items-center ml-2">
            <button
              onClick={() => setShowAdminModal(true)}
              aria-label="Admin portal"
              className="rounded-full bg-gradient-to-tr from-emerald-500 via-emerald-400 to-green-400 shadow-lg flex items-center justify-center transition hover:scale-105 outline-none border-4 border-white focus:ring-2 focus:ring-emerald-300"
              style={{
                width: 52,
                height: 52,
                minWidth: 52,
                minHeight: 52,
                maxWidth: 56,
                maxHeight: 56,
                marginBottom: 0,
              }}
            >
              <Shield className="w-8 h-8 text-white drop-shadow" />
            </button>
            <span className="text-xs font-bold text-emerald-600 mt-0.5 leading-none">
              Admin Portal
            </span>
          </div>
        </div>
      </header>

      {/* ADMIN MODAL */}
      <Dialog open={showAdminModal} onOpenChange={setShowAdminModal}>
        <DialogContent className="max-w-lg md:max-w-xl rounded-2xl shadow-2xl bg-gradient-to-br from-white to-emerald-50 border-0 p-4"
          style={{ minWidth: 320, minHeight: 390 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 30 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 100, damping: 17 }}
            className="w-full"
          >
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-emerald-700 flex items-center gap-2 mt-3">
                <Shield className="w-8 h-8 text-emerald-500" />
                Admin Portal Access
              </DialogTitle>
              <DialogDescription className="text-base text-gray-700 mt-2">
                Please login to access the admin portal. <br />
                Tip from Nyasha: enter the "password" <span className="text-5xl">😉</span> below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAdminAccess} className="flex flex-col gap-5 pt-2 pb-1">
              <Input
                type="password"
                autoFocus
                placeholder="Enter admin password"
                value={adminPassword}
                onChange={(e) => {
                  setAdminPassword(e.target.value);
                  setError("");
                }}
                className={`h-11 text-lg px-4 rounded-xl border border-emerald-100 bg-white focus:ring-2 focus:ring-emerald-300 transition`}
              />
              <Button
                type="submit"
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg text-lg transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Verifying..." : "Login"}
              </Button>
              <AnimatePresence>
                {error && (
                  <motion.p
                    className="text-red-500 text-sm mt-0 -mb-2"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
            <DialogFooter className="flex justify-end mt-2">
              <Button
                variant="ghost"
                type="button"
                className="rounded-xl px-6 py-2 text-gray-600 hover:bg-emerald-50"
                onClick={() => {
                  setShowAdminModal(false);
                  setAdminPassword("");
                  setError("");
                }}
              >
                Cancel
              </Button>
            </DialogFooter>
            <div className="flex flex-col items-center justify-center mt-3">
              <span className="text-xs text-red-400">
                Access is restricted. Contact IT for admin credentials.
              </span>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
}
