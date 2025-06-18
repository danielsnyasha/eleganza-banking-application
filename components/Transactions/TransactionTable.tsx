'use client';

import {
  Table, TableHeader, TableRow, TableHead,
  TableBody, TableCell,
}                                    from '@/components/ui/table';
import {
  Avatar, AvatarFallback, AvatarImage,
}                                    from '@/components/ui/avatar';
import {
  Pagination, PaginationContent, PaginationItem, PaginationLink,
}                                    from '@/components/ui/pagination';
import { ChevronDown, ChevronUp, MoreHorizontal } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* demo rows – swap with live data via query lib                              */
/* -------------------------------------------------------------------------- */
const rows = Array.from({ length: 25 }).map((_, i) => ({
  id:        i + 1,
  avatar:    '/avatars/01.png',
  name:      ['Devon Lane','Bessie Cooper','Ralph Edwards','Arlene McCoy',
              'Leslie Alexander'][i % 5],
  email:     ['devon@mail.com','bessie@mail.com','weaver@example.com',
              'lawson@example.com','felicia.reid@example.com'][i % 5],
  location:  i % 6 === 5 ? 'Manhattan, USA' : 'Philadelphia, USA',
  spent:     i % 6 === 5 ? '$59.00'         : '$101.00',
}));

export default function TransactionTable() {
  return (
    <div className="flex flex-col h-[calc(100vh-355px)] bg-[#fafdff] border border-[#e6effa] rounded-2xl overflow-hidden">
      {/* ───── scroll-able table (fills all available height) ───── */}
      <div className="flex-1 overflow-y-auto">
        <Table className="min-w-[860px]">
          {/* sticky header */}
          <TableHeader className="bg-[#f2f8fd] text-[#02152b]/70 sticky top-0 z-10">
            <TableRow className="h-14">
              <TableHead className="w-10" />
              <SortableHead label="Customer name" />
              <SortableHead label="Email" />
              <SortableHead label="Location" />
              <SortableHead label="Spent" numeric />
              <TableHead className="w-8" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id} className="h-14 hover:bg-[#f2f8fd]/50">
                <TableCell className="w-10">
                  <input type="checkbox" className="accent-[#0056b6]" />
                </TableCell>

                <TableCell className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={r.avatar} />
                    <AvatarFallback>{r.name.slice(0,2)}</AvatarFallback>
                  </Avatar>
                  {r.name}
                </TableCell>

                <TableCell>{r.email}</TableCell>
                <TableCell>{r.location}</TableCell>
                <TableCell className="text-right">{r.spent}</TableCell>

                <TableCell className="w-8 text-right">
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ───── pagination footer (sticks to bottom) ───── */}
      <div className="border-t border-[#e6effa] py-3 px-4 bg-[#fafdff]">
        <Pagination>
          <PaginationContent className="justify-end space-x-1">
            <PaginationItem><PaginationLink isActive>1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink>2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink>…</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink last>20</PaginationLink></PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* helper for sortable column headers                                       */
/* ------------------------------------------------------------------------ */
function SortableHead({ label, numeric = false }:{ label:string; numeric?:boolean }) {
  return (
    <TableHead className={`${numeric ? 'text-right' : ''} select-none`}>
      <div className="inline-flex items-center gap-0.5 cursor-pointer">
        {label}
        <div className="flex flex-col ml-0.5 leading-none">
          <ChevronUp   className="w-3 h-3 text-[#b4c6dd]" />
          <ChevronDown className="w-3 h-3 -mt-1 text-[#b4c6dd]" />
        </div>
      </div>
    </TableHead>
  );
}
