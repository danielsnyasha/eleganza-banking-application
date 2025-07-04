'use client';

import { Mail, MessageCircle } from 'lucide-react';
import {
  Card, CardContent, CardHeader, CardTitle,
} from '@/components/ui/card';

/* ------------------------------------------- */
export default function ContactCard() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Need help right now?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Reach our 24/7 security desk via WhatsApp or email.
        </p>

        <a
          href="https://wa.me/27693533693"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[#25D366] font-medium hover:underline"
        >
          <MessageCircle size={18} /> +27&nbsp;69&nbsp;353&nbsp;3693
        </a>

        <a
          href="mailto:security@eleganzabank.com"
          className="flex items-center gap-2 text-[#0056B6] font-medium hover:underline"
        >
          <Mail size={18} /> security@eleganzabank.com
        </a>
      </CardContent>
    </Card>
  );
}
