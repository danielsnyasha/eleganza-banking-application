"use client";

import Navbar from "@/components/landing-page/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { JSX, useState } from "react";

type InvestmentType = "selfDirected" | "roboAdvisor" | "retirement";

type InvestmentFeature = {
  title: string;
  description: string;
  image: string;
  highlights: string[];
};

const investmentTypes: Record<InvestmentType, InvestmentFeature> = {
  selfDirected: {
    title: "Self Directed Trading",
    description:
      "Trade shares, ETFs, and bonds on your terms 😀 -low fees, advanced analytics, and lightning fast execution.",
    image: "https://images.unsplash.com/photo-1689330305908-aa231c1dd595?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODJ8fGludmVzdG1lbnR8ZW58MHx8MHx8fDA%3D",
    highlights: [
      "Access to global markets",
      "Real time quotes and charts",
      "Low commission fees",
      "In depth research tools",
    ],
  },
  roboAdvisor: {
    title: "Robo Advisor Portfolio",
    description:
      "Let our AI powered robo advisor build and manage a globally diversified portfolio for you, based on your goals and risk profile.",
    image: "https://images.unsplash.com/photo-1671459922221-be8beec5c9fa?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI0fHxpbnZlc3RtZW50fGVufDB8fDB8fHww",
    highlights: [
      "Start with as little as one thousand euros",
      "Automatic rebalancing",
      "Personalized to your goals",
      "Low all in cost",
    ],
  },
  retirement: {
    title: "Retirement and Tax Wrappers",
    description:
      "Grow your wealth tax efficiently with ISAs, pensions, and investment accounts tailored for long term success.",
    image: "https://images.unsplash.com/photo-1716279083223-006db39251e1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIwfHxpbnZlc3RtZW50fGVufDB8fDB8fHww",
    highlights: [
      "Flexible ISA and pension accounts",
      "Tax efficient investing",
      "Easy transfers and consolidation",
      "Full transparency on fees",
    ],
  },
};

export default function InvestmentsPage(): JSX.Element {
  const [selectedType, setSelectedType] = useState<InvestmentType>("selfDirected");

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
          Investments
        </motion.h1>
        <motion.p
          className="text-lg text-gray-700 mb-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Trade shares, ETFs, and bonds with low fees 😀 -or let our robo advisor build a diversified portfolio for you.
        </motion.p>

        {/* Tabs for Investment Types */}
        <Tabs
          value={selectedType}
          onValueChange={(val) => setSelectedType(val as InvestmentType)}
          className="mb-12"
        >
          <TabsList className="flex space-x-2 bg-emerald-100 rounded-full p-1 shadow-inner">
            <TabsTrigger
              value="selfDirected"
              className="rounded-full px-6 font-semibold text-base data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all"
            >
              Self Directed
            </TabsTrigger>
            <TabsTrigger
              value="roboAdvisor"
              className="rounded-full px-6 font-semibold text-base data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all"
            >
              Robo Advisor
            </TabsTrigger>
            <TabsTrigger
              value="retirement"
              className="rounded-full px-6 font-semibold text-base data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all"
            >
              Retirement
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
                    src={investmentTypes[selectedType].image}
                    alt={investmentTypes[selectedType].title}
                    className="w-full md:w-64 rounded-xl object-cover shadow-lg"
                    style={{ maxHeight: 220 }}
                    loading="lazy"
                  />
                  <Card className="rounded-2xl shadow-lg border-0 bg-white flex-1">
                    <CardContent className="p-7">
                      <Badge className="mb-2 w-fit text-emerald-700 bg-emerald-100 font-semibold">
                        {investmentTypes[selectedType].title}
                      </Badge>
                      <p className="text-gray-700 mb-4 text-base">{investmentTypes[selectedType].description}</p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-800">
                        {investmentTypes[selectedType].highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </div>
        </Tabs>

        {/* Why Invest With Eleganza */}
        <section className="mb-16">
          <motion.h2
            className="text-3xl font-bold mb-6 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Why Invest With Eleganza?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-7">
            {[
              {
                title: "Low Transparent Fees",
                description: "No surprises 😀 - know exactly what you pay. Our fees are simple and fair, so your money works harder for you.",
                image:
                  "https://plus.unsplash.com/premium_photo-1682309799578-6e685bacd4e1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW52ZXN0bWVudHxlbnwwfHwwfHx8MA%3D%3D",
              },
              {
                title: "Expert Guidance",
                description: "Our licensed advisors and smart AI tools help you build confidence and make smarter decisions.",
                image:
                  "https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aW52ZXN0bWVudHxlbnwwfHwwfHx8MA%3D%3D",
              },
              {
                title: "All Accounts, One App",
                description: "Manage all your investments—shares, ISAs, pensions, and more 😀 - easily in one place, on any device.",
                image:
                  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fGludmVzdG1lbnR8ZW58MHx8MHx8fDA%3D",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.14 * idx, duration: 0.8, type: "spring" }}
              >
                <Card
                  className="border-0 rounded-2xl shadow-md bg-gradient-to-br from-white via-emerald-50 to-emerald-100 hover:scale-105 transition-transform duration-400 flex flex-col"
                  style={{ height: 370, minWidth: 320, maxWidth: 370 }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="rounded-t-2xl w-full object-cover"
                    style={{ height: 176, minHeight: 176, maxHeight: 176 }}
                  />
                  <CardContent className="pt-4 pb-6 px-4 flex flex-col flex-1">
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
            Ready to grow your wealth? Invest with Eleganza today.
          </span>
          <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-100 rounded-full px-8 font-bold shadow transition-all mt-2">
            Start Investing
          </Button>
        </motion.div>
      </main>
    </>
  );
}
