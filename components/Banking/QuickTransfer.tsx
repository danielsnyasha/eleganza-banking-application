"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function QuickTransfer() {
  const [amount, setAmount] = useState("");

  return (
    <Card className="bg-white border border-[#e6effa] p-5 rounded-2xl shadow-sm">
      <div className="font-semibold text-lg text-[#02152b] mb-2">Quick Transfer</div>
      <div className="flex gap-3 mb-2">
        <Button size="sm" variant="outline" className="rounded-lg border-[#ff4757] text-[#ff4757] font-bold">
          Debit
        </Button>
        <span className="text-[#02152b] font-bold ml-2">$10,431</span>
      </div>
      <Input
        placeholder="Enter amount"
        type="number"
        className="bg-[#f2f8fd] border-none rounded-xl shadow-none text-[16px] h-10 px-4 mb-3"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button
        className="w-full mt-1 rounded-xl bg-[#0056B6] hover:bg-[#00449e] text-white"
        disabled={!amount}
      >
        Send
        <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
      <div className="flex items-center mt-4 gap-2 text-xs text-[#7b8a99]">
        <span className="rounded-full w-6 h-6 bg-[#e6effa] flex items-center justify-center font-semibold text-[#0056B6]">AB</span>
        <span className="rounded-full w-6 h-6 bg-[#e6effa] flex items-center justify-center font-semibold text-[#0056B6]">CD</span>
        <span className="rounded-full w-6 h-6 bg-[#e6effa] flex items-center justify-center font-semibold text-[#0056B6]">+</span>
      </div>
    </Card>
  );
}
