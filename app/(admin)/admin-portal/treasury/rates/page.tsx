"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
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
  Filler,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import {
  TrendingUp,
  TrendingDown,
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  PiggyBank,
  Building,
  UserCircle2,
  Globe,
} from "lucide-react";

Chart.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  Filler
);

// --- KPI STATS ---
const stats = [
  {
    label: "Prime Lending Rate",
    value: "9.25%",
    icon: <TrendingUp className="w-6 h-6 text-blue-700" />,
    desc: "Base rate for top clients",
    bg: "from-blue-100 via-blue-200 to-blue-300",
  },
  {
    label: "Savings Rate (Avg.)",
    value: "3.10%",
    icon: <PiggyBank className="w-6 h-6 text-emerald-700" />,
    desc: "Avg. across all accounts",
    bg: "from-emerald-100 via-emerald-200 to-emerald-400",
  },
  {
    label: "Overdraft Rate",
    value: "13.50%",
    icon: <TrendingDown className="w-6 h-6 text-yellow-700" />,
    desc: "Rate for overdrafts",
    bg: "from-yellow-100 via-yellow-200 to-yellow-300",
  },
  {
    label: "Corporate Loan Rate",
    value: "8.60%",
    icon: <Building className="w-6 h-6 text-purple-700" />,
    desc: "Medium & large corporates",
    bg: "from-purple-100 via-purple-200 to-purple-400",
  },
  {
    label: "Government Borrowing",
    value: "7.85%",
    icon: <Globe className="w-6 h-6 text-fuchsia-700" />,
    desc: "Public sector rate",
    bg: "from-fuchsia-100 via-fuchsia-200 to-fuchsia-300",
  },
];

// --- Pie chart: customer base composition ---
const pieData = {
  labels: ["Individuals", "Corporates", "Government"],
  datasets: [
    {
      data: [59, 31, 10],
      backgroundColor: ["#0ea5e9", "#8b5cf6", "#eab308"],
      borderWidth: 2,
      borderColor: "#fff",
    },
  ],
};
const pieOptions = {
  plugins: {
    legend: { position: "bottom" as const, labels: { font: { size: 13 } } },
  },
  cutout: 58,
};

// --- Line Chart: rates trend ---
const months = [
  "Jul 23", "Aug 23", "Sep 23", "Oct 23", "Nov 23", "Dec 23",
  "Jan 24", "Feb 24", "Mar 24", "Apr 24", "May 24", "Jun 24", "Jul 24"
];
const lineData = {
  labels: months,
  datasets: [
    {
      label: "Prime Lending Rate",
      data: [8.75, 8.9, 9.0, 9.15, 9.25, 9.25, 9.15, 9.15, 9.10, 9.10, 9.15, 9.25, 9.25],
      borderColor: "#0ea5e9",
      backgroundColor: "rgba(14,165,233,0.11)",
      fill: true,
      tension: 0.4,
    },
    {
      label: "Savings Rate (Avg.)",
      data: [2.90, 2.95, 3.00, 3.05, 3.08, 3.11, 3.15, 3.12, 3.09, 3.08, 3.08, 3.09, 3.10],
      borderColor: "#059669",
      backgroundColor: "rgba(16,185,129,0.12)",
      fill: true,
      tension: 0.35,
    },
    {
      label: "Overdraft Rate",
      data: [13.0, 13.15, 13.3, 13.35, 13.4, 13.45, 13.50, 13.50, 13.50, 13.50, 13.50, 13.50, 13.50],
      borderColor: "#eab308",
      backgroundColor: "rgba(251,191,36,0.12)",
      fill: true,
      tension: 0.34,
    },
  ],
};
const lineOptions = {
  responsive: true,
  plugins: {
    legend: { position: "bottom" as const },
    title: { display: false },
  },
  scales: {
    y: {
      min: 2,
      max: 14,
      beginAtZero: false,
      ticks: {
        callback: (v: number) => `${v.toFixed(2)}%`,
      },
      grid: { color: "#f1f5f9" },
    },
    x: { grid: { color: "#f1f5f9" } },
  },
};

// --- Animated KPI Bar ---
function MotionKPIBar() {
  const controls = useAnimation();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapperRef, { once: false, amount: 0.6 });

  useEffect(() => {
    if (!wrapperRef.current) return;
    if (window.innerWidth < 640) return;

    const animate = async () => {
      const totalWidth = wrapperRef.current?.scrollWidth || 900;
      const visibleWidth = wrapperRef.current?.offsetWidth || 900;
      const distance = totalWidth - visibleWidth;

      if (distance <= 0) return;

      while (true) {
        await controls.start({
          x: -distance,
          transition: { duration: 13, ease: "linear" },
        });
        await controls.start({
          x: 0,
          transition: { duration: 0, ease: "linear" },
        });
      }
    };

    if (inView) {
      animate();
    } else {
      controls.stop();
    }
    // eslint-disable-next-line
  }, [inView, controls]);

  return (
    <div className="relative w-full mb-8 pb-2 select-none">
      <div ref={wrapperRef} className="overflow-hidden" style={{ width: "100%" }}>
        <motion.div
          className="flex gap-6 min-w-[900px] md:min-w-full"
          animate={controls}
          initial={{ x: 0 }}
        >
          {stats.concat(stats.slice(0, 2)).map((stat, idx) => (
            <div
              key={`${stat.label}-${idx}`}
              className={`min-w-[180px] flex flex-col items-center rounded-2xl bg-gradient-to-br ${stat.bg} px-6 py-5 shadow-lg border-0`}
            >
              <div className="mb-2">{stat.icon}</div>
              <span className="font-extrabold text-xl text-emerald-900 mb-1">{stat.value}</span>
              <span className="text-md text-gray-700">{stat.label}</span>
              <span className="text-xs text-gray-500">{stat.desc}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// --- Rate Table Data ---
const rateTable = [
  {
    category: "Individuals",
    icon: <UserCircle2 className="w-6 h-6 text-blue-700" />,
    rates: [
      { label: "Savings (Standard)", value: "3.00%" },
      { label: "Term Deposit (12m)", value: "4.25%" },
      { label: "Personal Loan", value: "10.20%" },
      { label: "Home Loan", value: "8.95%" },
      { label: "Overdraft", value: "13.50%" },
    ],
  },
  {
    category: "Corporates",
    icon: <Building className="w-6 h-6 text-purple-700" />,
    rates: [
      { label: "Business Loan", value: "8.60%" },
      { label: "Overdraft", value: "12.00%" },
      { label: "Working Capital", value: "8.90%" },
      { label: "Term Deposit (12m)", value: "4.40%" },
    ],
  },
  {
    category: "Government",
    icon: <Globe className="w-6 h-6 text-fuchsia-700" />,
    rates: [
      { label: "Government Borrowing", value: "7.85%" },
      { label: "Treasury Bill", value: "5.15%" },
      { label: "Infrastructure Loan", value: "7.60%" },
    ],
  },
];

export default function TreasuryRatesPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10 w-full">
      {/* 1. Page intro */}
      <section className="mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-blue-800 mb-2 tracking-tight">
          Interest Rates Overview
        </h1>
        <p className="text-gray-700 text-base md:text-lg max-w-3xl">
          View and manage Eleganza Bank’s published interest rates for all product lines. Track changes, analyze the impact, and compare rates across individuals, corporates, and government segments.<br />
          <span className="font-semibold text-emerald-700">
            Interest rates drive bank profitability, customer choice, and risk appetite. Stay ahead by monitoring them closely.
          </span>
        </p>
      </section>

      {/* 2. Animated KPIs */}
      <MotionKPIBar />

      {/* 3. Trend and breakdown */}
      <section className="grid md:grid-cols-2 gap-10 mb-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <h2 className="font-bold text-lg text-blue-700 mb-4">Rates Trend (1yr)</h2>
          <Line data={lineData} height={220} options={lineOptions} />
          <div className="mt-3 text-xs text-gray-500 text-center">
            Track major rate movements over the last 12 months.
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <h2 className="font-bold text-lg text-blue-700 mb-4">Customer Base Composition</h2>
          <Pie data={pieData} height={210} options={pieOptions} />
          <div className="mt-3 text-xs text-gray-500 text-center">
            See which customer segments most influence rate policy.
          </div>
        </div>
      </section>

      {/* 4. Rates Table */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-emerald-800 mb-5">Rates by Segment</h2>
        <div className="grid md:grid-cols-3 gap-7">
          {rateTable.map((seg) => (
            <div
              key={seg.category}
              className="bg-gradient-to-br from-blue-50 via-emerald-50 to-yellow-100 rounded-2xl shadow p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                {seg.icon}
                <span className="text-lg font-bold">{seg.category}</span>
              </div>
              <ul className="space-y-2">
                {seg.rates.map((r) => (
                  <li key={r.label} className="flex justify-between items-center border-b pb-1 last:border-0">
                    <span className="text-gray-800">{r.label}</span>
                    <span className="font-semibold text-blue-700">{r.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Explanations */}
      <section className="mb-6 grid md:grid-cols-2 gap-7">
        <div>
          <h3 className="text-lg font-bold mb-2 text-emerald-800">
            Why Monitor Rates?
          </h3>
          <ul className="text-gray-700 text-base space-y-1 list-disc pl-5">
            <li>Rates drive loan and deposit demand</li>
            <li>Direct impact on NIM (net interest margin)</li>
            <li>Key competitive advantage for acquisition & retention</li>
            <li>Essential for regulatory and market reporting</li>
            <li>Supports treasury and asset-liability decisions</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2 text-emerald-800">Key Terms Explained</h3>
          <ul className="text-gray-700 text-base space-y-1 list-disc pl-5">
            <li>
              <b>Prime Lending Rate</b>: Best rate for most creditworthy clients.
            </li>
            <li>
              <b>Savings Rate</b>: Interest earned on deposits.
            </li>
            <li>
              <b>Overdraft Rate</b>: Charged for negative balances.
            </li>
            <li>
              <b>Corporate Rate</b>: Specialized for business clients.
            </li>
            <li>
              <b>Government Rate</b>: Offered to government and public sector.
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
