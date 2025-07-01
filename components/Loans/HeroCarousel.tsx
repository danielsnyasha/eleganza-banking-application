/* components/Loans/HeroCarousel.tsx
   – auto-sliding hero, click-to-gallery (shadcn / Eleganza palette)     */
   'use client';

   import { useState, useEffect } from 'react';
   import Image                   from 'next/image';
   import GalleryModal            from '@/components/Loans/GalleryModal';   // ← adjust if reused
   import { cn }                  from '@/lib/utils';
   
   interface Props {
     /** array of absolute URLs (Cloudinary, S3, etc.).  
         If empty, show the placeholder. */
     images: string[];
     /** optional className override */
     className?: string;
   }
   
   export default function HeroCarousel({ images, className }: Props) {
     const srcs = images.length ? images : ['/placeholder.jpg'];
   
     const [idx,   setIdx]   = useState(0);
     const [open,  setOpen]  = useState(false);
   
     /* rotate every 4 s --------------------------------------------------- */
     useEffect(() => {
       const t = setInterval(
         () => setIdx((i) => (i + 1) % srcs.length),
         4_000,
       );
       return () => clearInterval(t);
     }, [srcs.length]);
   
     return (
       <>
         <div
           className={cn(
             'relative h-[260px] sm:h-[340px] rounded-xl overflow-hidden shadow group cursor-pointer',
             className,
           )}
           onClick={() => setOpen(true)}
         >
           <Image
             key={idx}                          /* smooth fade on change   */
             src={srcs[idx]}
             alt=""
             fill
             sizes="(max-width: 768px) 100vw, 50vw"
             className="object-cover transition-opacity duration-500 opacity-0 group-hover:scale-105"
             onLoadingComplete={(img) => img.classList.remove('opacity-0')}
             priority
           />
   
           {/* Eleganza blue overlay instead of black -------------------- */}
           <div className="absolute inset-0 bg-gradient-to-t from-[#0056B6]/60 to-transparent pointer-events-none" />
         </div>
   
         {srcs.length > 1 && (
           <GalleryModal images={srcs} open={open} onOpenChange={setOpen} />
         )}
       </>
     );
   }
   