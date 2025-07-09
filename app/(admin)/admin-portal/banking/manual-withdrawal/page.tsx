"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { User2, Building2, CheckCircle2, XCircle, Loader2, Banknote, Minus } from "lucide-react";

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

// Dummy summary stats
const summary = {
  total: 67,
  pending: 6,
  completed: 59,
  rejected: 2,
};

// Breakdown by method (Pie)
const pieData = {
  labels: ["Cash", "EFT", "Mobile Money", "Cheque", "Other"],
  datasets: [
    {
      data: [29, 20, 11, 5, 2],
      backgroundColor: [
        "#059669",
        "#2563eb",
        "#fbbf24",
        "#f87171",
        "#a3e635",
      ],
      borderColor: "#fff",
      borderWidth: 2,
    },
  ],
};

// Manual withdrawal trend over last 7 days
const trendData = {
  labels: [
    "Jul 24", "Jul 25", "Jul 26", "Jul 27", "Jul 28", "Jul 29", "Jul 30"
  ],
  datasets: [
    {
      label: "Manual Withdrawals",
      data: [8, 7, 6, 10, 13, 9, 14],
      fill: true,
      tension: 0.4,
      borderColor: "#059669",
      backgroundColor: "rgba(16,185,129,0.10)",
      pointRadius: 4,
      pointBackgroundColor: "#059669",
    },
  ],
};

// Dummy withdrawal records (mixed)
const withdrawals = [
  {
    id: "MWX1101",
    user: "Tendai Ncube",
    type: "Individual",
    amount: 120.0,
    currency: "USD",
    date: "2024-07-30 10:21",
    avatar: "https://randomuser.me/api/portraits/men/39.jpg",
    method: "Cash",
    status: "Completed",
    adminNote: "Cash paid out at Avondale branch",
  },
  {
    id: "MWX1102",
    user: "Sable Holdings Ltd.",
    type: "Corporate",
    amount: 2000.0,
    currency: "USD",
    date: "2024-07-30 10:42",
    avatar: "https://logo.clearbit.com/sable.co",
    method: "EFT",
    status: "Pending",
    adminNote: "Awaiting two-factor authorization",
  },
  {
    id: "MWX1103",
    user: "Violet Banda",
    type: "Individual",
    amount: 350.0,
    currency: "USD",
    date: "2024-07-30 11:04",
    avatar: "https://randomuser.me/api/portraits/women/47.jpg",
    method: "Mobile Money",
    status: "Completed",
    adminNote: "Sent via EcoCash",
  },
  {
    id: "MWX1104",
    user: "Nkomo Investments",
    type: "Corporate",
    amount: 8000.0,
    currency: "USD",
    date: "2024-07-30 11:17",
    avatar: "https://logo.clearbit.com/investec.com",
    method: "Cheque",
    status: "Rejected",
    adminNote: "Cheque not honored",
  },
  {
    id: "MWX1105",
    user: "Sam Phiri",
    type: "Individual",
    amount: 40.0,
    currency: "USD",
    date: "2024-07-30 11:30",
    avatar: "https://randomuser.me/api/portraits/men/43.jpg",
    method: "Other",
    status: "Completed",
    adminNote: "Manual ledger adjustment",
  },
];

// Status badge
function statusBadge(status: string) {
  if (status === "Completed")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium">
        <CheckCircle2 className="w-4 h-4" /> {status}
      </span>
    );
  if (status === "Pending")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
        <Loader2 className="w-4 h-4 animate-spin" /> {status}
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-medium">
      <XCircle className="w-4 h-4" /> {status}
    </span>
  );
}

export default function ManualWithdrawalPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10 w-full">
      <motion.h1
        className="text-3xl md:text-4xl font-extrabold text-emerald-700 mb-2"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Manual Withdrawals
      </motion.h1>
      <motion.p
        className="text-lg text-gray-700 mb-8 max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.12, duration: 0.7 }}
      >
        This section allows you to monitor, review, and control all withdrawals processed outside of regular automation—from branch cash payouts to high-value EFTs and corrections.  
        <br /><br />
        <span className="font-semibold text-emerald-700">Why is this important?</span>
        <br />
        Prevent fraud, ensure transparency, and resolve disputes for both individual and business accounts.
      </motion.p>

      {/* Summary Cards */}
      <section className="grid md:grid-cols-4 gap-5 mb-10">
        <Card className="bg-gradient-to-br from-emerald-600 via-emerald-400 to-green-300 text-white border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Banknote className="w-6 h-6" /> Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{summary.total}</p>
            <span className="text-xs opacity-90">Manual Withdrawals</span>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" /> Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-blue-700">{summary.pending}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-emerald-700">{summary.completed}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" /> Rejected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-red-700">{summary.rejected}</p>
          </CardContent>
        </Card>
      </section>

      {/* Charts */}
      <section className="grid md:grid-cols-2 gap-8 mb-14">
        <Card className="border-0 rounded-2xl shadow-lg p-4">
          <CardHeader>
            <CardTitle className="text-emerald-700">By Withdrawal Method</CardTitle>
          </CardHeader>
          <CardContent>
            <Pie
              data={pieData}
              height={190}
              options={{
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: { font: { size: 13 } },
                  },
                },
                cutout: 70,
              }}
            />
          </CardContent>
        </Card>
        <Card className="border-0 rounded-2xl shadow-lg p-4">
          <CardHeader>
            <CardTitle className="text-emerald-700">Weekly Manual Withdrawal Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <Line
              data={trendData}
              height={190}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                  x: { grid: { display: false }, ticks: { font: { size: 12 } } },
                  y: {
                    beginAtZero: true,
                    grid: { color: "#f3f4f6" },
                    ticks: { stepSize: 2 },
                  },
                },
              }}
            />
          </CardContent>
        </Card>
      </section>

      {/* Withdrawal List */}
      <motion.section
        className="bg-white rounded-2xl shadow-xl p-8 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-xl md:text-2xl font-bold mb-7 text-emerald-700">
          Recent Manual Withdrawals
        </h2>
        <div className="flex flex-col gap-5">
          {withdrawals.map((w) => (
            <div
              key={w.id}
              className="flex items-center gap-5 bg-emerald-50/40 hover:bg-emerald-100/40 rounded-xl px-4 py-3 transition"
            >
              <img
                src={w.avatar}
                alt={w.user}
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-200"
                loading="lazy"
                onError={e => {
                  // fallback if logo fails
                  (e.target as HTMLImageElement).src =
                    w.type === "Corporate"
                      ? "https://randomuser.me/api/portraits/lego/2.jpg"
                      : "https://randomuser.me/api/portraits/lego/1.jpg";
                }}
              />
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="font-semibold text-emerald-900">{w.user}</span>
                  <span
                    className="text-xs rounded-full px-2 py-0.5 ml-1 font-medium"
                    style={{
                      background:
                        w.type === "Individual"
                          ? "rgba(16,185,129,0.10)"
                          : "rgba(251,191,36,0.10)",
                      color:
                        w.type === "Individual"
                          ? "#059669"
                          : "#f59e42",
                    }}
                  >
                    {w.type}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    {w.date}
                  </span>
                  <span className="ml-2">{statusBadge(w.status)}</span>
                </div>
                <div className="text-sm text-gray-700">
                  Withdrawal ID: <span className="font-mono text-gray-900">{w.id}</span>
                  <span className="ml-2 text-xs text-blue-600">Method: {w.method}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {w.adminNote}
                </div>
              </div>
              <div className="text-right min-w-[120px]">
                <div className="text-lg font-bold text-emerald-700">
                  -${w.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  <span className="text-xs text-gray-600 ml-1">{w.currency}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
