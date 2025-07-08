"use client";

import Navbar from "@/components/landing-page/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { JSX, useState } from "react";

type AccountType = "current" | "youth" | "premium";

type AccountFeature = {
  title: string;
  description: string;
  image: string;
  benefits: string[];
};

const accountTypes: Record<AccountType, AccountFeature> = {
  current: {
    title: "Everyday Current Account",
    description:
      "Enjoy hassle-free, zero-fee banking for daily needs. Get instant virtual cards, unlimited transactions, and modern money tools.",
    image: "https://cdn.pixabay.com/photo/2021/06/28/18/46/money-6372415_640.jpg",
    benefits: [
      "No monthly fees",
      "Free instant virtual and physical cards",
      "Unlimited mobile and web transactions",
      "24/7 support & instant alerts",
    ],
  },
  youth: {
    title: "Youth & Student Account",
    description:
      "Smart banking for the next generation. Designed for young people under 25, with digital learning tools, parental controls, and special rewards.",
    image: "https://images.unsplash.com/photo-1579706966698-cf96a97235ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTUwfHxiYW5rJTIwYWNjb3VudHxlbnwwfHwwfHx8MA%3D%3D",
    benefits: [
      "No minimum balance required",
      "Smart savings & learning modules",
      "Parental guidance features",
      "Bonus rewards for good money habits",
    ],
  },
  premium: {
    title: "Eleganza Premium Bundle",
    description:
      "Unlock a world of privilege: priority service, higher interest, and lifestyle perks. Experience banking at its finest, tailored for achievers.",
    image: "https://cdn.pixabay.com/photo/2016/10/20/17/12/money-1756067_640.jpg",
    benefits: [
      "Priority concierge banking",
      "Earn top-tier interest rates",
      "Exclusive lifestyle benefits",
      "Travel and insurance perks",
    ],
  },
};

export default function BankAccountsPage(): JSX.Element {
  const [selectedType, setSelectedType] = useState<AccountType>("current");

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
          Bank Accounts
        </motion.h1>
        <motion.p
          className="text-lg text-gray-700 mb-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Choose from everyday current accounts, youth accounts, and premium bundles👩‍🦱 - each designed to fit your lifestyle.
        </motion.p>

        {/* Tabs for Account Types */}
        <Tabs
          value={selectedType}
          onValueChange={(val) => setSelectedType(val as AccountType)}
          className="mb-12"
        >
          <TabsList className="flex space-x-2 bg-emerald-100 rounded-full p-1 shadow-inner">
            <TabsTrigger
              value="current"
              className="rounded-full px-6 font-semibold text-base data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all"
            >
              Current
            </TabsTrigger>
            <TabsTrigger
              value="youth"
              className="rounded-full px-6 font-semibold text-base data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all"
            >
              Youth
            </TabsTrigger>
            <TabsTrigger
              value="premium"
              className="rounded-full px-6 font-semibold text-base data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all"
            >
              Premium
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
                    src={accountTypes[selectedType].image}
                    alt={accountTypes[selectedType].title}
                    className="w-full md:w-64 rounded-xl object-cover shadow-lg"
                    style={{ maxHeight: 220 }}
                    loading="lazy"
                  />
                  <Card className="rounded-2xl shadow-lg border-0 bg-white flex-1">
                    <CardContent className="p-7">
                      <Badge className="mb-2 w-fit text-emerald-700 bg-emerald-100 font-semibold">
                        {accountTypes[selectedType].title}
                      </Badge>
                      <p className="text-gray-700 mb-4 text-base">{accountTypes[selectedType].description}</p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-800">
                        {accountTypes[selectedType].benefits.map((benefit) => (
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

        {/* Why Choose Eleganza Section */}
        <section className="mb-16">
          <motion.h2
            className="text-3xl font-bold mb-6 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Why Choose Eleganza Accounts?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-7">
            {[
              {
                title: "Zero Hidden Fees",
                description: "Simple, honest pricing. No surprises 😁 - just transparent, fair banking. You will love it.",
                image:
                  "https://images.unsplash.com/photo-1579240637470-e029acf584a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTY0fHxiYW5rJTIwYWNjb3VudHxlbnwwfHwwfHx8MA%3D%3D",
              },
              {
                title: "Instant Account Opening",
                description: "Open your account online in minutes, get your virtual card instantly, and bank on your terms.",
                image:
                  "https://images.unsplash.com/photo-1579641197020-a8b80beb3c02?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTc1fHxiYW5rJTIwYWNjb3VudHxlbnwwfHwwfHx8MA%3D%3D",
              },
              {
                title: "Personalized Support",
                description: "Real people, real help. Our bankers are here for you, 24/7😁 - online and in-branch.",
                image:
                  "https://images.unsplash.com/photo-1564121211835-e88c852648ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHN1cHBvcnR8ZW58MHx8MHx8fDA%3D",
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
            Open your Eleganza account today!
          </span>
          <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-100 rounded-full px-8 font-bold shadow transition-all mt-2">
            Start Now
          </Button>
        </motion.div>
      </main>
    </>
  );
}
