"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bar, Doughnut, Scatter } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
  ArcElement,
} from "chart.js";
import { CheckCircle2, Loader2, XCircle, AlertCircle, Banknote, ArrowRightLeft } from "lucide-react";

Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

// Dummy data
const summary = {
  totalTransfers: 742,
  totalValue: 894_500,
  completed: 682,
  pending: 37,
  failed: 18,
  flagged: 5,
};

// Horizontal Bar: Value by account type
const barData = {
  labels: ["Individuals", "Corporates", "Government", "External Banks"],
  datasets: [
    {
      label: "Transferred Value (USD)",
      data: [190000, 445000, 190000, 69500],
      backgroundColor: [
        "#059669",
        "#2563eb",
        "#fbbf24",
        "#f87171"
      ],
      borderRadius: 10,
      borderSkipped: false,
      barThickness: 36,
    },
  ],
};
const barOptions = {
  indexAxis: "y" as const,
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
    tooltip: {},
  },
  scales: {
    x: { beginAtZero: true, ticks: { callback: (v: number) => `$${v / 1000}k` } },
    y: { grid: { display: false } },
  },
};

// Doughnut: Status breakdown
const doughnutData = {
  labels: ["Completed", "Pending", "Failed", "Flagged"],
  datasets: [
    {
      data: [682, 37, 18, 5],
      backgroundColor: [
        "#059669",
        "#fbbf24",
        "#f87171",
        "#a21caf"
      ],
      borderWidth: 2,
      borderColor: "#fff",
    },
  ],
};

// Scatter: Amount vs processing time
const scatterData = {
  datasets: [
    {
      label: "Transfers",
      data: [
        { x: 300, y: 2 },
        { x: 12000, y: 8 },
        { x: 2500, y: 3.5 },
        { x: 55000, y: 24 },
        { x: 800, y: 1.7 },
        { x: 9900, y: 5.1 },
        { x: 95000, y: 35 },
        { x: 2100, y: 4 },
        { x: 3250, y: 2.7 },
        { x: 71500, y: 12 },
        { x: 1300, y: 3.1 },
        { x: 30000, y: 15 },
        { x: 4300, y: 5.5 },
      ],
      backgroundColor: "#2563eb88",
      pointRadius: 6,
      borderColor: "#2563eb",
    },
  ],
};
const scatterOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: { callbacks: {
      label: function(context: any) {
        return [
          `Amount: $${context.parsed.x.toLocaleString()}`,
          `Time: ${context.parsed.y} min`,
        ];
      }
    }},
  },
  scales: {
    x: {
      title: { display: true, text: "Amount (USD)" },
      beginAtZero: true,
      grid: { color: "#f3f4f6" },
    },
    y: {
      title: { display: true, text: "Processing Time (min)" },
      beginAtZero: true,
      grid: { color: "#f3f4f6" },
      max: 40,
    },
  },
};

// Dummy recent transfers
const transfers = [
  {
    id: "TX10012",
    from: "Central Bank of Zimbabwe",
    fromType: "Government",
    avatar: "https://logo.clearbit.com/reservebank.co.zw",
    to: "Sky Trading Ltd.",
    toType: "Corporate",
    amount: 45000,
    currency: "USD",
    date: "2024-07-30 10:19",
    status: "Completed",
    method: "RTGS",
    compliance: "Standard",
  },
  {
    id: "TX10013",
    from: "Tendai Ncube",
    fromType: "Individual",
    avatar: "https://randomuser.me/api/portraits/men/77.jpg",
    to: "EcoCash Merchant",
    toType: "External Bank",
    amount: 620,
    currency: "USD",
    date: "2024-07-30 11:01",
    status: "Pending",
    method: "Mobile",
    compliance: "Waiting for confirmation",
  },
  {
    id: "TX10014",
    from: "Sable Holdings Ltd.",
    fromType: "Corporate",
    avatar: "https://logo.clearbit.com/sable.co",
    to: "Harare City Council",
    toType: "Government",
    amount: 15400,
    currency: "USD",
    date: "2024-07-30 10:40",
    status: "Completed",
    method: "EFT",
    compliance: "Standard",
  },
  {
    id: "TX10015",
    from: "Simba Moyo",
    fromType: "Individual",
    avatar: "https://randomuser.me/api/portraits/men/90.jpg",
    to: "NetOne",
    toType: "External Bank",
    amount: 310,
    currency: "USD",
    date: "2024-07-30 09:54",
    status: "Failed",
    method: "Mobile",
    compliance: "Account number error",
  },
  {
    id: "TX10016",
    from: "Nkomo Investments",
    fromType: "Corporate",
    avatar: "https://logo.clearbit.com/investec.com",
    to: "EcoBank",
    toType: "External Bank",
    amount: 86000,
    currency: "USD",
    date: "2024-07-30 08:51",
    status: "Flagged",
    method: "EFT",
    compliance: "Unusual pattern, review required",
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
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
        <Loader2 className="w-4 h-4 animate-spin" /> {status}
      </span>
    );
  if (status === "Failed")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-medium">
        <XCircle className="w-4 h-4" /> {status}
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-fuchsia-100 text-fuchsia-800 text-xs font-medium">
      <AlertCircle className="w-4 h-4" /> {status}
    </span>
  );
}

export default function PaymentsTransfersPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10 w-full">
      <motion.h1
        className="text-3xl md:text-4xl font-extrabold text-emerald-700 mb-3"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Payments &rarr; Transfers
      </motion.h1>
      <motion.p
        className="text-lg text-gray-700 mb-8 max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.12, duration: 0.7 }}
      >
        Review, audit and track all outgoing and incoming transfers for individuals, companies, government accounts, and external banks. Instantly visualize transfer volume, processing times, and risk indicators.  
        <br /><br />
        <span className="font-semibold text-emerald-700">Why does this matter?</span>
        <br />
        Improve compliance and risk oversight, investigate flagged/failed items, and support customer-facing teams to resolve issues faster.
      </motion.p>

      {/* Summary Cards */}
      <section className="grid md:grid-cols-6 gap-5 mb-8">
        <Card className="bg-gradient-to-br from-emerald-600 via-emerald-400 to-green-300 text-white border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRightLeft className="w-6 h-6" /> Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{summary.totalTransfers}</p>
            <span className="text-xs opacity-90">Transfers</span>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-md rounded-2xl col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Banknote className="w-5 h-5 text-emerald-600" /> Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-emerald-700">${summary.totalValue.toLocaleString()}</p>
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
              <Loader2 className="w-5 h-5 text-yellow-600 animate-spin" /> Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-yellow-700">{summary.pending}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" /> Failed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-red-700">{summary.failed}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-fuchsia-700" /> Flagged
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-fuchsia-700">{summary.flagged}</p>
          </CardContent>
        </Card>
      </section>

      {/* Different Graphs */}
      <section className="grid md:grid-cols-3 gap-8 mb-14">
        <Card className="border-0 rounded-2xl shadow-lg p-5 flex flex-col">
          <CardHeader>
            <CardTitle className="text-emerald-700">Transferred Value by Account Type</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar
              data={barData}
              height={230}
              options={barOptions}
            />
          </CardContent>
        </Card>
        <Card className="border-0 rounded-2xl shadow-lg p-5 flex flex-col">
          <CardHeader>
            <CardTitle className="text-emerald-700">Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <Doughnut
              data={doughnutData}
              height={210}
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
        <Card className="border-0 rounded-2xl shadow-lg p-5 flex flex-col">
          <CardHeader>
            <CardTitle className="text-emerald-700">Amount vs. Processing Time</CardTitle>
          </CardHeader>
          <CardContent>
            <Scatter
              data={scatterData}
              height={210}
              options={scatterOptions}
            />
          </CardContent>
        </Card>
      </section>

      {/* Transfer List */}
      <motion.section
        className="bg-white rounded-2xl shadow-xl p-8 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-xl md:text-2xl font-bold mb-7 text-emerald-700">
          Recent Transfers
        </h2>
        <div className="flex flex-col gap-5">
          {transfers.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-5 bg-emerald-50/40 hover:bg-emerald-100/40 rounded-xl px-4 py-3 transition"
            >
              <img
                src={t.avatar}
                alt={t.from}
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-200"
                loading="lazy"
                onError={e => {
                  (e.target as HTMLImageElement).src =
                    t.fromType === "Corporate" || t.fromType === "Government"
                      ? "https://randomuser.me/api/portraits/lego/2.jpg"
                      : "https://randomuser.me/api/portraits/lego/1.jpg";
                }}
              />
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="font-semibold text-emerald-900">{t.from}</span>
                  <span className="text-xs rounded-full px-2 py-0.5 ml-1 font-medium"
                    style={{
                      background:
                        t.fromType === "Individual"
                          ? "rgba(16,185,129,0.10)"
                          : t.fromType === "Corporate"
                          ? "rgba(37,99,235,0.08)"
                          : t.fromType === "Government"
                          ? "rgba(251,191,36,0.10)"
                          : "rgba(236,72,153,0.09)",
                      color:
                        t.fromType === "Individual"
                          ? "#059669"
                          : t.fromType === "Corporate"
                          ? "#2563eb"
                          : t.fromType === "Government"
                          ? "#fbbf24"
                          : "#ec4899",
                    }}
                  >{t.fromType}</span>
                  <ArrowRightLeft className="w-4 h-4 text-gray-500" />
                  <span className="font-semibold text-emerald-900">{t.to}</span>
                  <span className="text-xs rounded-full px-2 py-0.5 ml-1 font-medium"
                    style={{
                      background:
                        t.toType === "Individual"
                          ? "rgba(16,185,129,0.10)"
                          : t.toType === "Corporate"
                          ? "rgba(37,99,235,0.08)"
                          : t.toType === "Government"
                          ? "rgba(251,191,36,0.10)"
                          : "rgba(236,72,153,0.09)",
                      color:
                        t.toType === "Individual"
                          ? "#059669"
                          : t.toType === "Corporate"
                          ? "#2563eb"
                          : t.toType === "Government"
                          ? "#fbbf24"
                          : "#ec4899",
                    }}
                  >{t.toType}</span>
                  <span className="text-xs text-gray-500 ml-2">{t.date}</span>
                  <span className="ml-2">{statusBadge(t.status)}</span>
                </div>
                <div className="text-sm text-gray-700">
                  Transfer ID: <span className="font-mono text-gray-900">{t.id}</span>
                  <span className="ml-2 text-xs text-blue-600">Method: {t.method}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Compliance: <span className={t.status === "Flagged" ? "text-fuchsia-700 font-semibold" : ""}>{t.compliance}</span>
                </div>
              </div>
              <div className="text-right min-w-[120px]">
                <div className="text-lg font-bold text-emerald-700">
                  ${t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  <span className="text-xs text-gray-600 ml-1">{t.currency}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
