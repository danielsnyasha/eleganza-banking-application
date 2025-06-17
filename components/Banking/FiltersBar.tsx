"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

export default function FiltersBar() {
  return (
    <div className="flex items-center justify-between gap-3 my-2">
      <Input className="max-w-sm rounded-xl border-[#e6effa] bg-[#f2f8fd]" placeholder="Search by name, email, or others..." />
      <Button variant="outline" className="flex items-center gap-2 bg-[#f2f8fd] text-[#0056B6] border-[#e6effa]">
        <SlidersHorizontal className="w-4 h-4" />
        Filters
      </Button>
    </div>
  );
}
