'use client';

import {
  Home,
  CreditCard,
  BarChart,
  PieChart,
  Wallet,
  Inbox,
  Users,
  Calendar,
  History,
  LogOut,
  Settings,
  User,
  HelpCircle,
  LogIn,
  UserPlus,
  Clock,
  Hourglass,
  MailWarning,
  Banknote,
  Shield,
  TrendingUp,
  UserCog,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


const MENU = [
  {
    section: 'Menu',
    items: [
      { label: 'Dashboards', icon: <Home size={22} />, href: '/banking' },
      { label: 'Transaction', icon: <CreditCard size={22} />, href: '/banking/transactions' },
      { label: 'Transaction History', icon: <History size={22} />, href: '/banking/transaction-history' },
      { label: 'Statistics', icon: <BarChart size={22} />, href: '/banking/statistics' },
    //   { label: 'Analytics', icon: <PieChart size={22} />, href: '/banking/analytics' },
      { label: 'Investments', icon: <TrendingUp size={22} />, href: '/banking/investments' },
      { label: 'Forex', icon: <Wallet size={22} />, href: '/banking/forex' },
      { label: 'My Banks', icon: <Banknote size={22} />, href: '/banking/my-banks' },
      { label: 'My Wallet', icon: <Wallet size={22} />, href: '/banking/my-wallet' },
      { label: 'Inbox', icon: <Inbox size={22} />, href: '/banking/inbox' },
    //   { label: 'Integrations', icon: <Users size={22} />, href: '/banking/integrations' },
      { label: 'Team', icon: <UserCog size={22} />, href: '/banking/team' },
      { label: 'User', icon: <User size={22} />, href: '/banking/user' },
      { label: 'Calendar', icon: <Calendar size={22} />, href: '/banking/calendar' },
    //   { label: 'History', icon: <History size={22} />, href: '/banking/history' },
      { label: 'Security Center', icon: <Shield size={22} />, href: '/banking/security-center' },
      { label: 'Settings', icon: <Settings size={22} />, href: '/banking/settings' },
    ],
  },
  {
    section: 'Help',
    items: [
      { label: 'Help & Support', icon: <HelpCircle size={22} />, href: '/banking/help-support' },
      { label: 'Support', icon: <HelpCircle size={22} />, href: '/banking/support' },
      { label: 'Setting', icon: <Settings size={22} />, href: '/banking/settings' },
    ],
  },
  {
    section: 'Others',
    items: [
    //   { label: 'Signin', icon: <LogIn size={22} />, href: '/sign-in' },
    //   { label: 'Signup', icon: <UserPlus size={22} />, href: '/sign-up' },
      { label: 'Coming Soon', icon: <Hourglass size={22} />, href: '/coming-soon' },
      { label: '404', icon: <MailWarning size={22} />, href: '/404' },
      { label: 'Logout', icon: <LogOut size={22} />, href: '/logout', danger: true },
    ],
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    // Live time with seconds
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  const accent = 'bg-[#E8F4FF] text-[#0056B6]';
  const hoverAccent = 'hover:bg-[#E2E8F0] hover:text-[#0080FF]';

  return (
    <aside
      className={cn(
        "h-screen flex flex-col justify-between sticky top-0 z-30 shadow-lg",
        collapsed ? "w-[72px]" : "w-[260px]",
        "transition-all duration-300 bg-[#fafdff]"
      )}
    >
      {/* Top: Logo and Toggle */}
      <div>
        <div className={cn("flex items-center px-4 py-4", collapsed && "justify-center")}>
          <div className="flex items-center w-full">
          <Image
  src="/eleganza_transparent_img.png"
  width={collapsed ? 48 : 100}
  height={collapsed ? 48 : 100}
  alt="Eleganza Logo"
  className={cn(
    "object-contain",
    collapsed ? "mx-auto" : "mr-3"
  )}
  priority
/>

            {/* No text, logo only */}
            <button
              onClick={() => setCollapsed((x) => !x)}
              className={cn(
                "ml-auto rounded-full p-1 bg-[#E8F4FF] hover:bg-[#d8ecff] transition-all shadow",
                collapsed && "mx-auto"
              )}
              aria-label="Toggle Sidebar"
            >
              {collapsed ? <svg width={22} height={22} viewBox="0 0 20 20" fill="none"><path d="M6 6L14 10L6 14V6Z" fill="#0056B6" /></svg>
                : <svg width={22} height={22} viewBox="0 0 20 20" fill="none"><path d="M14 14L6 10L14 6V14Z" fill="#0056B6" /></svg>}
            </button>
          </div>
        </div>

        <nav className="mt-2 flex flex-col gap-3">
          {MENU.map((group, idx) => (
            <div key={group.section}>
              <div
                className={cn(
                  "px-6 pb-2 pt-4 text-xs font-semibold tracking-wide text-[#7AA8D5]",
                  collapsed && "text-[10px] text-[#a7c4e7] text-center px-0"
                )}
              >
                {group.section}
              </div>
              <ul className="flex flex-col gap-1">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <TooltipProvider>
                      <Tooltip delayDuration={collapsed ? 0 : 99999}>
                        <TooltipTrigger asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center gap-3 px-4 py-2 rounded-lg transition-all",
                              "font-medium text-[#355b82]",
                              hoverAccent,
                              pathname === item.href && accent,
                              collapsed && "justify-center px-2",
                              item.danger && "text-[#FF3C3C] hover:text-[#FF3C3C]/80"
                            )}
                            aria-label={item.label}
                          >
                            <span>{item.icon}</span>
                            {!collapsed && <span>{item.label}</span>}
                          </Link>
                        </TooltipTrigger>
                        {collapsed && (
                          <TooltipContent side="right">
                            {item.label}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </li>
                ))}
              </ul>
              {/* Divider after each section except last */}
              {idx !== MENU.length - 1 && (
                <div className="my-3 border-t border-[#e6effa]" />
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom: Current Time */}
      <div
        className={cn(
          "flex items-center justify-center h-14 w-full border-t border-[#e6effa] bg-[#fafdff] text-[#0080FF] font-mono text-lg tracking-widest",
          collapsed && "px-0 text-xs"
        )}
      >
        <Clock className="mr-2" size={18} />
        <span suppressHydrationWarning>{currentTime}</span>
      </div>
    </aside>
  );
}
