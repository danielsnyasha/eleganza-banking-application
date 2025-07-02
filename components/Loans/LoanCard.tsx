/* components/Loans/LoanCard.tsx
   – card inside /banking/loan-applications            */
   'use client';

   import Image         from 'next/image';
   import { Badge }     from '@/components/ui/badge';
   import { Button }    from '@/components/ui/button';
   import ProjectionModal from './ProjectionModal';   
   import { useState }  from 'react';
   import type { LoanAppDTO } from '@/types/loan';
   
   export default function LoanCard({ app }: { app: LoanAppDTO }) {
     const [open, setOpen] = useState(false);
   
     /* hero image ---------------------------------------------------- */
     const imgSrc =
       app.product?.images?.[0] ??
       'https://placehold.co/600x400?text=No+Image';
   
     /* ui helpers ----------------------------------------------------- */
     const isApproved = app.status === 'approved';
     const btnCls = isApproved
       ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:opacity-90'
       : 'bg-muted text-muted-foreground cursor-not-allowed';
   
     /* render --------------------------------------------------------- */
     return (
       <>
         <div className="rounded-xl border overflow-hidden flex flex-col bg-[#fafdff]">
           {/* image */}
           <div className="relative h-40 w-full">
             <Image
               src={imgSrc}
               alt={app.product?.name ?? 'Loan product'}
               fill
               className="object-cover"
               unoptimized={imgSrc.startsWith('http')}
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/40" />
           </div>
   
           {/* body */}
           <div className="p-4 flex-1 flex flex-col gap-3">
             <p className="font-medium text-[#02152b]">
               {app.currency} {app.amount.toLocaleString()}
             </p>
   
             <Badge
               variant={
                 app.status === 'approved'
                   ? 'default'
                   : app.status === 'cancelled'
                   ? 'destructive'
                   : 'secondary'
               }
             >
               {app.status}
             </Badge>
   
             <Button
               disabled={!isApproved}
               className={btnCls}
               onClick={() => setOpen(true)}
             >
               View projection
             </Button>
           </div>
         </div>
   
         {/* graph modal mounts regardless of status */}
         <ProjectionModal open={open} onClose={() => setOpen(false)} app={app} />
       </>
     );
   }
   