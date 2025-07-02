'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import HeroCarousel from '@/components/Investments/HeroCarousel';

export default function GalleryModal({ images }: { images: string[] }) {
  const [open, setOpen] = useState(false);
  const srcs = images.length ? images : ['/placeholder.jpg'];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="cursor-zoom-in">
          <HeroCarousel images={srcs} />
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-5xl p-0 bg-transparent border-none shadow-none">
        <HeroCarousel images={srcs} autoplay={false} />
      </DialogContent>
    </Dialog>
  );
}
