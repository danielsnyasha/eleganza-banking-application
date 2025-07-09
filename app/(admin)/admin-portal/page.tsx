"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function AdminPortalPage() {
  return (
    <main className="w-full min-h-[100vh] bg-gradient-to-br from-white to-emerald-100 rounded-2xl pb-12">
      {/* Animated Banner */}
      <motion.section
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="w-full rounded-md bg-gradient-to-r from-emerald-800 to-emerald-500 px-0 md:px-10 py-10 md:py-16 flex flex-col md:flex-row items-center justify-between gap-7"
      >
        {/* Banner Text */}
        <div className="flex-1 px-6 md:px-0">
          <motion.h1
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-2"
          >
            Welcome to the Admin Portal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="text-lg md:text-xl text-emerald-50/90 mb-4 max-w-2xl"
          >
            The Admin Portal is the command center for Eleganza Bank’s digital operations.<br />
            Here, admins can <span className="font-semibold text-white">monitor, analyze, and oversee</span> all banking activities, ensuring security, compliance, and operational efficiency. Manage funds, track KPIs, and get real-time insights <span className="text-3xl">😉</span> everything needed for confident, secure banking management.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="flex gap-3 mt-2"
          >
            <Button size="lg" className="bg-white text-emerald-700 font-bold px-7 rounded-full shadow-lg hover:bg-emerald-100 transition">
              View Dashboard
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-green-500 font-bold px-7 rounded-full hover:bg-white/10 transition"
            >
              Learn More
            </Button>
          </motion.div>
        </div>
        {/* Banner Image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex-1 flex justify-center"
        >
          <img
            src="https://images.unsplash.com/photo-1632406898177-95f7acd8854f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QWRtaW5pc3RyYXRpb258ZW58MHx8MHx8fDA%3D"
            alt="Bank admin dashboard"
            className="rounded-3xl w-full max-w-md h-[240px] object-cover shadow-2xl border-4 border-white/20"
            loading="lazy"
          />
        </motion.div>
      </motion.section>

      {/* Portal Info/Features */}
      <motion.section
        className="max-w-5xl mx-auto px-4 md:px-0 mt-14 mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-emerald-700 mb-2">What is the Admin Portal?</h2>
        <p className="text-gray-700 text-lg md:text-xl mb-6">
          The Admin Portal gives Eleganza Bank's administrators everything they need to keep the digital bank running smoothly and securely.
          <br />
          <span className="text-emerald-600 font-semibold">From one secure location, you can:</span>
        </p>
        <ul className="list-disc pl-6 space-y-2 text-base md:text-lg text-gray-800">
          <li>Monitor total funds and real-time balances across the bank</li>
          <li>Track daily transactions, FX activity, and customer engagement</li>
          <li>Access advanced reporting and analytics tools</li>
          <li>Manage user permissions and access levels</li>
          <li>Spot anomalies and take action instantly</li>
        </ul>
      </motion.section>

      {/* Dashboard Cards Preview */}
      <motion.section
        className="max-w-5xl mx-auto px-4 md:px-0 mt-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="shadow-lg border-0 rounded-2xl bg-gradient-to-br from-white via-emerald-50 to-emerald-100">
            <CardHeader>
              <CardTitle>Total Branches</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-emerald-700">209</p>
              <p className="text-xs text-gray-500 mt-1">As of today, across 5 continents.</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0 rounded-2xl bg-gradient-to-br from-white via-emerald-50 to-emerald-100">
            <CardHeader>
              <CardTitle>Average Daily Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-emerald-700">6790</p>
              <p className="text-xs text-gray-500 mt-1">Processed in the last 24 hours</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0 rounded-2xl bg-gradient-to-br from-white via-emerald-50 to-emerald-100">
            <CardHeader>
              <CardTitle>FX Deals Executed per day</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-emerald-700">2356</p>
              <p className="text-xs text-gray-500 mt-1">Foreign exchange operations</p>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Inspirational closing */}
      <motion.section
        className="max-w-3xl mx-auto px-4 md:px-0 mt-16 mb-2 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        <img
          src="https://cdn.pixabay.com/photo/2023/03/13/16/10/banknotes-7850299_640.jpg"
          alt="Bank security"
          className="mx-auto w-32 h-32 rounded-full shadow-lg mb-4 object-cover border-4 border-emerald-400"
          loading="lazy"
        />
        <h3 className="text-xl md:text-2xl font-bold text-emerald-600 mb-2">
          Excellence, Security, Trust.
        </h3>
        <p className="text-gray-700 mb-3">
          Welcome to the future of bank administration. <br />
          At Eleganza, we build tools for transparency, growth, and peace of mind.
        </p>
      </motion.section>
    </main>
  );
}
