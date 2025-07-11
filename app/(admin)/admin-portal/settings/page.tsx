"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { SunMoon, Bell, Lock, User2, ShieldCheck, Save, RefreshCw, LayoutDashboard } from "lucide-react";

// Dummy profile data for illustration
const dummyProfile = {
  name: "Nyasha Musanhu",
  email: "nyasha@eleganzabank.com",
  phone: "+27 82 123 4567",
  role: "Super Admin",
};

export default function AdminSettingsPage() {
  const [profile, setProfile] = useState(dummyProfile);
  const [theme, setTheme] = useState("system");
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });
  const [density, setDensity] = useState("comfortable");

  // Handle profile changes
  function handleProfileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }

  // Save actions
  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    // Add your save logic here
    alert("Settings saved!");
  }
  function handleReset() {
    setProfile(dummyProfile);
    setTheme("system");
    setNotifications({ email: true, sms: false, push: true });
    setDensity("comfortable");
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 w-full">
      {/* Banner */}
      <motion.section
        className="bg-gradient-to-r from-emerald-600 via-blue-500 to-yellow-400 rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center gap-8 mb-10 shadow-xl"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
            Admin Portal Settings
          </h1>
          <p className="text-white/90 max-w-2xl">
            Update your profile, security, notification preferences, and personalize the admin portal interface.  
            Changes affect your experience in the admin portal only.
          </p>
        </div>
        <LayoutDashboard className="w-24 h-24 text-white/30 hidden md:block" />
      </motion.section>

      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-8 bg-white rounded-xl shadow-lg p-7">
        <Accordion type="multiple" defaultValue={["profile", "security", "notifications", "interface"]}>
          {/* Profile */}
          <AccordionItem value="profile">
            <AccordionTrigger className="font-bold text-lg text-emerald-800 flex gap-2">
              <User2 className="w-5 h-5 text-emerald-700" /> Account Profile
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                <div>
                  <label className="block font-medium mb-1">Name</label>
                  <Input name="name" value={profile.name} onChange={handleProfileChange} />
                </div>
                <div>
                  <label className="block font-medium mb-1">Email</label>
                  <Input name="email" value={profile.email} onChange={handleProfileChange} type="email" />
                </div>
                <div>
                  <label className="block font-medium mb-1">Phone</label>
                  <Input name="phone" value={profile.phone} onChange={handleProfileChange} type="tel" />
                </div>
                <div>
                  <label className="block font-medium mb-1">Role</label>
                  <Input value={profile.role} disabled className="bg-gray-50 cursor-not-allowed" />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Security */}
          <AccordionItem value="security">
            <AccordionTrigger className="font-bold text-lg text-blue-800 flex gap-2">
              <Lock className="w-5 h-5 text-blue-600" /> Security
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                <div>
                  <label className="block font-medium mb-1">Change Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <label className="block font-medium mb-1">Multi-Factor Auth (MFA)</label>
                  <Switch id="mfa" checked />
                  <span className="ml-2 text-xs text-gray-600">Enabled</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Notifications */}
          <AccordionItem value="notifications">
            <AccordionTrigger className="font-bold text-lg text-yellow-700 flex gap-2">
              <Bell className="w-5 h-5 text-yellow-500" /> Notifications
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col md:flex-row gap-6 mt-4">
                <label className="flex items-center gap-3 font-medium">
                  <Switch checked={notifications.email} onCheckedChange={() => setNotifications(n => ({ ...n, email: !n.email }))} />
                  Email Alerts
                </label>
                <label className="flex items-center gap-3 font-medium">
                  <Switch checked={notifications.sms} onCheckedChange={() => setNotifications(n => ({ ...n, sms: !n.sms }))} />
                  SMS Notifications
                </label>
                <label className="flex items-center gap-3 font-medium">
                  <Switch checked={notifications.push} onCheckedChange={() => setNotifications(n => ({ ...n, push: !n.push }))} />
                  Push Notifications
                </label>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Interface */}
          <AccordionItem value="interface">
            <AccordionTrigger className="font-bold text-lg text-emerald-700 flex gap-2">
              <SunMoon className="w-5 h-5 text-emerald-500" /> Interface Preferences
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col md:flex-row gap-10 mt-4 items-center">
                <div>
                  <label className="block font-medium mb-1">Theme</label>
                  <select value={theme} onChange={e => setTheme(e.target.value)} className="border border-emerald-200 rounded px-3 py-2">
                    <option value="system">System Default</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1">Density</label>
                  <select value={density} onChange={e => setDensity(e.target.value)} className="border border-emerald-200 rounded px-3 py-2">
                    <option value="comfortable">Comfortable</option>
                    <option value="compact">Compact</option>
                  </select>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 justify-end">
          <Button type="button" variant="outline" className="border-blue-400 text-blue-700 flex items-center gap-1" onClick={handleReset}>
            <RefreshCw className="w-4 h-4" /> Reset
          </Button>
          <Button type="submit" className="bg-emerald-600 text-white flex items-center gap-1">
            <Save className="w-4 h-4" /> Save Changes
          </Button>
        </div>
      </form>

      {/* Floating Info Card */}
      <aside className="fixed bottom-8 right-8 bg-gradient-to-br from-emerald-400 to-blue-400 shadow-2xl text-white rounded-2xl px-6 py-5 w-[340px] z-20 border-2 border-emerald-200/60 hidden lg:block">
        <div className="font-bold text-lg mb-1 flex gap-1 items-center"><ShieldCheck className="w-5 h-5" /> Security & Compliance</div>
        <ul className="text-xs leading-relaxed list-disc pl-4">
          <li>Use strong passwords and enable MFA for all admin accounts.</li>
          <li>Update contact info for important alerts & compliance notices.</li>
          <li>Review notification settings regularly for audit readiness.</li>
          <li>Personalize interface for improved productivity.</li>
        </ul>
      </aside>
    </main>
  );
}
