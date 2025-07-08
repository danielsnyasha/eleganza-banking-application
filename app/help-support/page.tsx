"use client";

import Navbar from "@/components/landing-page/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { JSX } from "react";

export default function HelpSupportPage(): JSX.Element {
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
          Help & Support
        </motion.h1>
        <motion.p
          className="text-lg text-gray-700 mb-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Need assistance? Our team is here twenty four seven. Browse FAQs, start a live chat, or give us a call straight from the app.
        </motion.p>

        {/* Support Feature Cards */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-7">
            {[
              {
                title: "Comprehensive Knowledge Base",
                description: "Find instant answers to common questions, step by step guides, and helpful tips anytime.",
                image: "https://plus.unsplash.com/premium_photo-1687819872154-9d4fd3cb7cca?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGVscHxlbnwwfHwwfHx8MA%3D%3D",
              },
              {
                title: "Secure In App Messaging",
                description: "Reach our support team safely from inside your app. Start a live chat, track progress, and get updates in real time.",
                image: "https://plus.unsplash.com/premium_photo-1663090635094-5cc9111742ae?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhlbHB8ZW58MHx8MHx8fDA%3D",
              },
              {
                title: "Dedicated Phone Lines Worldwide",
                description: "Call us from anywhere, any time. Our support lines are open twenty four seven for fast, personal help.",
                image: "https://plus.unsplash.com/premium_photo-1690417698498-1adbf3a31408?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fGhlbHB8ZW58MHx8MHx8fDA%3D",
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
            Still need help? Start a chat or call us anytime.
          </span>
          <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-100 rounded-full px-8 font-bold shadow transition-all mt-2">
            Get Support Now
          </Button>
        </motion.div>
      </main>
    </>
  );
}
