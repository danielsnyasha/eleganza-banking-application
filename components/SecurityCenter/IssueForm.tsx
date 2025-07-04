'use client';

import { useState } from 'react';
import {
  Card, CardHeader, CardTitle, CardContent, CardFooter,
} from '@/components/ui/card';
import { Button }  from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { toast } from 'react-toastify';
import { ShieldAlert } from 'lucide-react';

const issueTypes = [
  'Unauthorised transaction',
  'Phishing / scam attempt',
  'Card lost or stolen',
  'Suspected account takeover',
  'Other security concern',
];

/* ------------------------------------------- */
export default function IssueForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    // ⚠️ placeholder — replace with real endpoint later
    try {
      setLoading(true);
      await new Promise(r => setTimeout(r, 1200));
      toast.success('Report submitted. Our security team will contact you.');
      e.currentTarget.reset();
    } catch {
      toast.error('Could not submit report');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center gap-2">
        <ShieldAlert className="text-[#0056B6]" />
        <CardTitle className="text-xl">Report an Issue</CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <Select name="issue">
            <SelectTrigger>
              <SelectValue placeholder="Select issue type" />
            </SelectTrigger>
            <SelectContent>
              {issueTypes.map(t => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            name="account"
            placeholder="Last 4 digits of account/card (optional)"
          />

          <Textarea
            name="details"
            placeholder="Describe what happened…"
            required
            className="resize-none"
            rows={4}
          />
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#0056B6] to-[#0091FF] text-white"
          >
            {loading ? 'Submitting…' : 'Submit Report'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
