'use client';

import Image from 'next/image';

/* --------------------------------------------------
 * Gradient banner with a “work-in-progress” illustration
 * -------------------------------------------------*/
export default function ComingSoonHero() {
  return (
    <section className="relative h-56 md:h-64 w-full overflow-hidden rounded-xl shadow">
      <Image
        src="https://cdn.pixabay.com/photo/2015/12/08/08/44/banner-1082660_640.png"
        alt="Coming soon banner"
        fill
        priority
        className="object-cover object-center scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0056B6]/80 via-[#0056B6]/50 to-transparent" />

      <div className="relative z-10 h-full flex flex-col justify-center pl-6 md:pl-10 text-white">
        <h1 className="text-2xl md:text-3xl font-bold">What’s cooking?</h1>
        <p className="max-w-md text-sm md:text-base opacity-90">
          Peek at the next wave of Eleganza features 😉 all landing soon on your app.
        </p>
      </div>
    </section>
  );
}
