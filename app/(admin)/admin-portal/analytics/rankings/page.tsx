"use client";

import { motion } from "framer-motion";
import {
  Bar,
  Pie,
  Radar,
} from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import {
  TrendingUp,
  Building2,
  ArrowUpRight,
  ArrowDownLeft,
  Globe2,
  Shield,
  Users,
  CreditCard,
  Banknote,
} from "lucide-react";

// Chart.js registration
Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement
);

// Dummy Data

const kpis = [
  {
    label: "Top Client",
    value: "Skycatchfire Technologies",
    icon: <Building2 className="w-6 h-6 text-blue-700" />,
    value2: "$1,194,000",
  },
  {
    label: "Most Active Branch",
    value: "Lagos HQ",
    icon: <Globe2 className="w-6 h-6 text-emerald-600" />,
    value2: "21,405 txns",
  },
  {
    label: "Best Performing Product",
    value: "FX Account",
    icon: <CreditCard className="w-6 h-6 text-yellow-500" />,
    value2: "$4.2m vol.",
  },
];

// Leaderboard
const leaderboard = [
  {
    rank: 1,
    name: "Skycatchfire Technologies",
    value: 1194000,
    avatar: "https://randomuser.me/api/portraits/men/35.jpg",
    country: "South Africa",
    growth: 8,
  },
  {
    rank: 2,
    name: "Ngoni Holdings",
    value: 983000,
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
    country: "Zimbabwe",
    growth: 6,
  },
  {
    rank: 3,
    name: "Charlotte Müller",
    value: 701000,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    country: "Germany",
    growth: 12,
  },
  {
    rank: 4,
    name: "Hiroko Nakamura",
    value: 635000,
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    country: "Japan",
    growth: 3,
  },
  {
    rank: 5,
    name: "ZimGov Treasury",
    value: 588000,
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    country: "Zimbabwe",
    growth: -1,
  },
];

// Branch/Region Rankings
const regions = [
  { name: "Lagos HQ", value: 21405 },
  { name: "Johannesburg Central", value: 18230 },
  { name: "Harare Main", value: 15312 },
  { name: "Cape Town North", value: 14350 },
  { name: "Munich", value: 11680 },
  { name: "Tokyo", value: 10440 },
];

// Fastest Growers
const fastestGrowers = [
  {
    name: "Lilian Lungu",
    sector: "Personal",
    value: "$82,000",
    growth: 33,
    avatar: "https://randomuser.me/api/portraits/women/77.jpg",
  },
  {
    name: "Akio Tanaka",
    sector: "Business",
    value: "$219,000",
    growth: 29,
    avatar: "https://randomuser.me/api/portraits/men/71.jpg",
  },
  {
    name: "Mpho Dlamini",
    sector: "Personal",
    value: "$67,900",
    growth: 24,
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
  },
  {
    name: "Evelyn Smith",
    sector: "Business",
    value: "$159,000",
    growth: 19,
    avatar: "https://randomuser.me/api/portraits/women/41.jpg",
  },
  {
    name: "Kwame Owusu",
    sector: "Corporate",
    value: "$420,500",
    growth: 15,
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
  },
];

// Pie: Account types
const pieData = {
  labels: ["FX", "Current", "Savings", "Business", "Student"],
  datasets: [
    {
      data: [42, 26, 17, 9, 6],
      backgroundColor: [
        "#0ea5e9",
        "#059669",
        "#fbbf24",
        "#f43f5e",
        "#a78bfa",
      ],
      borderWidth: 2,
      borderColor: "#fff",
    },
  ],
};

// Radar: Market coverage
const radarData = {
  labels: ["Africa", "Europe", "Asia", "Americas", "Oceania"],
  datasets: [
    {
      label: "Market Coverage (%)",
      data: [85, 72, 53, 41, 19],
      backgroundColor: "rgba(16,185,129,0.13)",
      borderColor: "#059669",
      pointBackgroundColor: "#0ea5e9",
    },
  ],
};

// Bar: Market share per branch
const barData = {
  labels: regions.map((r) => r.name),
  datasets: [
    {
      label: "Market Share",
      data: regions.map((r) => r.value),
      backgroundColor: [
        "#2563eb",
        "#fbbf24",
        "#059669",
        "#f43f5e",
        "#a78bfa",
        "#eab308",
      ],
    },
  ],
};
const barOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
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
          return n.toLocaleString();
        },
      },
      grid: { color: "#e5e7eb" },
    },
    x: { grid: { color: "#f1f5f9" } },
  },
};

export default function AnalyticsRankingsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10 w-full">

      {/* 1. Top Banner */}
      <motion.section
        className="bg-gradient-to-r from-emerald-700 via-blue-500 to-yellow-400 rounded-2xl px-8 py-7 flex flex-col md:flex-row items-center gap-10 mb-10 shadow-xl"
        initial={{ opacity: 0, y: -22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
      >
        <div className="flex-1">
          <h1 className="text-2xl md:text-4xl font-black text-white mb-2 tracking-tight">
            Bank Rankings & Leaderboards
          </h1>
          <p className="text-white/90 mb-2 max-w-2xl">
            The latest standings for users, products, regions, and market sectors—see who’s on top, who’s climbing, and what’s trending in the bank right now.
          </p>
          <div className="flex flex-wrap items-center gap-7 mt-2">
            {kpis.map((stat) => (
              <span
                key={stat.label}
                className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl font-semibold text-yellow-50 text-lg drop-shadow"
              >
                {stat.icon}
                <span className="text-xl md:text-2xl font-bold">{stat.value}</span>
                <span className="text-white/80">{stat.value2}</span>
              </span>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.19, duration: 0.54, type: "spring" }}
        >
          <Shield className="w-32 h-32 text-white/40" />
        </motion.div>
      </motion.section>

      {/* 2. Leaderboard */}
      <section className="mb-14">
        <h2 className="font-bold text-2xl text-emerald-700 mb-6">Top Clients/Users</h2>
        <div className="bg-white rounded-2xl shadow-lg p-5 overflow-x-auto">
          <table className="w-full min-w-[540px]">
            <thead>
              <tr className="text-blue-800 font-bold text-left">
                <th className="px-3 py-2">Rank</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Country</th>
                <th className="px-3 py-2">Balance/Volume</th>
                <th className="px-3 py-2">Growth</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((c) => (
                <tr key={c.rank} className="border-b last:border-none">
                  <td className="px-3 py-2 font-black text-emerald-700">{c.rank}</td>
                  <td className="px-3 py-2 flex items-center gap-3">
                    <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full border-2 border-emerald-200" />
                    {c.name}
                  </td>
                  <td className="px-3 py-2">{c.country}</td>
                  <td className="px-3 py-2 font-mono text-blue-700">${c.value.toLocaleString()}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${c.growth > 0 ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-700"}`}>
                      {c.growth > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />} 
                      {c.growth > 0 ? "+" : ""}
                      {c.growth}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Branch/Region Ranking Grid */}
      <section className="mb-14">
        <h2 className="font-bold text-2xl text-blue-800 mb-6">Branch & Region Rankings</h2>
        <div className="grid md:grid-cols-3 gap-7">
          {regions.map((r, i) => (
            <div
              key={r.name}
              className={`rounded-2xl p-6 bg-gradient-to-br shadow-lg ${
                i === 0
                  ? "from-yellow-200 via-yellow-50 to-white border-2 border-yellow-300"
                  : i === 1
                  ? "from-blue-200 via-blue-50 to-white border-2 border-blue-300"
                  : i === 2
                  ? "from-emerald-200 via-emerald-50 to-white border-2 border-emerald-300"
                  : "from-gray-50 via-white to-gray-50 border"
              }`}
            >
              <div className="font-bold text-lg text-blue-700">{r.name}</div>
              <div className="text-2xl font-black text-emerald-700 mb-1">{r.value.toLocaleString()}</div>
              <div className="text-xs text-gray-700">Transactions</div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Fastest Growers */}
      <section className="mb-14">
        <h2 className="font-bold text-2xl text-yellow-600 mb-6">Fastest Growers</h2>
        <div className="flex flex-wrap gap-6">
          {fastestGrowers.map((g) => (
            <div key={g.name} className="bg-white rounded-2xl shadow-md px-5 py-3 flex items-center gap-5 min-w-[240px]">
              <img src={g.avatar} alt={g.name} className="w-10 h-10 rounded-full border-2 border-blue-200" />
              <div className="flex-1">
                <div className="font-bold text-emerald-800">{g.name}</div>
                <div className="text-xs text-gray-600">{g.sector}</div>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-mono text-blue-700 text-lg font-bold">{g.value}</span>
                <span className="inline-flex items-center gap-1 text-emerald-800 text-xs font-medium">
                  <ArrowUpRight className="w-4 h-4" />+{g.growth}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Analytics Charts Section */}
      <section className="grid md:grid-cols-3 gap-7 mb-14">
        {/* Pie Chart */}
        <div className="bg-white rounded-3xl shadow-lg p-5 flex flex-col items-center">
          <h3 className="font-bold text-blue-700 text-md mb-3">Account Types</h3>
          <Pie
            data={pieData}
            height={160}
            options={{
              plugins: { legend: { position: "bottom" as const } },
            }}
          />
        </div>
        {/* Radar Chart */}
        <div className="bg-gradient-to-br from-emerald-50 via-blue-50 to-yellow-50 rounded-3xl shadow-lg p-5 flex flex-col items-center">
          <h3 className="font-bold text-emerald-700 text-md mb-3">Market Coverage</h3>
          <Radar
            data={radarData}
            height={160}
            options={{
              plugins: { legend: { display: false } },
              scales: {
                r: {
                  angleLines: { display: true, color: "#e5e7eb" },
                  grid: { color: "#f1f5f9" },
                  pointLabels: { color: "#334155", font: { size: 14 } },
                  min: 0,
                  max: 100,
                  ticks: {
                    stepSize: 20,
                    callback: function (
                      this: any,
                      tickValue: string | number
                    ) {
                      const n =
                        typeof tickValue === "number"
                          ? tickValue
                          : Number(tickValue);
                      return n + "%";
                    },
                  },
                },
              },
            }}
          />
        </div>
        {/* Market Share Bar */}
        <div className="bg-white rounded-3xl shadow-lg p-5 flex flex-col items-center">
          <h3 className="font-bold text-yellow-700 text-md mb-3">Market Share by Branch</h3>
          <Bar data={barData} height={160} options={barOptions} />
        </div>
      </section>

      {/* 6. Floating Info/Insights Card */}
      <aside className="fixed bottom-8 right-8 bg-gradient-to-br from-blue-400 to-emerald-400 shadow-2xl text-white rounded-2xl px-6 py-5 w-[340px] z-20 border-2 border-emerald-200/60">
        <div className="font-bold text-lg mb-1">Rankings & Performance Insights</div>
        <ul className="text-xs leading-relaxed list-disc pl-4">
          <li>Track fast movers and rising stars for tailored offers.</li>
          <li>Monitor branch competition and growth for resource planning.</li>
          <li>Spot region or product outperformance and invest accordingly.</li>
          <li>Flag clients with sudden drops for retention outreach.</li>
        </ul>
      </aside>
    </main>
  );
}
