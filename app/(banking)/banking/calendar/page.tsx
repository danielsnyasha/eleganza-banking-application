'use client';

import { useState } from 'react';
import CalendarPlanner, {
  CalendarEvent,
} from '@/components/Calendar/CalendarPlanner';
import MyWalletCard from '@/components/Banking/MyWalletCard';
import QuickTransfer from '@/components/Banking/QuickTransfer';
import CalendarCard from '@/components/Banking/CalendarCard';

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: 'holiday-1',
      title: 'Independence Day',
      start: new Date(2025, 6, 4),
      allDay: true,
    },
  ]);

  const addEvent = (ev: CalendarEvent) => {
    setEvents(prev => [...prev, ev]);
  };

  return (
    <div className="md:flex gap-6 p-4">
      {/* Left: full-width calendar */}
      <div className="flex-1">
        <CalendarPlanner events={events} onAddAction={addEvent} />
      </div>

      {/* Right: existing cards */}
      <div className="w-full md:w-[320px] space-y-4">
        <MyWalletCard />
        <QuickTransfer />
        <CalendarCard />
      </div>
    </div>
  );
}
