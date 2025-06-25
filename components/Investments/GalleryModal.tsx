'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from '@/components/ui/dialog';

export default function GalleryModal({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);

  const next = () => setIdx((i) => (i + 1) % images.length);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);

  return (
    <Dialog>
      {/* ── trigger covers the hero image ──────────────────────── */}
      <DialogTrigger asChild>
        <button type="button" className="absolute inset-0">
          <span className="sr-only">Open gallery</span>
        </button>
      </DialogTrigger>

      {/* ── modal content ─────────────────────────────────────── */}
      <DialogContent
        className="w-full max-w-4xl border-none bg-transparent p-0"
        onEscapeKeyDown={(e) => e.preventDefault()} // keep idx when closed
      >
        <div className="relative">
          <Image
            src={images[idx]}
            alt={`Image ${idx + 1}`}
            width={960}
            height={540}
            className="w-full h-auto rounded-xl object-cover"
          />

          {/* nav arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 bg-white/30 backdrop-blur"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 bg-white/30 backdrop-blur"
              >
                <ChevronRight />
              </button>
            </>
          )}

          {/* close  */}
          <DialogClose asChild>
            <button className="absolute top-2 right-2 rounded-full p-2 bg-white/30 backdrop-blur">
              <X />
            </button>
          </DialogClose>
        </div>

        {/* caption */}
        <p className="mt-4 text-center text-sm text-white">
          {idx + 1} / {images.length}
        </p>
      </DialogContent>
    </Dialog>
  );
}
