"use client";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar"; // shadcn's Calendar
import { useState } from "react";

export default function CalendarCard() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card className="bg-white border border-[#e6effa] rounded-2xl p-5 shadow-sm flex flex-col">
      <div className="font-semibold text-lg text-[#02152b] mb-2">Select Date</div>
      <div className="mb-1 text-xs text-[#0056B6]">
        {date?.toLocaleString("default", { month: "long", year: "numeric" })}
      </div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border-none"
      />
    </Card>
  );
}
