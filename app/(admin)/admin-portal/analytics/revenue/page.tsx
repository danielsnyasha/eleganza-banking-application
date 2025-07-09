"use client";

import { motion } from "framer-motion";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
  ArcElement,
} from "chart.js";
import {
  Banknote,
  LineChart,
  TrendingUp,
  ReceiptText,
  Building2,
  User2,
  Users,
  Globe2,
} from "lucide-react";

// Chart.js setup
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

// --- DUMMY DATA ---

// 1. Summary
const revenueStats = [
  {
    label: "Total Revenue (YTD)",
    value: "$12,420,000",
    icon: <Banknote className="w-7 h-7 text-emerald-700" />,
  },
  {
    label: "This Month",
    value: "$1,080,500",
    icon: <TrendingUp className="w-7 h-7 text-blue-700" />,
  },
  {
    label: "Transactions",
    value: "184,500",
    icon: <ReceiptText className="w-7 h-7 text-yellow-500" />,
  },
];

// 2. Line Chart: Revenue by Month
const months = [
  "Aug 2023", "Sep", "Oct", "Nov", "Dec", "Jan 2024", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
];
const revenueByMonth = [
  810000, 875000, 923000, 970000, 1035000, 1109000, 1168000, 1203000, 1195000, 1205000, 1220000, 1242000,
];
const lineData = {
  labels: months,
  datasets: [
    {
      label: "Monthly Revenue",
      data: revenueByMonth,
      fill: true,
      borderColor: "#059669",
      backgroundColor: "rgba(16,185,129,0.09)",
      tension: 0.44,
      pointBackgroundColor: "#10b981",
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
      min: 700000,
      max: 1400000,
      ticks: {
        callback: function (
          this: any,
          tickValue: string | number
        ) {
          const n =
            typeof tickValue === "number"
              ? tickValue
              : Number(tickValue);
          return "$" + n.toLocaleString();
        },
      },
      grid: { color: "#e5e7eb" },
    },
    x: { grid: { color: "#f1f5f9" } },
  },
};

// 3. Stacked Bar Chart: Revenue Streams
const barData = {
  labels: months,
  datasets: [
    {
      label: "Interest",
      data: [350000, 370000, 390000, 402000, 430000, 458000, 482000, 495000, 488000, 500000, 512000, 530000],
      backgroundColor: "#0ea5e9",
      stack: "A",
    },
    {
      label: "Fees",
      data: [210000, 230000, 245000, 256000, 267000, 275000, 282000, 292000, 285000, 293000, 298000, 304000],
      backgroundColor: "#fbbf24",
      stack: "A",
    },
    {
      label: "Commissions",
      data: [150000, 157000, 161000, 168000, 172000, 176000, 179000, 183000, 187000, 190000, 192000, 195000],
      backgroundColor: "#059669",
      stack: "A",
    },
    {
      label: "FX",
      data: [100000, 118000, 127000, 144000, 175000, 200000, 226000, 238000, 250000, 220000, 213000, 213000],
      backgroundColor: "#a78bfa",
      stack: "A",
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
    y: {
      beginAtZero: true,
      ticks: {
        callback: function (
          this: any,
          tickValue: string | number
        ) {
          const n =
            typeof tickValue === "number"
              ? tickValue
              : Number(tickValue);
          return "$" + n.toLocaleString();
        },
      },
      grid: { color: "#f1f5f9" },
    },
    x: { stacked: true, grid: { color: "#f1f5f9" } },
  },
};

// 4. Pie: Revenue by Source
const pieData = {
  labels: ["Personal", "Business", "Corporate", "Government"],
  datasets: [
    {
      data: [3442000, 2920000, 3850000, 2418000],
      backgroundColor: [
        "#059669",
        "#2563eb",
        "#fbbf24",
        "#f43f5e",
      ],
      borderWidth: 2,
      borderColor: "#fff",
    },
  ],
};

// 5. Top Contributors Table
const contributors = [
  {
    name: "Skycatchfire Technologies",
    icon: <Building2 className="w-8 h-8 text-blue-600" />,
    sector: "Corporate",
    revenue: 1194000,
    country: "South Africa",
  },
  {
    name: "Ngoni Holdings",
    icon: <Building2 className="w-8 h-8 text-yellow-500" />,
    sector: "Business",
    revenue: 983000,
    country: "Zimbabwe",
  },
  {
    name: "Charlotte Müller",
    icon: <User2 className="w-8 h-8 text-emerald-500" />,
    sector: "Personal",
    revenue: 701000,
    country: "Germany",
  },
  {
    name: "Hiroko Nakamura",
    icon: <User2 className="w-8 h-8 text-purple-600" />,
    sector: "Personal",
    revenue: 635000,
    country: "Japan",
  },
  {
    name: "ZimGov Treasury",
    icon: <Building2 className="w-8 h-8 text-red-500" />,
    sector: "Government",
    revenue: 588000,
    country: "Zimbabwe",
  },
];

// --- COMPONENT ---
export default function AnalyticsRevenuePage() {
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
            Revenue Analytics
          </h1>
          <p className="text-white/90 mb-2 max-w-2xl">
            Get a complete view of how the bank is generating revenue, month by month and source by source. Drill down by stream, region, and client for deep financial insights and better strategy.
          </p>
          <div className="flex flex-wrap items-center gap-6 mt-2">
            {revenueStats.map((stat) => (
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
          <LineChart className="w-32 h-32 text-white/40" />
        </motion.div>
      </motion.section>

      {/* 2. Line Chart: Revenue Over Time */}
      <motion.section
        className="bg-white rounded-3xl shadow-lg px-8 py-8 mb-12"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-bold text-xl text-emerald-800 mb-3">
          Revenue Over the Last 12 Months
        </h2>
        <Line data={lineData} height={225} options={lineOptions} />
      </motion.section>

      {/* 3. Stacked Bar: Revenue Streams */}
      <motion.section
        className="bg-white rounded-3xl shadow-lg px-8 py-8 mb-12"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85 }}
      >
        <h2 className="font-bold text-xl text-blue-800 mb-4">
          Revenue Streams Breakdown
        </h2>
        <Bar data={barData} height={260} options={barOptions} />
      </motion.section>

      {/* 4. Grid: Pie + Contributors */}
      <section className="grid md:grid-cols-2 gap-8 mb-14">
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-5 flex flex-col items-center"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <h3 className="font-bold text-blue-700 text-md mb-3">
            Revenue by Source
          </h3>
          <Pie data={pieData} height={170} options={{
            plugins: { legend: { position: "bottom" as const } }
          }} />
        </motion.div>
        <motion.div
          className="bg-gradient-to-br from-blue-50 via-emerald-50 to-yellow-50 shadow-xl rounded-3xl p-6 flex flex-col items-center"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-bold text-emerald-700 text-md mb-3">
            Top Contributors
          </h3>
          <ul className="w-full flex flex-col gap-4">
            {contributors.map((c) => (
              <li key={c.name} className="flex items-center gap-4 bg-white/80 rounded-xl px-4 py-2 shadow hover:bg-emerald-50 transition">
                <span>{c.icon}</span>
                <div className="flex-1">
                  <div className="font-bold text-blue-900">{c.name}</div>
                  <div className="text-xs text-gray-600">{c.sector} • {c.country}</div>
                </div>
                <div className="font-mono text-emerald-700 text-lg font-bold">${c.revenue.toLocaleString()}</div>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* 5. Floating Compliance/Info Card */}
      <aside className="fixed bottom-8 right-8 bg-gradient-to-br from-emerald-400 to-blue-400 shadow-2xl text-white rounded-2xl px-6 py-5 w-[330px] z-20 border-2 border-emerald-200/60">
        <div className="font-bold text-lg mb-1">Revenue Compliance Insights</div>
        <ul className="text-xs leading-relaxed list-disc pl-4">
          <li>Track for anomalous spikes or drops in monthly revenue.</li>
          <li>Ensure compliance with tax and regulatory reporting.</li>
          <li>Analyze source mix to maintain financial resilience.</li>
          <li>Audit top contributors and revenue streams regularly.</li>
        </ul>
      </aside>
    </main>
  );
}
