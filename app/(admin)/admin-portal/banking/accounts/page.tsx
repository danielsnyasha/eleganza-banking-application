"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Radar, Pie } from "react-chartjs-2";
import {
  Chart,
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import { Building2, User2, BriefcaseBusiness, PiggyBank, Banknote, ShieldCheck } from "lucide-react";

Chart.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale
);

// Dummy summary data
const summary = {
  total: 43872,
  individuals: 24750,
  business: 16500,
  investment: 1430,
  savings: 2732,
  fx: 460,
  active: 39670,
  dormant: 2620,
  closed: 1582,
};

// Dummy radar data for account types
const radarData = {
  labels: [
    "Individual",
    "Business",
    "Investment",
    "Savings",
    "FX"
  ],
  datasets: [
    {
      label: "Accounts",
      data: [
        summary.individuals,
        summary.business,
        summary.investment,
        summary.savings,
        summary.fx,
      ],
      backgroundColor: "rgba(16,185,129,0.2)",
      borderColor: "#059669",
      pointBackgroundColor: "#059669",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "#059669",
      borderWidth: 3,
    },
  ],
};

// Pie chart for accounts by region/sector
const pieData = {
  labels: [
    "Retail",
    "Corporate",
    "NGO",
    "SME",
    "Govt."
  ],
  datasets: [
    {
      data: [23800, 16100, 820, 5600, 552],
      backgroundColor: [
        "#059669",
        "#fbbf24",
        "#2563eb",
        "#a3e635",
        "#f87171"
      ],
      borderColor: "#fff",
      borderWidth: 2,
    },
  ],
};

// Dummy account records (mixed)
const accounts = [
  {
    id: "AC78923",
    name: "Tendai Ncube",
    type: "Individual",
    balance: 6540.23,
    currency: "USD",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/27.jpg",
    opened: "2023-08-21",
  },
  {
    id: "AC43701",
    name: "Sable Holdings Ltd.",
    type: "Business",
    balance: 212300.0,
    currency: "USD",
    status: "Active",
    avatar: "https://logo.clearbit.com/sable.co",
    opened: "2021-03-12",
  },
  {
    id: "AC58214",
    name: "Violet Banda",
    type: "Savings",
    balance: 980.11,
    currency: "USD",
    status: "Dormant",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    opened: "2020-10-07",
  },
  {
    id: "AC16349",
    name: "Nkomo Investments",
    type: "Investment",
    balance: 49500.0,
    currency: "USD",
    status: "Active",
    avatar: "https://logo.clearbit.com/investec.com",
    opened: "2022-11-17",
  },
  {
    id: "AC92188",
    name: "Sam Phiri",
    type: "FX",
    balance: 120.45,
    currency: "USD",
    status: "Closed",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    opened: "2018-07-02",
  },
];

export default function AccountsPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10 w-full">
      <motion.h1
        className="text-3xl md:text-4xl font-extrabold text-emerald-700 mb-2"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Accounts Management
      </motion.h1>
      <motion.p
        className="text-lg text-gray-700 mb-8 max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.13, duration: 0.7 }}
      >
        This section allows admins to view and manage all types of accounts across the Eleganza Bank ecosystem: from individual customers to large corporates, investment groups, and specialized savings or FX accounts.<br /><br />
        <span className="font-semibold text-emerald-700">Multi-corporate banking made easy:</span>
        <br />
        Gain insights, manage onboarding, spot trends, and power the frontend user experience with live account analytics and reporting.
      </motion.p>

      {/* Summary Cards */}
      <section className="grid md:grid-cols-4 gap-5 mb-10">
        <Card className="bg-gradient-to-br from-emerald-600 via-emerald-400 to-green-300 text-white border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Banknote className="w-6 h-6" /> Total Accounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{summary.total.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User2 className="w-5 h-5 text-emerald-600" /> Individuals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-emerald-700">{summary.individuals.toLocaleString()}</p>
            <span className="text-xs text-gray-500">Personal accounts</span>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BriefcaseBusiness className="w-5 h-5 text-yellow-600" /> Business
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-yellow-700">{summary.business.toLocaleString()}</p>
            <span className="text-xs text-gray-500">Corporate & SME accounts</span>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PiggyBank className="w-5 h-5 text-lime-600" /> Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-lime-700">{summary.savings.toLocaleString()}</p>
            <span className="text-xs text-gray-500">High-yield & personal savers</span>
          </CardContent>
        </Card>
      </section>

      {/* Charts */}
      <section className="grid md:grid-cols-2 gap-8 mb-14">
        <Card className="border-0 rounded-2xl shadow-lg p-4">
          <CardHeader>
            <CardTitle className="text-emerald-700">Accounts by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <Radar
              data={radarData}
              height={220}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      label: (ctx: any) => `${ctx.dataset.label}: ${ctx.formattedValue}`,
                    },
                  },
                },
                scales: {
                  r: {
                    angleLines: { color: "#e0e7ef" },
                    grid: { color: "#e0e7ef" },
                    pointLabels: { color: "#059669", font: { size: 14, weight: "bold" } },
                    ticks: {
                      callback: (val: number) => (val >= 1000 ? (val / 1000) + "k" : val),
                      color: "#636363",
                    },
                  },
                },
              }}
            />
          </CardContent>
        </Card>
        <Card className="border-0 rounded-2xl shadow-lg p-4">
          <CardHeader>
            <CardTitle className="text-emerald-700">Accounts by Sector/Region</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <Pie
                data={pieData}
                height={220}
                options={{
                  plugins: {
                    legend: {
                      position: "right",
                      labels: { font: { size: 13 } },
                    },
                  },
                  cutout: 70,
                }}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Account Listing */}
      <motion.section
        className="bg-white rounded-2xl shadow-xl p-8 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-xl md:text-2xl font-bold mb-7 text-emerald-700">
          Example Accounts
        </h2>
        <div className="flex flex-col gap-5">
          {accounts.map((acct) => (
            <div
              key={acct.id}
              className="flex items-center gap-5 bg-emerald-50/40 hover:bg-emerald-100/40 rounded-xl px-4 py-3 transition"
            >
              <img
                src={acct.avatar}
                alt={acct.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-200"
                loading="lazy"
                onError={e => {
                  // fallback to generic avatar if logo fails
                  (e.target as HTMLImageElement).src =
                    acct.type === "Business" || acct.type === "Investment"
                      ? "https://randomuser.me/api/portraits/lego/2.jpg"
                      : "https://randomuser.me/api/portraits/lego/1.jpg";
                }}
              />
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="font-semibold text-emerald-900">{acct.name}</span>
                  <span
                    className="text-xs rounded-full px-2 py-0.5 ml-1 font-medium"
                    style={{
                      background:
                        acct.type === "Individual"
                          ? "rgba(16,185,129,0.10)"
                          : acct.type === "Business"
                          ? "rgba(251,191,36,0.10)"
                          : acct.type === "Savings"
                          ? "rgba(163,230,53,0.10)"
                          : acct.type === "Investment"
                          ? "rgba(109,40,217,0.10)"
                          : "rgba(59,130,246,0.10)",
                      color:
                        acct.type === "Individual"
                          ? "#059669"
                          : acct.type === "Business"
                          ? "#f59e42"
                          : acct.type === "Savings"
                          ? "#65a30d"
                          : acct.type === "Investment"
                          ? "#6d28d9"
                          : "#2563eb",
                    }}
                  >
                    {acct.type}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    Opened: {acct.opened}
                  </span>
                  <span className={`
                    ml-2 px-2 py-0.5 rounded-full text-xs font-medium
                    ${acct.status === "Active" ? "bg-emerald-100 text-emerald-700" : ""}
                    ${acct.status === "Dormant" ? "bg-yellow-100 text-yellow-700" : ""}
                    ${acct.status === "Closed" ? "bg-red-100 text-red-700" : ""}
                  `}>
                    {acct.status}
                  </span>
                </div>
                <div className="text-sm text-gray-700">
                  Account ID: <span className="font-mono text-gray-900">{acct.id}</span>
                </div>
              </div>
              <div className="text-right min-w-[130px]">
                <div className="text-lg font-bold text-emerald-700">
                  ${acct.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  <span className="text-xs text-gray-600 ml-1">{acct.currency}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
