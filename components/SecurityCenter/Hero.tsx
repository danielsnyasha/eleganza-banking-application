'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

/* -------------------------------------------
 * Large banner with a subtle parallax effect
 * ----------------------------------------- */
export default function Hero() {
  return (
    <section className="relative h-60 md:h-72 w-full overflow-hidden rounded-xl shadow">
      {/* background */}
      <Image
        src="https://plus.unsplash.com/premium_photo-1675242132223-9aa7268fbbc7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE3fHxzZWN1cml0eSUyMGJhbmt8ZW58MHx8MHx8fDA%3D"
        alt="Security Center banner"
        fill
        priority
        className={cn(
          'object-cover object-center',
          'scale-110 md:scale-100 transition-transform duration-[60000] will-change-transform',
        )}
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-transparent" />

      {/* copy */}
      <div className="relative z-10 h-full flex flex-col justify-center pl-6 md:pl-10 text-white">
        <h1 className="text-2xl md:text-3xl font-bold">Security Center</h1>
        <p className="max-w-md text-sm md:text-base opacity-90">
          Get help fast, report suspicious activity, and learn how we keep your
          money safe — right from your phone.
        </p>
      </div>
    </section>
  );
}
