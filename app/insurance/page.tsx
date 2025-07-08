"use client";

import Navbar from "@/components/landing-page/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { JSX, useState } from "react";

type InsuranceType = "home" | "car" | "travel" | "life";

type InsuranceFeature = {
  title: string;
  description: string;
  image: string;
  highlights: string[];
};

const insuranceTypes: Record<InsuranceType, InsuranceFeature> = {
  home: {
    title: "Home Insurance",
    description:
      "Protect your house, valuables, and peace of mind with affordable cover and easy online management.",
    image: "https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D",
    highlights: [
      "Covers fire, theft, and water damage",
      "Flexible add-ons for high value items",
      "Fast claims and repairs",
      "Digital policy and renewals",
    ],
  },
  car: {
    title: "Car Insurance",
    description:
      "Comprehensive, third party, and everything in between. Get your quote in minutes and manage it all from the app.",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FyfGVufDB8fDB8fHww",
    highlights: [
      "Instant proof of cover",
      "Choice of excess and add-ons",
      "Roadside assistance included",
      "No paperwork ever",
    ],
  },
  travel: {
    title: "Travel Insurance",
    description:
      "Wander with confidence; medical, trip cancellation, and lost luggage covered for all your adventures.",
    image: "https://plus.unsplash.com/premium_photo-1664361480872-6416aab14696?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D",
    highlights: [
      "Global coverage, all destinations",
      "Medical and emergency support",
      "Flight and bag delay payouts",
      "Buy and claim in-app",
    ],
  },
  life: {
    title: "Life Cover",
    description:
      "Simple, affordable protection for your family’s future. Flexible sums, easy claims, and no lengthy forms.",
    image: "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGlmZXxlbnwwfHwwfHx8MA%3D%3D",
    highlights: [
      "From R100,000 to R5 million cover",
      "No medical exams for many plans",
      "Instant digital policy issue",
      "Trusted payout history",
    ],
  },
};

export default function InsurancePage(): JSX.Element {
  const [selectedType, setSelectedType] = useState<InsuranceType>("home");

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
          Insurance
        </motion.h1>
        <motion.p
          className="text-lg text-gray-700 mb-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Protect what matters most; home, car, travel, and life cover tailored to your needs, all managed in one place.
        </motion.p>

        {/* Tabs for Insurance Types */}
        <Tabs
          value={selectedType}
          onValueChange={(val) => setSelectedType(val as InsuranceType)}
          className="mb-12"
        >
          <TabsList className="flex space-x-2 bg-emerald-100 rounded-full p-1 shadow-inner">
            <TabsTrigger
              value="home"
              className="rounded-full px-6 font-semibold text-base data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all"
            >
              Home
            </TabsTrigger>
            <TabsTrigger
              value="car"
              className="rounded-full px-6 font-semibold text-base data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all"
            >
              Car
            </TabsTrigger>
            <TabsTrigger
              value="travel"
              className="rounded-full px-6 font-semibold text-base data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all"
            >
              Travel
            </TabsTrigger>
            <TabsTrigger
              value="life"
              className="rounded-full px-6 font-semibold text-base data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all"
            >
              Life
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
                    src={insuranceTypes[selectedType].image}
                    alt={insuranceTypes[selectedType].title}
                    className="w-full md:w-64 rounded-xl object-cover shadow-lg"
                    style={{ maxHeight: 220 }}
                    loading="lazy"
                  />
                  <Card className="rounded-2xl shadow-lg border-0 bg-white flex-1">
                    <CardContent className="p-7">
                      <Badge className="mb-2 w-fit text-emerald-700 bg-emerald-100 font-semibold">
                        {insuranceTypes[selectedType].title}
                      </Badge>
                      <p className="text-gray-700 mb-4 text-base">{insuranceTypes[selectedType].description}</p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-800">
                        {insuranceTypes[selectedType].highlights.map((highlight) => (
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

        {/* Why Insure With Eleganza */}
        <section className="mb-16">
          <motion.h2
            className="text-3xl font-bold mb-6 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Why Insure With Eleganza?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-7">
            {[
              {
                title: "Instant Digital Policies",
                description: "Download proof of cover instantly. No more waiting or paperwork; just secure, digital documents.",
                image:
                  "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGluc3VyYW5jZXxlbnwwfHwwfHx8MA%3D%3D",
              },
              {
                title: "Easy Claims Tracking",
                description: "File and track your claim directly in the app. Get live updates, clear timelines, and real human support.",
                image:
                  "https://images.unsplash.com/photo-1727072206145-bf6f47befe9b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGluc3VyYW5jZXxlbnwwfHwwfHx8MA%3D%3D",
              },
              {
                title: "Bundle and Save",
                description: "Combine multiple covers and save up to twenty percent with our smart bundling tools.",
                image:
                  "https://plus.unsplash.com/premium_photo-1723507291530-47c2f7aa9197?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGluc3VyYW5jZXxlbnwwfHwwfHx8MA%3D%3D",
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
            Get covered now—protect what matters most with Eleganza Insurance.
          </span>
          <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-100 rounded-full px-8 font-bold shadow transition-all mt-2">
            Get My Quote
          </Button>
        </motion.div>
      </main>
    </>
  );
}
