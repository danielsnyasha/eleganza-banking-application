/* app/(banking)/banking/team/page.tsx
   Public “Meet the Team” page – now with a blue gradient banner          */
   'use client'

   import TeamGridFrontend from '@/components/AdminPortal/Team/TeamGridFrontend'
   import {
     Card,
     CardHeader,
     CardTitle,
     CardDescription,
     CardContent,
   } from '@/components/ui/card'
   import { motion } from 'framer-motion'
   

   
   /* ───────────────────────── banner ───────────────────────── */
   function TeamBanner() {
     return (
       <motion.div
         initial={{ y: -24, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ duration: 0.55, ease: [0.42, 0, 0.58, 1] }}
       >
         <Card
           className="
             border-0 text-white overflow-hidden
             bg-gradient-to-r from-[#0056B6] to-[#0091FF]
             relative
           "
         >
           <CardHeader className="pb-0">
             <CardTitle className="text-2xl md:text-3xl font-semibold tracking-tight">
               Meet&nbsp;the&nbsp;Team
             </CardTitle>
             <CardDescription className="text-white/85">
               The passionate professionals powering Eleganza’s next-gen banking 👨‍👨‍👧‍👦 -
               committed to innovation, inclusivity&nbsp;&amp;&nbsp;customer
               success.
             </CardDescription>
           </CardHeader>
   
           <CardContent className="pt-4 text-sm md:text-base leading-relaxed space-y-1">
             <p>
               • <b>Diverse expertise</b> in finance, technology&nbsp;and service
             </p>
             <p>
               • <b>Global mindset</b> 🕵🏻‍♀️ - we speak 15&nbsp;languages &amp; count
               10 nationalities
             </p>
             <p>
               • <b>Unified purpose</b>: building intuitive, secure banking for
               everyone
             </p>
           </CardContent>
         </Card>
       </motion.div>
     )
   }
   
   /* ───────────────────────── page ───────────────────────── */
   export default function TeamPage() {
     return (
       <main className="max-w-6xl mx-auto px-4 py-12 space-y-10">
         <TeamBanner />
   
         {/* existing grid (unchanged) */}
         <TeamGridFrontend />
       </main>
     )
   }
   