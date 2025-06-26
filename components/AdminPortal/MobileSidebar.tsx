'use client';

import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="lg:hidden p-2 rounded-md hover:bg-[#e8f4ff] transition"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-[#0056B6]" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
