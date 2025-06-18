'use client';

import { Input }                                     from '@/components/ui/input';
import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem,
}                                                    from '@/components/ui/select';
import { Button }                                    from '@/components/ui/button';
import { CalendarIcon, Filter }                      from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* quick dummy options – replace from API if needed                           */
/* -------------------------------------------------------------------------- */
const locations   = ['State or province', 'Philadelphia', 'Manhattan', 'London'];
const spentBands  = ['> $1,000', '> $500', '> $100', 'Any'];
const txTypes     = ['All transactions', 'Debit', 'Credit', 'Transfer'];

export default function TransactionFiltersBar() {
  return (
    <div className="w-full bg-[#fafdff] border border-[#e6effa] rounded-2xl p-4">
      {/* -- top search + filter icon ------------------------------------ */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <Input
          placeholder="Search by name, email, or others..."
          className="h-10 lg:flex-1 bg-[#f2f8fd] border-none"
        />

        <Button
          variant="outline"
          size="sm"
          className="lg:ml-4 h-10 px-3 text-[#0056b6] border-[#b9d9ff] hover:bg-[#ebf4ff]"
        >
          <Filter className="w-4 h-4 mr-1" />
          Filters
        </Button>
      </div>

      {/* -- grid filter controls ---------------------------------------- */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {/* Location ----------------------------------------------------- */}
        <Select defaultValue={locations[0]}>
          <SelectTrigger className="h-10 bg-[#f2f8fd] border-none w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {locations.map((l) => (
              <SelectItem key={l} value={l}>{l}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Amount Spent ------------------------------------------------- */}
        <Select defaultValue={spentBands[0]}>
          <SelectTrigger className="h-10 bg-[#f2f8fd] border-none w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {spentBands.map((b) => (
              <SelectItem key={b} value={b}>{b}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Transaction list Date  -------------------------------------- */}
        <div className="relative">
          <Input
            placeholder="Select date"
            className="h-10 bg-[#f2f8fd] border-none w-full cursor-pointer"
            readOnly             /* you’ll plug your date-picker here */
          />
          <CalendarIcon className="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground" />
        </div>

        {/* Type of transaction ----------------------------------------- */}
        <Select defaultValue={txTypes[0]}>
          <SelectTrigger className="h-10 bg-[#f2f8fd] border-none w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {txTypes.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
