"use client";

import { motion } from "framer-motion";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  ChartOptions,
} from "chart.js";
import { Banknote, Users2, AlertTriangle, TrendingUp, CheckCircle2, XCircle, MapPin } from "lucide-react";

// Chart.js registration
Chart.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

// --- IMAGES ---
const heroImg =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80";

// --- HEADLINE STATS ---
const stats = [
  {
    label: "Total Portfolio",
    value: "$5,340,000",
    icon: <Banknote className="w-6 h-6 text-emerald-700" />,
    desc: "Outstanding principal across all loans",
    bg: "from-blue-100 via-blue-200 to-blue-400",
  },
  {
    label: "Performing Loans",
    value: "94.2%",
    icon: <CheckCircle2 className="w-6 h-6 text-emerald-700" />,
    desc: "Loans not in default or arrears",
    bg: "from-emerald-100 via-emerald-200 to-emerald-400",
  },
  {
    label: "Non-performing",
    value: "5.8%",
    icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
    desc: "Loans in arrears or default",
    bg: "from-red-100 via-red-200 to-red-400",
  },
  {
    label: "Loans Issued",
    value: "1,127",
    icon: <Users2 className="w-6 h-6 text-yellow-500" />,
    desc: "Active and historical loans",
    bg: "from-yellow-100 via-yellow-200 to-yellow-400",
  },
  {
    label: "Portfolio Yield",
    value: "9.1%",
    icon: <TrendingUp className="w-6 h-6 text-blue-700" />,
    desc: "Annualized average interest",
    bg: "from-blue-100 via-blue-200 to-blue-500",
  },
  {
    label: "Delinquency Rate",
    value: "3.7%",
    icon: <XCircle className="w-6 h-6 text-red-700" />,
    desc: "30+ days past due",
    bg: "from-emerald-100 via-red-100 to-red-300",
  },
];

// --- DONUT: Portfolio allocation by loan type ---
const donutData = {
  labels: ["Personal", "Business", "Auto", "Mortgage", "Education"],
  datasets: [
    {
      data: [350, 280, 115, 170, 212],
      backgroundColor: [
        "#059669", // emerald
        "#2563eb", // blue
        "#fbbf24", // gold
        "#a21caf", // purple
        "#ea580c", // orange
      ],
      borderWidth: 2,
      borderColor: "#fff",
    },
  ],
};

// --- REGIONAL DISTRIBUTION ---
const regions = [
  { region: "New York", count: 333 },
  { region: "Las Vegas", count: 141 },
  { region: "Atlanta", count: 91 },
  { region: "Alabama", count: 67 },
  { region: "Alaska", count: 53 },
];

// --- LINE CHART: Delinquency and Yield trends ---
const lineData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Delinquency Rate (%)",
      data: [3.8, 4.1, 3.9, 4.2, 3.6, 3.5, 3.7],
      borderColor: "#ef4444",
      backgroundColor: "rgba(239,68,68,0.13)",
      tension: 0.32,
      fill: true,
      yAxisID: "y",
    },
    {
      label: "Portfolio Yield (%)",
      data: [8.7, 8.8, 8.9, 9.1, 9.0, 9.2, 9.1],
      borderColor: "#2563eb",
      backgroundColor: "rgba(37,99,235,0.12)",
      tension: 0.28,
      fill: true,
      yAxisID: "y1",
    },
  ],
};

// --- LINE CHART OPTIONS: Fix ticks callback signature for TypeScript ---
const lineOptions: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: { position: "bottom" },
    title: { display: false },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
      beginAtZero: true,
      min: 0,
      max: 6,
      ticks: {
        stepSize: 1,
        callback: (tickValue) =>
          typeof tickValue === "number" ? `${tickValue}%` : `${tickValue}`,
      },
      grid: { color: "#f3f4f6" },
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
      beginAtZero: false,
      min: 8,
      max: 10,
      ticks: {
        stepSize: 0.5,
        callback: (tickValue) =>
          typeof tickValue === "number" ? `${tickValue}%` : `${tickValue}`,
      },
      grid: { drawOnChartArea: false },
    },
    x: { grid: { color: "#f3f4f6" } },
  },
};

// --- RECENT LOANS TABLE ---
const loans = [
  {
    id: "LN0041",
    user: "Tendai Ncube",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    type: "Personal",
    region: "Harare",
    principal: 5200,
    rate: 11.4,
    issued: "2023-06-04",
    status: "Performing",
    nextDue: "2024-08-10",
  },
  {
    id: "LN0042",
    user: "John Smith",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    type: "Mortgage",
    region: "Gweru",
    principal: 74000,
    rate: 8.2,
    issued: "2022-11-14",
    status: "Non-performing",
    nextDue: "2024-07-28",
  },
  {
    id: "LN0043",
    user: "Chen Lei",
    avatar: "https://randomuser.me/api/portraits/men/86.jpg",
    type: "Business",
    region: "Harare",
    principal: 18700,
    rate: 9.6,
    issued: "2024-02-19",
    status: "Performing",
    nextDue: "2024-08-02",
  },
  {
    id: "LN0044",
    user: "Chipo Dube",
    avatar: "https://randomuser.me/api/portraits/women/23.jpg",
    type: "Education",
    region: "Bulawayo",
    principal: 3200,
    rate: 10.1,
    issued: "2024-03-11",
    status: "Performing",
    nextDue: "2024-08-07",
  },
  {
    id: "LN0045",
    user: "Hiro Tanaka",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    type: "Auto",
    region: "Mutare",
    principal: 8900,
    rate: 7.5,
    issued: "2023-10-24",
    status: "Non-performing",
    nextDue: "2024-07-27",
  },
];

// --- STATUS BADGE ---
function statusBadge(status: string) {
  if (status === "Performing")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-medium">
        <CheckCircle2 className="w-4 h-4" /> {status}
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-100 text-red-700 text-xs font-medium">
      <XCircle className="w-4 h-4" /> {status}
    </span>
  );
}

export default function LoansPortfolioPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10 w-full">
      {/* 1. Hero section */}
      <motion.section
        className="flex flex-col md:flex-row items-center gap-10 rounded-2xl bg-gradient-to-br from-blue-50 via-emerald-100 to-yellow-100 shadow-xl px-8 py-8 mb-10"
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl md:text-4xl font-black text-emerald-700 tracking-tight">
            Loans Portfolio
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl">
            See all outstanding, performing, and at-risk loans at a glance. Track yield, monitor risks, and understand regional and product mix trends. 
            <br />
            <span className="font-semibold text-blue-700">A well-managed portfolio is the backbone of your bank’s profitability and resilience.</span>
          </p>
        </div>
        <img
          src={heroImg}
          alt="Loan portfolio"
          className="w-[330px] h-[180px] object-cover rounded-xl shadow-lg border-2 border-blue-100"
        />
      </motion.section>

      {/* 2. Headline Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`flex flex-col gap-2 items-start p-5 rounded-xl shadow bg-gradient-to-br ${s.bg} border-0 min-h-[116px]`}
          >
            <div>{s.icon}</div>
            <div className="text-2xl font-bold text-emerald-900">{s.value}</div>
            <div className="font-semibold text-gray-700">{s.label}</div>
            <div className="text-xs text-gray-500">{s.desc}</div>
          </div>
        ))}
      </section>

      {/* 3. Visuals Row: Donut, Regions, Line */}
      <section className="grid md:grid-cols-3 gap-8 mb-14">
        {/* Donut */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <h2 className="font-bold text-lg text-blue-700 mb-4">Portfolio by Loan Type</h2>
          <Doughnut
            data={donutData}
            height={190}
            options={{
              plugins: {
                legend: {
                  position: "bottom" as const,
                  labels: { font: { size: 13 } },
                },
              },
              cutout: 70,
            }}
          />
        </div>
        {/* Regions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
          <h2 className="font-bold text-lg text-blue-700 mb-4">Regional Distribution</h2>
          <div className="flex flex-col gap-2 mt-4">
            {regions.map((r) => (
              <div key={r.region} className="flex items-center gap-4">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span className="font-medium w-32">{r.region}</span>
                <div className="flex-1 h-2 bg-blue-100 rounded-full mr-3">
                  <div
                    className="h-2 rounded-full transition-all bg-gradient-to-r from-emerald-400 to-blue-500"
                    style={{
                      width: `${(r.count / regions[0].count) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-xs text-gray-700 font-mono">{r.count}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Line chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
          <h2 className="font-bold text-lg text-blue-700 mb-4">Delinquency & Yield Trends</h2>
          <Line data={lineData} height={160} options={lineOptions} />
        </div>
      </section>

      {/* 4. Curated Loans Table */}
      <section>
        <h2 className="font-bold text-xl text-emerald-800 mb-5">Sample Loans Overview</h2>
        <div className="bg-white rounded-xl shadow-md p-4 overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-xs text-gray-600 uppercase border-b">
                <th className="py-2">Borrower</th>
                <th className="py-2">Type</th>
                <th className="py-2">Region</th>
                <th className="py-2">Principal</th>
                <th className="py-2">Rate (%)</th>
                <th className="py-2">Issued</th>
                <th className="py-2">Status</th>
                <th className="py-2">Next Due</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((ln) => (
                <tr key={ln.id} className="border-b last:border-0">
                  <td className="py-2 flex items-center gap-2">
                    <img
                      src={ln.avatar}
                      alt={ln.user}
                      className="w-8 h-8 rounded-full border border-blue-100"
                    />
                    <span className="font-semibold">{ln.user}</span>
                  </td>
                  <td className="py-2">{ln.type}</td>
                  <td className="py-2">{ln.region}</td>
                  <td className="py-2 font-mono">${ln.principal.toLocaleString()}</td>
                  <td className="py-2">{ln.rate}</td>
                  <td className="py-2">{ln.issued}</td>
                  <td className="py-2">{statusBadge(ln.status)}</td>
                  <td className="py-2">{ln.nextDue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
