'use client';

import { useState } from 'react';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { Button } from '@/components/ui/button';
import { Input }  from '@/components/ui/input';
import { toast }  from 'react-toastify';

export default function TeamMemberForm() {
  const [avatar, setAvatar]   = useState<File>();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    let avatarUrl: string | undefined;

    if (avatar) {
      avatarUrl = await uploadToCloudinary(avatar);
    }

    const res = await fetch('/api/admin-portal/team/members', {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({
        firstName : fd.get('firstName'),
        lastName  : fd.get('lastName'),
        email     : fd.get('email'),
        phone     : fd.get('phone'),
        role      : fd.get('role'),
        title     : fd.get('title'),
        avatarUrl,
      }),
    });

    setLoading(false);
    res.ok ? toast.success('Team member added!') : toast.error('Failed.');
    if (res.ok) e.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="firstName" placeholder="First name" required />
      <Input name="lastName"  placeholder="Last name"  required />
      <Input name="email"     placeholder="Email"      type="email" required />
      <Input name="phone"     placeholder="Phone" />
      <Input name="title"     placeholder="Job title (e.g. CFO)" />
      <select name="role" className="w-full border rounded p-2">
        {['ADMIN','MANAGER','TELLER','SUPPORT','COMPLIANCE','DEVELOPER','ANALYST']
          .map(r => <option key={r}>{r}</option>)}
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setAvatar(e.target.files?.[0])}
        className="block w-full"
      />

      <Button disabled={loading} className="w-full bg-[#0056B6] text-white">
        {loading ? 'Saving…' : 'Save'}
      </Button>
    </form>
  );
}
