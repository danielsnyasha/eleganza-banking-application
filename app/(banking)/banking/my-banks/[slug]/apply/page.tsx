/* Loan‑application wizard – /banking/my-banks/[slug]/apply
   identical UX to Investments, now with application‑fee handling        */

   'use client';

   import { useState, useEffect } from 'react';
   import { useRouter, useParams } from 'next/navigation';
   import { useUser } from '@clerk/nextjs';
   import { toast } from 'react-toastify';
   import { z } from 'zod';
   
   import { Input }                 from '@/components/ui/input';
   import { Button }                from '@/components/ui/button';
   import { RadioGroup,
            RadioGroupItem }        from '@/components/ui/radio-group';
   import { Checkbox }              from '@/components/ui/checkbox';
   import ApplyStepper              from '@/components/Investments/ApplyStepper';
   
   import { useWallet }             from '@/hooks/useWallet';
   import type { LoanProductDTO }   from '@/types/loan';
   import type { CurrencyCode }     from '@prisma/client';
   
   /* ------------------------------------------------------------------ */
   /* helpers */
   const labels = ['Your details', 'Loan amount', 'Purpose', 'Confirm'];
   
   /** flat ZAR 250 or 1 % of amount (whichever is larger) */
   function calcFee(amount: number, currency: CurrencyCode) {
     // only charge fee in the same currency as the loan product
     const pct = Math.round(amount * 0.01);
     return currency === 'ZAR' ? Math.max(250, pct) : pct;
   }
   
   /* ------------------------------------------------------------------ */
   export default function ApplyPage() {
     const { slug }   = useParams<{ slug: string }>();
     const router     = useRouter();
     const { user }   = useUser();
     const { data: wallet, refetch: refetchWallet } = useWallet();
   
     /* ----- fetch product once on mount ------------------------------ */
     const [loan, setLoan] = useState<LoanProductDTO | null>(null);
     useEffect(() => {
       fetch(`/api/loan-products/${slug}`)
         .then((r) => (r.ok ? r.json() : null))
         .then(setLoan)
         .catch(() => toast.error('Failed to load loan details'));
     }, [slug]);
   
     /* ----- wizard state --------------------------------------------- */
     const [step,    setStep]    = useState(0);
     const [amount,  setAmount]  = useState('');
     const [purpose, setPurpose] = useState('');
     const [agree,   setAgree]   = useState(false);
     const [busy,    setBusy]    = useState(false);
   
     const next = () => setStep((s) => Math.min(3, s + 1));
     const back = () => setStep((s) => Math.max(0, s - 1));
   
     /* ----- balance & fee checks ------------------------------------- */
     const numAmt     = +amount || 0;
     const fee        = calcFee(numAmt, loan?.currency ?? 'ZAR');
     const min        = loan?.minAmount ?? 0;
     const max        = loan?.maxAmount ?? Infinity;
   
     // active account in the same currency
     const account = wallet?.accounts.find(
       (a) => a.currency === (loan?.currency ?? 'ZAR') && a.isActive,
     );
     const available = account?.balance ?? 0;
   
     let amountErr = '';
     if (amount) {
       if (numAmt < min)       amountErr = `Minimum is ${loan?.currency} ${min.toLocaleString()}`;
       else if (numAmt > max)  amountErr = `Maximum is ${loan?.currency} ${max.toLocaleString()}`;
       else if (available < fee)
         amountErr = `Not enough balance for the ${loan?.currency} ${fee.toLocaleString()} application fee`;
     }
   
     /* ----- submit ---------------------------------------------------- */
     async function submit() {
       if (!user) { toast.error('Please sign in first'); return; }
       setBusy(true);
   
       /* Zod guard (defensive) */
       const schema = z.number().min(min).max(max);
       if (!schema.safeParse(numAmt).success) {
         toast.error('Invalid amount'); setBusy(false); return;
       }
       if (available < fee) {
         toast.error('Insufficient balance for application fee');
         setBusy(false); return;
       }
   
       /* 1️⃣  create application */
       const appRes = await fetch('/api/loans/applications', {
         method : 'POST',
         headers: { 'Content-Type': 'application/json' },
         body   : JSON.stringify({
           userId : user.id,
           slug,
           amount : numAmt,
           currency: loan?.currency, 
           purpose,
           name   : user.firstName,
           surname: user.lastName,
           email  : user.emailAddresses[0]?.emailAddress,
           phone  : user.primaryPhoneNumber?.phoneNumber,
         }),
       });
       if (!appRes.ok) {
         toast.error('Could not submit – please try again'); setBusy(false); return;
       }
   
       /* 2️⃣  deduct application fee */
       const feeRes = await fetch('/api/wallet/transactions', {
         method : 'POST',
         headers: { 'Content-Type': 'application/json' },
         body   : JSON.stringify({
           accountId : account?.id,
           type      : 'FEE',
           amount    : fee,
           currency  : loan?.currency,
           note      : `Loan application fee for ${slug}`,
           userId    : user.id,
         }),
       });
       if (!feeRes.ok) {
         toast.error('Fee deduction failed — contact support'); setBusy(false); return;
       }
   
       /* refresh cached wallet balance */
       refetchWallet();
   
       /* success toast + redirect */
       let s = 3;
       const id = toast.success(
         `Application submitted! ${loan?.currency} ${fee.toLocaleString()} fee deducted. Redirecting in ${s}…`,
         { autoClose: false, draggable: false },
       );
       const t = setInterval(() => {
         s -= 1;
         if (s) toast.update(id, { render: `Application submitted! Redirecting in ${s}…` });
         else { clearInterval(t); toast.dismiss(id); router.push('/banking/my-banks'); }
       }, 1000);
     }
   
     /* ---------------------------------------------------------------- */
     return (
       <div className="max-w-lg mx-auto px-4 py-10 space-y-8">
         <h1 className="text-center text-xl font-semibold mb-4">
           Apply – {slug.replace(/-/g, ' ')}
         </h1>
   
         <ApplyStepper step={step} labels={labels} />
   
         {/* STEP 0  ─ profile (readonly) */}
         {step === 0 && (
           <div className="space-y-4">
             <Input disabled defaultValue={user?.firstName ?? ''} placeholder="First name" />
             <Input disabled defaultValue={user?.lastName ?? ''}  placeholder="Surname" />
             <Input disabled defaultValue={user?.primaryPhoneNumber?.phoneNumber ?? ''} placeholder="Phone" />
             <Input disabled defaultValue={user?.emailAddresses[0]?.emailAddress ?? ''} placeholder="Email" />
           </div>
         )}
   
         {/* STEP 1  ─ amount */}
         {step === 1 && (
           <div className="space-y-4">
             {loan && (
               <p className="text-sm text-neutral-600">
                 Min&nbsp;<strong>{loan.currency} {min.toLocaleString()}</strong>  •
                 Max&nbsp;<strong>{loan.currency} {max.toLocaleString()}</strong>
               </p>
             )}
             <p className="text-sm text-neutral-600">
               Application fee:&nbsp;
               <strong>{loan?.currency} {fee.toLocaleString()}</strong>
             </p>
             <p className="text-sm text-neutral-600">
               Available balance:&nbsp;
               <strong>{loan?.currency} {available.toLocaleString(undefined,{minimumFractionDigits:2})}</strong>
             </p>
   
             <Input
               type="number"
               placeholder="Loan amount"
               value={amount}
               onChange={(e) => setAmount(e.target.value)}
             />
             {amountErr && <p className="text-xs text-red-500">{amountErr}</p>}
           </div>
         )}
   
         {/* STEP 2  ─ purpose */}
         {step === 2 && (
           <RadioGroup value={purpose} onValueChange={setPurpose} className="space-y-2">
             {['Home purchase','Vehicle','Education','Business capital','Debt consolidation','Other']
               .map((p) => (
                 <label key={p} className="flex items-center gap-2">
                   <RadioGroupItem value={p} /> <span className="text-sm">{p}</span>
                 </label>
               ))}
           </RadioGroup>
         )}
   
         {/* STEP 3  ─ terms */}
         {step === 3 && (
           <div className="space-y-4">
             <p className="text-sm leading-relaxed">
               By applying you confirm you have read and accept the&nbsp;
               <a href="/terms" className="underline">loan terms &amp; conditions</a>.
             </p>
             <label className="flex items-center gap-2 text-sm">
               <Checkbox checked={agree} onCheckedChange={(v) => setAgree(v === true)} /> I agree
             </label>
           </div>
         )}
   
         {/* ACTIONS */}
         <div className="flex justify-between mt-8">
           {step > 0 && <Button variant="ghost" onClick={back}>Back</Button>}
           {step < 3 && (
             <Button
               onClick={next}
               disabled={
                 (step === 1 && (!!amountErr || !amount)) ||
                 (step === 2 && !purpose)
               }
             >
               Next
             </Button>
           )}
           {step === 3 && (
             <Button
               disabled={!agree || busy}
               className="bg-gradient-to-r from-purple-500 to-blue-600 text-white"
               onClick={submit}
             >
               {busy ? 'Submitting…' : 'Submit'}
             </Button>
           )}
         </div>
       </div>
     );
   }
   