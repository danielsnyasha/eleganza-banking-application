"use client";

import { motion } from "framer-motion";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import {
  CreditCard,
  Banknote,
  TrendingDown,
  RotateCcw,
  BadgeDollarSign,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";

Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

// Quick stats for top strip
const stats = [
  {
    label: "Transactions (7d)",
    value: "3,560",
    icon: <CreditCard className="w-6 h-6 text-blue-600" />,
    bg: "from-blue-100 via-blue-300 to-blue-500",
  },
  {
    label: "Total Volume",
    value: "$181,390",
    icon: <Banknote className="w-6 h-6 text-emerald-700" />,
    bg: "from-emerald-100 via-emerald-300 to-emerald-500",
  },
  {
    label: "Declines",
    value: "87",
    icon: <TrendingDown className="w-6 h-6 text-red-500" />,
    bg: "from-red-100 via-red-200 to-red-500",
  },
  {
    label: "Refunds",
    value: "24",
    icon: <RotateCcw className="w-6 h-6 text-yellow-500" />,
    bg: "from-yellow-100 via-yellow-300 to-yellow-500",
  },
  {
    label: "Avg. Value",
    value: "$51",
    icon: <BadgeDollarSign className="w-6 h-6 text-blue-900" />,
    bg: "from-blue-50 via-emerald-100 to-blue-200",
  },
];

// Stacked bar chart: Transactions by card type and week
const barData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Debit",
      data: [612, 721, 698, 750],
      backgroundColor: "#059669",
    },
    {
      label: "Credit",
      data: [348, 366, 409, 423],
      backgroundColor: "#2563eb",
    },
    {
      label: "Prepaid",
      data: [111, 120, 128, 134],
      backgroundColor: "#fbbf24",
    },
    {
      label: "Virtual",
      data: [66, 85, 97, 103],
      backgroundColor: "#a21caf",
    },
  ],
};
const barOptions = {
  responsive: true,
  plugins: {
    legend: { position: "bottom" as const },
    title: { display: false },
    tooltip: {},
  },
  scales: {
    x: { stacked: true, grid: { display: false } },
    y: { stacked: true, beginAtZero: true },
  },
};

// Pie: Approval vs Decline rates
const pieData = {
  labels: ["Approved", "Declined"],
  datasets: [
    {
      data: [3473, 87],
      backgroundColor: ["#059669", "#ef4444"],
      borderColor: "#fff",
      borderWidth: 2,
    },
  ],
};
const pieOptions = {
  plugins: {
    legend: { position: "bottom" as const, labels: { font: { size: 13 } } },
  },
  cutout: 48,
};

// Recent card transactions
const transactions = [
  {
    id: "TX4101",
    user: "Tendai Ncube",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    cardType: "Debit",
    amount: 187.2,
    currency: "USD",
    merchant: "Spar Borrowdale",
    date: "2024-07-29 09:32",
    status: "Approved",
    last4: "4381",
    country: "Zimbabwe",
    channel: "POS",
  },
  {
    id: "TX4102",
    user: "Akira Tanaka",
    avatar: "https://randomuser.me/api/portraits/men/53.jpg",
    cardType: "Virtual",
    amount: 48.9,
    currency: "JPY",
    merchant: "Amazon JP",
    date: "2024-07-29 09:35",
    status: "Declined",
    last4: "2291",
    country: "Japan",
    channel: "Online",
  },
  {
    id: "TX4103",
    user: "Rachel White",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    cardType: "Credit",
    amount: 91.0,
    currency: "USD",
    merchant: "Macy's London",
    date: "2024-07-29 10:17",
    status: "Approved",
    last4: "9745",
    country: "UK",
    channel: "POS",
  },
  {
    id: "TX4104",
    user: "Chipo Dube",
    avatar: "https://randomuser.me/api/portraits/women/23.jpg",
    cardType: "Debit",
    amount: 32.7,
    currency: "USD",
    merchant: "Pick n Pay SA",
    date: "2024-07-29 11:09",
    status: "Refunded",
    last4: "7123",
    country: "South Africa",
    channel: "POS",
  },
  {
    id: "TX4105",
    user: "Mike Olsen",
    avatar: "https://randomuser.me/api/portraits/men/71.jpg",
    cardType: "Prepaid",
    amount: 11.9,
    currency: "USD",
    merchant: "Uber Eats",
    date: "2024-07-29 11:44",
    status: "Approved",
    last4: "3319",
    country: "USA",
    channel: "App",
  },
  {
    id: "TX4106",
    user: "Wei Lin",
    avatar: "https://randomuser.me/api/portraits/men/88.jpg",
    cardType: "Credit",
    amount: 135.0,
    currency: "CNY",
    merchant: "Alibaba",
    date: "2024-07-29 12:12",
    status: "Declined",
    last4: "9990",
    country: "China",
    channel: "Online",
  },
];

// Status badge
function statusBadge(status: string) {
  if (status === "Approved")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-medium">
        <CheckCircle2 className="w-4 h-4" /> {status}
      </span>
    );
  if (status === "Refunded")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 text-xs font-medium">
        <RotateCcw className="w-4 h-4" /> {status}
      </span>
    );
  if (status === "Declined")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-100 text-red-700 text-xs font-medium">
        <XCircle className="w-4 h-4" /> {status}
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-xs font-medium">
      <Loader2 className="w-4 h-4 animate-spin" /> {status}
    </span>
  );
}

export default function CardsTransactionsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10 w-full">
      {/* 1. Horizontal metrics strip */}
      <motion.section
        className="flex flex-row gap-6 overflow-x-auto mb-8 pb-2 hide-scrollbar"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`min-w-[190px] flex flex-col items-center rounded-2xl bg-gradient-to-br ${stat.bg} px-7 py-5 shadow-lg border-0`}
          >
            <div className="mb-2">{stat.icon}</div>
            <span className="font-extrabold text-2xl text-emerald-900 mb-1">{stat.value}</span>
            <span className="text-md text-gray-700">{stat.label}</span>
          </div>
        ))}
      </motion.section>

      {/* 2. Section Explanation */}
      <section className="mb-10">
        <h1 className="text-2xl md:text-3xl font-black text-emerald-700 mb-2 tracking-tight">
          Card Transactions Analytics
        </h1>
        <p className="text-gray-700 text-base md:text-lg max-w-3xl">
          Review, monitor, and act on all transactions made using issued cards. Spot trends, analyze approval and decline rates, and resolve user issues proactively. <br /><br />
          <span className="font-semibold text-emerald-700">Why is this section important?</span><br />
          Quick access to granular transaction data and compliance alerts is key to reducing fraud and keeping your customers happy.
        </p>
      </section>

      {/* 3. Stacked Bar and Pie Chart */}
      <section className="grid md:grid-cols-2 gap-8 mb-14">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="font-bold text-lg text-blue-700 mb-4">Transactions by Card Type (Weekly)</h2>
          <Bar data={barData} height={230} options={barOptions} />
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <h2 className="font-bold text-lg text-blue-700 mb-4">Approval vs Decline Rate</h2>
          <Pie data={pieData} height={210} options={pieOptions} />
        </div>
      </section>

      {/* 4. Transactions list */}
      <section>
        <h2 className="font-bold text-xl text-emerald-800 mb-5">Recent Card Transactions</h2>
        <div className="flex flex-col gap-7">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex flex-col md:flex-row items-center gap-6 bg-emerald-50/30 hover:bg-emerald-100/60 rounded-xl px-5 py-4 transition border border-emerald-100"
            >
              <img
                src={tx.avatar}
                alt={tx.user}
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                loading="lazy"
                onError={e => {
                  (e.target as HTMLImageElement).src = "https://randomuser.me/api/portraits/lego/3.jpg";
                }}
              />
              <div className="flex-1 flex flex-col md:flex-row gap-5 items-center">
                <div>
                  <span className="font-semibold text-emerald-900">{tx.user}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-700 ml-2">{tx.country}</span>
                </div>
                <div>
                  <span className="text-xs rounded-full px-2 py-0.5 bg-blue-100 text-blue-700">{tx.cardType}</span>
                  <span className="text-xs font-mono text-gray-700 ml-2">**** {tx.last4}</span>
                </div>
                <div className="text-lg font-bold text-emerald-700">
                  ${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  <span className="text-xs text-gray-600 ml-1">{tx.currency}</span>
                </div>
                <div className="text-xs text-blue-800">{tx.merchant}</div>
                <div className="text-xs text-gray-400">{tx.channel}</div>
                <div className="text-xs text-gray-400">{tx.date}</div>
                <div>{statusBadge(tx.status)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
