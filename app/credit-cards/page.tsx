"use client";

import Navbar from "@/components/landing-page/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { JSX, useState } from "react";

type CardType = "classic" | "rewards" | "travel";

type CreditCardFeature = {
  title: string;
  description: string;
  image: string;
  highlights: string[];
};

const cardTypes: Record<CardType, CreditCardFeature> = {
  classic: {
    title: "Classic Eleganza Card",
    description:
      "Simple, safe, and accepted worldwide; perfect for everyday purchases and building your credit history.",
    image: "https://cdn.pixabay.com/photo/2021/07/12/10/54/credit-card-6406010_640.png",
    highlights: [
      "Zero annual fees",
      "Smart credit-building features",
      "Global contactless payments",
      "Seamless digital wallet integration",
    ],
  },
  rewards: {
    title: "Cash-Back and Rewards Card",
    description:
      "Turn every purchase into cash or points—earn as you spend with Eleganza's best-in-class rewards program.",
    image: "https://cdn.pixabay.com/photo/2016/08/10/15/01/credit-cards-1583534_1280.jpg",
    highlights: [
      "Up to 5% cash-back on select categories",
      "Bonus points on groceries, fuel, and dining",
      "Zero-interest intro period",
      "Redeem for cash, gifts, or travel",
    ],
  },
  travel: {
    title: "Travel Platinum Card",
    description:
      "Travel the world with confidence :)enjoy perks like airport lounge access, travel insurance, and exclusive experiences.",
    image: "https://cdn.pixabay.com/photo/2016/04/02/13/58/money-1302830_640.jpg",
    highlights: [
      "Free airport lounge visits",
      "Comprehensive travel insurance",
      "No foreign transaction fees",
      "VIP customer support worldwide",
    ],
  },
};

export default function CreditCardsPage(): JSX.Element {
  const [selectedCard, setSelectedCard] = useState<CardType>("classic");

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
          Credit Cards
        </motion.h1>
        <motion.p
          className="text-lg text-gray-700 mb-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Earn rewards, build credit, and shop securely worldwide. Compare our range of cards and find your perfect match.
        </motion.p>

        {/* Tabs for Card Types */}
        <Tabs
          value={selectedCard}
          onValueChange={(val) => setSelectedCard(val as CardType)}
          className="mb-12"
        >
          <TabsList className="flex space-x-2 bg-emerald-100 rounded-full p-1 shadow-inner">
            <TabsTrigger
              value="classic"
              className="rounded-full px-6 font-semibold text-base data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all"
            >
              Classic
            </TabsTrigger>
            <TabsTrigger
              value="rewards"
              className="rounded-full px-6 font-semibold text-base data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all"
            >
              Rewards
            </TabsTrigger>
            <TabsTrigger
              value="travel"
              className="rounded-full px-6 font-semibold text-base data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all"
            >
              Travel
            </TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <AnimatePresence mode="wait">
              <TabsContent value={selectedCard} forceMount>
                <motion.div
                  key={selectedCard}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
                  className="flex flex-col md:flex-row items-center gap-6"
                >
                  <img
                    src={cardTypes[selectedCard].image}
                    alt={cardTypes[selectedCard].title}
                    className="w-full md:w-64 rounded-xl object-cover shadow-lg"
                    style={{ maxHeight: 220 }}
                    loading="lazy"
                  />
                  <Card className="rounded-2xl shadow-lg border-0 bg-white flex-1">
                    <CardContent className="p-7">
                      <Badge className="mb-2 w-fit text-emerald-700 bg-emerald-100 font-semibold">
                        {cardTypes[selectedCard].title}
                      </Badge>
                      <p className="text-gray-700 mb-4 text-base">{cardTypes[selectedCard].description}</p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-800">
                        {cardTypes[selectedCard].highlights.map((highlight) => (
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

        {/* Why Eleganza Cards Section */}
        <section className="mb-16">
          <motion.h2
            className="text-3xl font-bold mb-6 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Why Choose Eleganza Cards?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-7">
            {[
              {
                title: "Shop Securely",
                description: "Advanced fraud protection, instant card freeze, and biometric authentication for your peace of mind all the time.",
                image:
                  "https://cdn.pixabay.com/photo/2017/10/29/17/31/online-2900303_640.jpg",
              },
              {
                title: "Instant Digital Access",
                description: "Activate your card instantly. Use it with Apple Pay, Google Pay, or Samsung Pay the moment you’re approved.",
                image:
                  "https://cdn.pixabay.com/photo/2015/07/17/22/43/student-849825_640.jpg",
              },
              {
                title: "Rewards That Fit You",
                description: "Cash-back, points, or travel perks; pick the card that matches your lifestyle and goals. And the good news - we have the best!",
                image:
                  "https://images.unsplash.com/photo-1670782559267-d4c1ef138060?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmV3YXJkc3xlbnwwfHwwfHx8MA%3D%3D",
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
            Ready for rewards? Apply for your Eleganza card now.
          </span>
          <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-100 rounded-full px-8 font-bold shadow transition-all mt-2">
            Get My Card
          </Button>
        </motion.div>
      </main>
    </>
  );
}
