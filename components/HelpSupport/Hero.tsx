'use client';

import Image from 'next/image';

/* -------------------------------------------------
 * Full-width banner with a subtle “customer-care” illustration
 * ------------------------------------------------*/
export default function HelpSupportHero() {
  return (
    <section className="relative h-56 md:h-64 w-full overflow-hidden rounded-xl shadow">
      <Image
        src="https://cdn.pixabay.com/photo/2024/03/30/05/08/ai-generated-8664076_640.png"
        alt="Help & Support banner"
        fill
        priority
        className="object-cover object-center scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0056B6]/70 via-[#0056B6]/40 to-transparent" />

      <div className="relative z-10 h-full flex flex-col justify-center pl-6 md:pl-10 text-white">
        <h1 className="text-2xl md:text-3xl font-bold">Help&nbsp;&amp;&nbsp;Support</h1>
        <p className="max-w-md text-sm md:text-base opacity-90">
          Got questions? Find quick answers or reach our 24 / 7 team in one tap.
        </p>
      </div>
    </section>
  );
}
