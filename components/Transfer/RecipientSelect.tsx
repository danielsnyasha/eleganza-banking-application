'use client';

import {
  Popover, PopoverTrigger, PopoverContent,
} from '@/components/ui/popover';
import {
  Command, CommandInput, CommandGroup, CommandItem,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { User }   from 'lucide-react';
import { useState } from 'react';

const recipients = [
  { id:'1', name:'Nyasha Musanu',   detail:'ZWL • +263-713-123-456' },
  { id:'2', name:'Devon Lane',      detail:'USD • devon@mail.com'   },
  { id:'3', name:'Arlene McCoy',    detail:'EUR • arlene@bank.eu'   },
];

export default function RecipientSelect() {
  const [open, setOpen]  = useState(false);
  const [pick, setPick]  = useState<typeof recipients[0] | null>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-start w-full">
          {pick ? pick.name : <span className="text-muted-foreground">Choose recipient</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-64">
        <Command>
          <CommandInput placeholder="Search …" />
          <CommandGroup>
            {recipients.map(r=>(
              <CommandItem key={r.id} onSelect={()=>{
                setPick(r); setOpen(false);
              }}>
                <User className="w-4 h-4 mr-2 opacity-50" />
                <div>
                  <p className="font-medium">{r.name}</p>
                  <p className="text-xs opacity-70">{r.detail}</p>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
