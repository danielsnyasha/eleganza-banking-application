/* app/admin-portal/page.tsx */
'use client';

import { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';

export default function AdminPortalPage() {
  const [pwd, setPwd] = useState('');
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (pwd === 'administrator') {
      setAuthed(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  }

  /* ---------- LOGIN SCREEN ---------- */
  if (!authed) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-4 px-4">
        <h1 className="text-2xl font-semibold">Admin Portal</h1>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="password"
            placeholder="Enter admin password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            className="w-64"
          />
          <Button type="submit">Enter</Button>
        </form>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }

  /* ---------- MAIN ADMIN DASH ---------- */
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total Bank Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">ZAR 12 345 678</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Today’s Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">1 243</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>FX Deals Executed</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">87</p>
        </CardContent>
      </Card>
    </div>
  );
}
