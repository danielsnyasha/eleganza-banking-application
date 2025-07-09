//app/(admin)/admin-portal/banking/balance/page.tsx

"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BankBalancePage() {
  // Dummy Data
  const balances = {
    totalBankBalance: 162435788.13,
    totalCustomerDeposits: 132430050.44,
    totalLoansIssued: 20500000.00,
    totalReserves: 6305073.12,
    nostroHoldings: 8256778.47,
    pendingSettlements: 2179836.22,
    investmentSecurities: 15673049.00,
    otherLiabilities: 497812.33,
  };

  const chartData = {
    labels: [
      "Customer Deposits",
      "Loans Issued",
      "Reserves",
      "Nostro Holdings",
      "Pending Settlements",
      "Investment Securities",
      "Other Liabilities",
    ],
    datasets: [
      {
        label: "Balance (USD)",
        data: [
          balances.totalCustomerDeposits,
          balances.totalLoansIssued,
          balances.totalReserves,
          balances.nostroHoldings,
          balances.pendingSettlements,
          balances.investmentSecurities,
          balances.otherLiabilities,
        ],
        backgroundColor: [
          "#059669", "#2563eb", "#10b981", "#fbbf24", "#ef4444", "#6d28d9", "#a3e635"
        ],
        borderRadius: 12,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.parsed.y ?? context.raw;
            return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 13, weight: "bold" } },
      },
      y: {
        grid: { color: "#f3f4f6" },
        beginAtZero: true,
        ticks: {
          callback: (value: number) => "$" + value.toLocaleString(),
        },
      },
    },
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 w-full">
      <motion.h1
        className="text-3xl md:text-4xl font-extrabold text-emerald-700 mb-2"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Bank Balance Overview
      </motion.h1>
      <motion.p
        className="text-lg text-gray-700 mb-7 max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.7 }}
      >
        This section provides a comprehensive breakdown of Eleganza Bank’s overall balance and holdings. Review the aggregated total of customer funds, loans issued, reserves, nostro accounts, and more; all in USD.  
        <br /><br />
        These metrics help administrators monitor liquidity, risk, and capital compliance, and directly power the frontend dashboards for live analytics and reporting.
      </motion.p>

      {/* Cards Row */}
      <section className="grid md:grid-cols-3 gap-6 mb-10">
        <Card className="border-0 shadow-xl rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-400 to-green-300 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpRight className="w-6 h-6 text-white" />
              Total Bank Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold tracking-tight">
              ${balances.totalBankBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <span className="text-sm opacity-90">Sum of all bank assets and customer holdings</span>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md rounded-2xl bg-white">
          <CardHeader>
            <CardTitle>Total Customer Deposits</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-emerald-700">
              ${balances.totalCustomerDeposits.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <span className="text-xs text-gray-500">Money held on behalf of all customers</span>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md rounded-2xl bg-white">
          <CardHeader>
            <CardTitle>Total Loans Issued</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-700">
              ${balances.totalLoansIssued.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <span className="text-xs text-gray-500">Outstanding credit provided by the bank</span>
          </CardContent>
        </Card>
      </section>

      {/* Detailed Breakdown */}
      <motion.section
        className="grid gap-5 md:grid-cols-2 mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <Card className="border-0 shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle>Reserves</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-green-700">
              ${balances.totalReserves.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <span className="text-xs text-gray-500">
              Funds set aside for regulatory requirements and liquidity management.
            </span>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle>Nostro Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-yellow-600">
              ${balances.nostroHoldings.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <span className="text-xs text-gray-500">
              Balances in foreign bank accounts used for international transactions.
            </span>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle>Pending Settlements</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-rose-600">
              ${balances.pendingSettlements.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <span className="text-xs text-gray-500">
              Amounts to be cleared or settled in upcoming payment cycles.
            </span>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle>Investment Securities</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-violet-700">
              ${balances.investmentSecurities.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <span className="text-xs text-gray-500">
              Value of government bonds, T-bills, and other investments held by the bank.
            </span>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle>Other Liabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-lime-600">
              ${balances.otherLiabilities.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <span className="text-xs text-gray-500">
              Miscellaneous bank obligations, including vendor payments and accrued expenses.
            </span>
          </CardContent>
        </Card>
      </motion.section>

      {/* Chart Section */}
      <motion.section
        className="bg-white rounded-2xl shadow-xl py-8 px-4 md:px-10 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-emerald-700">
          Bank Holdings Breakdown
        </h2>
        <p className="mb-6 text-gray-600 text-sm md:text-base">
          Visual representation of the distribution of funds and liabilities across the main bank balance categories. This helps the admin team instantly spot liquidity patterns and allocation trends.
        </p>
        <div className="w-full max-w-2xl mx-auto">
          <Bar data={chartData} options={chartOptions} height={340} />
        </div>
      </motion.section>
    </main>
  );
}
