/* components/AdminPortal/nav.ts */
import {
  LayoutDashboard,
  Banknote,
  ArrowRightLeft,
  Briefcase,
  Wallet,
  CreditCard,
  BadgeDollarSign,
  Crown,
  LineChart,
  Building2,
  Users,
  ShieldCheck,
  FileBarChart,
  LifeBuoy,
  Settings,
  FileText,
  TerminalSquare,
  Globe,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  PlusCircle,
  MinusCircle,
  BarChart3,
  PieChart,
  Award,
} from 'lucide-react';

/** Sidebar tree */
export interface NavItem {
  label: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
}

/** All admin-portal sections */
export const navItems: NavItem[] = [
  /* ───────── DASHBOARD ───────── */
  {
    label: 'Overview',
    href: '/admin-portal',
    icon: LayoutDashboard,
  },

  /* ───────── BANKING BLOCK ───────── */
  {
    label: 'Banking',
    icon: Banknote,
    children: [
      { label: 'Bank Balance', href: '/admin-portal/banking/balance', icon: Banknote },
      { label: 'Transactions', href: '/admin-portal/banking/transactions', icon: ArrowRightLeft },
      { label: 'Accounts', href: '/admin-portal/banking/accounts', icon: Briefcase },
      { label: 'Reconciliations', href: '/admin-portal/banking/reconciliations', icon: FileText },
      { label: 'Manual Deposit', href: '/admin-portal/banking/manual-deposit', icon: PlusCircle },
      { label: 'Manual Withdrawal', href: '/admin-portal/banking/manual-withdrawal', icon: MinusCircle },
    ],
  },

  {
    label: 'Payments',
    icon: Wallet,
    children: [
      { label: 'Transfers', href: '/admin-portal/payments/transfers', icon: ArrowRightLeft },
      { label: 'Bill Pay', href: '/admin-portal/payments/bills', icon: FileText },
      { label: 'Bulk Payments', href: '/admin-portal/payments/bulk', icon: FileText },
    ],
  },

  {
    label: 'Cards',
    icon: CreditCard,
    children: [
      { label: 'Card Issuance', href: '/admin-portal/cards/issuance', icon: CreditCard },
      { label: 'Card Transactions', href: '/admin-portal/cards/transactions', icon: ArrowRightLeft },
    ],
  },

  {
    label: 'Loans',
    icon: BadgeDollarSign,
    children: [
      { label: 'Applications', href: '/admin-portal/loans/applications', icon: BadgeDollarSign },
      { label: 'Portfolio', href: '/admin-portal/loans/portfolio', icon: FileBarChart },
      { label: 'Collections', href: '/admin-portal/loans/collections', icon: FileText },
    ],
  },

  {
    label: 'Treasury',
    icon: Crown,
    children: [
      { label: 'FX Deals', href: '/admin-portal/treasury/fx-deals', icon: DollarSign },
      { label: 'Liquidity', href: '/admin-portal/treasury/liquidity', icon: Globe },
      { label: 'Interest Rates', href: '/admin-portal/treasury/rates', icon: LineChart },
    ],
  },

  /* ───────── INVESTMENTS BLOCK ───── */
  {
    label: 'Investments',
    icon: LineChart,
    children: [
      { label: 'Products', href: '/admin-portal/investments/products', icon: LineChart },
      { label: 'Properties', href: '/admin-portal/investments/properties', icon: Building2 },
      { label: 'Portfolios', href: '/admin-portal/investments/portfolios', icon: FileBarChart },
    ],
  },

  /* ───────── ANALYTICS / INSIGHTS ── */
  {
    label: 'Analytics',
    icon: BarChart3,
    children: [
      { label: 'User Growth', href: '/admin-portal/analytics/user-growth', icon: TrendingUp },
      { label: 'Spending Patterns', href: '/admin-portal/analytics/spending', icon: PieChart },
      { label: 'Revenue', href: '/admin-portal/analytics/revenue', icon: FileBarChart },
      { label: 'Rankings', href: '/admin-portal/analytics/rankings', icon: Award },
    ],
  },

  /* ───────── USERS & COMPLIANCE ──── */
  {
    label: 'Users',
    icon: Users,
    children: [
      { label: 'Approvals', href: '/admin-portal/users/approvals', icon: Users },
      { label: 'All Users', href: '/admin-portal/users/all', icon: Users },
      { label: 'Roles & Permissions', href: '/admin-portal/users/roles', icon: ShieldCheck },
    ],
  },

  {
    label: 'Compliance',
    icon: ShieldCheck,
    children: [
      { label: 'KYC Reviews', href: '/admin-portal/compliance/kyc', icon: ShieldCheck },
      { label: 'AML Alerts', href: '/admin-portal/compliance/aml', icon: AlertTriangle },
      { label: 'Audit Logs', href: '/admin-portal/compliance/audit', icon: TerminalSquare },
    ],
  },

  /* ───────── REPORTS & SUPPORT ───── */
  {
    label: 'Reports',
    icon: FileBarChart,
    children: [
      { label: 'Financial', href: '/admin-portal/reports/financial', icon: FileBarChart },
      { label: 'Regulatory', href: '/admin-portal/reports/regulatory', icon: FileText },
    ],
  },

  {
    label: 'Support',
    icon: LifeBuoy,
    children: [
      { label: 'Tickets', href: '/admin-portal/support/tickets', icon: LifeBuoy },
      { label: 'FAQs', href: '/admin-portal/support/faqs', icon: FileText },
    ],
  },

  /* ───────── SETTINGS / SYSTEM ───── */
  {
    label: 'Settings',
    href: '/admin-portal/settings',
    icon: Settings,
  },
  {
    label: 'System Logs',
    href: '/admin-portal/system/logs',
    icon: TerminalSquare,
  },
];
