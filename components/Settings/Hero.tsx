'use client';

import Image from 'next/image';

/* -------------------------------------------------
 * Banner with an abstract “settings” illustration
 * ------------------------------------------------*/
export default function SettingsHero() {
  return (
    <section className="relative h-56 md:h-64 w-full overflow-hidden rounded-xl shadow">
      <Image
        src="https://cdn.pixabay.com/photo/2016/10/05/08/45/background-1716222_640.jpg"
        alt="Settings banner"
        fill
        priority
        className="object-cover object-center scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-transparent" />

      <div className="relative z-10 h-full flex flex-col justify-center pl-6 md:pl-10 text-white">
        <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
        <p className="max-w-md text-sm md:text-base opacity-90">
          Personalise your Eleganza experience. Manage profiles, cards, limits,
          privacy — all from one place.
        </p>
      </div>
    </section>
  );
}
