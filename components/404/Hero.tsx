'use client';

import Image from 'next/image';

/* ------------------------------------------------------------------
 * Gradient banner + large “404” headline
 * ----------------------------------------------------------------*/
export default function NotFoundHero() {
  return (
    <section className="relative h-56 md:h-64 w-full overflow-hidden rounded-xl shadow">
      <Image
        src="https://cdn.pixabay.com/photo/2016/11/09/07/09/babu-1810147_640.jpg"
        alt="404 hero"
        fill
        priority
        className="object-cover object-center scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#b6004d]/80 via-[#0056B6]/10 to-transparent" />

      <div className="relative z-10 h-full flex flex-col justify-center pl-6 md:pl-10 text-white">
        <h1 className="text-3xl md:text-4xl font-extrabold drop-shadow">
          404 &amp; Common Errors
        </h1>
        <p className="max-w-lg text-sm md:text-base opacity-90">
          Learn what these messages mean and how to fix them🥵;before calling support.
        </p>
      </div>
    </section>
  );
}
