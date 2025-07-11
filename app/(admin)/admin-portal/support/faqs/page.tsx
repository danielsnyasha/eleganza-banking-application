"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { PlusCircle, Globe2, MapPin, Save } from "lucide-react";

// Regions/Categories for FAQs
const regions = [
  { label: "Global", icon: <Globe2 className="w-5 h-5 text-emerald-600" /> },
  { label: "Africa", icon: <MapPin className="w-5 h-5 text-yellow-600" /> },
  { label: "Europe", icon: <MapPin className="w-5 h-5 text-blue-600" /> },
  { label: "Asia", icon: <MapPin className="w-5 h-5 text-red-600" /> },
  { label: "Americas", icon: <MapPin className="w-5 h-5 text-purple-600" /> },
];

// Dummy FAQs per region
const initialFaqs = {
  Global: [
    {
      q: "How do I reset my Eleganza Bank password?",
      a: "Go to Login > Forgot Password, enter your registered email, and follow the reset instructions.",
    },
    {
      q: "Is online banking secure with Eleganza?",
      a: "Yes. We use multi-factor authentication, biometric security, and continuous monitoring to keep your data safe.",
    },
  ],
  Africa: [
    {
      q: "Can I open an account with a local ID in Zimbabwe?",
      a: "Yes, we accept local IDs and passports for account opening in all African branches.",
    },
    {
      q: "What are the USSD banking codes for Africa?",
      a: "Dial *123# to access mobile banking services in participating countries.",
    },
  ],
  Europe: [
    {
      q: "Are my Euro deposits covered under EU law?",
      a: "All deposits in EU branches are insured up to €100,000 per client under EU regulations.",
    },
    {
      q: "How can I switch my salary account to Eleganza Bank?",
      a: "Simply bring your IBAN to your HR/payroll team and request a transfer to Eleganza.",
    },
  ],
  Asia: [
    {
      q: "Does Eleganza offer Alipay or WeChat Pay integration?",
      a: "Yes, both Alipay and WeChat Pay are supported for all account holders in Asia.",
    },
  ],
  Americas: [
    {
      q: "How do I deposit USD checks?",
      a: "Visit any Eleganza Bank branch or use mobile check deposit in the Americas app.",
    },
    {
      q: "What are the wire transfer cut-off times?",
      a: "Domestic: 4pm EST; International: 2pm EST.",
    },
  ],
};

type FAQ = { q: string; a: string; };

export default function AdminSupportFaqsPage() {
  // Local state to store FAQs (simulate updating)
  const [faqs, setFaqs] = useState<{ [region: string]: FAQ[] }>(initialFaqs);

  // State for form
  const [form, setForm] = useState({
    region: "Global",
    q: "",
    a: "",
  });
  const [showPreview, setShowPreview] = useState(false);

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setShowPreview(false);
  }

  function handleAddFaq(e: React.FormEvent) {
    e.preventDefault();
    if (!form.q || !form.a) return;
    setFaqs((prev) => ({
      ...prev,
      [form.region]: [{ q: form.q, a: form.a }, ...prev[form.region]],
    }));
    setShowPreview(false);
    setForm({ region: "Global", q: "", a: "" });
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 w-full">
      {/* Banner */}
      <motion.section
        className="bg-gradient-to-r from-emerald-600 via-blue-500 to-yellow-400 rounded-2xl px-8 py-7 flex flex-col md:flex-row items-center gap-8 mb-10 shadow-xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
            Frequently Asked Questions <span className="text-yellow-200">(Admin)</span>
          </h1>
          <p className="text-white/90 mb-2 max-w-2xl">
            Browse and manage FAQs for every region and category. Add new questions, update answers, and segment by region—keep your users informed and supported 24/7!
          </p>
        </div>
        <PlusCircle className="w-24 h-24 text-white/30 hidden md:block" />
      </motion.section>

      {/* New FAQ Form */}
      <section className="bg-white rounded-xl shadow-md p-7 mb-10 max-w-2xl mx-auto">
        <form onSubmit={handleAddFaq} className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <label className="font-semibold text-emerald-700">Region/Category:</label>
            <select
              name="region"
              value={form.region}
              onChange={handleFormChange}
              className="border border-emerald-200 rounded px-3 py-2"
            >
              {regions.map((r) => (
                <option value={r.label} key={r.label}>{r.label}</option>
              ))}
            </select>
          </div>
          <Input
            name="q"
            value={form.q}
            onChange={handleFormChange}
            placeholder="FAQ Question"
            className="bg-blue-50"
            maxLength={150}
            required
          />
          <Textarea
            name="a"
            value={form.a}
            onChange={handleFormChange}
            placeholder="FAQ Answer"
            className="bg-blue-50"
            rows={3}
            maxLength={600}
            required
          />
          <div className="flex gap-2 items-center">
            <Button
              type="button"
              variant="outline"
              className="border-emerald-500 text-emerald-700"
              onClick={() => setShowPreview(true)}
            >
              Preview
            </Button>
            <Button type="submit" className="bg-emerald-600 text-white flex items-center gap-1">
              <Save className="w-4 h-4" /> Post FAQ
            </Button>
          </div>
        </form>
        {showPreview && (
          <motion.div
            className="mt-4 bg-blue-50 border-l-4 border-emerald-600 px-5 py-3 rounded shadow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="font-bold text-emerald-700 mb-1">Preview:</div>
            <div className="text-base font-semibold">{form.q}</div>
            <div className="text-sm text-gray-700">{form.a}</div>
            <div className="mt-1 text-xs text-gray-500">Region: {form.region}</div>
          </motion.div>
        )}
      </section>

      {/* FAQs by Region */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {regions.map((r) => (
          <section key={r.label}>
            <div className="flex items-center gap-2 mb-2">
              {r.icon}
              <h2 className="font-bold text-lg text-emerald-800">{r.label}</h2>
            </div>
            <Accordion type="single" collapsible className="w-full rounded-xl bg-emerald-50">
              {(faqs[r.label] || []).map((f, i) => (
                <AccordionItem value={f.q + i} key={f.q + i} className="border-0">
                  <AccordionTrigger className="text-md font-semibold text-emerald-900 px-3 py-2">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-3 text-gray-800">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
              {(faqs[r.label] || []).length === 0 && (
                <div className="p-3 text-sm text-gray-400">No FAQs for this region yet.</div>
              )}
            </Accordion>
          </section>
        ))}
      </div>
    </main>
  );
}
