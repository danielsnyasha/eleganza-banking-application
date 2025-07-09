"use client";

import { motion } from "framer-motion";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
  BarElement,
  ArcElement,
} from "chart.js";
import {
  Banknote,
  CreditCard,
  ShoppingBag,
  Smartphone,
  Wifi,
  ReceiptText,
  TrendingDown,
  UserCircle2,
  Globe2,
} from "lucide-react";

// Chart.js registration
Chart.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
  BarElement,
  ArcElement
);

// --- Dummy data ---

// 1. Summary stats
const stats = [
  {
    label: "Total Spend (30d)",
    value: "$212,450",
    icon: <Banknote className="w-7 h-7 text-emerald-700" />,
  },
  {
    label: "Avg. Spend/User",
    value: "$1,582",
    icon: <CreditCard className="w-7 h-7 text-blue-700" />,
  },
  {
    label: "Transactions",
    value: "19,022",
    icon: <ReceiptText className="w-7 h-7 text-yellow-500" />,
  },
];

// 2. Monthly spending (line)
const months = [
  "Aug 2023", "Sep", "Oct", "Nov", "Dec", "Jan 2024", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
];
const spendByMonth = [
  142000, 149000, 156200, 162100, 173400, 181000, 194200, 187100, 201400, 208000, 209000, 212450,
];
const lineData = {
  labels: months,
  datasets: [
    {
      label: "Total Spend",
      data: spendByMonth,
      fill: true,
      borderColor: "#0ea5e9",
      backgroundColor: "rgba(14,165,233,0.11)",
      tension: 0.45,
      pointBackgroundColor: "#0ea5e9",
      pointRadius: 4,
    },
  ],
};
const lineOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
    tooltip: {},
  },
  scales: {
    y: {
      beginAtZero: false,
      min: 100000,
      max: 230000,
      ticks: {
        callback: function (
          this: any,
          tickValue: string | number
        ) {
          const n = typeof tickValue === "number" ? tickValue : Number(tickValue);
          return "$" + n.toLocaleString();
        },
      },
      grid: { color: "#e5e7eb" },
    },
    x: { grid: { color: "#f1f5f9" } },
  },
};

// 3. Category breakdown (bar)
const categories = [
  "Groceries",
  "Utilities",
  "Transport",
  "Healthcare",
  "Dining",
  "Shopping",
  "Education",
  "Travel",
];
const barData = {
  labels: categories,
  datasets: [
    {
      label: "Spend",
      data: [34000, 21000, 18500, 15800, 26500, 38200, 8500, 14950],
      backgroundColor: [
        "#0ea5e9",
        "#fbbf24",
        "#059669",
        "#a78bfa",
        "#f43f5e",
        "#f59e42",
        "#14b8a6",
        "#f472b6",
      ],
      borderRadius: 9,
    },
  ],
};
const barOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
    tooltip: {},
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function (
          this: any,
          tickValue: string | number
        ) {
          const n = typeof tickValue === "number" ? tickValue : Number(tickValue);
          return "$" + n.toLocaleString();
        },
      },
      grid: { color: "#f1f5f9" },
    },
    x: { grid: { color: "#f1f5f9" } },
  },
};

// 4. Channel breakdown (pie)
const pieData = {
  labels: ["Card", "Mobile", "Web", "USSD", "POS"],
  datasets: [
    {
      data: [9500, 5300, 3500, 500, 222],
      backgroundColor: [
        "#059669",
        "#2563eb",
        "#fbbf24",
        "#f43f5e",
        "#0ea5e9",
      ],
      borderWidth: 2,
      borderColor: "#fff",
    },
  ],
};

// 5. Recent high-value transactions (diverse)
const topTxns = [
  {
    id: "TX0901",
    user: "Sophie Chen",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    nationality: "Chinese",
    amount: 2200,
    category: "Shopping",
    channel: "Mobile",
    date: "2024-07-28 14:15",
    status: "Completed",
  },
  {
    id: "TX0902",
    user: "Mlungisi Dlamini",
    avatar: "https://randomuser.me/api/portraits/men/48.jpg",
    nationality: "South African",
    amount: 1700,
    category: "Travel",
    channel: "Card",
    date: "2024-07-28 13:43",
    status: "Completed",
  },
  {
    id: "TX0903",
    user: "Svenja Müller",
    avatar: "https://randomuser.me/api/portraits/women/55.jpg",
    nationality: "German",
    amount: 1910,
    category: "Healthcare",
    channel: "Web",
    date: "2024-07-28 13:11",
    status: "Completed",
  },
  {
    id: "TX0904",
    user: "Ayumi Tanaka",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    nationality: "Japanese",
    amount: 1550,
    category: "Groceries",
    channel: "POS",
    date: "2024-07-28 12:50",
    status: "Completed",
  },
  {
    id: "TX0905",
    user: "Mike Olsen",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    nationality: "American",
    amount: 1385,
    category: "Utilities",
    channel: "Mobile",
    date: "2024-07-28 12:35",
    status: "Failed",
  },
];

// Helper for status badge
function statusBadge(status: string) {
  if (status === "Completed")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-medium">
        <CreditCard className="w-4 h-4" /> {status}
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-100 text-red-700 text-xs font-medium">
      <TrendingDown className="w-4 h-4" /> {status}
    </span>
  );
}

export default function AnalyticsSpendingPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10 w-full">
      {/* 1. Top Banner */}
      <motion.section
        className="bg-gradient-to-r from-emerald-700 via-blue-500 to-yellow-400 rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center gap-10 mb-10 shadow-xl"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex-1">
          <h1 className="text-2xl md:text-4xl font-black text-white mb-2 tracking-tight">
            Spending Patterns Analytics
          </h1>
          <p className="text-white/90 mb-2 max-w-2xl">
            Explore how users are spending—across categories, channels, and time. Analyze growth, identify trends, and spot outliers for better decision-making and risk management.
          </p>
          <div className="flex flex-wrap items-center gap-6 mt-2">
            {stats.map((stat) => (
              <span
                key={stat.label}
                className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl font-semibold text-yellow-50 text-lg drop-shadow"
              >
                {stat.icon}
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className="text-base text-white/70">{stat.label}</span>
              </span>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.55, type: "spring" }}
        >
          <ShoppingBag className="w-32 h-32 text-white/40" />
        </motion.div>
      </motion.section>

      {/* 2. Line Chart: Total Spend Over Time */}
      <motion.section
        className="bg-white rounded-3xl shadow-lg px-8 py-8 mb-12"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-bold text-xl text-emerald-800 mb-3">
          Total Spend Over Time
        </h2>
        <Line data={lineData} height={220} options={lineOptions} />
      </motion.section>

      {/* 3. Grid: Bar and Pie */}
      <section className="grid md:grid-cols-2 gap-8 mb-14">
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-5 flex flex-col items-center"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <h3 className="font-bold text-blue-700 text-md mb-3">
            Spend by Category
          </h3>
          <Bar data={barData} height={170} options={barOptions} />
        </motion.div>
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-5 flex flex-col items-center"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-bold text-blue-700 text-md mb-3">
            Spend by Channel
          </h3>
          <Pie data={pieData} height={170} options={{
            plugins: { legend: { position: "bottom" as const } }
          }} />
        </motion.div>
      </section>

      {/* 4. Table: Recent High-Value Transactions */}
      <section className="mb-14">
        <h2 className="font-bold text-2xl text-emerald-700 mb-5">
          Recent High-Value Transactions
        </h2>
        <div className="flex flex-col gap-6">
          {topTxns.map((txn) => (
            <div
              key={txn.id}
              className="flex items-center gap-5 bg-emerald-50/30 hover:bg-emerald-100/60 rounded-xl px-4 py-3 transition border border-emerald-100"
            >
              <img
                src={txn.avatar}
                alt={txn.user}
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                loading="lazy"
                onError={e => {
                  (e.target as HTMLImageElement).src = "https://randomuser.me/api/portraits/lego/1.jpg";
                }}
              />
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 items-center mb-1">
                  <span className="font-semibold text-emerald-900">{txn.user}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-700">{txn.nationality}</span>
                  <span className="text-xs rounded-full px-2 py-0.5 bg-blue-100 text-blue-700">{txn.category}</span>
                  <span className="text-xs bg-yellow-100 text-yellow-700 rounded-full px-2 py-0.5">{txn.channel}</span>
                  <span className="ml-2">{statusBadge(txn.status)}</span>
                </div>
                <div className="text-sm text-gray-700 flex gap-3">
                  <span className="font-mono text-blue-800">${txn.amount}</span>
                  <span className="text-xs text-blue-500">{txn.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Floating Compliance/Info Card */}
      <aside className="fixed bottom-8 right-8 bg-gradient-to-br from-emerald-400 to-blue-400 shadow-2xl text-white rounded-2xl px-6 py-5 w-[330px] z-20 border-2 border-emerald-200/60">
        <div className="font-bold text-lg mb-1">Spending Compliance Insights</div>
        <ul className="text-xs leading-relaxed list-disc pl-4">
          <li>Monitor category spikes for potential fraud or abuse.</li>
          <li>Track channel usage to optimize platform UX.</li>
          <li>Analyze failed transactions for operational risk.</li>
          <li>Regularly export spending logs for internal and regulatory review.</li>
        </ul>
      </aside>
    </main>
  );
}
