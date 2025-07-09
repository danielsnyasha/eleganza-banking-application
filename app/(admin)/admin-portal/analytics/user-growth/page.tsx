"use client";

import { motion } from "framer-motion";
import { Line, Pie, Bar } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
  ArcElement,
  BarElement,
} from "chart.js";
import { TrendingUp, Users, Globe2, UserCircle2, User2 } from "lucide-react";

// Chart.js setup
Chart.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
  ArcElement,
  BarElement
);

// --- Dummy Data ---

// 1. Top stats
const summaryStats = [
  {
    label: "Total Users",
    value: "131,245",
    icon: <Users className="w-7 h-7 text-emerald-700" />,
  },
  {
    label: "Active this Month",
    value: "57,390",
    icon: <TrendingUp className="w-7 h-7 text-blue-700" />,
  },
  {
    label: "Signups (Past 30d)",
    value: "8,032",
    icon: <UserCircle2 className="w-7 h-7 text-yellow-500" />,
  },
];

// 2. User growth line chart
const months = [
  "Aug 2023",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan 2024",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
];
const usersByMonth = [
  89000, 96000, 101000, 106000, 111000, 116000, 120000, 122300, 125000, 127000, 129800, 131245,
];
const lineData = {
  labels: months,
  datasets: [
    {
      label: "Total Users",
      data: usersByMonth,
      fill: true,
      borderColor: "#059669",
      backgroundColor: "rgba(16,185,129,0.12)",
      tension: 0.4,
      pointBackgroundColor: "#10b981",
      pointRadius: 4,
    },
  ],
};
const lineOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
    tooltip: {},
  },
  scales: {
    y: {
      beginAtZero: false,
      min: 80000,
      max: 140000,
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

// 3. Pie: User distribution by region
const pieData = {
  labels: ["Africa", "Europe", "Asia", "Americas"],
  datasets: [
    {
      data: [38000, 34000, 42000, 17345],
      backgroundColor: [
        "#059669",
        "#2563eb",
        "#fbbf24",
        "#f43f5e",
      ],
      borderWidth: 2,
      borderColor: "#fff",
    },
  ],
};

// 4. Bar: Signups by user type
const barUserTypeData = {
  labels: ["Personal", "Business", "Student", "NGO", "Corporate"],
  datasets: [
    {
      label: "Signups",
      data: [3880, 1520, 950, 200, 1482],
      backgroundColor: [
        "#0ea5e9",
        "#f59e42",
        "#a21caf",
        "#84cc16",
        "#f43f5e",
      ],
      borderRadius: 10,
    },
  ],
};
const barUserTypeOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
    tooltip: {},
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
      grid: { color: "#f1f5f9" },
    },
    x: { grid: { color: "#f1f5f9" } },
  },
};

// 5. Recent signups
const recentUsers = [
  {
    name: "Kudakwashe Ndlovu",
    avatar: "https://randomuser.me/api/portraits/men/82.jpg",
    country: "Zimbabwe",
    joined: "2024-07-27",
    type: "Personal",
  },
  {
    name: "Martina Rossi",
    avatar: "https://randomuser.me/api/portraits/women/72.jpg",
    country: "Italy",
    joined: "2024-07-26",
    type: "Business",
  },
  {
    name: "Mingyu Chen",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    country: "China",
    joined: "2024-07-25",
    type: "Personal",
  },
  {
    name: "Hiroko Nakamura",
    avatar: "https://randomuser.me/api/portraits/women/90.jpg",
    country: "Japan",
    joined: "2024-07-25",
    type: "Student",
  },
  {
    name: "David Müller",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    country: "Germany",
    joined: "2024-07-24",
    type: "Corporate",
  },
];

// --- Page ---
export default function AnalyticsUserGrowthPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10 w-full">
      {/* 1. Top Banner */}
      <motion.section
        className="bg-gradient-to-r from-emerald-700 via-blue-500 to-yellow-400 rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center gap-10 mb-10 shadow-xl"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex-1">
          <h1 className="text-2xl md:text-4xl font-black text-white mb-2 tracking-tight">
            User Growth Analytics
          </h1>
          <p className="text-white/90 mb-2 max-w-2xl">
            Monitor how our user base is growing across regions, segments, and time. Our analytics combine new signups, engagement, and user diversity to provide actionable insights for the bank’s growth strategy.
          </p>
          <div className="flex flex-wrap items-center gap-6 mt-2">
            {summaryStats.map((stat) => (
              <span
                key={stat.label}
                className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl font-semibold text-yellow-50 text-lg drop-shadow"
              >
                {stat.icon}
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className="text-base text-white/70">{stat.label}</span>
              </span>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.55, type: "spring" }}
        >
          <Globe2 className="w-32 h-32 text-white/40" />
        </motion.div>
      </motion.section>

      {/* 2. Line Chart */}
      <motion.section
        className="bg-white rounded-3xl shadow-lg px-8 py-8 mb-12"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="font-bold text-xl text-emerald-800 mb-3">
              Total Users Over Time
            </h2>
            <Line data={lineData} height={225} options={lineOptions} />
          </div>
          <div className="flex-1">
            <div className="mb-4 font-bold text-blue-800 text-lg">Recent Signups</div>
            <div className="flex flex-col gap-4">
              {recentUsers.map((u) => (
                <div
                  key={u.name}
                  className="flex items-center gap-4 bg-emerald-50/30 hover:bg-emerald-100/50 rounded-xl px-3 py-2 transition"
                >
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-blue-200"
                  />
                  <div>
                    <span className="font-bold text-emerald-900">{u.name}</span>
                    <span className="block text-xs text-blue-800">{u.country}</span>
                    <span className="block text-xs text-gray-600">
                      Joined: {u.joined} • <span className="text-emerald-700">{u.type}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. Analytics Cards: Pie/Bar */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-5 flex flex-col items-center"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <h3 className="font-bold text-blue-700 text-md mb-3">
            User Distribution by Region
          </h3>
          <Pie data={pieData} height={180} options={{
            plugins: { legend: { position: "bottom" as const } }
          }} />
        </motion.div>
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-5 flex flex-col items-center"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-bold text-blue-700 text-md mb-3">
            Signups by User Type (last 30d)
          </h3>
          <Bar data={barUserTypeData} height={180} options={barUserTypeOptions} />
        </motion.div>
        <motion.div
          className="bg-gradient-to-br from-blue-50 via-emerald-50 to-yellow-50 shadow-xl rounded-3xl p-6 flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="font-bold text-emerald-700 text-md mb-3">
            Why User Growth Matters
          </h3>
          <div className="text-gray-700 text-sm leading-relaxed text-center">
            Sustained user growth powers new revenue, expands our ecosystem, and
            unlocks future banking services. Every insight here helps us shape tomorrow’s innovation and strategy.
          </div>
        </motion.div>
      </section>

      {/* 4. Sticky Info/Compliance Card */}
      <aside className="fixed bottom-8 right-8 bg-gradient-to-br from-emerald-400 to-blue-400 shadow-2xl text-white rounded-2xl px-6 py-5 w-[330px] z-20 border-2 border-emerald-200/60">
        <div className="font-bold text-lg mb-1">Growth Compliance Insights</div>
        <ul className="text-xs leading-relaxed list-disc pl-4">
          <li>Track signups by region for regulatory reporting.</li>
          <li>Ensure balanced acquisition to mitigate risk.</li>
          <li>Analyze inactive accounts for re-engagement.</li>
          <li>Export user growth data monthly for audit.</li>
        </ul>
      </aside>
    </main>
  );
}
