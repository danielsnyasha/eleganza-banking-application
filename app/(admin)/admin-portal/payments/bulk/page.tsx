"use client";

import { motion } from "framer-motion";
import { Bar, Radar } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { FileSpreadsheet, Server, Globe2, Users2, Banknote, Loader2, CheckCircle2, XCircle } from "lucide-react";

Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);

// Bulk metrics (for the header strip)
const bulkStats = [
  {
    label: "Batches",
    value: 54,
    icon: <Server className="w-6 h-6 text-blue-500" />,
    color: "from-blue-100 via-blue-300 to-blue-500",
  },
  {
    label: "Total Value",
    value: "$7,990,000",
    icon: <Banknote className="w-6 h-6 text-emerald-600" />,
    color: "from-emerald-100 via-emerald-300 to-emerald-500",
  },
  {
    label: "Recipients",
    value: "1,372",
    icon: <Users2 className="w-6 h-6 text-yellow-500" />,
    color: "from-yellow-100 via-yellow-300 to-yellow-500",
  },
  {
    label: "Avg. Success Rate",
    value: "98.7%",
    icon: <CheckCircle2 className="w-6 h-6 text-emerald-700" />,
    color: "from-emerald-100 via-emerald-300 to-emerald-500",
  },
];

// Clustered bar chart: Value by recipient sector and month
const clusterData = {
  labels: ["Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Corporate Payroll",
      data: [500000, 700000, 900000, 720000, 790000],
      backgroundColor: "#2563eb",
    },
    {
      label: "Govt Pensions",
      data: [250000, 320000, 305000, 370000, 390000],
      backgroundColor: "#fbbf24",
    },
    {
      label: "NGO Disbursements",
      data: [120000, 135000, 145000, 150000, 156000],
      backgroundColor: "#059669",
    },
    {
      label: "Freelancers",
      data: [45000, 48000, 52000, 55000, 60000],
      backgroundColor: "#a21caf",
    },
  ],
};
const clusterOptions = {
  responsive: true,
  plugins: {
    legend: { position: "bottom" as const },
    title: { display: false },
    tooltip: {},
  },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true, ticks: { callback: (v: number) => `$${v / 1000}k` } },
  },
};

// Radar chart: Efficiency, error rate, approval speed, etc.
const radarData = {
  labels: ["Efficiency", "Error Rate", "Approval Speed", "Volume", "Rejection Rate"],
  datasets: [
    {
      label: "Bulk Payments (July)",
      data: [92, 5, 87, 95, 3],
      backgroundColor: "rgba(16,185,129,0.2)",
      borderColor: "#059669",
      pointBackgroundColor: "#059669",
    },
  ],
};
const radarOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
  },
  scales: {
    r: {
      angleLines: { display: false },
      suggestedMin: 0,
      suggestedMax: 100,
      pointLabels: { font: { size: 14 } },
      ticks: { stepSize: 20, color: "#888" },
    },
  },
};

// Recent batches: diverse, realistic
const batches = [
  {
    id: "BPB101",
    name: "ZIMRA Payroll July",
    icon: <FileSpreadsheet className="w-6 h-6 text-green-700" />,
    channel: "CSV Upload",
    recipients: 430,
    value: 2800000,
    submitted: "2024-07-26 08:00",
    user: "Govt of Zimbabwe",
    avatar: "https://logo.clearbit.com/zimra.co.zw",
    progress: 100,
    status: "Completed",
    note: "All salaries processed successfully.",
  },
  {
    id: "BPB102",
    name: "Old Mutual Freelancers",
    icon: <Server className="w-6 h-6 text-purple-600" />,
    channel: "API",
    recipients: 65,
    value: 22500,
    submitted: "2024-07-28 11:22",
    user: "Old Mutual",
    avatar: "https://logo.clearbit.com/oldmutual.com",
    progress: 100,
    status: "Completed",
    note: "Freelancer payments, all cleared.",
  },
  {
    id: "BPB103",
    name: "Mukuru NGO Disbursements",
    icon: <Globe2 className="w-6 h-6 text-blue-600" />,
    channel: "API",
    recipients: 385,
    value: 143200,
    submitted: "2024-07-29 09:15",
    user: "Mukuru Aid Project",
    avatar: "https://logo.clearbit.com/mukuru.com",
    progress: 80,
    status: "Processing",
    note: "78% cleared, some pending confirmations.",
  },
  {
    id: "BPB104",
    name: "AfricaWeb Corp Payroll",
    icon: <FileSpreadsheet className="w-6 h-6 text-yellow-600" />,
    channel: "CSV Upload",
    recipients: 92,
    value: 48200,
    submitted: "2024-07-29 10:35",
    user: "AfricaWeb Ltd.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    progress: 100,
    status: "Completed",
    note: "All payroll processed. Download slip generated.",
  },
  {
    id: "BPB105",
    name: "Japan Devs Grants",
    icon: <Server className="w-6 h-6 text-red-600" />,
    channel: "API",
    recipients: 400,
    value: 167500,
    submitted: "2024-07-29 14:05",
    user: "Kenta Nakamura",
    avatar: "https://randomuser.me/api/portraits/men/63.jpg",
    progress: 93,
    status: "Processing",
    note: "Bank clearance in progress.",
  },
];

// Status badge
function statusBadge(status: string) {
  if (status === "Completed")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-medium">
        <CheckCircle2 className="w-4 h-4" /> {status}
      </span>
    );
  if (status === "Processing")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-medium">
        <Loader2 className="w-4 h-4 animate-spin" /> {status}
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-100 text-red-700 text-xs font-medium">
      <XCircle className="w-4 h-4" /> {status}
    </span>
  );
}

export default function PaymentsBulkPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10 w-full">
      {/* Horizontal metrics strip */}
      <motion.section
        className="flex flex-row gap-6 overflow-x-auto mb-8 pb-2 hide-scrollbar"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {bulkStats.map((stat, i) => (
          <div
            key={stat.label}
            className={`min-w-[220px] flex flex-col items-center rounded-2xl bg-gradient-to-br ${stat.color} px-7 py-5 shadow-lg border-0`}
          >
            <div className="mb-2">{stat.icon}</div>
            <span className="font-extrabold text-2xl text-emerald-900 mb-1">{stat.value}</span>
            <span className="text-md text-gray-700">{stat.label}</span>
          </div>
        ))}
      </motion.section>

      {/* Explanation */}
      <section className="mb-10">
        <h1 className="text-2xl md:text-3xl font-black text-emerald-700 mb-2 tracking-tight">
          Bulk Payments
        </h1>
        <p className="text-gray-700 text-base md:text-lg max-w-3xl">
          Monitor, review, and troubleshoot mass payments such as corporate payroll, government pensions, and aid disbursements. Track batch status, value, and performance metrics at a glance.<br /><br />
          <span className="font-semibold text-emerald-700">Why is this section critical?</span><br />
          Early detection of errors, rejections, and delays helps minimize downstream issues for both payers and recipients.
        </p>
      </section>

      {/* Clustered bar and Radar charts in one row */}
      <section className="grid md:grid-cols-2 gap-8 mb-14">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="font-bold text-lg text-blue-700 mb-4">Bulk Value by Sector & Month</h2>
          <Bar data={clusterData} height={230} options={clusterOptions} />
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
          <h2 className="font-bold text-lg text-blue-700 mb-4">Bulk Payments Performance (July)</h2>
          <Radar data={radarData} height={230} options={radarOptions} />
        </div>
      </section>

      {/* Recent Bulk Batches */}
      <section>
        <h2 className="font-bold text-xl text-emerald-800 mb-5">Recent Bulk Batches</h2>
        <div className="flex flex-col gap-7">
          {batches.map((b) => (
            <div
              key={b.id}
              className="flex flex-col md:flex-row items-center gap-6 bg-emerald-50/30 hover:bg-emerald-100/60 rounded-xl px-5 py-4 transition border border-emerald-100"
            >
              <div className="flex items-center gap-4 min-w-[200px]">
                {b.icon}
                <img
                  src={b.avatar}
                  alt={b.user}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                  loading="lazy"
                  onError={e => {
                    (e.target as HTMLImageElement).src = "https://randomuser.me/api/portraits/lego/2.jpg";
                  }}
                />
                <div>
                  <div className="font-bold text-emerald-900">{b.user}</div>
                  <div className="text-xs text-gray-500">{b.channel}</div>
                </div>
              </div>
              <div className="flex-1 flex flex-col md:flex-row gap-6 items-center">
                <div>
                  <div className="font-semibold text-blue-700">{b.name}</div>
                  <div className="text-xs text-gray-400">{b.submitted}</div>
                  <div className="text-xs text-gray-600">
                    <span className="font-bold">{b.recipients}</span> recipients
                  </div>
                </div>
                <div>
                  <span className="text-lg font-bold text-emerald-700">${b.value.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-600">Progress</span>
                  <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all`}
                      style={{
                        width: `${b.progress}%`,
                        background:
                          b.status === "Completed"
                            ? "linear-gradient(to right, #059669, #10b981)"
                            : "#2563eb",
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-700">{b.progress}%</span>
                </div>
                <div>{statusBadge(b.status)}</div>
              </div>
              <div className="text-xs text-gray-600 mt-2 md:mt-0 md:w-[260px]">{b.note}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
