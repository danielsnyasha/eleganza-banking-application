/* components/Loans/GalleryModal.tsx
   – fullscreen gallery with arrows, caption & ESC-close                */
   'use client';

   import { useState } from 'react';
   import Image        from 'next/image';
   import { ChevronLeft, ChevronRight, X } from 'lucide-react';
   
   import {
     Dialog,
     DialogContent,
     DialogClose,
   } from '@/components/ui/dialog';
   
   interface Props {
     images: string[];
     /** controlled open flag from the parent component */
     open: boolean;
     /** setter the parent passes down:  setOpen(boolean) */
     onOpenChange: (open: boolean) => void;
   }
   
   export default function GalleryModal({ images, open, onOpenChange }: Props) {
     const [idx, setIdx] = useState(0);
   
     const next = () => setIdx((i) => (i + 1) % images.length);
     const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
   
     return (
       <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent
           className="border-none bg-transparent p-0 max-w-4xl w-full"
           /* keep the current idx when we close via ESC/button */
           onEscapeKeyDown={(e) => e.preventDefault()}
           onPointerDownOutside={(e) => e.preventDefault()}
         >
           <div className="relative">
             <Image
               src={images[idx]}
               alt={`Slide ${idx + 1}`}
               width={960}
               height={540}
               className="w-full h-auto rounded-xl object-cover"
               priority
             />
   
             {/* navigation arrows */}
             {images.length > 1 && (
               <>
                 <button
                   onClick={prev}
                   className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 bg-white/40 backdrop-blur hover:bg-white/70 transition"
                   aria-label="Previous"
                 >
                   <ChevronLeft />
                 </button>
                 <button
                   onClick={next}
                   className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 bg-white/40 backdrop-blur hover:bg-white/70 transition"
                   aria-label="Next"
                 >
                   <ChevronRight />
                 </button>
               </>
             )}
   
             {/* close button */}
             <DialogClose asChild>
               <button
                 className="absolute top-2 right-2 rounded-full p-2 bg-white/40 backdrop-blur hover:bg-white/70 transition"
                 aria-label="Close"
               >
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
   