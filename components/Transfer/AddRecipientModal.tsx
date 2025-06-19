'use client';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input }  from '@/components/ui/input';
import { Label }  from '@/components/ui/label';
import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem,
} from '@/components/ui/select';
import { useState }          from 'react';
import { useAddRecipient }   from '@/hooks/useRecipients';
import * as z                from 'zod';
import type { Recipient }    from './RecipientSelect';   /* ✅ for typing */

const schema = z.object({
  alias        : z.string().min(2),
  accountName  : z.string().min(2),
  accountNumber: z.string().min(3),
  currency     : z.enum([
    'USD','EUR','GBP','ZAR','ZWL','CAD','AUD','CHF','CNY','JPY',
    'NGN','GHS','INR','KES',
  ]),
  bankName : z.string().min(3),
  country  : z.string().min(2),
  swiftCode: z.string().min(4).optional(),
});
type FormState = z.infer<typeof schema>;

export default function AddRecipientModal({
  open,
  setOpen,
  onCreated,                       /* ✅ new callback prop */
}: {
  open:      boolean;
  setOpen:   (b: boolean) => void;
  onCreated?: (r: Recipient) => void;
}) {
  const addMut = useAddRecipient();
  const [form, setForm] = useState<FormState>({
    alias:'', accountName:'', accountNumber:'',
    currency:'USD', bankName:'', country:'US', swiftCode:'',
  });
  const [err, setErr] = useState('');

  async function save() {
    try {
      const payload = schema.parse(form);
      const newRec  = await addMut.mutateAsync(payload);    /* ⬅ returns new recipient */
      onCreated?.(newRec as unknown as Recipient);          /* notify parent */
      setOpen(false);
      setForm({ ...form, alias:'', accountName:'', accountNumber:'', bankName:'', swiftCode:'' });
      setErr('');
    } catch (e: any) {
      setErr(e.message ?? 'Error');
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add recipient</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          {/* --- form fields (unchanged) --- */}
          {/* Alias */}
          <div className="grid gap-2">
            <Label>Alias</Label>
            <Input
              value={form.alias}
              onChange={e=>setForm({ ...form, alias:e.target.value })}
            />
          </div>
          {/* Account name */}
          <div className="grid gap-2">
            <Label>Account name</Label>
            <Input
              value={form.accountName}
              onChange={e=>setForm({ ...form, accountName:e.target.value })}
            />
          </div>
          {/* Account number */}
          <div className="grid gap-2">
            <Label>Account number</Label>
            <Input
              value={form.accountNumber}
              onChange={e=>setForm({ ...form, accountNumber:e.target.value })}
            />
          </div>
          {/* Currency */}
          <div className="grid gap-2">
            <Label>Currency</Label>
            <Select
              value={form.currency}
              onValueChange={v=>setForm({ ...form, currency:v as any })}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {schema.shape.currency.options.map(c=>(
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Bank name */}
          <div className="grid gap-2">
            <Label>Bank name</Label>
            <Input
              value={form.bankName}
              onChange={e=>setForm({ ...form, bankName:e.target.value })}
            />
          </div>
          {/* Country */}
          <div className="grid gap-2">
            <Label>Country (ISO-2)</Label>
            <Input
              maxLength={2}
              value={form.country}
              onChange={e=>setForm({ ...form, country:e.target.value.toUpperCase() })}
            />
          </div>
          {/* SWIFT */}
          <div className="grid gap-2">
            <Label>SWIFT / routing</Label>
            <Input
              value={form.swiftCode ?? ''}
              onChange={e=>setForm({ ...form, swiftCode:e.target.value })}
            />
          </div>

          {err && <p className="text-sm text-red-600">{err}</p>}
        </div>

        <DialogFooter>
          <Button onClick={save} disabled={addMut.isPending}>
            {addMut.isPending ? 'Saving…' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
