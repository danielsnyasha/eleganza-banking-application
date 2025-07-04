'use client';

import Image from 'next/image';
import {
  Card, CardContent, CardHeader, CardTitle,
} from '@/components/ui/card';

interface BankError {
  code: string;
  title: string;
  cause: string;
  fix  : string;
  img  : string;
}

/* ---------- six frequent issues ---------- */
const issues: BankError[] = [
  {
    code : '404',
    title: 'Page Not Found',
    cause: 'The link is broken or the page moved.',
    fix  : 'Double-check the URL or head back to Dashboard.',
    img  : 'https://images.unsplash.com/photo-1544717301-9cdcb1f5940f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YW5ncnl8ZW58MHx8MHx8fDA%3D',
  },
  {
    code : '401',
    title: 'Unauthorized',
    cause: 'Your session expired or you’re not logged in.',
    fix  : 'Sign in again and retry the action.',
    img  : 'https://plus.unsplash.com/premium_photo-1697474429751-abb0a7057980?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGFuZ3J5fGVufDB8fDB8fHww',
  },
  {
    code : '403',
    title: 'Forbidden',
    cause: 'You tried to access a resource you don’t own.',
    fix  : 'Switch to the correct account or request access.',
    img  : 'https://cdn.pixabay.com/photo/2020/07/31/17/48/angry-5453674_640.jpg',
  },
  {
    code : '408',
    title: 'Request Timeout',
    cause: 'Your network dropped or the server took too long.',
    fix  : 'Refresh on a stable connection and try again.',
    img  : 'https://plus.unsplash.com/premium_photo-1661964426199-181e5ebbdba5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTd8fGFuZ3J5fGVufDB8fDB8fHww',
  },
  {
    code : '429',
    title: 'Too Many Requests',
    cause: 'You hit rate-limits (e.g. login / OTP spam).',
    fix  : 'Wait a minute, then proceed slowly.',
    img  : 'https://plus.unsplash.com/premium_photo-1697398289867-ad4e8de16b66?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fGFuZ3J5fGVufDB8fDB8fHww',
  },
  {
    code : '500',
    title: 'Internal Server Error',
    cause: 'Something went wrong on our side.',
    fix  : 'Give us a moment—then refresh. If it persists, chat with support.',
    img  : 'https://images.unsplash.com/photo-1713942590314-69ab88b7d9f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fGFuZ3J5fGVufDB8fDB8fHww',
  },
];

/* ------------------------------------------------------------------
 * Responsive grid (1-col mobile → 3-col desktop)
 * ----------------------------------------------------------------*/
export default function ErrorGrid() {
  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {issues.map((e) => (
        <Card
          key={e.code}
          className="bg-red-50 overflow-hidden shadow hover:shadow-xl transition transform hover:-translate-y-1"
        >
          {/* header image */}
          <div className="relative h-40">
            <Image
              src={e.img}
              alt={e.title}
              fill
              sizes="(max-width:768px) 100vw, 33vw"
              className="object-cover object-center"
            />
          </div>

          {/* text body */}
          <CardHeader className="pb-2 space-y-0">
            <CardTitle className="text-lg text-[#02152b] flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#0056B6] text-white text-sm">{e.code}</span>
              {e.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="pb-6 space-y-2">
            <p className="text-sm text-muted-foreground">{e.cause}</p>
            <p className="text-xs font-medium text-[#b6004d]">How to resolve: {e.fix}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
