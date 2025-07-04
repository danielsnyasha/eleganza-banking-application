'use client';

import { useState } from 'react';
import { z } from 'zod';
import { uploadToCloudinary } from '@/lib/cloudinary';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'react-toastify';

const schema = z.object({
  firstName: z.string().min(2),
  lastName : z.string().min(2),
  email    : z.string().email(),
  role     : z.string(),
  title    : z.string(),
});

export default function AddMemberDialog({ onSuccess }:{ onSuccess:()=>void }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File|undefined>();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form  = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;

    const check = schema.safeParse(form);
    if (!check.success) {
      toast.error(check.error.issues[0].message); return;
    }

    setBusy(true);
    try {
      const avatarUrl = avatarFile ? await uploadToCloudinary(avatarFile) : '';

      const res = await fetch('/api/admin-portal/team/members', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({ ...check.data, avatar: avatarUrl }),
      });
      if (!res.ok) throw new Error('failed');

      toast.success('Member added');
      setOpen(false);
      onSuccess();                      // refetch grid
    } catch { toast.error('Could not add member'); }
    finally { setBusy(false); }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Add member</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader><DialogTitle>Add team member</DialogTitle></DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="firstName" placeholder="First name" required />
          <Input name="lastName"  placeholder="Last name"  required />
          <Input name="email"     placeholder="Email"      type="email" required />

          <Select name="role" defaultValue="MANAGER">
            <SelectTrigger><SelectValue placeholder="Role" /></SelectTrigger>
            <SelectContent>
              {['ADMIN','MANAGER','TELLER','SUPPORT','COMPLIANCE','DEVELOPER','ANALYST']
                .map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
            </SelectContent>
          </Select>

          <Input name="title" placeholder="Job title / designation" required />

          <Input
            type="file"
            accept="image/*"
            onChange={(e)=> setAvatarFile(e.target.files?.[0])}
          />

          <Button className="w-full" disabled={busy}>
            {busy ? 'Saving…' : 'Save'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
