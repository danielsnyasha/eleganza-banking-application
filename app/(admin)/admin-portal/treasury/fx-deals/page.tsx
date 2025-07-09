"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Bar, Scatter } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import {
  RefreshCcw,
  TrendingUp,
  TrendingDown,
  BadgeDollarSign,
  CheckCircle2,
  XCircle,
  UserCircle2,
} from "lucide-react";

Chart.register(
  BarElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Tooltip,
  Legend,
  Title
);

// KPI Data
const kpis = [
  {
    label: "FX Deals (Today)",
    value: "34",
    icon: <RefreshCcw className="w-6 h-6 text-blue-600" />,
    desc: "Number of trades settled",
    bg: "from-blue-100 via-blue-200 to-blue-400",
  },
  {
    label: "Total Volume",
    value: "$4,530,000",
    icon: <BadgeDollarSign className="w-6 h-6 text-emerald-700" />,
    desc: "Aggregate FX value",
    bg: "from-emerald-100 via-emerald-200 to-emerald-400",
  },
  {
    label: "Profit (Today)",
    value: "$18,200",
    icon: <TrendingUp className="w-6 h-6 text-green-700" />,
    desc: "Net profit from FX trades",
    bg: "from-green-100 via-green-200 to-green-400",
  },
  {
    label: "Loss (Today)",
    value: "$2,650",
    icon: <TrendingDown className="w-6 h-6 text-red-700" />,
    desc: "Total loss on trades",
    bg: "from-red-100 via-red-200 to-red-400",
  },
  {
    label: "Most Traded Pair",
    value: "USD/EUR",
    icon: <RefreshCcw className="w-6 h-6 text-yellow-700" />,
    desc: "Today’s top volume",
    bg: "from-yellow-100 via-yellow-200 to-yellow-300",
  },
];

// Deals Table Data
const deals = [
  {
    id: "FX1025",
    dealer: "Chen Wei",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    pair: "USD/EUR",
    volume: "$1,200,000",
    rate: "0.9225",
    time: "09:23",
    status: "Settled",
    pnl: "+$2,800",
  },
  {
    id: "FX1026",
    dealer: "Rachel White",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    pair: "USD/ZAR",
    volume: "$650,000",
    rate: "18.10",
    time: "10:14",
    status: "Pending",
    pnl: "+$750",
  },
  {
    id: "FX1027",
    dealer: "John Smith",
    avatar: "https://randomuser.me/api/portraits/men/53.jpg",
    pair: "GBP/USD",
    volume: "$330,000",
    rate: "1.2740",
    time: "10:47",
    status: "Settled",
    pnl: "-$400",
  },
  {
    id: "FX1028",
    dealer: "Akira Tanaka",
    avatar: "https://randomuser.me/api/portraits/men/86.jpg",
    pair: "USD/JPY",
    volume: "$750,000",
    rate: "158.60",
    time: "11:13",
    status: "Settled",
    pnl: "+$1,100",
  },
  {
    id: "FX1029",
    dealer: "Tendai Ncube",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    pair: "EUR/JPY",
    volume: "$520,000",
    rate: "146.20",
    time: "11:20",
    status: "Settled",
    pnl: "+$390",
  },
  {
    id: "FX1030",
    dealer: "Maria Rossi",
    avatar: "https://randomuser.me/api/portraits/women/50.jpg",
    pair: "USD/CNY",
    volume: "$270,000",
    rate: "7.19",
    time: "11:48",
    status: "Pending",
    pnl: "-$60",
  },
];

// Bar Chart (Pair vs Volume)
const barData = {
  labels: ["USD/EUR", "USD/ZAR", "GBP/USD", "USD/JPY", "EUR/JPY", "USD/CNY"],
  datasets: [
    {
      label: "Total Volume ($M)",
      data: [2.1, 1.3, 0.9, 1.1, 0.7, 0.4],
      backgroundColor: [
        "#0ea5e9",
        "#fbbf24",
        "#3b82f6",
        "#059669",
        "#eab308",
        "#e11d48",
      ],
      borderRadius: 8,
      barPercentage: 0.75,
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
  scales: {
    y: {
      beginAtZero: true,
      ticks: { callback: (v: number) => `${v}M` },
      grid: { color: "#f1f5f9" },
      max: 2.5,
    },
    x: {
      grid: { display: false },
    },
  },
};

// Scatter Chart (Deal Size vs Profit)
const scatterData = {
  datasets: [
    {
      label: "FX Deal",
      data: [
        { x: 1.2, y: 2.8 },
        { x: 0.65, y: 0.75 },
        { x: 0.33, y: -0.4 },
        { x: 0.75, y: 1.1 },
        { x: 0.52, y: 0.39 },
        { x: 0.27, y: -0.06 },
      ],
      backgroundColor: [
        "#0ea5e9",
        "#fbbf24",
        "#3b82f6",
        "#059669",
        "#eab308",
        "#e11d48",
      ],
      pointRadius: 9,
    },
  ],
};
const scatterOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx: any) =>
          `Deal: $${ctx.parsed.x}M, Profit: $${ctx.parsed.y}k`,
      },
    },
  },
  scales: {
    x: {
      title: { display: true, text: "Deal Size ($M)" },
      min: 0,
      max: 1.5,
      grid: { color: "#f3f4f6" },
      ticks: { stepSize: 0.25 },
    },
    y: {
      title: { display: true, text: "Profit/Loss ($k)" },
      min: -1,
      max: 4,
      grid: { color: "#f3f4f6" },
      ticks: { stepSize: 1 },
    },
  },
};

// Animated KPI Bar (carousel, no scrollbar)
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
          {kpis.concat(kpis.slice(0, 2)).map((stat, idx) => (
            <div
              key={`${stat.label}-${idx}`}
              className={`min-w-[170px] flex flex-col items-center rounded-2xl bg-gradient-to-br ${stat.bg} px-6 py-5 shadow-lg border-0`}
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

// Status badge
function statusBadge(status: string) {
  if (status === "Settled")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-green-100 text-emerald-800 text-xs font-medium">
        <CheckCircle2 className="w-4 h-4" /> {status}
      </span>
    );
  if (status === "Pending")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 text-xs font-medium">
        <XCircle className="w-4 h-4" /> {status}
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-xs font-medium">
      <UserCircle2 className="w-4 h-4" /> {status}
    </span>
  );
}

export default function FXDealsAdminPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10 w-full">
      {/* 1. Animated KPIs */}
      <MotionKPIBar />

      {/* 2. Explanation */}
      <section className="mb-10">
        <h1 className="text-2xl md:text-3xl font-black text-emerald-700 mb-2 tracking-tight">
          Treasury FX Deals Overview
        </h1>
        <p className="text-gray-700 text-base md:text-lg max-w-3xl">
          Monitor, approve, and analyze all foreign exchange (FX) trading activity at Eleganza Bank. 
          This dashboard gives you real-time insight into trading flows, currency risk, and dealer performance.<br />
          <span className="font-semibold text-emerald-700">Control risk, ensure compliance, and boost treasury profit with actionable analytics.</span>
        </p>
      </section>

      {/* 3. Charts */}
      <section className="grid md:grid-cols-2 gap-8 mb-14">
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <h2 className="font-bold text-lg text-blue-700 mb-4">FX Volume by Pair</h2>
          <Bar data={barData} height={210} options={barOptions} />
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <h2 className="font-bold text-lg text-blue-700 mb-4">Deal Size vs Profit</h2>
          <Scatter data={scatterData} height={210} options={scatterOptions} />
        </div>
      </section>

      {/* 4. Latest Deals Table */}
      <section>
        <h2 className="font-bold text-xl text-emerald-800 mb-5">Latest FX Deals</h2>
        <div className="bg-white rounded-xl shadow-md p-4 overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-xs text-gray-600 uppercase border-b">
                <th className="py-2">Dealer</th>
                <th className="py-2">Pair</th>
                <th className="py-2">Volume</th>
                <th className="py-2">Rate</th>
                <th className="py-2">Time</th>
                <th className="py-2">Status</th>
                <th className="py-2">P/L</th>
              </tr>
            </thead>
            <tbody>
              {deals.map((d) => (
                <tr key={d.id} className="border-b last:border-0">
                  <td className="py-2 flex items-center gap-2">
                    <img
                      src={d.avatar}
                      alt={d.dealer}
                      className="w-8 h-8 rounded-full border border-blue-100"
                    />
                    <span className="font-semibold">{d.dealer}</span>
                  </td>
                  <td className="py-2">{d.pair}</td>
                  <td className="py-2 font-mono">{d.volume}</td>
                  <td className="py-2">{d.rate}</td>
                  <td className="py-2">{d.time}</td>
                  <td className="py-2">{statusBadge(d.status)}</td>
                  <td className="py-2 font-mono">{d.pnl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
