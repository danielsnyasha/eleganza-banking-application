'use client';

import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';

/* ----------------------------------------------
 * A single accordion holding helpful explanations
 * -------------------------------------------- */
const items: { id: string; title: string; body: string }[] = [
  {
    id   : 'profile',
    title: 'Profile & Personal Info',
    body : 'Update names, address, phone numbers or upload supporting ID documents.',
  },
  {
    id   : 'security',
    title: 'Security & Login',
    body : 'Change your password, enable Two-Factor Authentication, manage trusted devices.',
  },
  {
    id   : 'notifications',
    title: 'Notifications & Alerts',
    body : 'Choose push, email or SMS for balance changes, large transactions and more.',
  },
  {
    id   : 'cards',
    title: 'Cards & Spending Limits',
    body : 'Freeze or unfreeze cards, set daily spend limits and ATM withdrawal ceilings.',
  },
  {
    id   : 'linked',
    title: 'Linked External Accounts',
    body : 'Add or remove external bank accounts and wallets used for transfers.',
  },
  {
    id   : 'privacy',
    title: 'Data & Privacy',
    body : 'Download a copy of your data or ask us to delete certain information.',
  },
];

export default function SettingsAccordion() {
  return (
    <Card className="p-0 shadow-md">
      <Accordion
        type="single"
        collapsible
        className="divide-y divide-muted-foreground/20"
      >
        {items.map(({ id, title, body }) => (
          <AccordionItem key={id} value={id}>
            <AccordionTrigger className="px-5 py-4 text-left text-sm md:text-base">
              {title}
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-4 text-sm text-muted-foreground">
              {body}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}
