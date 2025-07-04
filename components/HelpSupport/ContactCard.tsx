'use client';

import { Mail, MessageSquare, Phone } from 'lucide-react';
import {
  Card, CardContent, CardHeader, CardTitle,
} from '@/components/ui/card';

/* -------------------------------------------------
 * “Talk to a human” quick-contact box
 * ------------------------------------------------*/
export default function ContactCard() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Still stuck?</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 text-sm">
        <p className="">Our 24 / 7 support crew replies in&nbsp;&lt; 5 minutes.</p>

        <a
          href="tel:+27693533693"
          className="flex items-center gap-2 font-medium text-[#0056B6] hover:underline"
        >
          <Phone size={18} /> +27&nbsp;69&nbsp;353&nbsp;3693
        </a>

        <a
          href="mailto:support@eleganzabank.com"
          className="flex items-center gap-2 font-medium text-[#0056B6] hover:underline"
        >
          <Mail size={18} /> support@eleganzabank.com
        </a>

        <a
          href="https://wa.me/27693533693?text=Hi%20Eleganza%20support"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-medium text-[#25D366] hover:underline"
        >
          <MessageSquare size={18} /> WhatsApp&nbsp;+27&nbsp;69&nbsp;353&nbsp;3693
        </a>
      </CardContent>
    </Card>
  );
}
