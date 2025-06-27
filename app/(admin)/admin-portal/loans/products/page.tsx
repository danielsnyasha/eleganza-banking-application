/* app/admin-portal/loans/products/page.tsx
   – shadcn, Cloudinary upload + URL pin, strict TS                     */

   'use client';

   import { useState } from 'react';
   import {
     useAdminLoans,
     useCreateLoan,
     useDeleteLoan,
   } from '@/hooks/admin-loans';
   import type { LoanProductDTO } from '@/hooks/admin-loans';
   import {
     Dialog,
     DialogTrigger,
     DialogContent,
     DialogTitle,
   } from '@/components/ui/dialog';
   import { Input }    from '@/components/ui/input';
   import { Textarea } from '@/components/ui/textarea';
   import {
     Select,
     SelectTrigger,
     SelectContent,
     SelectItem,
   } from '@/components/ui/select';
   import { Button } from '@/components/ui/button';
   import { UploadCloud, Link as LinkIcon, Plus, Loader2, Trash2 } from 'lucide-react';
   import { uploadToCloudinary } from '@/lib/cloudinary';
   
   /* ------------------------------------------------------------------ */
   
   export default function LoansAdminPage() {
     const { data = [], isLoading, isError } = useAdminLoans();
     const createMut  = useCreateLoan();
     const deleteMut  = useDeleteLoan();
   
     const [open, setOpen] = useState(false);
   
     /* form-state ------------------------------------------------------ */
     const [form, setForm] = useState({
       name           : '',
       shortDescription: '',
       purpose        : 'Personal',
       currency       : 'ZAR',
       maxAmount      : '',
       minAmount      : '',
       annualRatePct  : '',
       termMonths     : '',
       feePct         : '',
     });
     const [images,    setImages]    = useState<string[]>([]);
     const [imageUrl,  setImageUrl]  = useState('');
   
     /* -------------- image helpers ----------------------------------- */
     async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
       const file = e.target.files?.[0];
       if (!file) return;
       const url = await uploadToCloudinary(file);
       setImages((prev) => [...prev, url]);
     }
   
     function handleAddUrl() {
       if (!imageUrl.trim()) return;
       setImages((prev) => [...prev, imageUrl.trim()]);
       setImageUrl('');
     }
   
     /* -------------- save -------------------------------------------- */
     function save() {
       createMut.mutate(
         {
           ...form,
           maxAmount    : +form.maxAmount,
           minAmount    : +form.minAmount,
           annualRatePct: +form.annualRatePct,
           termMonths   : +form.termMonths,
           feePct       : form.feePct ? +form.feePct : null,
           images,
         },
         {
           onSuccess: () => {
             setOpen(false);
             setImages([]);
             setForm({
               name: '',
               shortDescription: '',
               purpose: 'Personal',
               currency: 'ZAR',
               maxAmount: '',
               minAmount: '',
               annualRatePct: '',
               termMonths: '',
               feePct: '',
             });
           },
         },
       );
     }
   
     /* ----------------- UI ------------------------------------------ */
     return (
       <div className="space-y-10">
         {/* banner */}
         <section className="rounded-xl bg-gradient-to-r from-[#0056B6] to-[#0091FF] text-white p-6">
           <h1 className="text-2xl font-bold">Loan Products</h1>
           <p className="text-sm opacity-90">
             Create, update or delete the loan offerings visible to customers.
           </p>
         </section>
   
         {/* list + create */}
         <section className="space-y-6">
           <div className="flex justify-between items-center">
             <h2 className="text-lg font-semibold">All Loan Products</h2>
   
             <Dialog open={open} onOpenChange={setOpen}>
               <DialogTrigger asChild>
                 <Button size="sm">
                   <Plus className="w-4 h-4 mr-2" /> New Loan
                 </Button>
               </DialogTrigger>
   
               {/* ---------------- create form --------------------------- */}
               <DialogContent className="max-w-lg">
                 <DialogTitle>Create Loan Product</DialogTitle>
                 <div className="space-y-4 mt-4">
                   <Input
                     placeholder="Name"
                     value={form.name}
                     onChange={(e) => setForm({ ...form, name: e.target.value })}
                   />
                   <Textarea
                     placeholder="Short description"
                     value={form.shortDescription}
                     onChange={(e) =>
                       setForm({ ...form, shortDescription: e.target.value })
                     }
                   />
   
                   <Input
                     placeholder="Purpose (e.g. Home, Auto, Edu)"
                     value={form.purpose}
                     onChange={(e) =>
                       setForm({ ...form, purpose: e.target.value })
                     }
                   />
   
                   {/* currency */}
                   <Select
                     value={form.currency}
                     onValueChange={(v) => setForm({ ...form, currency: v })}
                   >
                     <SelectTrigger>{form.currency}</SelectTrigger>
                     <SelectContent>
                       {['ZAR', 'USD', 'EUR', 'GBP'].map((c) => (
                         <SelectItem key={c} value={c}>
                           {c}
                         </SelectItem>
                       ))}
                     </SelectContent>
                   </Select>
   
                   <Input
                     type="number"
                     placeholder="Min Amount"
                     value={form.minAmount}
                     onChange={(e) =>
                       setForm({ ...form, minAmount: e.target.value })
                     }
                   />
                   <Input
                     type="number"
                     placeholder="Max Amount"
                     value={form.maxAmount}
                     onChange={(e) =>
                       setForm({ ...form, maxAmount: e.target.value })
                     }
                   />
                   <Input
                     type="number"
                     placeholder="Annual % rate"
                     value={form.annualRatePct}
                     onChange={(e) =>
                       setForm({ ...form, annualRatePct: e.target.value })
                     }
                   />
                   <Input
                     type="number"
                     placeholder="Term (months)"
                     value={form.termMonths}
                     onChange={(e) =>
                       setForm({ ...form, termMonths: e.target.value })
                     }
                   />
                   <Input
                     type="number"
                     placeholder="Origination fee % (optional)"
                     value={form.feePct}
                     onChange={(e) => setForm({ ...form, feePct: e.target.value })}
                   />
   
                   {/* ------------- images ------------------------------- */}
                   <div className="space-y-2">
                     <p className="text-sm font-medium">Images</p>
   
                     {/* upload */}
                     <label className="flex items-center gap-2 cursor-pointer text-sm">
                       <UploadCloud className="w-4 h-4" />
                       <span>Upload from computer</span>
                       <input
                         type="file"
                         onChange={handleFile}
                         className="hidden"
                       />
                     </label>
   
                     {/* url pin */}
                     <div className="flex gap-2">
                       <Input
                         placeholder="Paste image URL"
                         value={imageUrl}
                         onChange={(e) => setImageUrl(e.target.value)}
                       />
                       <Button
                         type="button"
                         variant="secondary"
                         onClick={handleAddUrl}
                       >
                         <LinkIcon className="w-4 h-4" />
                       </Button>
                     </div>
   
                     {/* preview */}
                     <div className="flex flex-wrap gap-2">
                       {images.map((url) => (
                         <img
                           key={url}
                           src={url}
                           alt=""
                           className="w-16 h-16 object-cover rounded"
                         />
                       ))}
                     </div>
                   </div>
   
                   <Button
                     onClick={save}
                     disabled={createMut.isPending}
                     className="bg-gradient-to-r from-purple-500 to-blue-600 text-white"
                   >
                     {createMut.isPending ? (
                       <Loader2 className="w-4 h-4 animate-spin" />
                     ) : (
                       'Save'
                     )}
                   </Button>
                 </div>
               </DialogContent>
             </Dialog>
           </div>
   
           {/* ---------------- list cards ------------------------------ */}
           {isLoading ? (
             <p>Loading…</p>
           ) : isError ? (
             <p className="text-red-500">Could not fetch loans.</p>
           ) : (
             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
               {data.map((l) => (
                 <LoanCard key={l.id} loan={l} onDelete={deleteMut.mutate} />
               ))}
             </div>
           )}
         </section>
       </div>
     );
   }
   
   /* ------------------------------------------------------------------ */
   /* compact card used above                                            */
   function LoanCard({
     loan,
     onDelete,
   }: {
     loan: LoanProductDTO;
     onDelete: (id: string) => void;
   }) {
     return (
       <div className="border rounded-lg p-4 relative group">
         {loan.images[0] && (
           <img
             src={loan.images[0]}
             className="h-28 w-full object-cover rounded mb-3"
           />
         )}
         <p className="font-medium">{loan.name}</p>
         <p className="text-xs text-muted-foreground line-clamp-2">
           {loan.shortDescription}
         </p>
         <p className="text-sm mt-1">
           {loan.currency} {loan.minAmount.toLocaleString()} –{' '}
           {loan.currency} {loan.maxAmount.toLocaleString()}
         </p>
         <p className="text-xs text-muted-foreground">
           {loan.annualRatePct}% • {loan.termMonths} mo
         </p>
   
         <button
           onClick={() => onDelete(loan.id)}
           className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition text-red-600"
         >
           <Trash2 className="w-4 h-4" />
         </button>
       </div>
     );
   }
   