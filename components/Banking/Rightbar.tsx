// app/(banking)/banking/components/Rightbar.tsx
"use client";
import { Card } from "@/components/ui/card";
import { Wallet, Send, Users, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Rightbar() {
  return (
    <aside className="hidden lg:flex flex-col w-80 p-4 gap-6 bg-muted/60 border-l border-border">
      {/* Wallet Card */}
      <Card className="p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Wallet className="w-8 h-8 text-primary" />
          <span className="font-bold text-lg">My Wallet</span>
        </div>
        <div className="text-3xl font-bold mt-2">$24,098.00</div>
        <div className="text-xs text-muted-foreground">VISA</div>
      </Card>

      {/* Quick Transfer */}
      <Card className="p-4 flex flex-col gap-2">
        <div className="font-semibold mb-2">Quick Transfer</div>
        <Button size="sm" variant="outline" className="flex gap-2 mb-2">
          <Send className="w-4 h-4" /> Debit: $10,431
        </Button>
        <input type="number" placeholder="Enter amount" className="input input-bordered w-full mb-2" />
        <Button size="sm" className="w-full">Send</Button>
      </Card>

      {/* Team Chat Preview */}
      <Card className="p-4 flex flex-col gap-2">
        <div className="font-semibold mb-2">Team Chat</div>
        <div className="text-xs text-muted-foreground">Hi. What can I help you with?</div>
        <Button variant="ghost" className="mt-2 flex gap-2">
          <Users className="w-4 h-4" /> Open Chat
        </Button>
      </Card>

      {/* Calendar */}
      <Card className="p-4 flex flex-col gap-2">
        <div className="font-semibold mb-2">Select Date</div>
        <div className="flex items-center gap-2 text-xs">
          <CalendarDays className="w-5 h-5" /> June 2022
        </div>
        {/* Implement with shadcn calendar or a placeholder */}
        <div className="mt-2 text-center text-muted-foreground">(calendar)</div>
      </Card>
    </aside>
  );
}
