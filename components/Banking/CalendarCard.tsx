"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";

/**
 * Blue-/yellow-branded, full-width range calendar.
 * – Range **not required** (so it can be cleared)
 * – Current range is printed under the heading
 * – Custom colours override the default black/grey
 */
export default function CalendarCard() {
  const [range, setRange] = useState<DateRange | undefined>();

  /** Pretty string helpers */
  const fmt = (d?: Date) =>
    d?.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const rangeTxt =
    range?.from && range.to
      ? `${fmt(range.from)} → ${fmt(range.to)}`
      : range?.from
      ? fmt(range.from)
      : "—";

  return (
    <Card className="bg-white border border-[#e6effa] rounded-2xl p-5 shadow-sm flex flex-col w-full">
      <h3 className="font-semibold text-lg text-[#02152b] mb-1">Select Date</h3>

      <p className="text-sm text-[#0056B6] mb-3">{rangeTxt}</p>

      <Calendar
        mode="range"
        selected={range}
        onSelect={(sel) => setRange(sel)}
        numberOfMonths={1}
        required={false}
        /* stretch to card width + custom cell size */
        className="w-full"
        style={{ "--rdp-cell-size": "36px" } as React.CSSProperties}
        /* brand the selected range */
        classNames={{
          day_selected: "bg-[#0056B6] text-white hover:bg-[#00419c]",
          day_today: "text-yellow-600 font-semibold",
          day_range_middle: "bg-[#dbeafe] text-[#02152b]",
          day_range_start: "bg-[#0056B6] text-white rounded-l-md",
          day_range_end: "bg-[#0056B6] text-white rounded-r-md",
          caption_label: "text-[#02152b] font-medium",
          nav_button: "hover:bg-[#e8f4ff]",
          table: "w-full",
        }}
      />
    </Card>
  );
}
