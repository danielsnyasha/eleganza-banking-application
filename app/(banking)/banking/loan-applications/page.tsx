/* app/(banking)/loans/page.tsx
   Loan applications: banner + interactive list */
   import MyLoanApplicationsClient
   from '@/components/Loans/MyLoanApplicationsClient'
 import {
   Card,
   CardHeader,
   CardTitle,
   CardDescription,
   CardContent,
 } from '@/components/ui/card'
 

 
 /* ─────────────────────────────────────────────────────────── */
 /* Banner — identical palette / spacing to other sections      */
 function LoanBanner() {
   return (
     <Card
       className="
         border-0 overflow-hidden text-white
         bg-gradient-to-r from-[#0056B6] to-[#0091FF]
       "
     >
       <CardHeader className="pb-2">
         <CardTitle className="text-2xl font-semibold tracking-tight">
           Loan Applications Center
         </CardTitle>
         <CardDescription className="text-white/85">
           Track every application 🧑‍🏫 - pending, approved, or rejected.
         </CardDescription>
       </CardHeader>
 
       <CardContent className="text-sm leading-relaxed space-y-1">
         <p>
           • <b>Pending:</b> Under credit review<br />
           • <b>Approved:</b> Ready for contract &amp; disbursement<br />
           • <b>Rejected:</b> See reasons &amp; next-steps tips<br />
           • <b>Projections:</b> Real-time approval ratio&nbsp;
           <span className="font-medium text-green-300">▲</span> vs. last quarter
         </p>
       </CardContent>
     </Card>
   )
 }
 
 /* ─────────────────────────────────────────────────────────── */
 /* Page shell                                                  */
 export default function LoanApplicationsPage() {
   return (
     <main className="p-6 max-w-6xl mx-auto space-y-6">
       {/* new banner */}
       <LoanBanner />
 
       {/* existing interactive client component */}
       <MyLoanApplicationsClient />
     </main>
   )
 }
 