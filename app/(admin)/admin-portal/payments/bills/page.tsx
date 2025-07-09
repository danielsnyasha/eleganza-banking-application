"use client";

import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { TrendingUp, Home, Phone, Banknote, GraduationCap, Globe2, ReceiptText, CreditCard } from "lucide-react";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

// Bill type breakdown
const billTypes = [
  {
    label: "Electricity",
    icon: <Home className="text-yellow-500" />,
    count: 135,
    value: 18560,
    provider: "ZESA",
  },
  {
    label: "Telecoms",
    icon: <Phone className="text-blue-500" />,
    count: 90,
    value: 7200,
    provider: "NetOne",
  },
  {
    label: "Insurance",
    icon: <Banknote className="text-emerald-600" />,
    count: 41,
    value: 13200,
    provider: "Old Mutual",
  },
  {
    label: "Tuition",
    icon: <GraduationCap className="text-purple-600" />,
    count: 18,
    value: 10500,
    provider: "Midlands State University",
  },
  {
    label: "Tax",
    icon: <ReceiptText className="text-red-500" />,
    count: 22,
    value: 14100,
    provider: "ZIMRA",
  },
];

// Bar chart: Bills by type and month
const barData = {
  labels: ["Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Electricity",
      data: [23, 41, 36, 18, 17],
      backgroundColor: "#fbbf24",
      stack: "A",
    },
    {
      label: "Telecoms",
      data: [18, 25, 21, 10, 16],
      backgroundColor: "#2563eb",
      stack: "A",
    },
    {
      label: "Insurance",
      data: [13, 15, 16, 7, 12],
      backgroundColor: "#059669",
      stack: "A",
    },
    {
      label: "Tuition",
      data: [2, 6, 3, 8, 5],
      backgroundColor: "#a78bfa",
      stack: "A",
    },
    {
      label: "Tax",
      data: [3, 5, 5, 3, 6],
      backgroundColor: "#ef4444",
      stack: "A",
    },
  ],
};
const barOptions = {
  responsive: true,
  plugins: {
    legend: { position: "bottom" as const },
    title: { display: false },
    tooltip: {},
  },
  scales: {
    x: { stacked: true },
    y: { stacked: true, beginAtZero: true },
  },
};

// Recent bills paid - DIVERSITY!
const bills = [
  {
    id: "BP2101",
    user: "Tendai Ncube",
    avatar: "https://randomuser.me/api/portraits/men/31.jpg",
    nationality: "Zimbabwean",
    amount: 65,
    provider: "ZESA",
    billType: "Electricity",
    currency: "USD",
    channel: "Mobile",
    date: "2024-07-30 07:12",
    status: "Completed",
  },
  {
    id: "BP2102",
    user: "Charlotte Müller",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    nationality: "German",
    amount: 130,
    provider: "NetOne",
    billType: "Telecoms",
    currency: "USD",
    channel: "Card",
    date: "2024-07-30 08:10",
    status: "Completed",
  },
  {
    id: "BP2103",
    user: "Lin Wei",
    avatar: "https://randomuser.me/api/portraits/men/92.jpg",
    nationality: "Chinese",
    amount: 480,
    provider: "Tokyo Gas",
    billType: "Electricity",
    currency: "JPY",
    channel: "Bank",
    date: "2024-07-30 08:44",
    status: "Completed",
  },
  {
    id: "BP2104",
    user: "Ayumi Tanaka",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    nationality: "Japanese",
    amount: 320,
    provider: "Tokyo Gas",
    billType: "Electricity",
    currency: "JPY",
    channel: "Bank",
    date: "2024-07-30 08:50",
    status: "Pending",
  },
  {
    id: "BP2105",
    user: "Mike Olsen",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    nationality: "American",
    amount: 210,
    provider: "Old Mutual",
    billType: "Insurance",
    currency: "USD",
    channel: "EFT",
    date: "2024-07-30 09:20",
    status: "Completed",
  },
  {
    id: "BP2106",
    user: "Jabulani Dube",
    avatar: "https://randomuser.me/api/portraits/men/23.jpg",
    nationality: "South African",
    amount: 90,
    provider: "ZIMRA",
    billType: "Tax",
    currency: "USD",
    channel: "Mobile",
    date: "2024-07-30 09:28",
    status: "Failed",
  },
];

// Helper for status badge
function statusBadge(status: string) {
  if (status === "Completed")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-medium">
        <CreditCard className="w-4 h-4" /> {status}
      </span>
    );
  if (status === "Pending")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 text-xs font-medium">
        <TrendingUp className="w-4 h-4 animate-bounce" /> {status}
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-100 text-red-700 text-xs font-medium">
      <TrendingUp className="w-4 h-4" /> {status}
    </span>
  );
}

export default function PaymentsBillsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10 w-full">
      {/* 1. Header Overview */}
      <motion.section
        className="bg-gradient-to-r from-emerald-700 via-blue-500 to-yellow-400 rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center gap-10 mb-10 shadow-xl"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex-1">
          <h1 className="text-2xl md:text-4xl font-black text-white mb-2 tracking-tight">
            Bills Paid Overview
          </h1>
          <div className="flex items-center gap-6 mt-2">
            <span className="text-4xl md:text-5xl font-bold text-yellow-200 drop-shadow-lg">306</span>
            <span className="text-lg text-white/90">Bills Paid <span className="text-base ml-1">(last 30 days)</span></span>
          </div>
          <div className="mt-3 flex items-center gap-4">
            <span className="text-lg text-emerald-50 font-bold">USD 67,890</span>
            <span className="text-sm text-white/70">Total Value</span>
            <span className="w-40 h-2 bg-emerald-200/30 rounded-full overflow-hidden">
              <span className="block h-2 bg-emerald-500 rounded-full w-3/4 animate-pulse" />
            </span>
            <span className="text-xs text-emerald-50">(↑17% from last month)</span>
          </div>
        </div>
        <Globe2 className="w-32 h-32 text-white/40" />
      </motion.section>

      {/* 2. Bill Types Breakdown */}
      <section className="grid md:grid-cols-5 gap-5 mb-10">
        {billTypes.map((bt) => (
          <div
            key={bt.label}
            className="rounded-2xl bg-white border-0 shadow-md flex flex-col items-center py-5 px-4 transition hover:shadow-lg"
          >
            <div className="mb-2">{bt.icon}</div>
            <span className="font-bold text-emerald-700 text-xl">{bt.count}</span>
            <span className="text-sm text-gray-500 mb-1">{bt.label}</span>
            <span className="text-xs text-blue-600">{bt.provider}</span>
            <span className="font-semibold text-emerald-600 text-base mt-1">${bt.value.toLocaleString()}</span>
          </div>
        ))}
      </section>

      {/* 3. Map Section */}
      <motion.section
        className="bg-gradient-to-r from-blue-50 via-emerald-50 to-yellow-50 rounded-2xl px-7 py-7 mb-12 shadow"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex items-center gap-7">
          <div className="flex-1">
            <h2 className="font-bold text-xl text-emerald-800 mb-1">Where Bills Are Paid</h2>
            <p className="text-gray-700 mb-3 text-sm">
              Users from Africa, Europe, America, and Asia are paying bills on our platform. Our diverse user base includes customers paying utilities, telecoms, insurance, tuition, and tax bills from all corners of the world.
            </p>
            {/* (This could be a real map in production; here is a simple image placeholder) */}
            <img
              src="https://cdn.pixabay.com/photo/2024/01/22/22/09/map-8526430_640.jpg"
              alt="User World Map"
              className="rounded-xl object-cover w-full h-48 border-2 border-blue-200"
              style={{ boxShadow: "0 6px 28px 2px #dbeafe44" }}
            />
          </div>
        </div>
      </motion.section>

      {/* 4. Bill Payments Timeline */}
      <section className="mb-14">
        <h2 className="font-bold text-2xl text-emerald-700 mb-5">Recent Bills Paid</h2>
        <div className="flex flex-col gap-6">
          {bills.map((bill) => (
            <div
              key={bill.id}
              className="flex items-center gap-5 bg-emerald-50/30 hover:bg-emerald-100/60 rounded-xl px-4 py-3 transition border border-emerald-100"
            >
              <img
                src={bill.avatar}
                alt={bill.user}
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                loading="lazy"
                onError={e => {
                  (e.target as HTMLImageElement).src = "https://randomuser.me/api/portraits/lego/1.jpg";
                }}
              />
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 items-center mb-1">
                  <span className="font-semibold text-emerald-900">{bill.user}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-700">{bill.nationality}</span>
                  <span className="text-xs rounded-full px-2 py-0.5 bg-blue-100 text-blue-700">{bill.billType}</span>
                  <span className="text-xs bg-yellow-100 text-yellow-700 rounded-full px-2 py-0.5">{bill.provider}</span>
                  <span className="ml-2">{statusBadge(bill.status)}</span>
                </div>
                <div className="text-sm text-gray-700 flex gap-3">
                  <span className="font-mono text-blue-800">${bill.amount}</span>
                  <span className="text-xs text-gray-600">{bill.currency}</span>
                  <span className="text-xs text-blue-500">via {bill.channel}</span>
                  <span className="text-xs text-gray-400">{bill.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Column/Stacked Bar Chart */}
      <motion.section
        className="bg-white rounded-2xl shadow-lg p-8 mb-12"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="font-bold text-xl text-emerald-800 mb-5">Bills Paid by Type and Month</h2>
        <Bar data={barData} height={250} options={barOptions} />
      </motion.section>

      {/* 6. Sticky Compliance/Info Box */}
      <aside className="fixed bottom-8 right-8 bg-gradient-to-br from-emerald-400 to-blue-400 shadow-2xl text-white rounded-2xl px-6 py-5 w-[320px] z-20 border-2 border-emerald-200/60">
        <div className="font-bold text-lg mb-1">Compliance Insights</div>
        <ul className="text-xs leading-relaxed list-disc pl-4">
          <li>Monitor for abnormal bill patterns and flagged providers.</li>
          <li>Ensure KYC is up to date for all billers and users.</li>
          <li>Cross-check failed/pending bills for fraud or errors.</li>
          <li>Regularly export bill payment logs for audit.</li>
        </ul>
      </aside>
    </main>
  );
}
