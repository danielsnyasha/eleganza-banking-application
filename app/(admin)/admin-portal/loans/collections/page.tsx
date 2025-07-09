"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Doughnut, Line } from "react-chartjs-2";
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
  ChartOptions,
  Filler,
} from "chart.js";
import {
  BadgeDollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Users2,
  RefreshCcw,
  Phone,
  MessageCircle,
  CheckCircle2,
  XCircle,
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

const stats = [
  {
    label: "Total Collected (30d)",
    value: "$1,293,500",
    icon: <BadgeDollarSign className="w-6 h-6 text-emerald-700" />,
    desc: "Amount collected in last 30 days",
    bg: "from-emerald-100 via-emerald-200 to-emerald-400",
  },
  {
    label: "Collection Rate",
    value: "91.4%",
    icon: <TrendingUp className="w-6 h-6 text-blue-700" />,
    desc: "Portion of due loans collected",
    bg: "from-blue-100 via-blue-200 to-blue-500",
  },
  {
    label: "Overdue Amount",
    value: "$119,700",
    icon: <AlertTriangle className="w-6 h-6 text-red-700" />,
    desc: "Total 30+ days overdue",
    bg: "from-red-100 via-red-200 to-red-400",
  },
  {
    label: "Active Collectors",
    value: "8",
    icon: <Users2 className="w-6 h-6 text-yellow-500" />,
    desc: "Staff assigned to collections",
    bg: "from-yellow-100 via-yellow-200 to-yellow-400",
  },
  {
    label: "Accounts in Recovery",
    value: "42",
    icon: <RefreshCcw className="w-6 h-6 text-blue-700" />,
    desc: "Accounts flagged for recovery",
    bg: "from-blue-100 via-blue-200 to-blue-400",
  },
  {
    label: "Promises to Pay",
    value: "14",
    icon: <Phone className="w-6 h-6 text-green-700" />,
    desc: "Borrowers promising late payment",
    bg: "from-green-50 via-green-100 to-green-300",
  },
];

const donutData = {
  labels: ["Collected", "Outstanding"],
  datasets: [
    {
      data: [1293500, 119700],
      backgroundColor: ["#059669", "#fbbf24"],
      borderWidth: 2,
      borderColor: "#fff",
    },
  ],
};
const donutOptions = {
  plugins: {
    legend: { position: "bottom" as const, labels: { font: { size: 13 } } },
  },
  cutout: 68,
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const lineData = {
  labels: months,
  datasets: [
    {
      label: "Collected",
      data: [187000, 178400, 192000, 201500, 209100, 214800, 216700],
      borderColor: "#059669",
      backgroundColor: "rgba(16,185,129,0.18)",
      fill: true,
      tension: 0.37,
    },
    {
      label: "Overdue",
      data: [23000, 19800, 21700, 18500, 13100, 12300, 11970],
      borderColor: "#fbbf24",
      backgroundColor: "rgba(251,191,36,0.20)",
      fill: true,
      tension: 0.27,
    },
  ],
};
const lineOptions: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: { position: "bottom" },
    title: { display: false },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
      beginAtZero: true,
      min: 0,
      max: 250000,
      ticks: {
        stepSize: 50000,
        callback: (tickValue) =>
          typeof tickValue === "number" ? `$${tickValue / 1000}k` : `${tickValue}`,
      },
      grid: { color: "#f3f4f6" },
    },
    x: { grid: { color: "#f3f4f6" } },
  },
};

const collectors = [
  {
    name: "Nyasha Daniels",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    collected: 302700,
    accounts: 13,
    p2p: 3,
  },
  {
    name: "Rachel White",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    collected: 224500,
    accounts: 8,
    p2p: 2,
  },
  {
    name: "Chen Lei",
    avatar: "https://randomuser.me/api/portraits/men/86.jpg",
    collected: 195200,
    accounts: 10,
    p2p: 1,
  },
  {
    name: "John Smith",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    collected: 173200,
    accounts: 7,
    p2p: 1,
  },
  {
    name: "Akira Tanaka",
    avatar: "https://randomuser.me/api/portraits/men/53.jpg",
    collected: 128300,
    accounts: 4,
    p2p: 0,
  },
];

const overdueLoans = [
  {
    id: "LN0552",
    user: "Tendai Ncube",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    type: "Personal",
    due: "$2,600",
    lastContact: "2024-07-20",
    collector: "Rachel White",
    status: "Promise to Pay",
    attempts: 2,
  },
  {
    id: "LN0553",
    user: "Wei Lin",
    avatar: "https://randomuser.me/api/portraits/men/88.jpg",
    type: "Business",
    due: "$7,100",
    lastContact: "2024-07-19",
    collector: "Nyasha Daniels",
    status: "Contacted",
    attempts: 3,
  },
  {
    id: "LN0554",
    user: "Chipo Dube",
    avatar: "https://randomuser.me/api/portraits/women/23.jpg",
    type: "Mortgage",
    due: "$3,700",
    lastContact: "2024-07-16",
    collector: "John Smith",
    status: "Promise to Pay",
    attempts: 1,
  },
  {
    id: "LN0555",
    user: "Rachel White",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    type: "Auto",
    due: "$980",
    lastContact: "2024-07-15",
    collector: "Chen Lei",
    status: "Delinquent",
    attempts: 4,
  },
  {
    id: "LN0556",
    user: "John Smith",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    type: "Education",
    due: "$1,900",
    lastContact: "2024-07-15",
    collector: "Akira Tanaka",
    status: "Contacted",
    attempts: 2,
  },
];

// --- STATUS BADGE ---
function statusBadge(status: string) {
  if (status === "Promise to Pay")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-green-100 text-emerald-800 text-xs font-medium">
        <Phone className="w-4 h-4" /> {status}
      </span>
    );
  if (status === "Contacted")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-medium">
        <MessageCircle className="w-4 h-4" /> {status}
      </span>
    );
  if (status === "Delinquent")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-100 text-red-700 text-xs font-medium">
        <XCircle className="w-4 h-4" /> {status}
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-xs font-medium">
      <CheckCircle2 className="w-4 h-4" /> {status}
    </span>
  );
}

// --- MOTION CAROUSEL LOGIC ---
function MotionKPIBar() {
  const controls = useAnimation();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapperRef, { once: false, amount: 0.6 });

  // Animate leftward endlessly when in view (desktop only)
  useEffect(() => {
    if (!wrapperRef.current) return;
    if (window.innerWidth < 640) return; // don't animate on mobile

    const animate = async () => {
      const totalWidth = wrapperRef.current?.scrollWidth || 1100;
      const visibleWidth = wrapperRef.current?.offsetWidth || 1100;
      const distance = totalWidth - visibleWidth;

      if (distance <= 0) return;

      while (true) {
        await controls.start({
          x: -distance,
          transition: { duration: 17, ease: "linear" },
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

  // Responsive: stack vertically on mobile, carousel on desktop
  return (
    <div className="relative w-full mb-8 pb-2 select-none">
      <div
        ref={wrapperRef}
        className="overflow-hidden"
        style={{ width: "100%" }}
      >
        <motion.div
          className="flex gap-6 min-w-[1100px] md:min-w-full"
          animate={controls}
          initial={{ x: 0 }}
        >
          {stats.concat(stats.slice(0, 3)).map((stat, idx) => (
            // Repeat a few cards so animation looks endless
            <div
              key={`${stat.label}-${idx}`}
              className={`min-w-[190px] flex flex-col items-center rounded-2xl bg-gradient-to-br ${stat.bg} px-7 py-5 shadow-lg border-0`}
            >
              <div className="mb-2">{stat.icon}</div>
              <span className="font-extrabold text-2xl text-emerald-900 mb-1">{stat.value}</span>
              <span className="text-md text-gray-700">{stat.label}</span>
              <span className="text-xs text-gray-500">{stat.desc}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default function LoansCollectionsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10 w-full">
      {/* 1. Animated KPI bar */}
      <MotionKPIBar />

      {/* 2. Explanation */}
      <section className="mb-10">
        <h1 className="text-2xl md:text-3xl font-black text-emerald-700 mb-2 tracking-tight">
          Loan Collections Dashboard
        </h1>
        <p className="text-gray-700 text-base md:text-lg max-w-3xl">
          Monitor, optimize, and improve your bank’s collections operations. Instantly see collection effectiveness, overdue risks, team performance, and overdue account actions. 
          <br />
          <span className="font-semibold text-emerald-700">This section is critical for managing cashflow and keeping your NPL ratio low.</span>
        </p>
      </section>

      {/* 3. Visuals Row: Donut, Area */}
      <section className="grid md:grid-cols-2 gap-8 mb-14">
        {/* Donut */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <h2 className="font-bold text-lg text-blue-700 mb-4">Collection Success</h2>
          <Doughnut data={donutData} height={210} options={donutOptions} />
        </div>
        {/* Area chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
          <h2 className="font-bold text-lg text-blue-700 mb-4">Collections vs Overdue (Monthly)</h2>
          <Line data={lineData} height={190} options={lineOptions} />
        </div>
      </section>

      {/* 4. Collectors Leaderboard */}
      <section className="mb-14">
        <h2 className="font-bold text-xl text-emerald-800 mb-3">Top Collectors</h2>
        <div className="flex flex-col md:flex-row gap-4">
          {collectors.map((c, i) => (
            <div
              key={c.name}
              className="flex-1 flex flex-col items-center rounded-2xl bg-gradient-to-br from-blue-50 via-emerald-50 to-yellow-100 p-5 shadow border-0 min-w-[200px]"
            >
              <img
                src={c.avatar}
                alt={c.name}
                className="w-12 h-12 rounded-full border-2 border-emerald-100 mb-2"
              />
              <div className="font-bold text-lg text-emerald-900">{c.name}</div>
              <div className="text-md text-gray-700 font-mono">${c.collected.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Collected</div>
              <div className="text-xs text-blue-700 mt-2">
                Accounts: <span className="font-bold">{c.accounts}</span>
                {" · "}
                P2P: <span className="font-bold">{c.p2p}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Overdue Loans Table */}
      <section>
        <h2 className="font-bold text-xl text-emerald-800 mb-5">Top Overdue Loans</h2>
        <div className="bg-white rounded-xl shadow-md p-4 overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-xs text-gray-600 uppercase border-b">
                <th className="py-2">Borrower</th>
                <th className="py-2">Type</th>
                <th className="py-2">Due</th>
                <th className="py-2">Last Contact</th>
                <th className="py-2">Collector</th>
                <th className="py-2">Status</th>
                <th className="py-2">Attempts</th>
              </tr>
            </thead>
            <tbody>
              {overdueLoans.map((ln) => (
                <tr key={ln.id} className="border-b last:border-0">
                  <td className="py-2 flex items-center gap-2">
                    <img
                      src={ln.avatar}
                      alt={ln.user}
                      className="w-8 h-8 rounded-full border border-blue-100"
                    />
                    <span className="font-semibold">{ln.user}</span>
                  </td>
                  <td className="py-2">{ln.type}</td>
                  <td className="py-2 font-mono">{ln.due}</td>
                  <td className="py-2">{ln.lastContact}</td>
                  <td className="py-2">{ln.collector}</td>
                  <td className="py-2">{statusBadge(ln.status)}</td>
                  <td className="py-2">{ln.attempts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
