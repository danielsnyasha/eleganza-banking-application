"use client";

import { useState, useMemo } from "react";
import {
  Users,
  Briefcase,
  TrendingUp,
  ArrowUpRight,
  PieChart,
  BarChart2,
  LineChart,
  CircleDollarSign,
  Banknote,
  User,
  Building2,
  Filter,
  Globe,
  CheckCircle2,
} from "lucide-react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
  Filler,
  ChartOptions,
  Scale,
  CoreScaleOptions,
  Tick,
} from "chart.js";
import { motion } from "framer-motion";

// Register Chart.js components
Chart.register(
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
  Filler
);

// Dummy data for portfolios
const portfolios = [
  {
    id: "PRT-001",
    owner: "Mandla Maseko",
    type: "Individual",
    country: "South Africa",
    totalValue: 56000,
    growth: 8.2,
    risk: "Moderate",
    status: "Active",
    assets: [
      { label: "Stocks", percent: 44 },
      { label: "Bonds", percent: 32 },
      { label: "REITs", percent: 14 },
      { label: "Cash", percent: 10 },
    ],
    lastUpdate: "2024-07-18",
  },
  {
    id: "PRT-002",
    owner: "Lindiwe Zhang",
    type: "Individual",
    country: "China",
    totalValue: 81000,
    growth: 12.6,
    risk: "High",
    status: "Active",
    assets: [
      { label: "Stocks", percent: 72 },
      { label: "Crypto", percent: 10 },
      { label: "Bonds", percent: 9 },
      { label: "Cash", percent: 9 },
    ],
    lastUpdate: "2024-07-18",
  },
  {
    id: "PRT-003",
    owner: "Koto Property Holdings",
    type: "Corporate",
    country: "Japan",
    totalValue: 920000,
    growth: 5.3,
    risk: "Conservative",
    status: "Active",
    assets: [
      { label: "REITs", percent: 51 },
      { label: "Bonds", percent: 32 },
      { label: "Stocks", percent: 10 },
      { label: "Cash", percent: 7 },
    ],
    lastUpdate: "2024-07-16",
  },
  {
    id: "PRT-004",
    owner: "Green Harvest Fund",
    type: "Institutional",
    country: "UK",
    totalValue: 3200000,
    growth: 6.7,
    risk: "Moderate",
    status: "Active",
    assets: [
      { label: "Stocks", percent: 29 },
      { label: "Bonds", percent: 28 },
      { label: "Commodities", percent: 23 },
      { label: "Cash", percent: 20 },
    ],
    lastUpdate: "2024-07-15",
  },
  {
    id: "PRT-005",
    owner: "Maria Gonzalez",
    type: "Individual",
    country: "Spain",
    totalValue: 43000,
    growth: 4.9,
    risk: "Low",
    status: "Dormant",
    assets: [
      { label: "Bonds", percent: 58 },
      { label: "Stocks", percent: 19 },
      { label: "REITs", percent: 13 },
      { label: "Cash", percent: 10 },
    ],
    lastUpdate: "2024-07-10",
  },
  {
    id: "PRT-006",
    owner: "Mandela Investments Ltd.",
    type: "Corporate",
    country: "South Africa",
    totalValue: 1510000,
    growth: 9.3,
    risk: "Moderate",
    status: "Active",
    assets: [
      { label: "Stocks", percent: 31 },
      { label: "REITs", percent: 29 },
      { label: "Bonds", percent: 25 },
      { label: "Cash", percent: 15 },
    ],
    lastUpdate: "2024-07-15",
  },
  {
    id: "PRT-007",
    owner: "Edo Group",
    type: "Corporate",
    country: "Nigeria",
    totalValue: 585000,
    growth: 7.7,
    risk: "Moderate",
    status: "Active",
    assets: [
      { label: "Stocks", percent: 39 },
      { label: "REITs", percent: 34 },
      { label: "Cash", percent: 17 },
      { label: "Bonds", percent: 10 },
    ],
    lastUpdate: "2024-07-13",
  },
  {
    id: "PRT-008",
    owner: "Charlotte Cho",
    type: "Individual",
    country: "South Korea",
    totalValue: 130000,
    growth: 10.1,
    risk: "High",
    status: "Active",
    assets: [
      { label: "Stocks", percent: 55 },
      { label: "Crypto", percent: 16 },
      { label: "Cash", percent: 17 },
      { label: "Bonds", percent: 12 },
    ],
    lastUpdate: "2024-07-14",
  },
  {
    id: "PRT-009",
    owner: "FirstGov Pension",
    type: "Institutional",
    country: "USA",
    totalValue: 5100000,
    growth: 4.3,
    risk: "Conservative",
    status: "Active",
    assets: [
      { label: "Bonds", percent: 57 },
      { label: "Stocks", percent: 20 },
      { label: "REITs", percent: 11 },
      { label: "Cash", percent: 12 },
    ],
    lastUpdate: "2024-07-13",
  },
];

const allTypes = ["All", ...Array.from(new Set(portfolios.map((p) => p.type)))];
const allCountries = ["All", ...Array.from(new Set(portfolios.map((p) => p.country)))];
const allRisks = ["All", ...Array.from(new Set(portfolios.map((p) => p.risk)))];

// Portfolio stats
const stats = [
  {
    label: "Total Portfolios",
    value: portfolios.length,
    icon: <Briefcase className="w-7 h-7 text-blue-700" />,
    bg: "from-blue-100 via-blue-200 to-blue-300",
  },
  {
    label: "Total Value",
    value: "$10,842,000",
    icon: <CircleDollarSign className="w-7 h-7 text-emerald-700" />,
    bg: "from-emerald-100 via-emerald-200 to-emerald-400",
  },
  {
    label: "Average Growth (1Y)",
    value: "8.2%",
    icon: <TrendingUp className="w-7 h-7 text-yellow-600" />,
    bg: "from-yellow-100 via-yellow-200 to-yellow-300",
  },
  {
    label: "Active",
    value: portfolios.filter((p) => p.status === "Active").length,
    icon: <CheckCircle2 className="w-7 h-7 text-fuchsia-700" />,
    bg: "from-fuchsia-100 via-fuchsia-200 to-fuchsia-300",
  },
];

// Asset class colors
const assetColors: Record<string, string> = {
  Stocks: "#0ea5e9",
  Bonds: "#059669",
  Crypto: "#f43f5e",
  Cash: "#fbbf24",
  REITs: "#a21caf",
  Commodities: "#f59e42",
};

// 1. Doughnut (asset allocation, overall)
const totalAssets: Record<string, number> = {};
portfolios.forEach((p) =>
  p.assets.forEach((a) => {
    totalAssets[a.label] = (totalAssets[a.label] || 0) + a.percent;
  })
);

const doughnutAssetsData = {
  labels: Object.keys(totalAssets),
  datasets: [
    {
      data: Object.values(totalAssets),
      backgroundColor: Object.keys(totalAssets).map((k) => assetColors[k] || "#aaa"),
      borderWidth: 2,
      borderColor: "#fff",
    },
  ],
};

// 2. Bar (portfolio value by type)
const barValueByTypeData = {
  labels: allTypes.slice(1),
  datasets: [
    {
      label: "Value ($)",
      data: allTypes
        .slice(1)
        .map((type) =>
          portfolios
            .filter((p) => p.type === type)
            .reduce((acc, p) => acc + p.totalValue, 0)
        ),
      backgroundColor: "#0ea5e9",
      borderRadius: 10,
    },
  ],
};

// 3. Line (portfolio growth over time, dummy)
const lineGrowthData = {
  labels: [
    "Jan 2023",
    "Apr 2023",
    "Jul 2023",
    "Oct 2023",
    "Jan 2024",
    "Apr 2024",
    "Jul 2024",
  ],
  datasets: [
    {
      label: "Portfolio Growth (%)",
      data: [5, 6, 6.7, 7.2, 7.8, 8.5, 8.2],
      borderColor: "#059669",
      backgroundColor: "rgba(16,185,129,0.13)",
      fill: true,
      tension: 0.38,
    },
  ],
};

export default function InvestmentPortfoliosPage() {
  const [typeFilter, setTypeFilter] = useState("All");
  const [countryFilter, setCountryFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");

  const filteredPortfolios = useMemo(() => {
    return portfolios.filter(
      (p) =>
        (typeFilter === "All" || p.type === typeFilter) &&
        (countryFilter === "All" || p.country === countryFilter) &&
        (riskFilter === "All" || p.risk === riskFilter)
    );
  }, [typeFilter, countryFilter, riskFilter]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 w-full">
      {/* 1. Floating Stats */}
      <motion.section
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 170, delay: 0.1 }}
        className="flex flex-wrap justify-center gap-6 mb-7 sticky top-4 z-20"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ scale: 0.95, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.32, delay: 0.1 }}
            className={`min-w-[210px] flex flex-col items-center rounded-2xl bg-gradient-to-br ${stat.bg} px-6 py-4 shadow-xl border-0 backdrop-blur-md`}
            style={{ backdropFilter: "blur(10px)" }}
          >
            <div className="mb-2">{stat.icon}</div>
            <span className="font-extrabold text-2xl text-emerald-900 mb-1">
              {stat.value}
            </span>
            <span className="text-md text-gray-700">{stat.label}</span>
          </motion.div>
        ))}
      </motion.section>

      {/* 2. Banner */}
      <section className="mb-7">
        <h1 className="text-2xl md:text-3xl font-black text-emerald-800 mb-2 tracking-tight">
          Investment Portfolios
        </h1>
        <p className="text-gray-700 text-base md:text-lg max-w-3xl">
          Oversee and analyze all <span className="text-blue-700 font-semibold">managed portfolios</span> at Eleganza Bank: individuals, corporates, and institutions. Use the filters and visual analytics below to understand allocation, risk, and growth—driving smarter decisions for your clients and business.
        </p>
      </section>

      {/* 3. Filter bar */}
      <section className="flex flex-wrap gap-4 items-center mb-8">
        <div className="flex gap-2 items-center">
          <Filter className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-sm text-gray-800">Filter:</span>
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-xl border px-3 py-1 text-sm bg-white focus:ring-2 focus:ring-emerald-400"
        >
          {allTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
        <select
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          className="rounded-xl border px-3 py-1 text-sm bg-white focus:ring-2 focus:ring-blue-400"
        >
          {allCountries.map((country) => (
            <option key={country}>{country}</option>
          ))}
        </select>
        <select
          value={riskFilter}
          onChange={(e) => setRiskFilter(e.target.value)}
          className="rounded-xl border px-3 py-1 text-sm bg-white focus:ring-2 focus:ring-yellow-400"
        >
          {allRisks.map((risk) => (
            <option key={risk}>{risk}</option>
          ))}
        </select>
        <span className="ml-3 text-xs text-gray-500">
          Showing <b>{filteredPortfolios.length}</b> of <b>{portfolios.length}</b>
        </span>
      </section>

      {/* 4. Data Table/Grid */}
      <section className="overflow-x-auto rounded-2xl bg-white shadow-lg mb-12 border border-emerald-50">
        <table className="min-w-full text-sm">
          <thead className="bg-emerald-50">
            <tr>
              <th className="text-left font-bold py-3 px-4 text-blue-900">ID</th>
              <th className="text-left font-bold py-3 px-4">Owner</th>
              <th className="text-left font-bold py-3 px-4">Type</th>
              <th className="text-left font-bold py-3 px-4">Country</th>
              <th className="text-right font-bold py-3 px-4">Value ($)</th>
              <th className="text-right font-bold py-3 px-4">Growth (%)</th>
              <th className="text-center font-bold py-3 px-4">Risk</th>
              <th className="text-center font-bold py-3 px-4">Status</th>
              <th className="text-left font-bold py-3 px-4">Last Update</th>
              <th className="text-left font-bold py-3 px-4">Allocation</th>
            </tr>
          </thead>
          <tbody>
            {filteredPortfolios.map((p) => (
              <tr
                key={p.id}
                className="border-b hover:bg-blue-50/50 transition"
              >
                <td className="py-2 px-4 text-blue-700 font-bold">{p.id}</td>
                <td className="py-2 px-4 font-semibold flex items-center gap-2">
                  {p.type === "Individual" && <User className="w-4 h-4 text-blue-400" />}
                  {p.type === "Corporate" && <Building2 className="w-4 h-4 text-emerald-500" />}
                  {p.type === "Institutional" && <Banknote className="w-4 h-4 text-yellow-500" />}
                  {p.owner}
                </td>
                <td className="py-2 px-4">{p.type}</td>
                <td className="py-2 px-4">{p.country}</td>
                <td className="py-2 px-4 text-right font-semibold text-emerald-700">
                  ${p.totalValue.toLocaleString()}
                </td>
                <td className="py-2 px-4 text-right text-blue-900">{p.growth}%</td>
                <td className="py-2 px-4 text-center">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-lg font-bold text-xs ${
                      p.risk === "Low"
                        ? "bg-blue-100 text-blue-700"
                        : p.risk === "Moderate"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.risk}
                  </span>
                </td>
                <td className="py-2 px-4 text-center">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-lg font-bold text-xs ${
                      p.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="py-2 px-4">{p.lastUpdate}</td>
                <td className="py-2 px-4">
                  <div className="flex gap-1">
                    {p.assets.map((a) => (
                      <span
                        key={a.label}
                        style={{
                          backgroundColor: (assetColors[a.label] || "#eee") + "44",
                          color: assetColors[a.label] || "#333",
                        }}
                        className="rounded px-2 py-0.5 text-xs font-bold"
                      >
                        {a.label} {a.percent}%
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredPortfolios.length === 0 && (
          <div className="text-gray-500 text-center py-16 text-lg">
            No portfolios found for selected filter.
          </div>
        )}
      </section>

      {/* 5. Graphs/Visual Analytics */}
      <section className="mt-10 mb-8 grid lg:grid-cols-3 md:grid-cols-2 gap-7">
        <div className="bg-white rounded-3xl shadow-lg p-5 flex flex-col items-center">
          <h3 className="font-bold text-blue-700 text-md mb-3">
            Overall Asset Allocation
          </h3>
          <Doughnut
            data={doughnutAssetsData}
            height={170}
            options={{
              plugins: { legend: { position: "bottom" as const } },
            }}
          />
        </div>
        <div className="bg-white rounded-3xl shadow-lg p-5 flex flex-col items-center">
          <h3 className="font-bold text-blue-700 text-md mb-3">
            Portfolio Value by Type
          </h3>
          <Bar
            data={barValueByTypeData}
            height={170}
            options={{
              plugins: { legend: { display: false } },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: function (
                      this: Scale<CoreScaleOptions>,
                      tickValue: string | number
                    ) {
                      const n =
                        typeof tickValue === "number"
                          ? tickValue
                          : Number(tickValue);
                      return "$" + n.toLocaleString();
                    },
                  },
                  grid: { color: "#f1f5f9" },
                },
                x: { grid: { color: "#f1f5f9" } },
              },
            }}
          />
        </div>
        <div className="bg-white rounded-3xl shadow-lg p-5 flex flex-col items-center">
          <h3 className="font-bold text-blue-700 text-md mb-3">
            Average Portfolio Growth (last 18mo)
          </h3>
          <Line
            data={lineGrowthData}
            height={170}
            options={{
              plugins: { legend: { display: false } },
              scales: {
                y: {
                  beginAtZero: false,
                  min: 4,
                  max: 10,
                  ticks: {
                    callback: function (
                      this: Scale<CoreScaleOptions>,
                      tickValue: string | number
                    ) {
                      const n =
                        typeof tickValue === "number"
                          ? tickValue
                          : Number(tickValue);
                      return n + "%";
                    },
                  },
                  grid: { color: "#f1f5f9" },
                },
                x: { grid: { color: "#f1f5f9" } },
              },
            }}
          />
        </div>
      </section>

      {/* 6. Floating Information Card */}
      <motion.section
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.48 }}
        className="max-w-3xl mx-auto mb-12"
      >
        <div className="bg-gradient-to-br from-blue-50 via-emerald-50 to-yellow-50 shadow-xl rounded-2xl p-7 flex gap-4 items-start">
          <Globe className="w-12 h-12 text-emerald-700 mt-1" />
          <div>
            <div className="font-bold text-blue-800 text-lg mb-1">
              Smart, Real-Time Portfolio Oversight
            </div>
            <div className="text-gray-700 text-sm leading-relaxed mb-2">
              With Eleganza Bank’s admin portal, easily manage, analyze, and rebalance all client portfolios—whether individual, corporate, or institutional. Instantly view allocation, risk, growth, and compliance, helping you deliver next-level service and meet regulatory needs.
            </div>
            <div className="text-xs text-gray-500">
              Admins can click any portfolio for detailed drilldown, trend analysis, and action options.
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
