'use client';

import {
  Dialog,  DialogTrigger, DialogContent,
  DialogHeader, DialogTitle, DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input }  from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function ConfirmPinDialog(
  { children }: { children: React.ReactNode }
) {
  const [open, setOpen] = useState(false);
  const [pin,  setPin]  = useState('');
  const [ok,   setOk]   = useState(false);

  function confirm() {
    if (pin === '1234') setOk(true);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-md">
        {!ok ? (
          <>
            <DialogHeader>
              <DialogTitle>Enter your PIN</DialogTitle>
              <DialogDescription>Confirm this transfer.</DialogDescription>
            </DialogHeader>

            <Input
              type="password"
              maxLength={4}
              value={pin}
              onChange={e=>setPin(e.target.value.replace(/\D/g,''))}
              className="text-center tracking-widest text-2xl font-medium"
            />

            <DialogFooter>
              <Button onClick={confirm} disabled={pin.length!==4}>Confirm</Button>
            </DialogFooter>
          </>
        ) : (
          <div className="py-6 text-center space-y-4">
            <h3 className="text-xl font-semibold text-[#21c87a]">Success!</h3>
            <p className="text-sm text-muted-foreground">Transfer scheduled.</p>
            <Button onClick={()=>setOpen(false)}>Done</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
