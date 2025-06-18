"use client";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

// 👉  -- SSR must be off for react-simple-maps inside Next 13/14
const WorldMap = dynamic(() => import("./WorldMap"), { ssr: false });

export default function MostLocationsCard() {
  return (
    <Card className="bg-white border border-[#e6effa] rounded-2xl p-5 shadow-sm flex flex-col w-full gap-4 h-full min-h-[640px]">
      <header className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-[#0175c2]" />
        <h2 className="font-semibold text-lg text-[#02152b]">Most Locations</h2>
      </header>

      {/* Live map */}
      <div className="flex-1 overflow-hidden rounded-lg border border-[#e6effa]">
        <WorldMap />
      </div>
    </Card>
  );
}
