"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, Phone, MapPin, Search } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-gray-950 text-white px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Logo and Personal Dropdown */}
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold text-sky-400">Eleganza</h1>
          <Button variant="outline" size="sm" className="rounded-full text-sky-400 border-sky-400">
            Personal <ChevronDown size={16} />
          </Button>
        </div>

        {/* Contact & Login */}
        <div className="flex items-center gap-4">
          <Link href="#" className="flex items-center text-sky-400 hover:underline gap-1">
            <Phone size={16} /> Contact us
          </Link>
          <Link href="#" className="flex items-center text-sky-400 hover:underline gap-1">
            <MapPin size={16} /> Find Eleganza
          </Link>
          <Link href="#" className="flex items-center text-sky-400 hover:underline gap-1">
            <Search size={16} /> Search
          </Link>
          <Button className="bg-sky-500 hover:bg-sky-600">Log in</Button>
        </div>
      </div>

      {/* Navigation links */}
      <div className="mt-4 flex justify-center gap-8 text-sm">
        {["Digital Banking", "Bank Accounts", "Borrowing", "Credit Cards", "Savings", "Investments", "Insurance", "Sustainability", "Help and Support"].map((item) => (
          <Link href="#" key={item} className="hover:text-sky-400">
            {item}
          </Link>
        ))}
      </div>
    </nav>
  );
}
