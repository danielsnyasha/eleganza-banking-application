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
} from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Image from "next/image";

// Actual mapping for topbar
const topbarLabels: Record<
  string,
  { label: string; subtitle: string }
> = {
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
    label: "My Banks",
    subtitle: "Manage your linked bank accounts",
  },
  "/banking/inbox": {
    label: "Inbox",
    subtitle: "See your latest notifications and messages",
  },
};

export default function Topbar() {
  const { setTheme, theme } = useTheme();
  const [search, setSearch] = useState("");
  const pathname = usePathname();

  // Clean path for lookup
  const cleanPath =
    (pathname?.replace(/\/$/, "") || "/banking").toLowerCase();
  const topbarData =
    topbarLabels[cleanPath] || topbarLabels["/banking"];

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-[#e6effa] bg-[#fafdff] w-full">
      <div className="flex items-center gap-5 flex-1 min-w-0">
        <div className="flex items-center gap-3 min-w-[180px]">
          {/* Uncomment and adjust your logo if needed */}
          {/* <Image
            src="/eleganza_transparent_img.png"
            width={44}
            height={44}
            alt="Eleganza"
            className="object-contain"
            priority
          /> */}
          <div className="flex flex-col ml-10">
            <span className="hidden sm:inline text-[22px] font-bold text-[#02152b]">
              {topbarData.label}
            </span>
            <p className="text-xs text-yellow-400">
              {topbarData.subtitle}
            </p>
          </div>
        </div>
        <form
          className="flex-1 ml-3"
          onSubmit={(e) => {
            e.preventDefault();
          }}
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

      <div className="flex items-center gap-2 ml-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-[#e8f4ff] transition"
          aria-label="Calendar"
        >
          <CalendarDays className="w-6 h-6 text-[#0056B6]" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-[#e8f4ff] transition"
          aria-label="Mail"
        >
          <Mail className="w-6 h-6 text-[#0056B6]" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-[#e8f4ff] transition"
          aria-label="Notifications"
        >
          <Bell className="w-6 h-6 text-[#0056B6]" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-[#e8f4ff] transition"
          aria-label="Settings"
        >
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
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-[#e8f4ff] transition"
          aria-label="Account"
        >
          <UserCircle2 className="w-8 h-8 text-[#0056B6]" />
        </Button>
      </div>
    </header>
  );
}
