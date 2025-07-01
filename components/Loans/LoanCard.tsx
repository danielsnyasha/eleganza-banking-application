/* components/Loans/LoanCard.tsx
   – identical look-&-feel to InvestmentCard                              */
   'use client';

   import Image from 'next/image';
   import Link  from 'next/link';
   import { Button } from '@/components/ui/button';
   import type { LoanProductDTO } from '@/types/loan';
   
   export default function LoanCard({ loan }: { loan: LoanProductDTO }) {
     return (
       <div className="group rounded-xl border bg-[#fafdff] overflow-hidden shadow-sm
                       hover:shadow-lg transition flex flex-col">
         {/* hero image -------------------------------------------------- */}
         <div className="relative h-40 w-full overflow-hidden">
           <Image
             src={loan.images[0] ?? '/placeholder.jpg'}
             alt={loan.name}
             fill
             className="object-cover transition-transform duration-500 group-hover:scale-105"
             sizes="(max-width: 640px) 100vw, 33vw"
           />
           {/* subtle overlay */}
           <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
         </div>
   
         {/* body -------------------------------------------------------- */}
         <div className="p-4 flex flex-col gap-1 flex-1">
           <h3 className="font-semibold text-[#02152b]">{loan.name}</h3>
   
           <p className="text-xs text-muted-foreground line-clamp-2">
             {loan.shortDescription}
           </p>
   
           <div className="mt-auto pt-3 text-sm">
             <span className="font-medium text-[#0056B6]">
               {loan.currency} {loan.minAmount.toLocaleString()}
             </span>{' '}
             <span className="text-xs text-gray-500">(min)</span>
           </div>
         </div>
   
         {/* footer with APPLY button ----------------------------------- */}
         <div className="p-4 pt-0">
           <Link
             href={`/banking/my-banks/${loan.slug}/apply`}
             className="block w-full"
           >
             <Button
               className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white
                          hover:opacity-90"
               size="sm"
             >
               Apply
             </Button>
           </Link>
         </div>
       </div>
     );
   }
   