'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import GalleryModal from './GalleryModal';

export default function HeroCarousel({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);

  // auto-slide every 4 s
  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % images.length),
      4000
    );
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <>
      <div
        className="relative h-[260px] sm:h-[340px] rounded-xl overflow-hidden shadow group cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Image
          key={idx}
          src={images[idx]}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
        {/* subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>

      {images.length > 1 && (
        <GalleryModal
          images={images}
          open={open}
          onOpenChange={setOpen}
        />
      )}
    </>
  );
}
