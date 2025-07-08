"use client";

import Navbar from "@/components/landing-page/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { JSX, useState } from "react";

type SavingsType = "flexible" | "fixed" | "goal";

type SavingsFeature = {
  title: string;
  description: string;
  image: string;
  benefits: string[];
};

const savingsTypes: Record<SavingsType, SavingsFeature> = {
  flexible: {
    title: "Flexible High-Interest Saver",
    description:
      "Grow your balance with competitive daily interest, plus instant access whenever you need your funds.",
    image: "https://plus.unsplash.com/premium_photo-1661301075857-63868ae88c00?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFua2luZ3xlbnwwfHwwfHx8MA%3D%3D",
    benefits: [
      "Earn up to 6% interest per annum",
      "Unlimited deposits and withdrawals",
      "No minimum balance",
      "Daily interest payouts",
    ],
  },
  fixed: {
    title: "Fixed Term Deposit",
    description:
      "Lock in your rate for guaranteed returns. Choose the term that suits you—from three months up to five years.",
    image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFua2luZ3xlbnwwfHwwfHx8MA%3D%3D",
    benefits: [
      "Terms from 3 months to 5 years",
      "Highest available fixed rates",
      "No fees or surprises",
      "Withdraw at maturity",
    ],
  },
  goal: {
    title: "Automated Goal Tracker",
    description:
      "Reach your dreams effortlessly with round-up savings, auto-deposits, and progress visualizations right in the app.",
    image: "https://images.unsplash.com/photo-1606189934732-1c274f894bf9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGJhbmtpbmd8ZW58MHx8MHx8fDA%3D",
    benefits: [
      "Set unlimited custom savings goals",
      "Round up your purchases automatically",
      "Schedule regular auto-saves",
      "Visual progress and motivational nudges",
    ],
  },
};

export default function SavingsPage(): JSX.Element {
  const [selectedType, setSelectedType] = useState<SavingsType>("flexible");

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Savings
        </motion.h1>
        <motion.p
          className="text-lg text-gray-700 mb-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Watch your money grow with high-yield accounts, fixed term deposits, and automated goal trackers built into the app.
        </motion.p>

        {/* Tabs for Savings Types */}
        <Tabs
          value={selectedType}
          onValueChange={(val) => setSelectedType(val as SavingsType)}
          className="mb-12"
        >
          <TabsList className="flex space-x-2 bg-emerald-100 rounded-full p-1 shadow-inner">
            <TabsTrigger
              value="flexible"
              className="rounded-full px-6 font-semibold text-base data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all"
            >
              Flexible Saver
            </TabsTrigger>
            <TabsTrigger
              value="fixed"
              className="rounded-full px-6 font-semibold text-base data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all"
            >
              Fixed Term
            </TabsTrigger>
            <TabsTrigger
              value="goal"
              className="rounded-full px-6 font-semibold text-base data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all"
            >
              Goal Tracker
            </TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <AnimatePresence mode="wait">
              <TabsContent value={selectedType} forceMount>
                <motion.div
                  key={selectedType}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
                  className="flex flex-col md:flex-row items-center gap-6"
                >
                  <img
                    src={savingsTypes[selectedType].image}
                    alt={savingsTypes[selectedType].title}
                    className="w-full md:w-64 rounded-xl object-cover shadow-lg"
                    style={{ maxHeight: 220 }}
                    loading="lazy"
                  />
                  <Card className="rounded-2xl shadow-lg border-0 bg-white flex-1">
                    <CardContent className="p-7">
                      <Badge className="mb-2 w-fit text-emerald-700 bg-emerald-100 font-semibold">
                        {savingsTypes[selectedType].title}
                      </Badge>
                      <p className="text-gray-700 mb-4 text-base">{savingsTypes[selectedType].description}</p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-800">
                        {savingsTypes[selectedType].benefits.map((benefit) => (
                          <li key={benefit}>{benefit}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </div>
        </Tabs>

        {/* Why Save With Eleganza */}
        <section className="mb-16">
          <motion.h2
            className="text-3xl font-bold mb-6 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Why Save With Eleganza?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-7">
            {[
              {
                title: "Top Rates, Zero Fees",
                description: "Get some of the best rates in the market, plus total transparency 😄 - no monthly charges or hidden costs.",
                image:
                  "https://plus.unsplash.com/premium_photo-1661598327906-ef7866f4b3c0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGJhbmtpbmd8ZW58MHx8MHx8fDA%3D",
              },
              {
                title: "Automated Saving Tools",
                description: "Round up purchases, set up auto-saves, and watch your goals grow without thinking about it.",
                image:
                  "https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGJhbmtpbmd8ZW58MHx8MHx8fDA%3D",
              },
              {
                title: "Instant Access and Support",
                description: "Withdraw when you need, talk to real people when you want, and always see your progress live in-app.",
                image:
                  "https://images.unsplash.com/photo-1609921141835-710b7fa6e438?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fGJhbmtpbmd8ZW58MHx8MHx8fDA%3D",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.14 * idx, duration: 0.8, type: "spring" }}
              >
                <Card className="border-0 rounded-2xl shadow-md bg-gradient-to-br from-white via-emerald-50 to-emerald-100 hover:scale-105 transition-transform duration-400">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="rounded-t-2xl w-full object-cover h-44"
                  />
                  <CardContent className="pt-4 pb-6 px-4 flex flex-col">
                    <Badge className="mb-2 w-fit text-emerald-700 bg-emerald-100 font-semibold">
                      {item.title}
                    </Badge>
                    <p className="text-gray-700 text-base">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <motion.div
          className="flex flex-col items-center justify-center rounded-2xl bg-emerald-600 py-8 px-6 md:px-20 shadow-lg"
          initial={{ scale: 0.94, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 70, damping: 18, duration: 0.7, delay: 0.25 }}
        >
          <span className="text-white text-xl mb-2 font-medium">
            Start saving smarter with Eleganza today.
          </span>
          <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-100 rounded-full px-8 font-bold shadow transition-all mt-2">
            Open a Savings Account
          </Button>
        </motion.div>
      </main>
    </>
  );
}
