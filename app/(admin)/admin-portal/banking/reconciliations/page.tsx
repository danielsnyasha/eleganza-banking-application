"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { CheckCircle2, XCircle, AlertCircle, Search } from "lucide-react";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Dummy summary stats
const summary = {
  total: 3258,
  matched: 3140,
  unmatched: 92,
  inReview: 20,
  highRisk: 6,
};

// Reconciliation status by type (for stacked bar)
const reconciliationData = {
  labels: [
    "Bank Ledger",
    "Customer Deposits",
    "Outgoing Transfers",
    "FX",
    "Investment",
    "Other",
  ],
  datasets: [
    {
      label: "Matched",
      data: [620, 1085, 740, 430, 175, 90],
      backgroundColor: "#059669",
      stack: "Status",
    },
    {
      label: "Unmatched",
      data: [7, 28, 31, 17, 6, 3],
      backgroundColor: "#f87171",
      stack: "Status",
    },
    {
      label: "In Review",
      data: [2, 4, 6, 5, 2, 1],
      backgroundColor: "#fbbf24",
      stack: "Status",
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: "bottom" as const },
    tooltip: {},
  },
  scales: {
    x: {
      stacked: true,
      grid: { display: false },
      ticks: { font: { size: 13 } },
    },
    y: {
      stacked: true,
      beginAtZero: true,
      grid: { color: "#f3f4f6" },
      ticks: {
        callback: (value: number) => value,
      },
    },
  },
};

// Dummy reconciliation records
const reconciliations = [
  {
    id: "REC1001",
    type: "Bank Ledger",
    date: "2024-07-30 09:17",
    status: "Matched",
    detail: "General ledger matched to core banking",
  },
  {
    id: "REC1002",
    type: "Customer Deposit",
    date: "2024-07-30 09:21",
    status: "Unmatched",
    detail: "Deposit missing in external report",
  },
  {
    id: "REC1003",
    type: "FX",
    date: "2024-07-30 09:32",
    status: "Matched",
    detail: "FX ledger reconciled (USD-EUR)",
  },
  {
    id: "REC1004",
    type: "Outgoing Transfer",
    date: "2024-07-30 09:40",
    status: "In Review",
    detail: "Transfer amount discrepancy flagged",
  },
  {
    id: "REC1005",
    type: "Investment",
    date: "2024-07-30 09:47",
    status: "High Risk",
    detail: "Suspicious pattern in investment account",
  },
];

// Status badge colors/icons
const statusBadge = (status: string) => {
  if (status === "Matched")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium">
        <CheckCircle2 className="w-4 h-4" /> {status}
      </span>
    );
  if (status === "Unmatched")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-medium">
        <XCircle className="w-4 h-4" /> {status}
      </span>
    );
  if (status === "In Review")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
        <Search className="w-4 h-4" /> {status}
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">
      <AlertCircle className="w-4 h-4" /> High Risk
    </span>
  );
};

export default function ReconciliationsPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10 w-full">
      <motion.h1
        className="text-3xl md:text-4xl font-extrabold text-emerald-700 mb-2"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Reconciliations
      </motion.h1>
      <motion.p
        className="text-lg text-gray-700 mb-8 max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.12, duration: 0.7 }}
      >
        This section enables admins to monitor, review, and resolve reconciliation processes—ensuring every transaction, balance, and ledger entry aligns across internal and external sources.  
        <br /><br />
        <span className="font-semibold text-emerald-700">Key:</span>  
        Rapidly identify unmatched or high-risk records, power regulatory reports, and help support users by resolving discrepancies.
      </motion.p>

      {/* Summary Cards */}
      <section className="grid md:grid-cols-5 gap-5 mb-10">
        <Card className="bg-gradient-to-br from-emerald-600 via-emerald-400 to-green-300 text-white border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6" /> Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{summary.total.toLocaleString()}</p>
            <span className="text-xs opacity-90">Records</span>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Matched
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-emerald-700">{summary.matched}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" /> Unmatched
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-red-600">{summary.unmatched}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-yellow-600" /> In Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-yellow-700">{summary.inReview}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" /> High Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-orange-700">{summary.highRisk}</p>
          </CardContent>
        </Card>
      </section>

      {/* Chart */}
      <section className="mb-14">
        <Card className="border-0 rounded-2xl shadow-lg p-6">
          <CardHeader>
            <CardTitle className="text-emerald-700">Reconciliation Status by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar
              data={reconciliationData}
              height={220}
              options={chartOptions}
            />
          </CardContent>
        </Card>
      </section>

      {/* Reconciliation List */}
      <motion.section
        className="bg-white rounded-2xl shadow-xl p-8 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-xl md:text-2xl font-bold mb-7 text-emerald-700">
          Recent Reconciliations
        </h2>
        <div className="flex flex-col gap-5">
          {reconciliations.map((rec) => (
            <div
              key={rec.id}
              className="flex items-center gap-6 bg-emerald-50/40 hover:bg-emerald-100/40 rounded-xl px-4 py-3 transition"
            >
              <div className="flex flex-col items-center justify-center w-12">
                {rec.status === "Matched" ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                ) : rec.status === "Unmatched" ? (
                  <XCircle className="w-8 h-8 text-red-500" />
                ) : rec.status === "In Review" ? (
                  <Search className="w-8 h-8 text-yellow-500" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-orange-500" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="font-semibold text-emerald-900">{rec.type}</span>
                  <span className="text-xs text-gray-500 ml-2">{rec.date}</span>
                  <span className="ml-2">{statusBadge(rec.status)}</span>
                </div>
                <div className="text-sm text-gray-700 mt-0.5">
                  {rec.detail}
                </div>
                <div className="text-xs text-gray-500 mt-1 font-mono">ID: {rec.id}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
