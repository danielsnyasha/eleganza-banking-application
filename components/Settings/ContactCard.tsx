'use client';

import { Mail, MessageSquare } from 'lucide-react';
import {
  Card, CardContent, CardHeader, CardTitle,
} from '@/components/ui/card';

/* ----------------------------------------------
 * “Need more help?” quick-contact box
 * -------------------------------------------- */
export default function ContactCard() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Need more details?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Our settings desk is happy to clarify anything not covered above.
        </p>

        <a
          href="mailto:settings@eleganzabank.com"
          className="flex items-center gap-2 text-[#0056B6] font-medium hover:underline"
        >
          <Mail size={18} /> settings@eleganzabank.com
        </a>

        <a
          href="https://wa.me/27693533693?text=Settings%20question"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[#25D366] font-medium hover:underline"
        >
          <MessageSquare size={18} /> WhatsApp&nbsp;+27&nbsp;69&nbsp;353&nbsp;3693
        </a>
      </CardContent>
    </Card>
  );
}
