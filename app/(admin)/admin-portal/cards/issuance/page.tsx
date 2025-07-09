"use client";

import { motion } from "framer-motion";
import { Line, Doughnut } from "react-chartjs-2";
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
} from "chart.js";
import { CreditCard, Users2, CheckCircle2, Loader2, XCircle } from "lucide-react";

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

// Hero image (Unsplash, CC0)
const heroImage =
  "https://images.unsplash.com/photo-1627924657731-3f9af38e09fd?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGJhbmslMjBjYXJkfGVufDB8fDB8fHww";

// Quick stats
const stats = [
  {
    label: "Cards Issued (30d)",
    value: 1_154,
    icon: <CreditCard className="w-6 h-6 text-emerald-700" />,
  },
  {
    label: "Active Cardholders",
    value: 9_870,
    icon: <Users2 className="w-6 h-6 text-blue-600" />,
  },
  {
    label: "Approval Rate",
    value: "94.5%",
    icon: <CheckCircle2 className="w-6 h-6 text-yellow-500" />,
  },
];

// Line chart: Cards issued per day (past 30d)
const lineData = {
  labels: Array.from({ length: 30 }, (_, i) => `${i + 1} Jul`),
  datasets: [
    {
      label: "Cards Issued",
      data: [
        24, 38, 20, 45, 28, 51, 48, 34, 47, 42,
        38, 54, 41, 39, 61, 44, 29, 52, 36, 55,
        51, 46, 43, 48, 32, 53, 56, 39, 47, 51,
      ],
      borderColor: "#059669",
      backgroundColor: "rgba(16,185,129,0.16)",
      tension: 0.33,
      pointRadius: 2,
      fill: true,
    },
  ],
};
const lineOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
  },
  scales: {
    x: { display: false },
    y: { beginAtZero: true, grid: { color: "#eef2ff" } },
  },
};

// Doughnut: Card type distribution
const doughnutData = {
  labels: ["Debit", "Credit", "Prepaid", "Virtual"],
  datasets: [
    {
      data: [620, 340, 118, 76],
      backgroundColor: ["#059669", "#2563eb", "#fbbf24", "#a21caf"],
      borderWidth: 2,
      borderColor: "#fff",
    },
  ],
};

// Recent issued cards (mix of faces and countries)
const cards = [
  {
    id: "CI3001",
    user: "Tendai Ncube",
    avatar: "https://randomuser.me/api/portraits/men/77.jpg",
    nationality: "Zimbabwean",
    cardType: "Debit",
    issued: "2024-07-29 11:23",
    status: "Active",
    last4: "3298",
    channel: "Mobile App",
  },
  {
    id: "CI3002",
    user: "Rachel White",
    avatar: "https://randomuser.me/api/portraits/women/55.jpg",
    nationality: "British",
    cardType: "Credit",
    issued: "2024-07-29 12:04",
    status: "Pending",
    last4: "5441",
    channel: "Branch",
  },
  {
    id: "CI3003",
    user: "Akira Takahashi",
    avatar: "https://randomuser.me/api/portraits/men/19.jpg",
    nationality: "Japanese",
    cardType: "Virtual",
    issued: "2024-07-29 13:37",
    status: "Active",
    last4: "0016",
    channel: "Online",
  },
  {
    id: "CI3004",
    user: "John Smith",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    nationality: "American",
    cardType: "Prepaid",
    issued: "2024-07-29 14:12",
    status: "Active",
    last4: "7823",
    channel: "Mobile App",
  },
  {
    id: "CI3005",
    user: "Chipo Dube",
    avatar: "https://randomuser.me/api/portraits/women/37.jpg",
    nationality: "South African",
    cardType: "Debit",
    issued: "2024-07-29 15:01",
    status: "Pending",
    last4: "3402",
    channel: "Branch",
  },
];

// Status badge
function statusBadge(status: string) {
  if (status === "Active")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-medium">
        <CheckCircle2 className="w-4 h-4" /> {status}
      </span>
    );
  if (status === "Pending")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 text-xs font-medium">
        <Loader2 className="w-4 h-4 animate-spin" /> {status}
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-100 text-red-700 text-xs font-medium">
      <XCircle className="w-4 h-4" /> {status}
    </span>
  );
}

export default function CardsIssuancePage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10 w-full">
      {/* Hero/Intro */}
      <motion.section
        className="rounded-2xl bg-gradient-to-br from-blue-50 via-emerald-100 to-yellow-100 flex flex-col md:flex-row items-center gap-10 mb-10 shadow-xl px-8 py-8"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl md:text-4xl font-black text-emerald-700 tracking-tight">
            Card Issuance
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl">
            Monitor and manage card issuance—see recent activity, approval rates, channel breakdowns, and more. 
            Analyze growth, spot trends, and quickly troubleshoot issues affecting onboarding and activation.
          </p>
          <div className="flex flex-row gap-7 mt-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-1 bg-white/60 px-4 py-2 rounded-xl shadow border-0"
              >
                {s.icon}
                <span className="text-2xl font-bold text-emerald-700">{s.value}</span>
                <span className="text-sm text-gray-600">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <img
          src={heroImage}
          alt="Bank card hero"
          className="w-[370px] h-[210px] object-cover rounded-xl shadow-lg border-2 border-emerald-200"
        />
      </motion.section>

      {/* Line + Donut Section */}
      <section className="grid md:grid-cols-2 gap-10 mb-12">
        <div className="bg-white rounded-2xl shadow-lg p-7">
          <h2 className="font-bold text-lg text-blue-700 mb-4">Cards Issued per Day (Last 30d)</h2>
          <Line data={lineData} height={210} options={lineOptions} />
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-7 flex flex-col items-center justify-center">
          <h2 className="font-bold text-lg text-blue-700 mb-4">Card Type Distribution</h2>
          <Doughnut
            data={doughnutData}
            height={210}
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
      </section>

      {/* Recent cards table/list */}
      <section>
        <h2 className="font-bold text-xl text-emerald-800 mb-5">Recent Cards Issued</h2>
        <div className="flex flex-col gap-7">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex flex-col md:flex-row items-center gap-6 bg-emerald-50/30 hover:bg-emerald-100/60 rounded-xl px-5 py-4 transition border border-emerald-100"
            >
              <img
                src={card.avatar}
                alt={card.user}
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                loading="lazy"
                onError={e => {
                  (e.target as HTMLImageElement).src = "https://randomuser.me/api/portraits/lego/1.jpg";
                }}
              />
              <div className="flex-1 flex flex-col md:flex-row gap-5 items-center">
                <div>
                  <span className="font-semibold text-emerald-900">{card.user}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-700 ml-2">{card.nationality}</span>
                </div>
                <div>
                  <span className="text-xs rounded-full px-2 py-0.5 bg-blue-100 text-blue-700">{card.cardType}</span>
                </div>
                <div>
                  <span className="text-xs font-mono text-gray-700">**** {card.last4}</span>
                  <span className="text-xs text-gray-400 ml-2">{card.channel}</span>
                </div>
                <div className="text-xs text-gray-400">{card.issued}</div>
                <div>{statusBadge(card.status)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
