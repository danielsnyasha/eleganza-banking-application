/* app/(banking)/banking/loans/[slug]/page.tsx
   – static-plus-ISR loan-product detail, identical fetch strategy        */

   import { headers }            from 'next/headers';
   import { notFound }           from 'next/navigation';
   import HeroCarousel           from '@/components/Loans/HeroCarousel';   // ⬅ create just like the investments one
   import type { LoanProductDTO } from '@/types/loan';
   import Link                   from 'next/link';
   
   export const revalidate = 60;
   
   /* ---------- helper: build absolute URL (works in prod & dev) ---------- */
   async function buildUrl(path: string) {
     const hdrs  = await headers();                     // await = TS OK
     const host  = hdrs.get('host');
     const proto = process.env.NODE_ENV === 'production' ? 'https' : 'http';
     return `${proto}://${host}${path}`;
   }
   
   /* ---------- fetch a single loan product by slug ----------------------- */
   async function getLoan(slug: string): Promise<LoanProductDTO | null> {
     const res = await fetch(await buildUrl(`/api/loan-products/${slug}`), {
       next: { revalidate: 60 },
     });
     if (!res.ok) return null;
     return res.json();
   }
   
   /* ---------- page ------------------------------------------------------ */
   export default async function LoanDetail({
     params,
   }: {
     params: { slug: string };
   }) {
     const loan = await getLoan(params.slug);
     if (!loan) return notFound();
   
     return (
       <div className="max-w-4xl mx-auto px-4 pb-24 space-y-12">
         {/* hero / carousel (reuse component style from investments) */}
         <HeroCarousel
           images={loan.images.length ? loan.images : ['/placeholder.jpg']}
         />
   
         {/* header */}
         <header className="space-y-2">
           <h1 className="text-3xl font-bold">{loan.name}</h1>
           {loan.shortDescription && (
             <p className="text-neutral-600 leading-relaxed">{loan.shortDescription}</p>
           )}
         </header>
   
         {/* facts */}
         <section className="border rounded-xl overflow-hidden">
           <FactRow label="Purpose"        value={loan.purpose ?? '—'} />
           <FactRow label="Currency"       value={loan.currency} />
           <FactRow label="Min amount"     value={`${loan.currency} ${loan.minAmount.toLocaleString()}`} />
           <FactRow label="Max amount"     value={`${loan.currency} ${loan.maxAmount.toLocaleString()}`} />
           <FactRow label="Annual rate"    value={`${loan.annualRatePct}%`} />
           <FactRow label="Term"           value={`${loan.termMonths} months`} />
           {loan.feePct !== null && (
             <FactRow label="Origination fee" value={`${loan.feePct}%`} />
           )}
         </section>
   
         {/* marketing blurb */}
         <section className="space-y-3">
           <h2 className="text-xl font-semibold">Why choose this loan?</h2>
           <p className="text-neutral-700 leading-relaxed">
             Flexible repayment options, transparent fees, and a quick digital
             application process make this product ideal for borrowers seeking
             speed and convenience without sacrificing competitive rates.
           </p>
           <ul className="list-disc list-inside text-neutral-700 space-y-1">
             <li>No hidden charges – everything disclosed upfront</li>
             <li>Pre-approval decisions in minutes</li>
             <li>Early-settlement rebate on interest</li>
           </ul>
         </section>
   
         {/* CTA */}
         <Link href={`/banking/my-banks/${loan.slug}/apply`} className="block">
           <button className="mx-auto block w-full rounded-full py-3 font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition">
             Apply now
           </button>
         </Link>
       </div>
     );
   }
   
   /* ---------- tiny helper row ----------------------------------------- */
   function FactRow({ label, value }: { label: string; value: string }) {
     return (
       <div className="flex justify-between px-4 py-4 odd:bg-neutral-50 text-sm">
         <span className="text-neutral-600">{label}</span>
         <span className="font-medium truncate max-w-[60%] text-right">
           {value}
         </span>
       </div>
     );
   }
   