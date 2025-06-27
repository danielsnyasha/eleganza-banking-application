/* components/AdminPortal/Investments/ApplicationRow.tsx
   – strict TS, responsive, shadcn, Eleganza palette                     */
   'use client';

   import { useUpdateApp }       from '@/hooks/admin-investment-applications';
   import type { InvestmentApp } from '@/hooks/admin-investment-applications';
   import { Button }             from '@/components/ui/button';
   import { Badge }              from '@/components/ui/badge';
   import { cn }                 from '@/lib/utils';
   
   /* Variants allowed by shadcn Badge */
   type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';
   
   export default function ApplicationRow({ app }: { app: InvestmentApp }) {
     const mut      = useUpdateApp();
     const disabled = mut.isPending;
   
     /* status → badge colour */
     const badgeVariant: BadgeVariant =
       app.status === 'approved'
         ? 'default'
         : app.status === 'cancelled'
           ? 'destructive'
           : 'secondary';
   
     const productName = app.product?.name ?? app.slug;
     const applicant   =
       `${app.name} ${app.surname}`.trim() || app.userId.slice(0, 6) + '…';
   
     return (
       <tr className="border-b last:border-none text-sm">
         {/* PRODUCT ------------------------------------------------- */}
         <td className="px-4 py-3 font-medium text-[#02152b] max-w-[220px]">
           {productName}
           {app.product && (
             <p className="text-xs text-muted-foreground">
               {app.product.annualRatePct}% • Min&nbsp;
               {app.currency} {app.product.minimumAmount.toLocaleString()}
             </p>
           )}
         </td>
   
         {/* AMOUNT -------------------------------------------------- */}
         <td className="px-4 py-3 whitespace-nowrap">
           {app.currency}&nbsp;{app.amount.toLocaleString()}
         </td>
   
         {/* RISK – hidden on phones -------------------------------- */}
         <td className="px-4 py-3 hidden sm:table-cell">{app.risk}</td>
   
         {/* DATE – hidden on phones -------------------------------- */}
         <td className="px-4 py-3 hidden md:table-cell">
           {new Date(app.submittedAt).toLocaleDateString()}
         </td>
   
         {/* APPLICANT --------------------------------------------- */}
         <td className="px-4 py-3">
           <span className="font-medium">{applicant}</span>
           {app.email && (
             <p className="text-xs text-muted-foreground truncate max-w-[160px]">
               {app.email}
             </p>
           )}
         </td>
   
         {/* STATUS -------------------------------------------------- */}
         <td className="px-4 py-3">
           <Badge variant={badgeVariant}>{app.status}</Badge>
         </td>
   
         {/* ACTIONS – stack vertically on very narrow screens ------ */}
         <td className="px-4 py-3">
           <div className="flex flex-col sm:flex-row gap-2 justify-end">
             <Button
               size="sm"
               className={cn(
                 'bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:opacity-90',
                 (disabled || app.status === 'approved') &&
                   'opacity-50 cursor-not-allowed',
               )}
               disabled={disabled || app.status === 'approved'}
               onClick={() => mut.mutate({ id: app.id, status: 'approved' })}
             >
               Approve
             </Button>
   
             <Button
               size="sm"
               variant="destructive"
               disabled={disabled || app.status === 'cancelled'}
               onClick={() => mut.mutate({ id: app.id, status: 'cancelled' })}
             >
               Cancel
             </Button>
           </div>
         </td>
       </tr>
     );
   }
   