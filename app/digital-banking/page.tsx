"use client";

import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/landing-page/Navbar";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { JSX, useState } from "react";
import { Badge } from "@/components/ui/badge";

type Feature = {
  title: string;
  description: string;
  image: string;
};

const features: Feature[] = [
  {
    title: "Bank Anywhere, Anytime",
    description: "Enjoy seamless access to your Eleganza accounts from any device. Check balances, move funds, or pay bills—your bank travels with you.",
    image: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFua3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "Instant Payments & Transfers",
    description: "Send money instantly with real‑time payments, P2P, or local/international transfers. Eleganza digital banking is built for speed and convenience.",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFua3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "Biometric Security",
    description: "Unlock advanced security with facial recognition, fingerprint login, and smart device authentication. Your money is protected, always.",
    image: "https://plus.unsplash.com/premium_photo-1661420386736-df3569904b5d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmlvbWV0cmljfGVufDB8fDB8fHww",
  },
  {
    title: "Intelligent Card Controls",
    description: "Freeze, unfreeze, or set limits on your Eleganza cards in real time. Effortless card management, at your fingertips.",
    image: "https://images.unsplash.com/photo-1743696398209-6b693d480862?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMyfHxiaW9tZXRyaWN8ZW58MHx8MHx8fDA%3D",
  },
];

const distinctions: Feature[] = [
  {
    title: "Human Touch + AI Intelligence",
    description: "Eleganza blends AI-driven tools with real human support. Get 24/7 chat help, but also reach real bankers anytime—unlike banks that hide behind bots.",
    image: "https://plus.unsplash.com/premium_photo-1745610652814-d344d5dd054b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQyfHxodW1hbiUyMGFpfGVufDB8fDB8fHww",
  },
  {
    title: "Zero-Fee Banking",
    description: "We believe banking should not come with surprise fees. Most Eleganza digital services are zero-fee; clear, transparent, no catches. That's also guaranteed!",
    image: "https://images.unsplash.com/photo-1616803140344-6682afb13cda?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJhbmtpbmclMjAwfGVufDB8fDB8fHww",
  },
  {
    title: "Personalized Insights",
    description: "Eleganza goes beyond the basics. Get smart, personalized money insights, spending trends, and custom savings plans; empowering your financial journey.",
    image: "https://images.unsplash.com/photo-1622782914767-404fb9ab3f57?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW5zaWdodHN8ZW58MHx8MHx8fDA%3D",
  },
];

export default function DigitalBankingPage(): JSX.Element {
  const [selectedFeature, setSelectedFeature] = useState<number>(0);

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
          Welcome to Eleganza Digital Banking
        </motion.h1>
        <motion.p
          className="text-lg text-gray-700 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Everything you need to manage your money 🫰🏻 whenever, wherever. Open accounts, pay bills, move funds, and unlock unique features designed for modern living.
        </motion.p>

        {/* Features Carousel */}
        <section className="mb-14">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4">
              <div className="flex gap-2 mb-2">
                {features.map((feature, idx) => (
                  <Button
                    key={feature.title}
                    variant={selectedFeature === idx ? "destructive" : "ghost"}
                    className={`transition-all px-4 rounded-full`}
                    onClick={() => setSelectedFeature(idx)}
                  >
                    {feature.title}
                  </Button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={features[selectedFeature].title}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ type: "spring", stiffness: 80, damping: 24, duration: 0.5 }}
                >
                  <Card className="rounded-2xl shadow-lg border-0 bg-white">
                    <CardContent className="flex flex-col md:flex-row items-center gap-4 p-6">
                      <img
                        src={features[selectedFeature].image}
                        alt={features[selectedFeature].title}
                        className="w-full md:w-56 rounded-xl object-cover shadow"
                        style={{ maxHeight: 190 }}
                        loading="lazy"
                      />
                      <div>
                        <h3 className="text-2xl font-bold mb-2 text-emerald-700">{features[selectedFeature].title}</h3>
                        <p className="text-base text-gray-700">{features[selectedFeature].description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* What Makes Eleganza Different */}
        <section className="mb-16">
          <motion.h2
            className="text-3xl font-bold mb-6 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            What Sets Eleganza Apart?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-7">
            {distinctions.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * idx, duration: 0.8, type: "spring" }}
              >
                <Card className="border-0 rounded-2xl shadow-md bg-gradient-to-br from-white via-emerald-50 to-emerald-100 hover:scale-105 transition-transform duration-400">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="rounded-t-2xl w-full object-cover h-44"
                  />
                  <CardContent className="pt-4 pb-6 px-4 flex flex-col">
                    <Badge className="mb-2 w-fit text-emerald-700 bg-emerald-100 font-semibold">{item.title}</Badge>
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
            Ready to experience the future of banking?
          </span>
          <Button size="lg" className="bg-blue-400 text-emerald-700 hover:bg-emerald-100 rounded-full px-8 font-bold shadow transition-all mt-2">
            Get Started with Eleganza
          </Button>
        </motion.div>
      </main>
    </>
  );
}
