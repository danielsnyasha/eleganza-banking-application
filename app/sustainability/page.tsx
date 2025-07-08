"use client";

import Navbar from "@/components/landing-page/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { JSX } from "react";

export default function SustainabilityPage(): JSX.Element {
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
          Sustainability
        </motion.h1>
        <motion.p
          className="text-lg text-gray-700 mb-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Banking with purpose 💰 learn how we’re reducing our footprint, financing green projects, and helping you track yours.
        </motion.p>

        {/* Sustainability Feature Cards */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-7">
            {[
              {
                title: "Net Zero Roadmap and Reporting",
                description: "See our clear plan to cut emissions, with regular progress reports and full transparency for customers and investors.",
                image: "https://images.unsplash.com/photo-1634757439914-23b8acb9d411?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fGluc3VyYW5jZXxlbnwwfHwwfHx8MA%3D%3D",
              },
              {
                title: "Green Mortgage Discounts",
                description: "Get rewarded for energy efficient homes with discounted rates on eco-friendly and green-certified mortgages.",
                image: "https://images.unsplash.com/photo-1729838809728-48566c1ef0e9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGluc3VyYW5jZXxlbnwwfHwwfHx8MA%3D%3D",
              },
              {
                title: "Carbon Insights for Every Purchase",
                description: "Track your carbon footprint in real time as you spend. See the impact of your shopping and get tips to reduce it.",
                image: "https://images.unsplash.com/photo-1707999494560-f534cc79298c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODB8fGluc3VyYW5jZXxlbnwwfHwwfHx8MA%3D%3D",
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
            Join us on the journey—bank for a better future with Eleganza.
          </span>
          <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-100 rounded-full px-8 font-bold shadow transition-all mt-2">
            Learn More
          </Button>
        </motion.div>
      </main>
    </>
  );
}
