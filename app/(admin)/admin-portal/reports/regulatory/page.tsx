"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  FileWarning,
  FileCheck2,
  FileDown,
  Banknote,
  FlagTriangleRight,
  UserCheck,
  Users2,
  Landmark,
  Globe2,
  FolderOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const kpi = [
  {
    title: "Regulatory Filings",
    value: 43,
    icon: <FolderOpen className="w-8 h-8 text-emerald-600" />,
    info: "Year-to-date",
  },
  {
    title: "AML Alerts",
    value: 82,
    icon: <FileWarning className="w-8 h-8 text-yellow-500" />,
    info: "Flagged in last 30 days",
  },
  {
    title: "KYC Reviews",
    value: 187,
    icon: <UserCheck className="w-8 h-8 text-blue-500" />,
    info: "Customers reviewed",
  },
  {
    title: "Tax Reports Filed",
    value: 16,
    icon: <FlagTriangleRight className="w-8 h-8 text-emerald-700" />,
    info: "Quarterly & annual",
  },
  {
    title: "FATCA/CRS Declarations",
    value: 21,
    icon: <Landmark className="w-8 h-8 text-red-500" />,
    info: "Last 12 months",
  },
  {
    title: "SARs Submitted",
    value: 6,
    icon: <FileCheck2 className="w-8 h-8 text-indigo-600" />,
    info: "Suspicious Activity",
  },
];

// Table of filings/logs (20 rows)
const filings = Array.from({ length: 20 }, (_, i) => ({
  id: `RF${8000 + i}`,
  type: [
    "AML Report",
    "KYC Review",
    "Tax Report",
    "FATCA Filing",
    "SAR",
    "Basel III",
    "IFRS Report",
    "CBAR",
    "EU Directive",
  ][i % 9],
  period: ["2024 Q1", "2024 Q2", "2024", "2023 Q4", "2023", "2024-07"][i % 6],
  submitted: [
    "2024-04-05",
    "2024-07-09",
    "2024-06-12",
    "2024-03-18",
    "2024-05-02",
    "2024-01-25",
  ][i % 6],
  status: i % 4 === 0 ? "Submitted" : i % 4 === 1 ? "In Review" : i % 4 === 2 ? "Overdue" : "Error",
  authority: [
    "FCA (UK)",
    "RBZ (ZW)",
    "IRS (US)",
    "ESMA (EU)",
    "ZIMRA",
    "FINRA",
    "IMF",
    "BaFin (DE)",
  ][i % 8],
}));

// Collapsible content details
const collapsibles = [
  {
    label: "Anti-Money Laundering (AML)",
    icon: <ShieldCheck className="w-5 h-5 mr-2 text-emerald-600" />,
    content: (
      <ul className="list-disc pl-5 text-sm">
        <li>All transactions {">"} $10,000 are monitored and flagged.</li>
        <li>Real-time screening against OFAC & global watchlists.</li>
        <li>Automated suspicious activity detection (SARs workflow).</li>
        <li>Quarterly AML summary filed to RBZ & FCA.</li>
      </ul>
    ),
  },
  {
    label: "Know Your Customer (KYC)",
    icon: <Users2 className="w-5 h-5 mr-2 text-blue-700" />,
    content: (
      <ul className="list-disc pl-5 text-sm">
        <li>All new accounts undergo digital ID & biometric verification.</li>
        <li>Periodic review every 24 months for all customers.</li>
        <li>PEP (Politically Exposed Persons) flagged and escalated.</li>
        <li>Regulatory audits: 98.5% KYC compliance YTD.</li>
      </ul>
    ),
  },
  {
    label: "Tax, FATCA, CRS",
    icon: <Landmark className="w-5 h-5 mr-2 text-red-500" />,
    content: (
      <ul className="list-disc pl-5 text-sm">
        <li>Annual and quarterly tax filings for all business units.</li>
        <li>FATCA/CRS declarations for US and EU-linked accounts.</li>
        <li>Automatic data exchange with ZIMRA & IRS via secure API.</li>
        <li>Zero late filings in the past 18 months.</li>
      </ul>
    ),
  },
  {
    label: "Basel III & Capital Adequacy",
    icon: <Globe2 className="w-5 h-5 mr-2 text-purple-600" />,
    content: (
      <ul className="list-disc pl-5 text-sm">
        <li>Liquidity Coverage Ratio: 110% (min: 100%).</li>
        <li>Capital Adequacy Ratio: 13.2% (regulatory min: 10%).</li>
        <li>Leverage Ratio and stress testing reported to central bank quarterly.</li>
        <li>No regulatory breaches in 2024.</li>
      </ul>
    ),
  },
];

export default function RegulatoryReportsPage() {
  const tableRef = useRef<HTMLTableElement>(null);

  // Simulated export as CSV
  const exportData = () => {
    const csvRows = [
      ["Filing ID", "Type", "Period", "Submitted", "Status", "Authority"],
      ...filings.map((f) => [
        f.id,
        f.type,
        f.period,
        f.submitted,
        f.status,
        f.authority,
      ]),
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "regulatory_reports.csv");
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
            Regulatory Reports & Compliance
          </h1>
          <p className="text-white/90 mb-2 max-w-2xl">
            Eleganza Bank’s regulatory reporting section ensures all required filings, disclosures, and compliance processes are performed on time and according to international standards (AML, KYC, FATCA, Basel III, etc).  
            Access filings history, export compliance data, and view key alerts for ongoing regulatory health.
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
        <ShieldCheck className="w-24 h-24 text-white/30 hidden md:block" />
      </motion.section>

      {/* Summary Cards */}
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
              <div className="text-xs text-emerald-500 font-semibold mt-1">{item.info}</div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Collapsibles for compliance */}
      <Accordion type="multiple" className="mb-12">
        {collapsibles.map((item, i) => (
          <AccordionItem key={item.label} value={item.label}>
            <AccordionTrigger className="font-bold text-lg text-emerald-700 flex items-center">
              {item.icon} {item.label}
            </AccordionTrigger>
            <AccordionContent>
              <div className="py-3">{item.content}</div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Regulatory Filing Log Table */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-3">
          <div className="font-bold text-xl text-emerald-700">Regulatory Filings Log</div>
        </div>
        <div className="overflow-x-auto bg-white rounded-2xl shadow border">
          <table className="min-w-full text-sm" ref={tableRef}>
            <thead>
              <tr>
                <th className="py-2 px-3 text-left">ID</th>
                <th className="py-2 px-3 text-left">Type</th>
                <th className="py-2 px-3 text-left">Period</th>
                <th className="py-2 px-3 text-left">Submitted</th>
                <th className="py-2 px-3 text-left">Status</th>
                <th className="py-2 px-3 text-left">Authority</th>
              </tr>
            </thead>
            <tbody>
              {filings.map((f, i) => (
                <tr key={f.id} className="hover:bg-emerald-50">
                  <td className="py-2 px-3 font-mono text-blue-700">{f.id}</td>
                  <td className="py-2 px-3">{f.type}</td>
                  <td className="py-2 px-3">{f.period}</td>
                  <td className="py-2 px-3">{f.submitted}</td>
                  <td className="py-2 px-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                      f.status === "Submitted"
                        ? "bg-emerald-100 text-emerald-800"
                        : f.status === "In Review"
                        ? "bg-blue-100 text-blue-800"
                        : f.status === "Overdue"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {f.status}
                    </span>
                  </td>
                  <td className="py-2 px-3">{f.authority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Compliance Info Box */}
      <aside className="fixed bottom-8 right-8 bg-gradient-to-br from-emerald-400 to-blue-400 shadow-2xl text-white rounded-2xl px-6 py-5 w-[350px] z-20 border-2 border-emerald-200/60 hidden lg:block">
        <div className="font-bold text-lg mb-1">Compliance Guidance</div>
        <ul className="text-xs leading-relaxed list-disc pl-4">
          <li>Review all filings before submission to avoid errors or delays.</li>
          <li>Stay up-to-date with regulatory deadlines per jurisdiction.</li>
          <li>Document and retain audit trails for all submissions.</li>
          <li>Monitor AML and KYC alerts for timely reporting.</li>
          <li>Update authorities if data or responsible officers change.</li>
        </ul>
      </aside>
    </main>
  );
}
