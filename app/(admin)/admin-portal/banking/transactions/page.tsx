"use client";

import { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, ArcElement, Tooltip, Legend } from "chart.js";
import { User2, ArrowDownRight, ArrowUpRight, RefreshCw } from "lucide-react";

Chart.register(LineElement, PointElement, LinearScale, CategoryScale, ArcElement, Tooltip, Legend);

// Dummy data for summary stats
const summary = {
  total: 25723,
  today: 187,
  inflow: 1220050.36,
  outflow: 935740.12,
  fx: 271,
};

// Dummy transaction records
const transactions = [
  {
    id: "TX100456",
    user: "Nomvula Khumalo",
    type: "Deposit",
    amount: 600.0,
    currency: "USD",
    date: "2024-07-30 08:31",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    status: "Completed",
  },
  {
    id: "TX100457",
    user: "Sibusiso Mthembu",
    type: "Withdrawal",
    amount: 120.0,
    currency: "USD",
    date: "2024-07-30 08:39",
    avatar: "https://randomuser.me/api/portraits/men/49.jpg",
    status: "Completed",
  },
  {
    id: "TX100458",
    user: "Alice Smith",
    type: "FX Transfer",
    amount: 2100.0,
    currency: "USD",
    date: "2024-07-30 09:04",
    avatar: "https://randomuser.me/api/portraits/women/15.jpg",
    status: "Completed",
  },
  {
    id: "TX100459",
    user: "Levi Ndlovu",
    type: "Deposit",
    amount: 350.0,
    currency: "USD",
    date: "2024-07-30 09:11",
    avatar: "https://randomuser.me/api/portraits/men/13.jpg",
    status: "Pending",
  },
  {
    id: "TX100460",
    user: "Paula Borges",
    type: "Withdrawal",
    amount: 100.0,
    currency: "USD",
    date: "2024-07-30 09:27",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    status: "Failed",
  },
];

// Dummy trends for the last 7 days
const transactionTrends = {
  labels: [
    "Jul 24", "Jul 25", "Jul 26", "Jul 27", "Jul 28", "Jul 29", "Jul 30"
  ],
  datasets: [
    {
      label: "Transactions",
      data: [185, 192, 178, 210, 207, 188, 187],
      fill: true,
      tension: 0.4,
      borderColor: "#059669",
      backgroundColor: "rgba(16,185,129,0.07)",
      pointRadius: 4,
      pointBackgroundColor: "#059669",
    },
  ],
};

// Transaction type breakdown for doughnut chart
const typeBreakdown = {
  labels: ["Deposit", "Withdrawal", "FX Transfer"],
  datasets: [
    {
      data: [9500, 7650, 2573],
      backgroundColor: ["#059669", "#2563eb", "#fbbf24"],
      borderWidth: 2,
      borderColor: "#fff",
    },
  ],
};

export default function TransactionsPage() {
  // Calculate inflows/outflows for listing
  const inflowTotal = useMemo(() =>
    transactions.filter(tx => tx.type === "Deposit" || tx.type === "FX Transfer").reduce((sum, tx) => sum + tx.amount, 0), []);
  const outflowTotal = useMemo(() =>
    transactions.filter(tx => tx.type === "Withdrawal").reduce((sum, tx) => sum + tx.amount, 0), []);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 w-full">
      <motion.h1
        className="text-3xl md:text-4xl font-extrabold text-emerald-700 mb-2"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Transactions Overview
      </motion.h1>
      <motion.p
        className="text-lg text-gray-700 mb-8 max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.7 }}
      >
        This section lists all recent financial activities in the bank; including deposits, withdrawals, and FX transfers. Admins can review and manage these transactions, verify suspicious activity, and help support users when needed.  
        <br /><br />
        <span className="font-semibold text-emerald-700">Tip:</span>  
        The stats and charts here power the frontend for user statements, notifications, and compliance reporting.
      </motion.p>

      {/* Summary Cards */}
      <section className="grid md:grid-cols-5 gap-5 mb-10">
        <Card className="bg-gradient-to-br from-emerald-600 via-emerald-400 to-green-300 text-white border-0 shadow-lg rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5" /> Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{summary.total.toLocaleString()}</p>
            <span className="text-xs opacity-90">All time</span>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-md rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <ArrowUpRight className="w-5 h-5 text-green-600" /> Inflow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-emerald-700">${summary.inflow.toLocaleString()}</p>
            <span className="text-xs text-gray-500">Today</span>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-md rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <ArrowDownRight className="w-5 h-5 text-blue-600" /> Outflow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-blue-700">${summary.outflow.toLocaleString()}</p>
            <span className="text-xs text-gray-500">Today</span>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-md rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <User2 className="w-5 h-5 text-emerald-500" /> FX Deals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-yellow-500">{summary.fx}</p>
            <span className="text-xs text-gray-500">Today</span>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-md rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-gray-500" /> Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-gray-800">{summary.today}</p>
            <span className="text-xs text-gray-500">Transactions</span>
          </CardContent>
        </Card>
      </section>

      {/* Charts Section */}
      <section className="grid md:grid-cols-2 gap-7 mb-14">
        <Card className="border-0 rounded-2xl shadow-lg p-4">
          <CardHeader>
            <CardTitle className="text-emerald-700">7-Day Transaction Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={transactionTrends} height={180}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                  x: { grid: { display: false }, ticks: { font: { size: 12 } } },
                  y: {
                    beginAtZero: true,
                    grid: { color: "#f3f4f6" },
                    ticks: { stepSize: 20 },
                  },
                },
              }}
            />
          </CardContent>
        </Card>
        <Card className="border-0 rounded-2xl shadow-lg p-4">
          <CardHeader>
            <CardTitle className="text-emerald-700">By Transaction Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <Doughnut
                data={typeBreakdown}
                height={190}
                options={{
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: { font: { size: 13 } },
                    },
                  },
                  cutout: 64,
                }}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Transaction List */}
      <motion.section
        className="bg-white rounded-2xl shadow-xl p-7 md:p-10 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-emerald-700">
          Recent Transactions
        </h2>
        <div className="flex flex-col gap-5">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center gap-5 bg-emerald-50/40 hover:bg-emerald-100/40 rounded-xl px-4 py-3 transition"
            >
              <img
                src={tx.avatar}
                alt={tx.user}
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-200"
                loading="lazy"
              />
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="font-semibold text-emerald-900">{tx.user}</span>
                  <span className="text-xs rounded-full px-2 py-0.5 ml-1 font-medium"
                    style={{
                      background:
                        tx.type === "Deposit"
                          ? "rgba(16,185,129,0.10)"
                          : tx.type === "Withdrawal"
                          ? "rgba(59,130,246,0.10)"
                          : "rgba(251,191,36,0.14)",
                      color:
                        tx.type === "Deposit"
                          ? "#059669"
                          : tx.type === "Withdrawal"
                          ? "#2563eb"
                          : "#b45309",
                    }}
                  >
                    {tx.type}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">{tx.date}</span>
                  <span className={`
                    ml-2 px-2 py-0.5 rounded-full text-xs font-medium
                    ${tx.status === "Completed" ? "bg-emerald-100 text-emerald-700" : ""}
                    ${tx.status === "Pending" ? "bg-yellow-100 text-yellow-700" : ""}
                    ${tx.status === "Failed" ? "bg-red-100 text-red-700" : ""}
                  `}>
                    {tx.status}
                  </span>
                </div>
                <div className="text-sm text-gray-700">
                  Transaction ID: <span className="font-mono text-gray-900">{tx.id}</span>
                </div>
              </div>
              <div className="text-right min-w-[120px]">
                <div className={`text-lg font-bold
                  ${tx.type === "Deposit" || tx.type === "FX Transfer"
                    ? "text-emerald-600"
                    : "text-blue-700"}
                `}>
                  {tx.type === "Withdrawal" ? "-" : "+"}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  <span className="text-xs text-gray-600 ml-1">{tx.currency}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
