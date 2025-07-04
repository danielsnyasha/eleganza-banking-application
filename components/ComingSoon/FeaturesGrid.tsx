'use client';

import Image from 'next/image';
import {
  Card, CardContent, CardHeader, CardTitle,
} from '@/components/ui/card';

interface Feature {
  id : string;
  name: string;
  eta : string;
  desc: string;
  img : string;
}

/* 12 future goodies */
const features: Feature[] = [
  {
    id  : 'ai-insights',
    name: 'AI Spending Insights',
    eta : 'Q3 2025',
    desc: 'Personalised nudges that predict upcoming bills and flag unusual spends in real-time.',
    img : 'https://images.unsplash.com/photo-1562813733-b31f71025d54?auto=format&fit=crop&w=800&q=80',
  },
  {
    id  : 'voice-banking',
    name: 'Voice Banking',
    eta : 'Q4 2025',
    desc: 'Transfer, pay and check balances hands-free with secure voice biometrics.',
    img : 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=800&q=80',
  },
  {
    id  : 'crypto-wallet',
    name: 'Crypto Wallet',
    eta : 'Q1 2026',
    desc: 'Buy, hold and swap BTC, ETH & more straight from your Eleganza dashboard.',
    img : 'https://cdn.pixabay.com/photo/2018/05/16/20/29/wallet-3406959_640.jpg',
  },
  {
    id  : 'bnpl',
    name: 'Buy-Now-Pay-Later',
    eta : 'Q3 2025',
    desc: 'Split big purchases into 4 interest-free chunks, instantly at checkout.',
    img : 'https://cdn.pixabay.com/photo/2016/08/10/15/01/credit-cards-1583534_640.jpg',
  },
  {
    id  : 'family-accounts',
    name: 'Family Accounts',
    eta : 'Q2 2025',
    desc: 'Share budgets, set kids’ spending limits and track allowances in one view.',
    img : 'https://cdn.pixabay.com/photo/2021/12/22/06/38/family-6886803_1280.jpg',
  },
  {
    id  : 'goal-invest',
    name: 'Goal-based Investing',
    eta : 'Q3 2025',
    desc: 'Tell us the goal, we’ll build the portfolio. Automated deposits included.',
    img : 'https://cdn.pixabay.com/photo/2018/02/16/19/17/crowdfunding-3158320_640.png',
  },
  {
    id  : 'carbon-tracker',
    name: 'Carbon Footprint Tracker',
    eta : 'Q4 2025',
    desc: 'See the CO₂ impact of every swipe &dash; and offset it in one tap.',
    img : 'https://cdn.pixabay.com/photo/2012/03/02/12/36/footprints-21177_640.jpg',
  },
  {
    id  : 'bill-negotiator',
    name: 'Smart Bill Negotiator',
    eta : 'Q1 2026',
    desc: 'Our A.I. calls your telco &amp; insurer to haggle better rates while you chill.',
    img : 'https://cdn.pixabay.com/photo/2023/05/28/10/35/money-8023328_640.png',
  },
  {
    id  : 'travel-insurance',
    name: 'Embedded Travel Insurance',
    eta : 'Q3 2025',
    desc: 'Book flights with Eleganza &😁; get instant, tailored cover included.',
    img : 'https://cdn.pixabay.com/photo/2015/08/20/13/30/frogs-897387_640.jpg',
  },
  {
    id  : 'tax-export',
    name: 'Auto-categorised Tax Export',
    eta : 'Q2 2025',
    desc: 'Download a ready-to-file tax CSV, already mapped to SARS codes.',
    img : 'https://cdn.pixabay.com/photo/2017/01/20/22/44/earth-1996138_640.jpg',
  },
  {
    id  : 'card-toggle',
    name: 'One-tap Card On/Off',
    eta : 'Q1 2025',
    desc: 'Bring the “panic switch” to your lock-screen widget for instant peace of mind.',
    img : 'https://cdn.pixabay.com/photo/2015/11/21/18/07/apple-juice-1055331_640.jpg',
  },
  {
    id  : 'biometric-2fa',
    name: 'Biometric 2-Factor Approvals',
    eta : 'Q2 2025',
    desc: 'Approve high-value transfers with Face-ID or Touch-ID instead of OTPs.',
    img : 'https://cdn.pixabay.com/photo/2023/11/06/09/28/ai-generated-8369219_640.jpg',
  },
];

/* --------------------------------------------------
 * Responsive 3-up grid (1-col mobile, 2-col sm, 3-col md+)
 * -------------------------------------------------*/
export default function FeaturesGrid() {
  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((f) => (
        <Card key={f.id} className="overflow-hidden shadow hover:shadow-lg transition">
          {/* feature image */}
          <div className="relative h-40">
            <Image
              src={f.img}
              alt={f.name}
              fill
              sizes="(max-width:768px) 100vw, 33vw"
              className="object-cover object-center"
            />
          </div>

          {/* body */}
          <CardHeader className="pb-2">
            <CardTitle className="text-[#02152b] text-lg">{f.name}</CardTitle>
          </CardHeader>

          <CardContent className="pb-6 space-y-2">
            <p className="text-sm text-muted-foreground">{f.desc}</p>
            <p className="text-xs font-medium text-[#0056B6]">ETA&nbsp;{f.eta}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
