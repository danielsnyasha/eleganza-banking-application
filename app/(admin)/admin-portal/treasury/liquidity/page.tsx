"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  Chart,
  ArcElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
  Filler,
} from "chart.js";
import { Pie, Line, Bar } from "react-chartjs-2";
import {
  Droplet,
  DollarSign,
  Banknote,
  TrendingUp,
  TrendingDown,
  Wallet,
  Vault,
  PiggyBank,
} from "lucide-react";

Chart.register(
  ArcElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
  Filler
);

// KPI stats for liquidity
const stats = [
  {
    label: "Liquidity Coverage Ratio",
    value: "132%",
    icon: <Droplet className="w-6 h-6 text-blue-700" />,
    desc: "Regulatory LCR (≥100% safe)",
    bg: "from-blue-100 via-blue-200 to-blue-300",
  },
  {
    label: "High Quality Liquid Assets",
    value: "$2,985,000",
    icon: <DollarSign className="w-6 h-6 text-emerald-700" />,
    desc: "Cash & cash-like reserves",
    bg: "from-emerald-100 via-emerald-200 to-emerald-400",
  },
  {
    label: "Surplus Funding",
    value: "$1,210,000",
    icon: <Banknote className="w-6 h-6 text-yellow-600" />,
    desc: "Funds above short-term needs",
    bg: "from-yellow-100 via-yellow-200 to-yellow-300",
  },
  {
    label: "7-day Cash Flow",
    value: "+$340,000",
    icon: <TrendingUp className="w-6 h-6 text-green-700" />,
    desc: "Expected inflow vs outflow",
    bg: "from-green-100 via-green-200 to-green-400",
  },
  {
    label: "Stress Scenario Buffer",
    value: "$690,000",
    icon: <Vault className="w-6 h-6 text-fuchsia-700" />,
    desc: "Extra liquidity for stress events",
    bg: "from-fuchsia-100 via-fuchsia-200 to-fuchsia-300",
  },
];

// Pie Chart: Liquidity sources
const pieData = {
  labels: ["Cash", "Govt Bonds", "Interbank", "Central Bank", "Other"],
  datasets: [
    {
      data: [44, 27, 13, 11, 5],
      backgroundColor: [
        "#0ea5e9", // blue
        "#059669", // emerald
        "#fbbf24", // yellow
        "#a21caf", // fuchsia
        "#eab308", // amber
      ],
      borderWidth: 2,
      borderColor: "#fff",
    },
  ],
};
const pieOptions = {
  plugins: {
    legend: { position: "bottom" as const, labels: { font: { size: 13 } } },
  },
  cutout: 55,
};

// Area Line Chart: LCR trend
const lineData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Now"],
  datasets: [
    {
      label: "Liquidity Coverage Ratio",
      data: [111, 117, 126, 121, 128, 134, 136, 132],
      borderColor: "#0ea5e9",
      backgroundColor: "rgba(16,185,129,0.17)",
      fill: true,
      tension: 0.37,
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
      min: 100,
      max: 140,
      beginAtZero: false,
      ticks: {
        stepSize: 10,
        callback: (v: number) => `${v}%`,
      },
      grid: { color: "#f1f5f9" },
    },
    x: { grid: { color: "#f1f5f9" } },
  },
};

// Bar Chart: Funding by source
const barData = {
  labels: ["Retail", "Corporate", "Government", "Central Bank", "Interbank"],
  datasets: [
    {
      label: "Funding ($M)",
      data: [2.3, 1.4, 0.9, 0.6, 0.5],
      backgroundColor: [
        "#3b82f6", // blue
        "#059669", // emerald
        "#fbbf24", // yellow
        "#a21caf", // fuchsia
        "#eab308", // amber
      ],
      borderRadius: 8,
      barPercentage: 0.7,
    },
  ],
};
const barOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
    tooltip: { callbacks: { label: (ctx: any) => `$${ctx.parsed.y}M` } },
  },
  indexAxis: "y" as const,
  scales: {
    x: {
      beginAtZero: true,
      max: 3,
      ticks: { callback: (v: number) => `${v}M` },
      grid: { color: "#f1f5f9" },
    },
    y: { grid: { display: false } },
  },
};

// Animated KPI carousel
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
          transition: { duration: 14, ease: "linear" },
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

export default function TreasuryLiquidityPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10 w-full">
      {/* 1. Animated KPI bar */}
      <MotionKPIBar />

      {/* 2. Explanation */}
      <section className="mb-10">
        <h1 className="text-2xl md:text-3xl font-black text-blue-800 mb-2 tracking-tight">
          Treasury Liquidity Dashboard
        </h1>
        <p className="text-gray-700 text-base md:text-lg max-w-3xl">
          Ensure Eleganza Bank’s cash positions are healthy, stable, and compliant.  
          This dashboard gives you a **real-time, data-driven view** of our ability to meet obligations, seize new lending opportunities, and stay resilient under stress.  
          <br />
          <span className="font-semibold text-emerald-700">
            Strong liquidity is the foundation of customer trust and operational security.
          </span>
        </p>
      </section>

      {/* 3. Visuals */}
      <section className="grid md:grid-cols-3 gap-8 mb-12">
        {/* Pie: Sources */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <h2 className="font-bold text-lg text-blue-700 mb-4">Liquidity Composition</h2>
          <Pie data={pieData} height={210} options={pieOptions} />
          <div className="mt-3 text-xs text-gray-500 text-center">
            Shows where liquid assets are deployed—cash, government bonds, etc.
          </div>
        </div>
        {/* Area Line: LCR Trend */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <h2 className="font-bold text-lg text-blue-700 mb-4">LCR Trend</h2>
          <Line data={lineData} height={200} options={lineOptions} />
          <div className="mt-3 text-xs text-gray-500 text-center">
            Regulatory <b>Liquidity Coverage Ratio</b> over time (must stay above 100%).
          </div>
        </div>
        {/* Bar: Funding Sources */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <h2 className="font-bold text-lg text-blue-700 mb-4">Funding by Source</h2>
          <Bar data={barData} height={210} options={barOptions} />
          <div className="mt-3 text-xs text-gray-500 text-center">
            Funding mix: retail, corporate, government, central bank, and interbank.
          </div>
        </div>
      </section>

      {/* 4. Explanations / Table */}
      <section className="mb-4 grid md:grid-cols-2 gap-7">
        <div>
          <h3 className="text-lg font-bold mb-2 text-emerald-800">
            Why Monitor Liquidity?
          </h3>
          <ul className="text-gray-700 text-base space-y-1 list-disc pl-5">
            <li>Meet customer withdrawal demands and loan payouts</li>
            <li>Maintain regulatory compliance (LCR ≥ 100%)</li>
            <li>Enable rapid response to financial shocks</li>
            <li>Support ongoing lending, investment, and growth</li>
            <li>Preserve reputation and customer trust</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2 text-emerald-800">Key Metrics Explained</h3>
          <ul className="text-gray-700 text-base space-y-1 list-disc pl-5">
            <li>
              <b>LCR</b>: Regulatory minimum is 100%. Higher = safer.
            </li>
            <li>
              <b>High Quality Liquid Assets</b>: Instantly available, risk-free assets.
            </li>
            <li>
              <b>7-day Cash Flow</b>: Expected liquidity for the coming week.
            </li>
            <li>
              <b>Stress Scenario Buffer</b>: Reserve for shocks/disasters.
            </li>
            <li>
              <b>Funding by Source</b>: How your liquidity is funded.
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
