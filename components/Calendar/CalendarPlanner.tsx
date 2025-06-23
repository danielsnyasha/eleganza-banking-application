'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns/format'; // fixed import
import type { DayPickerProps } from 'react-day-picker';

/**
 * A single calendar event.
 */
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end?: Date;
  allDay?: boolean;
}

/**
 * Props for the planner: the list of events plus a callback to add one.
 */
export interface CalendarPlannerProps {
  events: CalendarEvent[];
  onAddAction: (ev: CalendarEvent) => void; // renamed to follow Next.js convention
}

export default function CalendarPlanner({
  events,
  onAddAction,
}: CalendarPlannerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [newTitle, setNewTitle] = useState('');

  const handleDayClick = (date?: Date) => {
    setSelectedDate(date);
  };

  const handleAdd = () => {
    if (!newTitle.trim() || !selectedDate) return;
    onAddAction({
      id: `${selectedDate.getTime()}`,
      title: newTitle.trim(),
      start: selectedDate,
      allDay: true,
    });
    setNewTitle('');
  };

  // highlight days that have events
  const modifiers: DayPickerProps['modifiers'] = {
    hasEvent: day =>
      events.some(
        ev =>
          format(ev.start, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
      ),
  };

  const modifiersStyles = {
    hasEvent: { backgroundColor: '#a7f3d0' }, // light green
  };

  // Set title attribute for days with events (hover for event name)
  const dayContent: DayPickerProps['dayContent'] = (date) => {
    const event = events.find(
      ev => format(ev.start, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
    return (
      <span title={event ? event.title : undefined}>
        {date.getDate()}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Add-event form */}
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border px-3 py-2 rounded"
          placeholder="New event title"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Month calendar */}
      <Calendar
        mode="single"
        required={true} // fix for prop error
        selected={selectedDate}
        onSelect={handleDayClick}
        className="w-full rounded-lg border"
        captionLayout="dropdown"
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        dayContent={dayContent}
      />

      {/* Show selected date */}
      <p className="text-sm text-gray-600">
        Selected day:{' '}
        {selectedDate ? selectedDate.toDateString() : 'None'}
      </p>
    </div>
  );
}
