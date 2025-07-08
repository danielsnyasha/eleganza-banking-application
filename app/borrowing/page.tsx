"use client";

import Navbar from "@/components/landing-page/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { JSX, useState } from "react";

type BorrowingType = "personal" | "student" | "overdraft";

type BorrowingFeature = {
  title: string;
  description: string;
  image: string;
  highlights: string[];
};

const borrowingTypes: Record<BorrowingType, BorrowingFeature> = {
  personal: {
    title: "Personal Loan",
    description:
      "Take control of your dreams—fund big moments, consolidate debt, or manage unexpected costs with flexible personal loans and transparent rates.",
    image: "https://plus.unsplash.com/premium_photo-1661763036649-2c4c70e8a97b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bG9hbnxlbnwwfHwwfHx8MA%3D%3D",
    highlights: [
      "Borrow up to R500,000",
      "Flexible repayment terms",
      "No early settlement penalties",
      "Quick online approval",
    ],
  },
  student: {
    title: "Student Loan",
    description:
      "Invest in your future with loans built for students. Low rates, easy application, and repayment only after graduation—so you can focus on what matters.",
    image: "https://images.unsplash.com/photo-1724781189475-a332f44de593?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bG9hbnxlbnwwfHwwfHx8MA%3D%3D",
    highlights: [
      "Zero repayments while you study",
      "Lowest student rates in the market",
      "Covers tuition, books, and more",
      "Parental co-sign option",
    ],
  },
  overdraft: {
    title: "Overdraft Protection",
    description:
      "Smooth out life's bumps with an instant overdraft facility—flexible credit, only pay for what you use, and instant setup online.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGxvYW58ZW58MHx8MHx8fDA%3D",
    highlights: [
      "Link to your Eleganza account instantly",
      "Only pay interest on what you use",
      "No monthly fees",
      "Automatic top-up options",
    ],
  },
};

export default function BorrowingPage(): JSX.Element {
  const [selectedType, setSelectedType] = useState<BorrowingType>("personal");

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
          Borrowing
        </motion.h1>
        <motion.p
          className="text-lg text-gray-700 mb-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          From personal loans to flexible overdrafts, discover credit that adapts to you—with transparent rates and no hidden fees.
        </motion.p>

        {/* Tabs for Borrowing Types */}
        <Tabs
          value={selectedType}
          onValueChange={(val) => setSelectedType(val as BorrowingType)}
          className="mb-12"
        >
          <TabsList className="flex space-x-2 bg-emerald-100 rounded-full p-1 shadow-inner">
            <TabsTrigger
              value="personal"
              className="rounded-full px-6 font-semibold text-base data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all"
            >
              Personal Loan
            </TabsTrigger>
            <TabsTrigger
              value="student"
              className="rounded-full px-6 font-semibold text-base data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all"
            >
              Student Loan
            </TabsTrigger>
            <TabsTrigger
              value="overdraft"
              className="rounded-full px-6 font-semibold text-base data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all"
            >
              Overdraft
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
                    src={borrowingTypes[selectedType].image}
                    alt={borrowingTypes[selectedType].title}
                    className="w-full md:w-64 rounded-xl object-cover shadow-lg"
                    style={{ maxHeight: 220 }}
                    loading="lazy"
                  />
                  <Card className="rounded-2xl shadow-lg border-0 bg-white flex-1">
                    <CardContent className="p-7">
                      <Badge className="mb-2 w-fit text-emerald-700 bg-emerald-100 font-semibold">
                        {borrowingTypes[selectedType].title}
                      </Badge>
                      <p className="text-gray-700 mb-4 text-base">{borrowingTypes[selectedType].description}</p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-800">
                        {borrowingTypes[selectedType].highlights.map((highlight) => (
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

        {/* Why Borrow With Eleganza */}
        <section className="mb-16">
          <motion.h2
            className="text-3xl font-bold mb-6 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Why Borrow With Eleganza?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-7">
            {[
              {
                title: "No Hidden Costs",
                description: "Transparent rates and clear terms. What you see is what you get 😉 - no surprises.",
                image:
                  "https://plus.unsplash.com/premium_photo-1661369820491-6391c63ea2dd?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGxvYW58ZW58MHx8MHx8fDA%3D",
              },
              {
                title: "Fast Online Decisions",
                description: "Apply and get a decision in minutes, not days. No paperwork, no queues and no stories.",
                image:
                  "https://plus.unsplash.com/premium_photo-1661320887485-ce1419a1e342?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjF8fGxvYW4lMjBibGFja3N8ZW58MHx8MHx8fDA%3D",
              },
              {
                title: "Support That Cares",
                description: "Expert guidance every step of the way 😉 - real people, always available to help you.",
                image:
                  "https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHN1cHBvcnR8ZW58MHx8MHx8fDA%3D",
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
            Ready to move forward? Get your Eleganza loan or credit today.
          </span>
          <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-100 rounded-full px-8 font-bold shadow transition-all mt-2">
            Apply Now
          </Button>
        </motion.div>
      </main>
    </>
  );
}
