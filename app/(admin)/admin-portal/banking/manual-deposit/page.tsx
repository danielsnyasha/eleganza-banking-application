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
import { User2, Building2, CheckCircle2, XCircle, Loader2, Banknote, Plus } from "lucide-react";

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
  total: 129,
  pending: 8,
  completed: 117,
  rejected: 4,
};

// Breakdown by method (Pie)
const pieData = {
  labels: ["Cash", "EFT", "Mobile Money", "Cheque", "Other"],
  datasets: [
    {
      data: [52, 35, 28, 7, 7],
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

// Manual deposit trend over last 7 days
const trendData = {
  labels: [
    "Jul 24", "Jul 25", "Jul 26", "Jul 27", "Jul 28", "Jul 29", "Jul 30"
  ],
  datasets: [
    {
      label: "Manual Deposits",
      data: [15, 17, 13, 18, 21, 19, 26],
      fill: true,
      tension: 0.4,
      borderColor: "#059669",
      backgroundColor: "rgba(16,185,129,0.10)",
      pointRadius: 4,
      pointBackgroundColor: "#059669",
    },
  ],
};

// Dummy deposit records (mixed)
const deposits = [
  {
    id: "MDX0234",
    user: "Tendai Ncube",
    type: "Individual",
    amount: 180.0,
    currency: "USD",
    date: "2024-07-30 08:21",
    avatar: "https://randomuser.me/api/portraits/men/31.jpg",
    method: "Cash",
    status: "Completed",
    adminNote: "Cash deposited at branch",
  },
  {
    id: "MDX0235",
    user: "Sable Holdings Ltd.",
    type: "Corporate",
    amount: 3500.0,
    currency: "USD",
    date: "2024-07-30 08:32",
    avatar: "https://logo.clearbit.com/sable.co",
    method: "EFT",
    status: "Pending",
    adminNote: "Awaiting clearance",
  },
  {
    id: "MDX0236",
    user: "Violet Banda",
    type: "Individual",
    amount: 420.0,
    currency: "USD",
    date: "2024-07-30 09:04",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    method: "Mobile Money",
    status: "Completed",
    adminNote: "EcoCash top-up verified",
  },
  {
    id: "MDX0237",
    user: "Nkomo Investments",
    type: "Corporate",
    amount: 9500.0,
    currency: "USD",
    date: "2024-07-30 09:17",
    avatar: "https://logo.clearbit.com/investec.com",
    method: "Cheque",
    status: "Rejected",
    adminNote: "Cheque bounced",
  },
  {
    id: "MDX0238",
    user: "Sam Phiri",
    type: "Individual",
    amount: 70.0,
    currency: "USD",
    date: "2024-07-30 09:30",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    method: "Other",
    status: "Completed",
    adminNote: "Manual adjustment",
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

export default function ManualDepositPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10 w-full">
      <motion.h1
        className="text-3xl md:text-4xl font-extrabold text-emerald-700 mb-2"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Manual Deposits
      </motion.h1>
      <motion.p
        className="text-lg text-gray-700 mb-8 max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.12, duration: 0.7 }}
      >
        Here you can manage and review all manual deposits; covering both individuals and corporate clients. Admins can track cash-ins, EFTs, cheques, and any adjustment made outside regular automation.  
        <br /><br />
        <span className="font-semibold text-emerald-700">How does this help?</span>
        <br />
        Ensure transparency and compliance, resolve deposit disputes, and provide rapid support to the frontend banking team.
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
            <span className="text-xs opacity-90">Manual Deposits</span>
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
            <CardTitle className="text-emerald-700">By Deposit Method</CardTitle>
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
            <CardTitle className="text-emerald-700">Weekly Manual Deposit Trend</CardTitle>
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
                    ticks: { stepSize: 5 },
                  },
                },
              }}
            />
          </CardContent>
        </Card>
      </section>

      {/* Deposit List */}
      <motion.section
        className="bg-white rounded-2xl shadow-xl p-8 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-xl md:text-2xl font-bold mb-7 text-emerald-700">
          Recent Manual Deposits
        </h2>
        <div className="flex flex-col gap-5">
          {deposits.map((dep) => (
            <div
              key={dep.id}
              className="flex items-center gap-5 bg-emerald-50/40 hover:bg-emerald-100/40 rounded-xl px-4 py-3 transition"
            >
              <img
                src={dep.avatar}
                alt={dep.user}
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-200"
                loading="lazy"
                onError={e => {
                  // fallback if logo fails
                  (e.target as HTMLImageElement).src =
                    dep.type === "Corporate"
                      ? "https://randomuser.me/api/portraits/lego/2.jpg"
                      : "https://randomuser.me/api/portraits/lego/1.jpg";
                }}
              />
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="font-semibold text-emerald-900">{dep.user}</span>
                  <span
                    className="text-xs rounded-full px-2 py-0.5 ml-1 font-medium"
                    style={{
                      background:
                        dep.type === "Individual"
                          ? "rgba(16,185,129,0.10)"
                          : "rgba(251,191,36,0.10)",
                      color:
                        dep.type === "Individual"
                          ? "#059669"
                          : "#f59e42",
                    }}
                  >
                    {dep.type}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    {dep.date}
                  </span>
                  <span className="ml-2">{statusBadge(dep.status)}</span>
                </div>
                <div className="text-sm text-gray-700">
                  Deposit ID: <span className="font-mono text-gray-900">{dep.id}</span>
                  <span className="ml-2 text-xs text-blue-600">Method: {dep.method}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {dep.adminNote}
                </div>
              </div>
              <div className="text-right min-w-[120px]">
                <div className="text-lg font-bold text-emerald-700">
                  +${dep.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  <span className="text-xs text-gray-600 ml-1">{dep.currency}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
