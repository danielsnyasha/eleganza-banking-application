"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { FileBarChart, Banknote, ArrowDownCircle, ArrowUpCircle, FileDown, Users, BarChart3, Building2, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, PointElement, LineElement, ArcElement } from "chart.js";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  PointElement,
  LineElement,
  ArcElement
);

// Summary data
const kpi = [
  { title: "Total Revenue", value: "$13,420,800", icon: <TrendingUp className="w-8 h-8 text-emerald-600" />, growth: "+7.5%" },
  { title: "Total Expenses", value: "$9,275,350", icon: <TrendingDown className="w-8 h-8 text-red-500" />, growth: "-4.1%" },
  { title: "Net Profit", value: "$4,145,450", icon: <Banknote className="w-8 h-8 text-yellow-500" />, growth: "+13.8%" },
  { title: "Loans Issued", value: "$3,400,000", icon: <ArrowUpCircle className="w-8 h-8 text-blue-500" />, growth: "+2.0%" },
  { title: "Deposits", value: "$6,600,000", icon: <ArrowDownCircle className="w-8 h-8 text-indigo-500" />, growth: "+6.4%" },
  { title: "Active Customers", value: "12,040", icon: <Users className="w-8 h-8 text-emerald-800" />, growth: "+4.5%" },
];

// Bar chart for monthly revenue/expenses
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const barData = {
  labels: months,
  datasets: [
    {
      label: "Revenue",
      backgroundColor: "#059669",
      data: [1523000, 1690000, 1380000, 1815000, 1960000, 2120000, 1958000],
      borderRadius: 12,
      barPercentage: 0.5,
    },
    {
      label: "Expenses",
      backgroundColor: "#fbbf24",
      data: [990000, 1110000, 1205000, 1380000, 1435000, 1490000, 1351850],
      borderRadius: 12,
      barPercentage: 0.5,
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
    x: { stacked: false, grid: { display: false } },
    y: { beginAtZero: true, grid: { color: "#e0e7ef" } },
  },
};

// Line chart for net profit trend
const lineData = {
  labels: months,
  datasets: [
    {
      label: "Net Profit",
      data: [533000, 580000, 175000, 435000, 525000, 630000, 606150],
      borderColor: "#059669",
      backgroundColor: "rgba(16,185,129,0.12)",
      fill: true,
      tension: 0.4,
      pointRadius: 5,
      pointBackgroundColor: "#059669",
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
    x: { grid: { display: false } },
    y: { beginAtZero: true, grid: { color: "#e0e7ef" } },
  },
};

// Pie chart for revenue by business unit
const pieData = {
  labels: ["Retail Banking", "Corporate Banking", "Treasury", "Lending", "Investments"],
  datasets: [
    {
      label: "Revenue Share",
      data: [44, 32, 10, 8, 6],
      backgroundColor: [
        "#059669",
        "#2563eb",
        "#a21caf",
        "#fbbf24",
        "#f43f5e",
      ],
      borderColor: "#fff",
      borderWidth: 2,
    },
  ],
};
const pieOptions = {
  plugins: {
    legend: { position: "bottom" as const },
  },
};

const transactions = Array.from({ length: 12 }, (_, i) => ({
  id: "TX" + String(1440 + i),
  date: `2024-0${(i % 7) + 1}-${12 + (i % 10)}`,
  type: i % 2 === 0 ? "Deposit" : "Withdrawal",
  amount: (i % 2 === 0 ? 120000 : -95000) + (i * 1500),
  account: ["Operations", "Retail", "Corporate", "Treasury"][i % 4],
  user: [
    "Nyasha Daniels",
    "Wei Liu",
    "Anna Schmidt",
    "Jabulani Dube",
    "Charlotte Müller",
    "James Williams",
  ][i % 6],
  status: i % 3 === 0 ? "Completed" : i % 3 === 1 ? "Pending" : "Failed",
}));

const clients = [
  { name: "MegaTech Holdings", revenue: 1240000, growth: "+10.2%" },
  { name: "Zambezi Group", revenue: 940000, growth: "+7.7%" },
  { name: "Urban Estates", revenue: 785000, growth: "+6.5%" },
  { name: "Sunshine Ltd", revenue: 440000, growth: "+4.2%" },
  { name: "TotalCare Clinics", revenue: 289000, growth: "+2.7%" },
];

const expenses = [
  { category: "Salaries & Wages", amount: 3120000 },
  { category: "Technology", amount: 1720000 },
  { category: "Compliance", amount: 1050000 },
  { category: "Marketing", amount: 890000 },
  { category: "Facilities", amount: 700000 },
  { category: "Loan Losses", amount: 640000 },
];

function formatMoney(x: number) {
  return "$" + x.toLocaleString();
}

export default function FinancialReportsPage() {
  const tableRef = useRef<HTMLTableElement>(null);

  // Simulated export - hooks into backend in prod
  const exportData = () => {
    const csvRows = [
      ["Transaction ID", "Date", "Type", "Amount", "Account", "User", "Status"],
      ...transactions.map((t) => [
        t.id,
        t.date,
        t.type,
        t.amount,
        t.account,
        t.user,
        t.status,
      ]),
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "financial_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 w-full min-h-screen relative">
      {/* Banner */}
      <motion.section
        className="bg-gradient-to-r from-emerald-600 via-blue-500 to-yellow-400 rounded-2xl px-8 py-7 flex flex-col md:flex-row items-center gap-8 mb-10 shadow-xl"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
            Financial Reports & Analytics
          </h1>
          <p className="text-white/90 mb-2 max-w-2xl">
            Review, analyze, and export the financial health of Eleganza Bank. 
            These comprehensive reports cover revenue, expenses, profit, business units, top clients, transactions, and compliance. <br />
            Drill into details using collapsibles and export raw data for deeper analysis.
          </p>
          <Button
            className="mt-3 bg-white text-emerald-700 font-bold rounded-xl px-4 py-2 shadow hover:bg-emerald-50"
            onClick={exportData}
            size="sm"
          >
            <FileDown className="w-5 h-5 mr-2" />
            Export as CSV
          </Button>
        </div>
        <FileBarChart className="w-24 h-24 text-white/30 hidden md:block" />
      </motion.section>

      {/* KPI Cards */}
      <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-7 mb-12">
        {kpi.map((item, i) => (
          <motion.div
            key={item.title}
            className="bg-white rounded-2xl shadow flex items-center gap-5 px-5 py-6 border hover:shadow-lg transition"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
          >
            <div className="bg-emerald-100 rounded-xl p-3">{item.icon}</div>
            <div>
              <div className="font-bold text-lg text-emerald-900">{item.title}</div>
              <div className="text-2xl font-black text-emerald-800">{item.value}</div>
              <div className="text-xs text-emerald-500 font-semibold mt-1">{item.growth} this period</div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Analytics Charts */}
      <section className="grid md:grid-cols-3 gap-8 mb-14">
        {/* Bar Chart */}
        <motion.div
          className="bg-white rounded-2xl shadow p-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="font-bold text-emerald-900 mb-3">Monthly Revenue & Expenses</div>
          <Bar data={barData} height={200} options={barOptions} />
        </motion.div>
        {/* Line Chart */}
        <motion.div
          className="bg-white rounded-2xl shadow p-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="font-bold text-emerald-900 mb-3">Net Profit Trend</div>
          <Line data={lineData} height={200} options={lineOptions} />
        </motion.div>
        {/* Pie Chart */}
        <motion.div
          className="bg-white rounded-2xl shadow p-6"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="font-bold text-emerald-900 mb-3">Revenue by Business Unit</div>
          <Pie data={pieData} height={200} options={pieOptions} />
        </motion.div>
      </section>

      {/* Collapsibles: Revenue, Top Clients, Expenses */}
      <Accordion type="multiple" className="mb-12">
        <AccordionItem value="revenue">
          <AccordionTrigger className="font-bold text-lg text-emerald-700">
            Revenue Breakdown
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
              {pieData.labels.map((label, i) => (
                <div
                  key={label}
                  className="bg-blue-50 border rounded-xl px-5 py-4 flex flex-col items-start"
                >
                  <div className="font-bold text-emerald-800">{label}</div>
                  <div className="text-2xl font-black text-blue-700 mt-2">
                    {formatMoney(Math.floor((barData.datasets[0].data.reduce((a, b) => a + b, 0)) * (pieData.datasets[0].data[i] as number) / 100))}
                  </div>
                  <div className="text-xs mt-1 text-blue-500">
                    {pieData.datasets[0].data[i]}% of total revenue
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="clients">
          <AccordionTrigger className="font-bold text-lg text-emerald-700">
            Top Clients by Revenue
          </AccordionTrigger>
          <AccordionContent>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr>
                    <th className="py-2 px-3 text-left text-emerald-900 font-semibold">Client</th>
                    <th className="py-2 px-3 text-left text-emerald-900 font-semibold">Revenue</th>
                    <th className="py-2 px-3 text-left text-emerald-900 font-semibold">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client, idx) => (
                    <tr key={client.name} className="hover:bg-emerald-50">
                      <td className="py-2 px-3 font-bold text-blue-700">{client.name}</td>
                      <td className="py-2 px-3 font-mono">{formatMoney(client.revenue)}</td>
                      <td className="py-2 px-3 text-emerald-600 font-bold">{client.growth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="expenses">
          <AccordionTrigger className="font-bold text-lg text-emerald-700">
            Expense Analysis
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-2">
              {expenses.map((ex, i) => (
                <div
                  key={ex.category}
                  className="bg-yellow-50 border rounded-xl px-5 py-4 flex flex-col"
                >
                  <div className="font-bold text-yellow-700">{ex.category}</div>
                  <div className="text-2xl font-black text-yellow-800 mt-2">
                    {formatMoney(ex.amount)}
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Journal/Transaction Table */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-3">
          <div className="font-bold text-xl text-emerald-700">Recent Financial Transactions</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-xl">
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All</DropdownMenuItem>
              <DropdownMenuItem>Deposits</DropdownMenuItem>
              <DropdownMenuItem>Withdrawals</DropdownMenuItem>
              <DropdownMenuItem>Completed</DropdownMenuItem>
              <DropdownMenuItem>Pending</DropdownMenuItem>
              <DropdownMenuItem>Failed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="overflow-x-auto bg-white rounded-2xl shadow border">
          <table className="min-w-full text-sm" ref={tableRef}>
            <thead>
              <tr>
                <th className="py-2 px-3 text-left">ID</th>
                <th className="py-2 px-3 text-left">Date</th>
                <th className="py-2 px-3 text-left">Type</th>
                <th className="py-2 px-3 text-left">Amount</th>
                <th className="py-2 px-3 text-left">Account</th>
                <th className="py-2 px-3 text-left">User</th>
                <th className="py-2 px-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, i) => (
                <tr key={tx.id} className="hover:bg-emerald-50">
                  <td className="py-2 px-3 font-mono text-blue-700">{tx.id}</td>
                  <td className="py-2 px-3">{tx.date}</td>
                  <td className="py-2 px-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${tx.type === "Deposit" ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono">{formatMoney(tx.amount)}</td>
                  <td className="py-2 px-3">{tx.account}</td>
                  <td className="py-2 px-3">{tx.user}</td>
                  <td className="py-2 px-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                      tx.status === "Completed"
                        ? "bg-emerald-100 text-emerald-800"
                        : tx.status === "Pending"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Floating Compliance Box */}
      <aside className="fixed bottom-8 right-8 bg-gradient-to-br from-emerald-400 to-blue-400 shadow-2xl text-white rounded-2xl px-6 py-5 w-[350px] z-20 border-2 border-emerald-200/60 hidden lg:block">
        <div className="font-bold text-lg mb-1">Financial Reporting Tips</div>
        <ul className="text-xs leading-relaxed list-disc pl-4">
          <li>Export raw data regularly for offsite backups.</li>
          <li>Ensure every transaction is auditable and reconciled.</li>
          <li>Follow regulatory requirements for your country/sector.</li>
          <li>Monitor for unusual revenue/expense spikes.</li>
          <li>Engage auditors for quarterly reviews.</li>
        </ul>
      </aside>
    </main>
  );
}
