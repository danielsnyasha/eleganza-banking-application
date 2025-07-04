'use client';

import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

/* -------------------------------------------------
 * FAQ-style dropdown.  Each item may include an
 * illustrative image + helpful text.
 * ------------------------------------------------*/
interface QA {
  id: string;
  q:  string;
  a:  string;
  img?: string;       // optional inline illustration
}

const topics: QA[] = [
  {
    id : 'forgot-pin',
    q  : 'I forgot my app PIN. How do I reset it?',
    a  : 'Open the login screen ▸ tap “Forgot PIN?” ▸ follow the secure reset steps. '
        + 'You’ll confirm via email/SMS and pick a new 4-digit PIN.',
    img: 'https://cdn.pixabay.com/photo/2022/11/28/19/13/bridge-7622951_640.jpg',
  },
  {
    id : 'card-block',
    q  : 'How do I freeze a lost debit card?',
    a  : 'Go to Cards ▸ select the card ▸ tap “Freeze card”.  This blocks all new transactions. '
        + 'If the card is found you can un-freeze instantly.',
  },
  {
    id : 'daily-limit',
    q  : 'Can I raise my daily transfer limit?',
    a  : 'Yes.  Navigate to Settings ▸ Cards & Spending Limits ▸ choose your desired ceiling. '
        + 'High increases may trigger an extra identity check.',
  },
  {
    id : 'statement',
    q  : 'Where can I download statements?',
    a  : 'Accounts ▸ choose account ▸ Statements ▸ pick month or custom range ▸ Export as PDF or CSV.',
  },
  {
    id : 'closed-account',
    q  : 'I want to close my account — what’s the process?',
    a  : 'We’re sorry to see you go!  Email closures@eleganzabank.com with your account number. '
        + 'A specialist will guide you through final settlement.',
  },
];

export default function HelpAccordion() {
  return (
    <Card className="p-0 shadow-md">
      <Accordion
        type="single"
        collapsible
        className="divide-y divide-muted-foreground/20"
      >
        {topics.map(({ id, q, a, img }) => (
          <AccordionItem key={id} value={id}>
            <AccordionTrigger className="px-5 py-4 text-left text-sm md:text-base">
              {q}
            </AccordionTrigger>

            <AccordionContent className="px-5 pb-6 space-y-4 text-sm text-muted-foreground">
              {a}
              {img && (
                <div className="relative w-full h-40 rounded-md overflow-hidden shadow">
                  <Image
                    src={img}
                    alt=""
                    fill
                    className="object-cover object-center"
                  />
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}
